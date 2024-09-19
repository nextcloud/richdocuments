<?php
/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Service;

use OCP\Http\Client\IClientService;
use OCP\ICache;

class DemoService {
	public function __construct(
		private ICache $cache,
		private IClientService $clientService,
	) {
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
		} catch (\Exception) {
			$servers = [];
		}
		$this->cache->set('richdocuments-demo', json_encode($servers));
		return $servers;
	}
}
