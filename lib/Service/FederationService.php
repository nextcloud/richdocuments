<?php

declare(strict_types=1);

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
use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Db\Direct;
use OCA\Richdocuments\Db\Wopi;
use OCA\Richdocuments\TokenManager;
use OCP\AutoloadNotAllowedException;
use OCP\Files\File;
use OCP\Files\InvalidPathException;
use OCP\Files\NotFoundException;
use OCP\Http\Client\IClientService;
use OCP\ICache;
use OCP\ICacheFactory;
use OCP\ILogger;
use OCP\IRequest;
use OCP\IURLGenerator;
use OCP\Share\IShare;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class FederationService {

	/** @var ICache */
	private $cache;
	/** @var IClientService */
	private $clientService;
	/** @var ILogger  */
	private $logger;
	/** @var TrustedServers */
	private $trustedServers;
	/** @var AppConfig */
	private $appConfig;
	/** @var TokenManager */
	private $tokenManager;
	/** @var IRequest */
	private $request;
	/** @var IURLGenerator */
	private $urlGenerator;

	public function __construct(ICacheFactory $cacheFactory, IClientService $clientService, ILogger $logger, TokenManager $tokenManager, AppConfig $appConfig, IRequest $request, IURLGenerator $urlGenerator) {
		$this->cache = $cacheFactory->createDistributed('richdocuments_remote/');
		$this->clientService = $clientService;
		$this->logger = $logger;
		$this->tokenManager = $tokenManager;
		$this->appConfig = $appConfig;
		$this->request = $request;
		$this->urlGenerator = $urlGenerator;
		try {
			$this->trustedServers = \OC::$server->get(\OCA\Federation\TrustedServers::class);
		} catch (NotFoundExceptionInterface $e) {
		} catch (ContainerExceptionInterface $e) {
		} catch (AutoloadNotAllowedException $e) {
		}
	}

	public function getTrustedServers(): array {
		if (!$this->trustedServers) {
			return [];
		}

		return array_map(function (array $server) {
			return $server['url'];
		}, $this->trustedServers->getServers());
	}

	/**
	 * @param $remote
	 * @return string
	 * @throws \Exception
	 */
	public function getRemoteCollaboraURL($remote) {
		// If no protocol is provided we default to https
		if (strpos($remote, 'http://') !== 0 && strpos($remote, 'https://') !== 0) {
			$remote = 'https://' . $remote;
		}

		if (!$this->isTrustedRemote($remote)) {
			throw new \Exception('Unable to determine collabora URL of remote server ' . $remote . ' - Remote is not a trusted server');
		}
		$remoteCollabora = $this->cache->get('richdocuments_remote/' . $remote);
		if ($remoteCollabora !== null) {
			return $remoteCollabora;
		}
		try {
			$client = $this->clientService->newClient();
			$response = $client->get($remote . '/ocs/v2.php/apps/richdocuments/api/v1/federation?format=json', ['timeout' => 30]);
			$data = \json_decode($response->getBody(), true);
			$remoteCollabora = $data['ocs']['data']['wopi_url'];
			$this->cache->set('richdocuments_remote/' . $remote, $remoteCollabora, 3600);
			return $remoteCollabora;
		} catch (\Throwable $e) {
			$this->logger->info('Unable to determine collabora URL of remote server ' . $remote, ['exception' => $e]);
			$this->cache->set('richdocuments_remote/' . $remote, '', 300);
		}
		return '';
	}

	public function isTrustedRemote($domainWithPort) {
		if (strpos($domainWithPort, 'http://') === 0 || strpos($domainWithPort, 'https://') === 0) {
			$port = parse_url($domainWithPort, PHP_URL_PORT);
			$domainWithPort = parse_url($domainWithPort, PHP_URL_HOST) . ($port ? ':' . $port : '');
		}

		if ($this->appConfig->isTrustedDomainAllowedForFederation() && $this->trustedServers !== null && $this->trustedServers->isTrustedServer($domainWithPort)) {
			return true;
		}

		$domain = $this->getDomainWithoutPort($domainWithPort);

		$trustedList = array_merge($this->appConfig->getGlobalScaleTrustedHosts(), [$this->request->getServerHost()]);
		if (!is_array($trustedList)) {
			return false;
		}

		foreach ($trustedList as $trusted) {
			if (!is_string($trusted)) {
				break;
			}
			$regex = '/^' . implode('[-\.a-zA-Z0-9]*', array_map(function ($v) {
					return preg_quote($v, '/');
				}, explode('*', $trusted))) . '$/i';
			if (preg_match($regex, $domain) || preg_match($regex, $domainWithPort)) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Strips a potential port from a domain (in format domain:port)
	 * @param string $host
	 * @return string $host without appended port
	 */
	private function getDomainWithoutPort($host) {
		$pos = strrpos($host, ':');
		if ($pos !== false) {
			$port = substr($host, $pos + 1);
			if (is_numeric($port)) {
				$host = substr($host, 0, $pos);
			}
		}
		return $host;
	}

	/** @return Wopi|null */
	public function getRemoteFileDetails(string $remote, string $remoteToken) {
		$cacheKey = md5($remote . $remoteToken);
		$remoteWopi = $this->cache->get($cacheKey);
		if ($remoteWopi !== null) {
			return Wopi::fromParams($remoteWopi);
		}

		if (!$this->isTrustedRemote($remote)) {
			$this->logger->info('COOL-Federation-Source: Unable to determine collabora URL of remote server ' . $remote . ' for token ' . $remoteToken . ' - Remote is not a trusted server');
			return null;
		}

		try {
			$this->logger->debug('COOL-Federation-Source: Fetching remote file details from ' . $remote . ' for token ' . $remoteToken);
			$client = $this->clientService->newClient();
			$response = $client->post($remote . '/ocs/v2.php/apps/richdocuments/api/v1/federation?format=json', [
				'timeout' => 30,
				'body' => [
					'token' => $remoteToken
				]
			]);
			$responseBody = $response->getBody();
			$data = \json_decode($responseBody, true, 512);
			$this->logger->debug('COOL-Federation-Source: Received remote file details for ' . $remoteToken . ' from ' . $remote . ': ' . json_encode($data['ocs']['data']));
			$this->cache->set($cacheKey, $data['ocs']['data']);
			return Wopi::fromParams($data['ocs']['data']);
		} catch (\Throwable $e) {
			$this->logger->logException($e, ['message' => 'COOL-Federation-Source: Unable to fetch remote file details for ' . $remoteToken . ' from ' . $remote ]);
		}
		return null;
	}

	/**
	 * @param File $item
	 * @return string|null
	 * @throws NotFoundException
	 * @throws InvalidPathException
	 */
	public function getRemoteRedirectURL(File $item, Direct $direct = null, IShare $share = null) {
		if (!$item->getStorage()->instanceOfStorage(SharingExternalStorage::class)) {
			return null;
		}

		$remote = $item->getStorage()->getRemote();
		$remoteCollabora = $this->getRemoteCollaboraURL($remote);
		if ($remoteCollabora !== '') {
			$shareToken = $share ? $share->getToken() : null;

			$wopi = $this->tokenManager->newInitiatorToken($remote, $item, $shareToken, ($direct !== null), ($direct ? $direct->getUid() : null));
			$initiatorServer = $this->urlGenerator->getAbsoluteURL('/');
			$initiatorToken = $wopi->getToken();

			/**
			 * If the request to open a file originates from a direct token we might need to fetch the initiator user details when the initiator wopi token is accessed
			 * as the user might origin on a 3rd instance
			 */
			if ($direct && !empty($direct->getInitiatorHost()) && !empty($direct->getInitiatorToken())) {
				$this->tokenManager->extendWithInitiatorUserToken($wopi, $direct->getInitiatorHost(), $direct->getInitiatorToken());
			}

			$url = rtrim($remote, '/') . '/index.php/apps/richdocuments/remote?shareToken=' . $item->getStorage()->getToken() .
				'&remoteServer=' . $initiatorServer .
				'&remoteServerToken=' . $initiatorToken;
			if ($item->getInternalPath() !== '') {
				$url .= '&filePath=' . $item->getInternalPath();
			}
			return $url;
		}

		throw new NotFoundException('Failed to connect to remote collabora instance for ' . $item->getId());
	}
}
