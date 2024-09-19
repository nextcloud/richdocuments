<?php
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */


namespace OCA\Richdocuments\Command;

use Doctrine\DBAL\Platforms\SqlitePlatform;
use Doctrine\DBAL\Types\Type;
use OC\DB\Connection;
use OC\DB\SchemaWrapper;
use OCP\DB\Types;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\ConfirmationQuestion;

class ConvertToBigInt extends Command {
	public function __construct(
		private Connection $connection,
	) {
		parent::__construct();
	}

	protected function configure() {
		$this
			->setName('richdocuments:convert-bigint')
			->setDescription('Convert the ID columns of the richdocuments tables to BigInt');
	}

	protected function getColumnsByTable() {
		return [
			'richdocuments_wopi' => ['id', 'fileid', 'version', 'template_id', 'template_destination', 'expiry'],
			'richdocuments_direct' => ['id', 'fileid', 'template_id', 'template_destination', 'timestamp'],
			'richdocuments_assets' => ['id', 'fileid', 'timestamp'],
		];
	}

	protected function execute(InputInterface $input, OutputInterface $output): int {
		$schema = new SchemaWrapper($this->connection);
		$isSqlite = $this->connection->getDatabasePlatform() instanceof SqlitePlatform;
		$updates = [];

		$tables = $this->getColumnsByTable();
		foreach ($tables as $tableName => $columns) {
			if (!$schema->hasTable($tableName)) {
				continue;
			}

			$table = $schema->getTable($tableName);

			foreach ($columns as $columnName) {
				$column = $table->getColumn($columnName);
				$isAutoIncrement = $column->getAutoincrement();
				$isAutoIncrementOnSqlite = $isSqlite && $isAutoIncrement;
				if ($column->getType()->getName() !== Types::BIGINT && !$isAutoIncrementOnSqlite) {
					$column->setType(Type::getType(Types::BIGINT));
					$column->setOptions(['length' => 20]);
					$column->setUnsigned(true);

					$updates[] = '* ' . $tableName . '.' . $columnName;
				}
			}
		}

		if (empty($updates)) {
			$output->writeln('<info>All tables already up to date!</info>');
			return 0;
		}

		$output->writeln('<comment>Following columns will be updated:</comment>');
		$output->writeln('');
		$output->writeln($updates);
		$output->writeln('');
		$output->writeln('<comment>This can take up to hours, depending on the number of Collabora WOPI tokens in your instance!</comment>');

		if ($input->isInteractive()) {
			$helper = $this->getHelper('question');
			$question = new ConfirmationQuestion('Continue with the conversion (y/n)? [n] ', false);

			if (!$helper->ask($input, $output, $question)) {
				return 1;
			}
		}

		$this->connection->migrateToSchema($schema->getWrappedSchema());

		return 0;
	}
}
