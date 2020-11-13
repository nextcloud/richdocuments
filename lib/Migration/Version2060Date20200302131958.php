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
class Version2060Date20200302131958 extends SimpleMigrationStep {

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
			$table->addColumn('id', 'bigint', [
				'autoincrement' => true,
				'notnull' => true,
				'length' => 20,
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
			$table->addColumn('fileid', 'bigint', [
				'notnull' => true,
				'length' => 20,
			]);
			$table->addColumn('version', 'bigint', [
				//'notnull' => true,
				'notnull' => false,
				'length' => 20,
				'default' => 0,
			]);
			$table->addColumn('canwrite', 'boolean', [
				//'notnull' => true,
				'notnull' => false,
				'default' => false,
			]);
			$table->addColumn('server_host', 'string', [
				'notnull' => true,
				'default' => 'localhost',
			]);
			$table->addColumn('token', 'string', [
				//'notnull' => true,
				'notnull' => false,
				'length' => 32,
				'default' => '',
			]);
			$table->addColumn('expiry', 'bigint', [
				'notnull' => false,
				'length' => 20,
				'unsigned' => true,
			]);
			$table->addColumn('template_destination', 'bigint', [
				'notnull' => false,
				'length' => 20,
			]);
			$table->addColumn('template_id', 'bigint', [
				'notnull' => false,
				'length' => 20,
			]);
			$table->addColumn('hide_download', 'boolean', [
				// 'notnull' => true,
				'notnull' => false,
				'default' => false,
			]);
			$table->addColumn('direct', 'boolean', [
				// 'notnull' => true,
				'notnull' => false,
				'default' => false,
			]);
			$table->addColumn('is_remote_token', 'boolean', [
				// 'notnull' => true,
				'notnull' => false,
				'default' => false,
			]);
			$table->addColumn('remote_server', 'string', [
				// 'notnull' => true,
				'notnull' => false,
				'default' => '',
			]);
			$table->addColumn('remote_server_token', 'string', [
				// 'notnull' => true,
				'notnull' => false,
				'length' => 32,
				'default' => '',
			]);
			$table->setPrimaryKey(['id']);
			$table->addUniqueIndex(['token'], 'rd_wopi_token_idx');
		}

		if (!$schema->hasTable('richdocuments_direct')) {
			$table = $schema->createTable('richdocuments_direct');
			$table->addColumn('id', 'bigint', [
				'autoincrement' => true,
				'notnull' => true,
				'length' => 20,
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
			$table->addColumn('fileid', 'bigint', [
				'notnull' => true,
				'length' => 20,
			]);
			$table->addColumn('timestamp', 'bigint', [
				// 'notnull' => true,
				'notnull' => false,
				'length' => 20,
				'default' => 0,
				'unsigned' => true,
			]);
			$table->addColumn('template_destination', 'bigint', [
				'notnull' => false,
				'length' => 20,
			]);
			$table->addColumn('template_id', 'bigint', [
				'notnull' => false,
				'length' => 20,
			]);
			$table->setPrimaryKey(['id']);
			$table->addUniqueIndex(['token'], 'rd_direct_token_idx');
			$table->addIndex(['timestamp'], 'rd_direct_timestamp_idx');
		}

		if (!$schema->hasTable('richdocuments_assets')) {
			$table = $schema->createTable('richdocuments_assets');
			$table->addColumn('id', 'bigint', [
				'autoincrement' => true,
				'notnull' => true,
				'length' => 20,
				'unsigned' => true,
			]);
			$table->addColumn('uid', 'string', [
				'notnull' => false,
				'length' => 64,
			]);
			$table->addColumn('fileid', 'bigint', [
				'notnull' => true,
				'length' => 20,
			]);
			$table->addColumn('token', 'string', [
				'notnull' => false,
				'length' => 64,
			]);
			$table->addColumn('timestamp', 'bigint', [
				// 'notnull' => true,
				'notnull' => false,
				'length' => 20,
				'default' => 0,
				'unsigned' => true,
			]);
			$table->setPrimaryKey(['id']);
			$table->addUniqueIndex(['token'], 'rd_assets_token_idx');
			$table->addUniqueIndex(['timestamp'], 'rd_assets_timestamp_idx');
		}
		return $schema;
	}

}
