<?php

declare(strict_types=1);

namespace OCA\Richdocuments\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\SimpleMigrationStep;
use OCP\Migration\IOutput;

/**
 * Auto-generated migration step: Please modify to your needs!
 */
class Version030407Date20191220160355 extends SimpleMigrationStep {

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

		if (!$schema->hasTable('richdocuments_wopi')) {
			$table = $schema->createTable('richdocuments_wopi');
			$table->addColumn('id', 'integer', [
				'autoincrement' => true,
				'notnull' => true,
				'length' => 4,
				'unsigned' => true,
			]);
			$table->addColumn('owner_uid', 'string', [
				'notnull' => false,
				'length' => 64,
			]);
			$table->addColumn('editor_uid', 'string', [
				'notnull' => false,
				'length' => 64,
			]);
			$table->addColumn('guest_displayname', 'string', [
				'notnull' => false,
				'length' => 64,
			]);
			$table->addColumn('fileid', 'integer', [
				'notnull' => true,
				'length' => 4,
			]);
			$table->addColumn('version', 'integer', [
				'notnull' => true,
				'length' => 4,
				'default' => 0,
			]);
			$table->addColumn('canwrite', 'boolean', [
				'notnull' => true,
				'default' => false,
			]);
			$table->addColumn('server_host', 'string', [
				'notnull' => true,
				'default' => 'localhost',
			]);
			$table->addColumn('token', 'string', [
				'notnull' => true,
				'length' => 32,
				'default' => '',
			]);
			$table->addColumn('expiry', 'integer', [
				'notnull' => false,
				'length' => 4,
				'unsigned' => true,
			]);
			$table->addColumn('template_destination', 'integer', [
				'notnull' => false,
				'length' => 4,
			]);
			$table->addColumn('template_id', 'integer', [
				'notnull' => false,
				'length' => 4,
			]);
			$table->addColumn('hide_download', 'boolean', [
				'notnull' => true,
				'default' => false,
			]);
			$table->addColumn('direct', 'boolean', [
				'notnull' => true,
				'default' => false,
			]);
			$table->addColumn('is_remote_token', 'boolean', [
				'notnull' => true,
				'default' => false,
			]);
			$table->addColumn('remote_server', 'string', [
				'notnull' => true,
				'default' => '',
			]);
			$table->addColumn('remote_server_token', 'string', [
				'notnull' => true,
				'length' => 32,
				'default' => '',
			]);
			$table->setPrimaryKey(['id']);
			$table->addUniqueIndex(['token'], 'rd_wopi_token_idx');
		}

		if (!$schema->hasTable('richdocuments_direct')) {
			$table = $schema->createTable('richdocuments_direct');
			$table->addColumn('id', 'integer', [
				'autoincrement' => true,
				'notnull' => true,
				'length' => 4,
				'unsigned' => true,
			]);
			$table->addColumn('token', 'string', [
				'notnull' => false,
				'length' => 64,
			]);
			$table->addColumn('uid', 'string', [
				'notnull' => false,
				'length' => 64,
			]);
			$table->addColumn('fileid', 'integer', [
				'notnull' => true,
				'length' => 4,
			]);
			$table->addColumn('timestamp', 'integer', [
				'notnull' => true,
				'length' => 4,
				'default' => 0,
				'unsigned' => true,
			]);
			$table->addColumn('template_destination', 'integer', [
				'notnull' => false,
				'length' => 4,
			]);
			$table->addColumn('template_id', 'integer', [
				'notnull' => false,
				'length' => 4,
			]);
			$table->setPrimaryKey(['id']);
			$table->addUniqueIndex(['token'], 'rd_direct_token_idx');
			$table->addIndex(['timestamp'], 'rd_direct_timestamp_idx');
		}

		if (!$schema->hasTable('richdocuments_assets')) {
			$table = $schema->createTable('richdocuments_assets');
			$table->addColumn('id', 'integer', [
				'autoincrement' => true,
				'notnull' => true,
				'length' => 4,
				'unsigned' => true,
			]);
			$table->addColumn('uid', 'string', [
				'notnull' => false,
				'length' => 64,
			]);
			$table->addColumn('fileid', 'integer', [
				'notnull' => true,
				'length' => 4,
			]);
			$table->addColumn('token', 'string', [
				'notnull' => false,
				'length' => 64,
			]);
			$table->addColumn('timestamp', 'integer', [
				'notnull' => true,
				'length' => 4,
				'default' => 0,
				'unsigned' => true,
			]);
			$table->setPrimaryKey(['id']);
			$table->addUniqueIndex(['token'], 'rd_assets_token_idx');
			$table->addUniqueIndex(['timestamp'], 'rd_assets_timestamp_idx');
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
