<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version9000Date20250128212050 extends SimpleMigrationStep {

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();
		if (!$schema->hasTable('richdocuments_wopi')) {
			return null;
		}

		$table = $schema->getTable('richdocuments_wopi');
		if (!$table->hasColumn('guest_displayname')) {
			return null;
		}

		$column = $table->getColumn('guest_displayname');
		if ($column->getLength() === 255) {
			return null;
		}

		$column->setLength(255);
		return $schema;
	}
}
