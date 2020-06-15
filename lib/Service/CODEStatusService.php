<?php
/**
 * @copyright Copyright (c) 2020, Collabora Productivity <https://collaboraoffice.com>
 *
 * @author Muhammet Kara <muhammet.kara@collabora.com>
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

use OCP\Files\NotFoundException;
use OCP\Http\Client\IClientService;
use OCP\IConfig;

class CODEStatusService {

	/** @var IConfig */
	private $config;
	/** @var IClientService */
	private $clientService;

	public function __construct(IConfig $config, IClientService $clientService) {
		$this->config = $config;
		$this->clientService = $clientService;
	}

	public function checkCODEProxyStatus() {
		$remoteHost = $this->getCODEUrl();
		// This makes sense only if wopi_url is set to proxy.php location
		if ($remoteHost === '' || strpos($remoteHost, 'proxy.php?req=') === false) {
			\OC::$server->getLogger()->error('CODE Invalid wopi url');
			return [];
		}
		$remoteHost = substr($remoteHost, 0, strpos($remoteHost, '?'));
		$statusEndpoint = $remoteHost . '?status';

		$client = $this->clientService->newClient();
		$options = ['timeout' => 5, 'nextcloud' => ['allow_local_address' => true]];

		$options['verify'] = false;

		try {
			$response = $client->get($statusEndpoint, $options);
		} catch (\Exception $e) {
			\OC::$server->getLogger()->error('CODE proxy status check exception: ' . $e->getMessage());
			return [];
		}

		$responseBody = $response->getBody();
		$ret = \json_decode($responseBody, true);

		if (!is_array($ret)) {
			\OC::$server->getLogger()->error('CODE proxy status response is not valid JSON');
			return [];
		}

		return $ret;
	}

	public function getCODEUrl() {
		$urlGenerator = \OC::$server->getURLGenerator();
		$relativeUrl = $urlGenerator->linkTo('richdocumentscode', '') . 'proxy.php';
		$absoluteUrl = $urlGenerator->getAbsoluteURL($relativeUrl);
		$wopi_url = $absoluteUrl . '?req=';
		return $wopi_url;
	}
}
