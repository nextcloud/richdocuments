<?php

declare(strict_types=1);

namespace OCA\Wopi\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\SimpleMigrationStep;
use OCP\Migration\IOutput;

/**
 * Auto-generated migration step: Please modify to your needs!
 */
class Version030408Date20191220160721 extends SimpleMigrationStep {

	/**
	 * @param IOutput $output
	 * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	 * @param array $options
	 */
	public function preSchemaChange(IOutput $output, Closure $schemaClosure, array $options) {
	}

	/**
	 * @param IOutput $output
	 * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	 * @param array $options
	 * @return null|ISchemaWrapper
	 */
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options) {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('wopi_locks')) {
			$table = $schema->createTable('wopi_locks');
			$table->addColumn('id', 'string', [
				'length' => 36,
				'notnull' => true,
			]);
			$table->addColumn('valid_by', 'integer', [
				'notnull' => true
			]);
			$table->addColumn('file_id', 'integer', [
				'notnull' => true
			]);
			$table->addColumn('user_id', 'string', [
				'notnull' => true,
				'length' => 64,
			]);
			$table->addColumn('token_id', 'string', [
				'notnull' => true,
				'length' => 36,
			]);
			$table->addColumn('value', 'string', [
				'notnull' => true,
				'length' => 1024,
			]);
			$table->setPrimaryKey(['id']);
			$table->addIndex(['valid_by'], 'wopi_locks_valid_by');
			$table->addUniqueIndex(['file_id'], 'wopi_locks_file_id');
		}

		return $schema;
	}

	/**
	 * @param IOutput $output
	 * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	 * @param array $options
	 */
	public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options) {
	}
}
