<?php

declare(strict_types=1);

namespace OCA\Richdocuments\Migration;

use Closure;
use Doctrine\DBAL\Platforms\SqlitePlatform;
use Doctrine\DBAL\Types\Type;
use Doctrine\DBAL\Types\Types;
use OCP\DB\ISchemaWrapper;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version30709Date20201112083317 extends SimpleMigrationStep {

	private $isSqlite;

	public function __construct(IDBConnection $connection) {
		$this->isSqlite = $connection->getDatabasePlatform() instanceof SqlitePlatform;
	}

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options) {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$this->convertToBigInt($schema, 'richdocuments_wopi', 'id');
		$this->convertToBigInt($schema, 'richdocuments_wopi', 'fileid');
		$this->convertToBigInt($schema, 'richdocuments_wopi', 'version');
		$this->convertToBigInt($schema, 'richdocuments_wopi', 'template_id');
		$this->convertToBigInt($schema, 'richdocuments_wopi', 'template_destination');
		$this->convertToBigInt($schema, 'richdocuments_wopi', 'expiry');

		$this->convertToBigInt($schema, 'richdocuments_direct', 'id');
		$this->convertToBigInt($schema, 'richdocuments_direct', 'fileid');
		$this->convertToBigInt($schema, 'richdocuments_direct', 'template_id');
		$this->convertToBigInt($schema, 'richdocuments_direct', 'template_destination');
		$this->convertToBigInt($schema, 'richdocuments_direct', 'timestamp');

		$this->convertToBigInt($schema, 'richdocuments_assets', 'id');
		$this->convertToBigInt($schema, 'richdocuments_assets', 'fileid');
		$this->convertToBigInt($schema, 'richdocuments_assets', 'timestamp');

		return $schema;
	}

	public function convertToBigInt(ISchemaWrapper $schema, $tableName, $column) {
		$table = $schema->getTable($tableName);
		$column = $table->getColumn($column);
		$isAutoIncrement = $column->getAutoincrement();
		$isAutoIncrementOnSqlite = $this->isSqlite && $isAutoIncrement;
		if ($column->getType()->getName() !== Types::BIGINT && !$isAutoIncrementOnSqlite) {
			$column->setType(Type::getType(Types::BIGINT));
			$column->setOptions(['length' => 20]);
			$column->setUnsigned(true);
		}
	}
}
