<?php

declare(strict_types=1);

/**
 * @copyright Copyright (c) 2022 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */


namespace OCA\Richdocuments\Service;

use OCA\Richdocuments\Capabilities;
use OCP\Files\File;
use OCP\Http\Client\IClientService;
use OCP\IConfig;
use Psr\Log\LoggerInterface;

/**
 * @api
 * @since 26.0.0
 */
class ConvertService {
	private IClientService $clientService;
	private IConfig $config;
	private LoggerInterface $logger;
	private array $capabilitites;

	/**
	 * @internal
	 */
	public function __construct(IClientService $clientService, IConfig $config, Capabilities $capabilities, LoggerInterface $logger) {
		$this->clientService = $clientService;
		$this->config = $config;
		$this->capabilitites = $capabilities->getCapabilities()['richdocuments'] ?? [];
		$this->logger = $logger;
	}

	private function getWopiURL() {
		return $this->config->getAppValue('richdocuments', 'wopi_url');
	}

	public function isAvailable() {
		if (isset($this->capabilitites['collabora']['convert-to']['available'])) {
			return (bool)$this->capabilitites['collabora']['convert-to']['available'];
		}
		return false;
	}

	public function convertFile(File $file, string $format = 'png') {
		$useTempFile = $file->isEncrypted() || !$file->getStorage()->isLocal();
		if ($useTempFile) {
			$fileName = $file->getStorage()->getLocalFile($file->getInternalPath());
			$stream = fopen($fileName, 'r');
		} else {
			$stream = $file->fopen('r');
		}
		$client = $this->clientService->newClient();
		$options = [
			'timeout' => 25,
			'verify' => $this->config->getAppValue('richdocuments', 'disable_certificate_verification') === 'yes',
			'multipart' => [
				['name' => $file->getName(), 'contents' => $stream]
			]
		];

		try {
			$response = $client->post($this->getWopiURL(). '/lool/convert-to/' . $format, $options);
		} catch (\Exception $e) {
			$this->logger->info($e, [
				'message' => 'Failed to convert file to ' . $format,
			]);
			return false;
		}
		return $response->getBody();
	}
}
