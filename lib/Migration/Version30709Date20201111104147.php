<?php

declare(strict_types=1);

namespace OCA\Richdocuments\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version30709Date20201111104147 extends SimpleMigrationStep {

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options) {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$result = $this->ensureColumnIsNullable($schema, 'richdocuments_wopi', 'version');
		$result = $this->ensureColumnIsNullable($schema, 'richdocuments_wopi', 'canwrite') || $result;
		$result = $this->ensureColumnIsNullable($schema, 'richdocuments_wopi', 'token') || $result;
		$result = $this->ensureColumnIsNullable($schema, 'richdocuments_wopi', 'hide_download') || $result;
		$result = $this->ensureColumnIsNullable($schema, 'richdocuments_wopi', 'direct') || $result;
		$result = $this->ensureColumnIsNullable($schema, 'richdocuments_wopi', 'is_remote_token') || $result;
		$result = $this->ensureColumnIsNullable($schema, 'richdocuments_wopi', 'remote_server') || $result;
		$result = $this->ensureColumnIsNullable($schema, 'richdocuments_wopi', 'remote_server_token') || $result;

		$result = $this->ensureColumnIsNullable($schema, 'richdocuments_direct', 'timestamp') || $result;
		$result = $this->ensureColumnIsNullable($schema, 'richdocuments_assets', 'timestamp') || $result;



		return $result ? $schema : null;
	}

	protected function ensureColumnIsNullable(ISchemaWrapper $schema, string $tableName, string $columnName): bool {
		$table = $schema->getTable($tableName);
		$column = $table->getColumn($columnName);

		if ($column->getNotnull()) {
			$column->setNotnull(false);
			return true;
		}

		return false;
	}
}
