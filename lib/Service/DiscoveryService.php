<?php

declare(strict_types=1);

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

namespace OCA\Richdocuments\Service;

use Exception;
use OCP\PreConditionNotMetException;

class DiscoveryService extends BaseRemoteService {

	public function clear(): void {
		$this->clearCache('discovery');
	}

	public function get(): ?string {
		return $this->getCache('discovery');
	}

	/**
	 * @throws PreConditionNotMetException When there is no server configured
	 * @throws Exception When the request fails
	 */
	public function fetch(): void {
		$discoveryEndpoint = $this->getRemoteUrl('/hosting/discovery');
		if (!$discoveryEndpoint) {
			throw new PreConditionNotMetException('Not configured');
		}

		$client = $this->clientService->newClient();
		$options = $this->getRequestOptions();

		if ($this->isProxyStarting($discoveryEndpoint)) {
			$options['timeout'] = 180;
		}

		$startTime = microtime(true);
		$response = $client->get($discoveryEndpoint, $options);
		$duration = round(((microtime(true) - $startTime)), 3);
		$this->logger->info('Fetched discovery endpoint from ' . $discoveryEndpoint . ' in ' . $duration . ' seconds');

		$body = $response->getBody();

		$this->setCache('discovery', $body);
	}

	/**
	 * @return boolean indicating if proxy.php is in initialize or false otherwise
	 */
	private function isProxyStarting(string $url): bool {
		$proxyPos = strrpos($url, 'proxy.php');
		if ($proxyPos !== false) {
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
			} catch (Exception $e) {
				// ignore
			}
		}

		return false;
	}
}
