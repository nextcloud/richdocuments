<?php
/**
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */
namespace OCA\Richdocuments\Preview;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Capabilities;
use OCA\Richdocuments\Service\RemoteService;
use OCP\Files\File;
use OCP\Files\FileInfo;
use OCP\IImage;
use OCP\Image;
use OCP\Preview\IProviderV2;
use Psr\Log\LoggerInterface;

abstract class Office implements IProviderV2 {
	private array $capabilities;

	public function __construct(
		private RemoteService $remoteService,
		private LoggerInterface $logger,
		private AppConfig $appConfig,
		Capabilities $capabilities,
	) {
		$this->capabilities = $capabilities->getCapabilities()['richdocuments'] ?? [];
	}

	public function isAvailable(FileInfo $file): bool {
		if (isset($this->capabilities['collabora']['convert-to']['available'])) {
			return (bool)$this->capabilities['collabora']['convert-to']['available'] && $this->appConfig->isPreviewGenerationEnabled();
		}
		return false;
	}

	public function getThumbnail(File $file, int $maxX, int $maxY): ?IImage {
		if ($file->getSize() === 0) {
			return null;
		}

		try {
			$response = $this->remoteService->convertFileTo($file, 'png');
			$image = new Image();
			$image->loadFromData($response);

			if ($image->valid()) {
				$image->scaleDownToFit($maxX, $maxY);
				return $image;
			}
		} catch (\Exception $e) {
			$this->logger->info('Failed to convert preview: ' . $e->getMessage(), ['exception' => $e]);
			return null;
		}

		return null;
	}
}
