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

		return $schema;
	}

}
