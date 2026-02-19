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
use OCP\TaskProcessing\ISynchronousWatermarkingProvider;
use OCP\TaskProcessing\ShapeDescriptor;
use OCP\TaskProcessing\ShapeEnumValue;

class TextToDocumentProvider implements ISynchronousWatermarkingProvider {
	public const DEFAULT_TARGET_FORMAT = 'docx';

	public function __construct(
		private DocumentGenerationService $documentGenerationService,
		private IL10N $l,
	) {
	}

	#[\Override]
	public function getId(): string {
		return Application::APPNAME . '-text_document_generator';
	}

	#[\Override]
	public function getName(): string {
		return $this->l->t('Nextcloud Office text document generator');
	}

	#[\Override]
	public function getTaskTypeId(): string {
		return TextToDocumentTaskType::ID;
	}

	#[\Override]
	public function getExpectedRuntime(): int {
		return 120;
	}

	#[\Override]
	public function getInputShapeEnumValues(): array {
		return [];
	}

	#[\Override]
	public function getInputShapeDefaults(): array {
		return [];
	}

	#[\Override]
	public function getOptionalInputShape(): array {
		return [
			'target_format' => new ShapeDescriptor(
				$this->l->t('Document format'),
				$this->l->t('The format of the generated document'),
				EShapeType::Enum
			),
		];
	}

	#[\Override]
	public function getOptionalInputShapeEnumValues(): array {
		return [
			'target_format' => [
				new ShapeEnumValue($this->l->t('OpenXML (docx)'), 'docx'),
				new ShapeEnumValue($this->l->t('OpenDocument (odt)'), 'odt'),
				new ShapeEnumValue($this->l->t('Portable Document Format (pdf)'), 'pdf'),
			],
		];
	}

	#[\Override]
	public function getOptionalInputShapeDefaults(): array {
		return [
			'target_format' => self::DEFAULT_TARGET_FORMAT,
		];
	}

	#[\Override]
	public function getOutputShapeEnumValues(): array {
		return [];
	}

	#[\Override]
	public function getOptionalOutputShape(): array {
		return [];
	}

	#[\Override]
	public function getOptionalOutputShapeEnumValues(): array {
		return [];
	}
	/**
	 * @inheritDoc
	 */
	#[\Override]
	public function process(?string $userId, array $input, callable $reportProgress, bool $includeWatermark = true): array {
		if ($userId === null) {
			throw new \RuntimeException('User ID is required to process the prompt.');
		}

		if (!isset($input['text']) || !is_string($input['text'])) {
			throw new \RuntimeException('Invalid input, expected "text" key with string value');
		}

		$targetFormat = self::DEFAULT_TARGET_FORMAT;
		if (isset($input['target_format']) && is_string($input['target_format']) && in_array($input['target_format'], ['docx', 'odt', 'pdf'], true)) {
			$targetFormat = $input['target_format'];
		}


		$fileContent = $this->documentGenerationService->generateTextDocument(
			$userId,
			$input['text'],
			$targetFormat,
			$includeWatermark
		);

		return [
			'file' => $fileContent,
		];
	}
}
