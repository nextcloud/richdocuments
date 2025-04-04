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
use OCP\TaskProcessing\EShapeType;
use OCP\TaskProcessing\ISynchronousProvider;
use OCP\TaskProcessing\ShapeDescriptor;
use OCP\TaskProcessing\ShapeEnumValue;

class TextToSpreadsheetProvider implements ISynchronousProvider {
	public const DEFAULT_TARGET_FORMAT = 'xlsx';

	public function __construct(
		private DocumentGenerationService $documentGenerationService,
		private IL10N $l,
	) {
	}

	public function getId(): string {
		return Application::APPNAME . '-spreadsheet_generator';
	}

	public function getName(): string {
		return $this->l->t('Nextcloud Office spreadsheet generator');
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
		return [
			'target_format' => self::DEFAULT_TARGET_FORMAT,
		];
	}

	public function getOptionalInputShape(): array {
		return [
			'target_format' => new ShapeDescriptor(
				$this->l->t('Document format'),
				$this->l->t('The format of the generated document'),
				EShapeType::Enum
			),
		];
	}

	public function getOptionalInputShapeEnumValues(): array {
		return [
			'target_format' => [
				new ShapeEnumValue($this->l->t('OpenXML (xlsx)'), 'xlsx'),
				new ShapeEnumValue($this->l->t('OpenDocument (ods)'), 'ods'),
			],
		];
	}

	public function getOptionalInputShapeDefaults(): array {
		return [
			'target_format' => self::DEFAULT_TARGET_FORMAT,
		];
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

		$targetFormat = self::DEFAULT_TARGET_FORMAT;
		if (isset($input['target_format']) && is_string($input['target_format']) && in_array($input['target_format'], ['xlsx', 'ods'], true)) {
			$targetFormat = $input['target_format'];
		}

		$fileContent = $this->documentGenerationService->generateSpreadsheetDocument(
			$userId,
			$input['text'],
			$targetFormat,
		);

		return [
			'file' => $fileContent,
		];
	}
}
