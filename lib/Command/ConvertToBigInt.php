<?php
/**
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */


namespace OCA\RichDocuments\Command;

use Doctrine\DBAL\Platforms\SqlitePlatform;
use Doctrine\DBAL\Types\Type;
use OC\DB\Connection;
use OCP\DB\Types;
use OC\DB\SchemaWrapper;
use OCP\IDBConnection;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\ConfirmationQuestion;

class ConvertToBigInt extends Command {

	/** @var IDBConnection */
	private $connection;

	/**
	 * @param IDBConnection $connection
	 */
	public function __construct(Connection $connection) {
		$this->connection = $connection;
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
