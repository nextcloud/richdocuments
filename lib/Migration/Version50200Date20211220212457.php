<?php

declare(strict_types=1);

namespace OCA\Richdocuments\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Auto-generated migration step: Please modify to your needs!
 */
class Version50200Date20211220212457 extends SimpleMigrationStep {
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('richdocuments_template')) {
			$table = $schema->createTable('richdocuments_template');
			$table->addColumn('id', 'bigint', [
				'autoincrement' => true,
				'notnull' => true,
				'length' => 20,
				'unsigned' => true,
			]);
			$table->addColumn('userid', 'string', [
				'notnull' => false,
				'length' => 64,
			]);
			$table->addColumn('fileid', 'bigint', [
				'notnull' => true,
				'length' => 20,
			]);
			$table->addColumn('templateid', 'bigint', [
				'notnull' => true,
				'length' => 20,
			]);
			$table->addColumn('timestamp', 'bigint', [
				'notnull' => true,
				'length' => 20,
				'unsigned' => true,
			]);
			$table->setPrimaryKey(['id']);
			$table->addUniqueIndex(['userid', 'fileid'], 'rd_t_user_file');
		}

		return $schema;
	}
}
