<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;
use Override;

/**
 * Widen owner_uid and editor_uid columns from varchar(64) to varchar(255) to support federated cloud IDs
 */
class Version10100Date20260226000000 extends SimpleMigrationStep {
	#[Override]
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();
		$changed = false;

		if ($schema->hasTable('richdocuments_wopi')) {
			$table = $schema->getTable('richdocuments_wopi');
			foreach (['owner_uid', 'editor_uid'] as $columnName) {
				if ($table->hasColumn($columnName) && $table->getColumn($columnName)->getLength() < 255) {
					$table->changeColumn($columnName, [
						'length' => 255,
					]);
					$changed = true;
				}
			}
		}

		return $changed ? $schema : null;
	}
}
