<?php
/**
 * @copyright Copyright (c) 2020 Julius Härtl <jus@bitgrid.net>
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
 *
 */

namespace OCA\Richdocuments\Service;

use OCP\Http\Client\IClientService;
use OCP\ICache;

class DemoService {

	/**
	 * @var ICache
	 */
	private $cache;
	/**
	 * @var IClientService
	 */
	private $clientService;

	public function __construct(ICache $cache, IClientService $clientService) {
		$this->cache = $cache;
		$this->clientService = $clientService;
	}

	public function fetchDemoServers($refresh = false) {
		$servers = $this->cache->get('richdocuments-demo');
		if (!$refresh) {
			return json_decode($servers, true);
		}
		$demoServerList = 'https://col.la/nextclouddemoservers';
		$client = $this->clientService->newClient();
		try {
			$response = $client->get($demoServerList);
			$servers = json_decode($response->getBody(), true)['servers'] ?? [];
		} catch (\Exception $e) {
			$servers = [];
		}
		$this->cache->set('richdocuments-demo', json_encode($servers));
		return $servers;
	}

}
