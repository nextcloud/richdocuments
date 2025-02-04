<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Conversion;

use OCA\Richdocuments\Service\RemoteService;
use OCP\Files\Conversion\ConversionMimeProvider;
use OCP\Files\Conversion\IConversionProvider;
use OCP\Files\File;
use OCP\IL10N;
use OCP\L10N\IFactory;
use Psr\Log\LoggerInterface;

class ConversionProvider implements IConversionProvider {
	private IL10N $l10n;

	private const MIME_TYPES = [
		'documents' => [
			'doc' => 'application/msword',
			'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			'dotx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
			'ott' => 'application/vnd.oasis.opendocument.text-template',
			'odt' => 'application/vnd.oasis.opendocument.text',
		],
		'sheets' => [
			'xls' => 'application/vnd.ms-excel',
			'xlsx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'xltx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
			'ods' => 'application/vnd.oasis.opendocument.spreadsheet',
			'ots' => 'application/vnd.oasis.opendocument.spreadsheet-template',
		],
		'presentations' => [
			'ppt' => 'application/vnd.ms-powerpoint',
			'pptx' => 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
			'potx' => 'application/vnd.openxmlformats-officedocument.presentationml.template',
			'odp' => 'application/vnd.oasis.opendocument.presentation',
			'otp' => 'application/vnd.oasis.opendocument.presentation-template',
		],
		'drawings' => [
			'vsdx' => 'application/vnd.visio',
			'odg' => 'application/vnd.oasis.opendocument.graphics',
			'otg' => 'application/vnd.oasis.opendocument.graphics-template',
		],
	];

	public function __construct(
		private RemoteService $remoteService,
		private LoggerInterface $logger,
		IFactory $l10nFactory,
	) {
		$this->l10n = $l10nFactory->get('richdocuments');
	}

	public function getSupportedMimeTypes(): array {
		$documents = self::MIME_TYPES['documents'];
		$sheets = self::MIME_TYPES['sheets'];
		$presentations = self::MIME_TYPES['presentations'];
		$drawings = self::MIME_TYPES['drawings'];

		$pdfConversions = array_merge(
			[],
			self::MIME_TYPES['documents'],
			self::MIME_TYPES['sheets'],
			self::MIME_TYPES['presentations'],
			self::MIME_TYPES['drawings'],
		);

		$documentConversions = [
			// OpenDocument Text to Word Document
			'docx' => [$documents['odt']],

			// Word Document to OpenDocument Text
			'odt' => [$documents['doc'], $documents['docx']],

			// Documents to Rich Text Format
			'rtf' => [$documents['odt'], $documents['doc'], $documents['docx']],

			// Documents to text
			'txt' => [$documents['odt'], $documents['doc'], $documents['docx']],
		];

		$spreadsheetConversions = [
			// OpenDocument Spreadsheet to Excel Workbook
			'xlsx' => [$sheets['ods']],

			// Excel Workbook to OpenDocument Spreadsheet
			'ods' => [$sheets['xls'], $sheets['xlsx']],
		];

		$presentationConversions = [
			// OpenDocument Presentation to PowerPoint Presentation
			'pptx' => [$presentations['odp']],

			// PowerPoint Presentation to OpenDocument Presentation
			'odp' => [$presentations['ppt'], $presentations['pptx']],
		];

		$drawingConversions = [
			// OpenDocument Drawing to Portable Network Graphics
			'png' => [$drawings['odg']],

			// OpenDocument Drawing to Scalable Vector Graphics
			'svg' => [$drawings['odg']],
		];

		return [
			// PDF conversions
			...$this->getMimeProvidersFor($pdfConversions, 'application/pdf'),

			// Document conversions
			...$this->getMimeProvidersFor($documentConversions['docx'], $documents['docx']),
			...$this->getMimeProvidersFor($documentConversions['odt'], $documents['odt']),
			...$this->getMimeProvidersFor($documentConversions['rtf'], 'application/rtf'),
			...$this->getMimeProvidersFor($documentConversions['txt'], 'text/plain'),

			// Spreadsheet conversions
			...$this->getMimeProvidersFor($spreadsheetConversions['xlsx'], $sheets['xlsx']),
			...$this->getMimeProvidersFor($spreadsheetConversions['ods'], $sheets['ods']),

			// Presentation conversions
			...$this->getMimeProvidersFor($presentationConversions['pptx'], $presentations['pptx']),
			...$this->getMimeProvidersFor($presentationConversions['odp'], $presentations['odp']),

			// Drawing conversions
			...$this->getMimeProvidersFor($drawingConversions['png'], 'image/png'),
			...$this->getMimeProvidersFor($drawingConversions['svg'], 'image/svg+xml'),
		];
	}

	public function convertFile(File $file, string $targetMimeType): mixed {
		$targetFileExtension = $this->getExtensionForMimeType($targetMimeType);
		if ($targetFileExtension === null) {
			throw new \Exception($this->l10n->t(
				'Unable to determine the proper file extension for %1$s',
				[$targetMimeType]
			));
		}

		return $this->remoteService->convertFileTo($file, $targetFileExtension);
	}

	private function getMimeProvidersFor(array $inputMimeTypes, string $outputMimeType): array {
		$outputMimeInfo = $this->getMimeInfoFor($outputMimeType);
		if ($outputMimeInfo === null) {
			$this->logger->error(
				/*
				 * TRANSLATORS
				 * Shows the MIME type of the file (the file type)
				 * For example:
				 *    - application/pdf     (.pdf)
				 *    - application/msword  (.doc)
				 *    - text/plain          (.txt)
				 */
				$this->l10n->t('Unable to fetch information on %1$s',
					[$outputMimeType]
				));
			throw new \Exception();
		}

		$conversionMimeProviders = [];
		foreach ($inputMimeTypes as $mimeType) {
			$conversionMimeProviders[] = new ConversionMimeProvider(
				$mimeType,
				...$outputMimeInfo
			);
		}

		return $conversionMimeProviders;
	}

	private function getMimeInfoFor(string $targetMimeType): ?array {
		foreach ($this->getTargetMimeTypes() as $mimeType => $mimeInfo) {
			if ($mimeType === $targetMimeType) {
				return [
					'to' => $mimeType,
					'extension' => $mimeInfo['extension'],
					'displayName' => $mimeInfo['displayName'],
				];
			}
		}

		return null;
	}

	private function getTargetMimeTypes(): array {
		$documents = self::MIME_TYPES['documents'];
		$sheets = self::MIME_TYPES['sheets'];
		$presentations = self::MIME_TYPES['presentations'];

		return [
			'application/pdf' => [
				'extension' => 'pdf',
				'displayName' => $this->l10n->t('PDF (.pdf)'),
			],
			'image/png' => [
				'extension' => 'png',
				'displayName' => $this->l10n->t('Image (.png)'),
			],
			'image/svg+xml' => [
				'extension' => 'svg',
				'displayName' => $this->l10n->t('Image (.svg)'),
			],
			'application/rtf' => [
				'extension' => 'rtf',
				'displayName' => $this->l10n->t('Text (.rtf)'),
			],
			'text/plain' => [
				'extension' => 'txt',
				'displayName' => $this->l10n->t('Text (.txt)'),
			],
			$documents['docx'] => [
				'extension' => 'docx',
				'displayName' => $this->l10n->t('Word Document (.docx)'),
			],
			$documents['odt'] => [
				'extension' => 'odt',
				'displayName' => $this->l10n->t('OpenDocument Text (.odt)'),
			],
			$sheets['xlsx'] => [
				'extension' => 'xlsx',
				'displayName' => $this->l10n->t('Excel Workbook (.xlsx)'),
			],
			$sheets['ods'] => [
				'extension' => 'ods',
				'displayName' => $this->l10n->t('OpenDocument Spreadsheet (.ods)'),
			],
			$presentations['pptx'] => [
				'extension' => 'pptx',
				'displayName' => $this->l10n->t('PowerPoint Presentation (.pptx)'),
			],
			$presentations['odp'] => [
				'extension' => 'odp',
				'displayName' => $this->l10n->t('OpenDocument Presentation (.odp)'),
			],
		];
	}

	private function getExtensionForMimeType(string $mimeType): ?string {
		foreach ($this->getTargetMimeTypes() as $targetMimeType => $targetMimeInfo) {
			if ($targetMimeType === $mimeType) {
				return $targetMimeInfo['extension'];
			}
		}

		return null;
	}
}
