<?php

declare(strict_types=1);

namespace OCA\Richdocuments\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version30717Date20210310164901 extends SimpleMigrationStep {

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$table = $schema->getTable('richdocuments_wopi');

		if (!$table->hasColumn('token_type')) {
			$table->addColumn('token_type', 'integer', [
				'notnull' => false,
				'length' => 4,
				'default' => 0,
			]);
		}
		if ($table->hasColumn('is_remote_token')) {
			$table->dropColumn('is_remote_token');
		}

		$table = $schema->getTable('richdocuments_direct');

		if (!$table->hasColumn('share')) {
			$table->addColumn('share', 'string', [
				'notnull' => false,
				'length' => 64
			]);
		}
		if (!$table->hasColumn('initiator_host')) {
			$table->addColumn('initiator_host', 'string', [
				'notnull' => false,
				'length' => 255
			]);
		}
		if (!$table->hasColumn('initiator_token')) {
			$table->addColumn('initiator_token', 'string', [
				'notnull' => false,
				'length' => 64
			]);
		}

		return $schema;
	}

}
