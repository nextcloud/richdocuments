<?php
/**
 * @copyright Copyright (c) 2016 Lukas Reschke <lukas@statuscode.ch>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Richdocuments\WOPI;

use OCP\AppFramework\Utility\ITimeFactory;
use OCP\Files\IAppData;
use OCP\Files\NotFoundException;
use OCP\Files\SimpleFS\ISimpleFolder;
use OCP\Http\Client\IClientService;
use OCP\IConfig;
use OCP\IL10N;

class DiscoveryManager {
	/** @var IClientService */
	private $clientService;
	/** @var ISimpleFolder */
	private $appData;
	/** @var IConfig */
	private $config;
	/** @var IL10N */
	private $l10n;
	/** @var ITimeFactory */
	private $timeFactory;

	/**
	 * @param IClientService $clientService
	 * @param IAppData $appData
	 * @param IConfig $config
	 * @param IL10N $l10n
	 * @param ITimeFactory $timeFactory
	 */
	public function __construct(IClientService $clientService,
								IAppData $appData,
								IConfig $config,
								IL10N $l10n,
								ITimeFactory $timeFactory) {
		$this->clientService = $clientService;
		try {
			$this->appData = $appData->getFolder('richdocuments');
		} catch (NotFoundException $e) {
			$this->appData = $appData->newFolder('richdocuments');
		}
		$this->config = $config;
		$this->timeFactory = $timeFactory;
	}

	public function get() {
		// First check if there is a local valid discovery file
		try {
			$file = $this->appData->getFile('discovery.xml');
			$decodedFile = json_decode($file->getContent(), true);
			if($decodedFile['timestamp'] + 3600 > $this->timeFactory->getTime()) {
				return $decodedFile['data'];
			}
		} catch (NotFoundException $e) {
			$file = $this->appData->newFile('discovery.xml');
		}

		$response = $this->fetchFromRemote();

		$responseBody = $response->getBody();
		$file->putContent(
			json_encode([
				'data' => $responseBody,
				'timestamp' => $this->timeFactory->getTime(),
			])
		);
		return $responseBody;
	}

	/**
	 * @return \OCP\Http\Client\IResponse
	 * @throws \Exception
	 */
	public function fetchFromRemote() {
		$remoteHost = $this->config->getAppValue('richdocuments', 'wopi_url');
		$wopiDiscovery = $remoteHost . '/hosting/discovery';

		$client = $this->clientService->newClient();
		$options = ['timeout' => 5];

		if ($this->config->getAppValue('richdocuments', 'disable_certificate_verification') === 'yes') {
			$options['verify'] = false;
		}

		try {
			return $client->get($wopiDiscovery, $options);
		} catch (\Exception $e) {
			throw $e;
		}
	}

	public function refretch() {
		try {
			$this->appData->getFile('discovery.xml')->delete();
		} catch(\Exception $e) {}
	}
}
