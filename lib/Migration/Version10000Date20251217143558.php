<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Migration;

use Closure;
use Doctrine\DBAL\Types\Type;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;
use Override;

/**
 * Update version column in richdocuments_wopi table to support alphanumeric versions
 */
class Version10000Date20251217143558 extends SimpleMigrationStep {
	#[Override]
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('richdocuments_wopi')) {
			return null;
		}

		$table = $schema->getTable('richdocuments_wopi');

		if (!$table->hasColumn('version')) {
			return null;
		}

		$column = $table->getColumn('version');

		if ($column->getType()->getName() === 'string') {
			return null;
		}

		$table->changeColumn('version', [
			'type' => Type::getType('string'),
			'notnull' => false,
			'length' => 1024,
			'default' => '0',
		]);

		return $schema;
	}
}
