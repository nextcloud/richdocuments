<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\Richdocuments\TaskProcessing;

use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\Service\DocumentGenerationService;
use OCP\IL10N;
use OCP\TaskProcessing\ISynchronousProvider;

class TextToSpreadsheetProvider implements ISynchronousProvider {

	public function __construct(
		private DocumentGenerationService $documentGenerationService,
		private IL10N $l10n,
	) {
	}

	public function getId(): string {
		return Application::APPNAME . '-spreadsheet_generator';
	}

	public function getName(): string {
		return $this->l10n->t('Nextcloud Office spreadsheet generator');
	}

	public function getTaskTypeId(): string {
		return TextToSpreadsheetTaskType::ID;
	}

	public function getExpectedRuntime(): int {
		return 120;
	}

	public function getInputShapeEnumValues(): array {
		return [];
	}

	public function getInputShapeDefaults(): array {
		return [];
	}

	public function getOptionalInputShape(): array {
		return [];
	}

	public function getOptionalInputShapeEnumValues(): array {
		return [];
	}

	public function getOptionalInputShapeDefaults(): array {
		return [];
	}

	public function getOutputShapeEnumValues(): array {
		return [];
	}

	public function getOptionalOutputShape(): array {
		return [];
	}

	public function getOptionalOutputShapeEnumValues(): array {
		return [];
	}
	/**
	 * @inheritDoc
	 */
	public function process(?string $userId, array $input, callable $reportProgress): array {
		if ($userId === null) {
			throw new \RuntimeException('User ID is required to process the prompt.');
		}

		if (!isset($input['text']) || !is_string($input['text'])) {
			throw new \RuntimeException('Invalid input, expected "text" key with string value');
		}

		$fileContent = $this->documentGenerationService->generateSpreadsheetDocument(
			$userId,
			$input['text'],
		);

		return [
			'file' => $fileContent,
		];
	}
}
