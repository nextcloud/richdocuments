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

use OC\Preview\Provider;
use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Capabilities;
use OCP\Http\Client\IClientService;
use OCP\IConfig;
use OCP\ILogger;
use OCP\Image;
use Psr\Log\LoggerInterface;

abstract class Office extends Provider {
	public function __construct(private IClientService $clientService, private AppConfig $config, Capabilities $capabilities, private LoggerInterface $logger) {
		parent::__construct();

		$this->capabilitites = $capabilities->getCapabilities()['richdocuments'] ?? [];
	}

	private function getWopiURL() {
		return $this->config->getAppValue('richdocuments', 'wopi_url');
	}

	public function isAvailable(\OCP\Files\FileInfo $file) {
		if (isset($this->capabilitites['collabora']['convert-to']['available'])) {
			return (bool)$this->capabilitites['collabora']['convert-to']['available'];
		}
		return false;
	}

	/**
	 * {@inheritDoc}
	 */
	public function getThumbnail($path, $maxX, $maxY, $scalingup, $fileview) {
		$fileInfo = $fileview->getFileInfo($path);
		if (!$fileInfo || $fileInfo->getSize() === 0) {
			return false;
		}

		$useTempFile = $fileInfo->isEncrypted() || !$fileInfo->getStorage()->isLocal();
		if ($useTempFile) {
			$fileName = $fileview->toTmpFile($path);
			$stream = fopen($fileName, 'r');
		} else {
			$stream = $fileview->fopen($path, 'r');
		}

		$client = $this->clientService->newClient();
		$options = [
			'timeout' => 25,
			// FIXME: Can be removed once https://github.com/CollaboraOnline/online/issues/6983 is fixed upstream
			'expect' => false,
		];

		if ($this->config->getAppValue('richdocuments', 'disable_certificate_verification') === 'yes') {
			$options['verify'] = false;
		}

		$options['multipart'] = [['name' => $path, 'contents' => $stream]];

		try {
			$response = $client->post($this->config->getCollaboraUrlInternal() . '/cool/convert-to/png', $options);
		} catch (\Exception $e) {
			$this->logger->info('Failed to convert preview: ' . $e->getMessage(), ['exception' => $e]);
			return false;
		}

		$image = new Image();
		$image->loadFromData($response->getBody());

		if ($image->valid()) {
			$image->scaleDownToFit($maxX, $maxY);
			return $image;
		}
		return false;
	}
}
