<?php
/**
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
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


use OCA\Federation\TrustedServers;
use OCA\Files_Sharing\External\Storage as SharingExternalStorage;
use OCA\Richdocuments\TokenManager;
use OCP\AppFramework\Http\RedirectResponse;
use OCP\AppFramework\QueryException;
use OCP\Files\File;
use OCP\Files\InvalidPathException;
use OCP\Files\NotFoundException;
use OCP\Http\Client\IClientService;
use OCP\ICache;
use OCP\ICacheFactory;
use OCP\ILogger;

class FederationService {

	/** @var ICache */
	private $cache;
	/** @var IClientService */
	private $clientService;
	/** @var ILogger  */
	private $logger;
	/** @var TrustedServers */
	private $trustedServers;
	/** @var TokenManager */
	private $tokenManager;

	public function __construct(ICacheFactory $cacheFactory, IClientService $clientService, ILogger $logger, TokenManager $tokenManager) {
		$this->cache = $cacheFactory->createLocal('richdocuments_remote/');
		$this->clientService = $clientService;
		$this->logger = $logger;
		$this->tokenManager = $tokenManager;
		try {
			$this->trustedServers = \OC::$server->query( \OCA\Federation\TrustedServers::class);
		} catch (QueryException $e) {}
	}

	public function getRemoteCollaboraURL($remote) {
		if ($this->trustedServers === null || !$this->trustedServers->isTrustedServer($remote)) {
			$this->logger->info('Unable to determine collabora URL of remote server ' . $remote . ' - Remote is not a trusted server');
			return '';
		}
		if ($remoteCollabora = $this->cache->get('richdocuments_remote/' . $remote)) {
			return $remoteCollabora;
		}
		try {
			$client = $this->clientService->newClient();
			$response = $client->get($remote . '/ocs/v2.php/apps/richdocuments/api/v1/federation?format=json', ['timeout' => 5]);
			$data = \json_decode($response->getBody(), true);
			$remoteCollabora = $data['ocs']['data']['wopi_url'];
			$this->cache->set('richdocuments_remote/' . $remote, $remoteCollabora, 3600);
			return $remoteCollabora;
		} catch (\Throwable $e) {
			$this->logger->info('Unable to determine collabora URL of remote server ' . $remote);
			$this->cache->set('richdocuments_remote/' . $remote, '', 300);
		}
		return '';
	}

	public function getRemoteDirectUrl($remote, $shareToken, $filePath) {
		if ($this->getRemoteCollaboraURL() === '') {
			return '';
		}
		try {
			$client = $this->clientService->newClient();
			$response = $client->post($remote . '/ocs/v2.php/apps/richdocuments/api/v1/federation/direct?format=json', [
				'timeout' => 5,
				'body' => [
					'shareToken' => $shareToken,
					'filePath' => $filePath
				]
			]);
			$data = \json_decode($response->getBody(), true);
			return $data['ocs']['data'];
		} catch (\Throwable $e) {
			$this->logger->info('Unable to determine collabora URL of remote server ' . $remote);
		}
		return null;
	}

	public function getRemoteFileDetails($remote, $remoteToken) {
		if ($this->trustedServers === null || !$this->trustedServers->isTrustedServer($remote)) {
			$this->logger->info('Unable to determine collabora URL of remote server ' . $remote . ' - Remote is not a trusted server');
			return null;
		}
		try {
			$client = $this->clientService->newClient();
			$response = $client->post($remote . '/ocs/v2.php/apps/richdocuments/api/v1/federation?format=json', [
				'timeout' => 5,
				'body' => [
					'token' => $remoteToken
				]
			]);
			$data = \json_decode($response->getBody(), true);
			return $data['ocs']['data'];
		} catch (\Throwable $e) {
			$this->logger->info('Unable to determine collabora URL of remote server ' . $remote);
		}
		return null;
	}

	/**
	 * @param File $item
	 * @return string|null
	 * @throws NotFoundException
	 * @throws InvalidPathException
	 */
	public function getRemoteRedirectURL(File $item, $direct = null) {
		if ($item->getStorage()->instanceOfStorage(SharingExternalStorage::class)) {
			$remote = $item->getStorage()->getRemote();
			$remoteCollabora = $this->getRemoteCollaboraURL($remote);
			if ($remoteCollabora !== '') {
				if ($direct === null) {
					$wopi = $this->tokenManager->getRemoteToken($item);
				} else {
					$wopi = $this->tokenManager->getRemoteTokenFromDirect($item, $direct->getUid());
				}
				$url = $remote . 'index.php/apps/richdocuments/remote?shareToken=' . $item->getStorage()->getToken() .
					'&remoteServer=' . $wopi->getServerHost() .
					'&remoteServerToken=' . $wopi->getToken();
				if ($item->getInternalPath() !== '') {
					$url .= '&filePath=' . $item->getInternalPath();
				}
				return $url;
			}
			throw new NotFoundException('Failed to connect to remote collabora instance for ' . $item->getId());
		}
		return null;
	}
}
