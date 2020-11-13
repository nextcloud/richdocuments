<?php

declare(strict_types=1);

namespace OCA\Richdocuments\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\SimpleMigrationStep;
use OCP\Migration\IOutput;

class Version30704Date20200626072306 extends SimpleMigrationStep {

	/**
	 * @param IOutput $output
	 * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	 * @param array $options
	 * @return null|ISchemaWrapper
	 */
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options) {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$table = $schema->getTable('richdocuments_wopi');

		if (!$table->hasColumn('template_id')) {
			$table->addColumn('template_id', 'bigint', [
				'notnull' => false,
				'length' => 20,
			]);
		}

		if (!$table->hasColumn('hide_download')) {
			$table->addColumn('hide_download', 'boolean', [
				// 'notnull' => true,
				'notnull' => false,
				'default' => false,
			]);
		}

		if (!$table->hasColumn('share')) {
			$table->addColumn('share', 'string', [
				'notnull' => false,
				'length' => 64
			]);
		}

		if (!$table->hasColumn('direct')) {
			$table->addColumn('direct', 'boolean', [
				// 'notnull' => true,
				'notnull' => false,
				'default' => false,
			]);
		}
		if (!$table->hasColumn('is_remote_token')) {
			$table->addColumn('is_remote_token', 'boolean', [
				// 'notnull' => true,
				'notnull' => false,
				'default' => false,
			]);
		}

		if (!$table->hasColumn('remote_server')) {
			$table->addColumn('remote_server', 'string', [
				// 'notnull' => true,
				'notnull' => false,
				'default' => '',
			]);

		}
		if (!$table->hasColumn('remote_server_token')) {
			$table->addColumn('remote_server_token', 'string', [
				// 'notnull' => true,
				'notnull' => false,
				'length' => 32,
				'default' => '',
			]);
		}


		return $schema;
	}
}
