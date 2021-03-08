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

use OCP\Http\Client\IClientService;
use OCP\ICache;
use OCP\ICacheFactory;
use OCP\IConfig;

class DiscoveryManager {

	/** @var IClientService */
	private $clientService;
	/** @var ICache */
	private $cache;
	/** @var IConfig */
	private $config;

	/** @var string */
	private $discovery;

	public function __construct(IClientService $clientService,
								ICacheFactory $cacheFactory,
								IConfig $config) {
		$this->clientService = $clientService;
		$this->cache = $cacheFactory->createDistributed('richdocuments');
		$this->config = $config;
	}

	public function get() {
		if ($this->discovery) {
			return $this->discovery;
		}

		$this->discovery = $this->cache->get('discovery');
		if (!$this->discovery) {
			$response = $this->fetchFromRemote();
			$responseBody = $response->getBody();
			$this->discovery = $responseBody;
			$this->cache->set('discovery', $this->discovery, 3600);
		}

		return $this->discovery;
	}

	/**
	 * @return \OCP\Http\Client\IResponse
	 * @throws \Exception
	 */
	public function fetchFromRemote() {
		$remoteHost = $this->config->getAppValue('richdocuments', 'wopi_url');
		$wopiDiscovery = rtrim($remoteHost, '/') . '/hosting/discovery';

		$client = $this->clientService->newClient();
		$options = ['timeout' => 45, 'nextcloud' => ['allow_local_address' => true]];

		if ($this->config->getAppValue('richdocuments', 'disable_certificate_verification') === 'yes') {
			$options['verify'] = false;
		}

		if ($this->isProxyStarting($wopiDiscovery))
			$options['timeout'] = 180;

		try {
			return $client->get($wopiDiscovery, $options);
		} catch (\Exception $e) {
			throw $e;
		}
	}

	public function refetch() {
		$this->cache->remove('discovery');
		$this->discovery = null;
	}

	/**
	 * @return boolean indicating if proxy.php is in initialize or false otherwise
	 */
	private function isProxyStarting($url) {
		$usesProxy = false;
		$proxyPos = strrpos($url, 'proxy.php');
		if ($proxyPos === false)
			$usesProxy = false;
		else
			$usesProxy = true;

		if ($usesProxy === true) {
			$statusUrl = substr($url, 0, $proxyPos);
			$statusUrl = $statusUrl . 'proxy.php?status';

			$client = $this->clientService->newClient();
			$options = ['timeout' => 5, 'nextcloud' => ['allow_local_address' => true]];

			if ($this->config->getAppValue('richdocuments', 'disable_certificate_verification') === 'yes') {
				$options['verify'] = false;
			}

			try {
				$response = $client->get($statusUrl, $options);

				if ($response->getStatusCode() === 200) {
					$body = json_decode($response->getBody(), true);

					if ($body['status'] === 'starting'
						|| $body['status'] === 'stopped'
						|| $body['status'] === 'restarting') {
						return true;
					}
				}
			} catch (\Exception $e) {
				// ignore
			}
		}

		return false;
	}
}
