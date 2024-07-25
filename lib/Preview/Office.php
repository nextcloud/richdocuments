<?php
/**
 * @copyright Copyright (c) 2018, Collabora Productivity.
 *
 * @author Tor Lillqvist <tml@collabora.com>
 *
 * @license AGPL-3.0
 *
 * This code is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License, version 3,
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 *
 */
namespace OCA\Richdocuments\Preview;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Capabilities;
use OCA\Richdocuments\Service\RemoteOptionsService;
use OCP\Files\File;
use OCP\Files\FileInfo;
use OCP\Http\Client\IClientService;
use OCP\IImage;
use OCP\Image;
use OCP\Preview\IProviderV2;
use Psr\Log\LoggerInterface;

abstract class Office implements IProviderV2 {
	private array $capabilities;

	public function __construct(
		private IClientService $clientService,
		private AppConfig $config,
		Capabilities $capabilities,
		private LoggerInterface $logger,
	) {
		$this->capabilities = $capabilities->getCapabilities()['richdocuments'] ?? [];
	}

	public function isAvailable(FileInfo $file): bool {
		if (isset($this->capabilities['collabora']['convert-to']['available'])) {
			return (bool)$this->capabilities['collabora']['convert-to']['available'];
		}
		return false;
	}

	/**
	 * {@inheritDoc}
	 */
	public function getThumbnail(File $file, int $maxX, int $maxY): ?IImage {
		if ($file->getSize() === 0) {
			return null;
		}

		$useTempFile = $file->isEncrypted() || !$file->getStorage()->isLocal();
		if ($useTempFile) {
			$fileName = $file->getStorage()->getLocalFile($file->getInternalPath());
			$stream = fopen($fileName, 'r');
		} else {
			$stream = $file->fopen('r');
		}

		$client = $this->clientService->newClient();
		$options = RemoteOptionsService::getDefaultOptions();
		// FIXME: can be removed once https://github.com/CollaboraOnline/online/issues/6983 is fixed upstream
		$options['expect'] = false;

		if ($this->config->getAppValue('richdocuments', 'disable_certificate_verification') === 'yes') {
			$options['verify'] = false;
		}

		$options['multipart'] = [['name' => $file->getName(), 'contents' => $stream]];

		try {
			$response = $client->post($this->config->getCollaboraUrlInternal() . '/cool/convert-to/png', $options);
		} catch (\Exception $e) {
			$this->logger->info('Failed to convert preview: ' . $e->getMessage(), ['exception' => $e]);
			return null;
		}

		$image = new Image();
		$image->loadFromData($response->getBody());

		if ($image->valid()) {
			$image->scaleDownToFit($maxX, $maxY);
			return $image;
		}
		return null;
	}
}
