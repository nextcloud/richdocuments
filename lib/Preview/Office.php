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

use GuzzleHttp\Psr7\LimitStream;
use function GuzzleHttp\Psr7\stream_for;
use OC\Preview\Provider;
use OCA\Richdocuments\Capabilities;
use OCP\Http\Client\IClientService;
use OCP\IConfig;
use OCP\ILogger;
use OCP\Image;

abstract class Office extends Provider {

	/** @var IClientService */
	private $clientService;

	/** @var IConfig */
	private $config;

	/** @var array */
	private $capabilitites;

	/** @var ILogger */
	private $logger;

	public function __construct(IClientService $clientService, IConfig $config, Capabilities $capabilities, ILogger $logger) {
		parent::__construct();
		$this->clientService = $clientService;
		$this->config = $config;
		$this->capabilitites = $capabilities->getCapabilities()['richdocuments'] ?? [];
		$this->logger = $logger;
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
		$options = ['timeout' => 25];

		if ($this->config->getAppValue('richdocuments', 'disable_certificate_verification') === 'yes') {
			$options['verify'] = false;
		}

		$options['multipart'] = [['name' => $path, 'contents' => $stream]];

		try {
			$response = $client->post($this->getWopiURL(). '/lool/convert-to/png', $options);
		} catch (\Exception $e) {
			$this->logger->logException($e, [
				'message' => 'Failed to convert file to preview',
				'level' => ILogger::INFO,
				'app' => 'richdocuments',
			]);
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
