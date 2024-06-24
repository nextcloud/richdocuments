<?php

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Service;

use OCP\Files\Node;

class TemplateFieldService {
	public function __construct() {
	}

	public function extractFields(Node $file): ?array {
		// Hit Collabora API here?
		return [];
	}

	public function fillFields(Node $file, array $fieldValues) {
		
	}
}
