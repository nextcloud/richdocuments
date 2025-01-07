<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Conversion;

use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\Service\RemoteService;
use OCP\Conversion\ConversionMimeTuple;
use OCP\Conversion\IConversionProvider;
use OCP\Files\File;

class ConversionProvider implements IConversionProvider {
	public const MIME_EXTENSION_MAP = [
		'application/word' => 'doc',
		'application/vnd.ms-powerpoint' => 'ppt',
		'application/vnd.visio' => 'vsd',
		'application/vnd.ms-excel' => 'xls',

		'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'docx',
		'application/vnd.openxmlformats-officedocument.presentationml.presentation' => 'pptx',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' => 'xlsx',

		'application/vnd.oasis.opendocument.text' => 'odt',
		'application/vnd.oasis.opendocument.presentation' => 'odp',
		'application/vnd.oasis.opendocument.spreadsheet' => 'ods',
		'application/vnd.oasis.opendocument.graphics' => 'odg',

		'application/vnd.oasis.opendocument.text-template' => 'ott',
		'application/vnd.oasis.opendocument.presentation-template' => 'otp',
		'application/vnd.oasis.opendocument.spreadsheet-template' => 'ots',
		'application/vnd.oasis.opendocument.graphics-template' => 'otg',

		'application/pdf' => 'pdf',
	];

	public function __construct(
		private RemoteService $remoteService,
	) {
	}

	public function getName(): string {
		return Application::APPNAME;
	}

	public function getSupportedMimeTypes(): array {
		$textToPdf = new ConversionMimeTuple('application/vnd.oasis.opendocument.text', [
			'application/pdf',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		]
		);

		return [$textToPdf];
	}

	public function convertFile(File $file, string $targetMimeType): mixed {
		if (array_key_exists($targetMimeType, self::MIME_EXTENSION_MAP)) {
			$targetFileExtension = self::MIME_EXTENSION_MAP[$targetMimeType];

			return $this->remoteService->convertFileTo($file, $targetFileExtension);
		}

		throw new \Exception("Unable to convert file to MIME type '{$targetMimeType}'");
	}
}
