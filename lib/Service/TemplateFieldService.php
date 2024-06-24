<?php

namespace OCA\Richdocuments\Service;

use OCP\Files\Node;

class TemplateFieldService {
	public function __construct() {
	}

	public function extractFields(Node $file): ?array {
		// Hit Collabora API here?
		return [$file->getOwner()->getDisplayName()];
	}

	public function fillFields(Node $file, array $fieldValues) {
		
	}
}
