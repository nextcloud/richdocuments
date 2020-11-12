<?php

declare(strict_types=1);

namespace OCA\Richdocuments\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version2060Date20200302132145 extends SimpleMigrationStep
{

	/**
	 * @param IOutput $output
	 * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	 * @param array $options
	 * @return null|ISchemaWrapper
	 */
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options)
	{
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$table = $schema->getTable('richdocuments_wopi');
		if (!$table->hasColumn('share')) {
			$table->addColumn('share', 'string', [
				'notnull' => false,
				'length' => 64
			]);
		}

		return $schema;
	}

}
