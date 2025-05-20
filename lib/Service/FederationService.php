<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
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
use OCP\IRequest;
use OCP\IURLGenerator;
use OCP\Security\ITrustedDomainHelper;
use OCP\Share\IShare;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Psr\Log\LoggerInterface;

class FederationService {
	/** @var ICache */
	private $cache;
	/** @var TrustedServers */
	private $trustedServers;

	public function __construct(
		ICacheFactory $cacheFactory,
		private IClientService $clientService,
		private LoggerInterface $logger,
		private TokenManager $tokenManager,
		private AppConfig $appConfig,
		private IRequest $request,
		private IURLGenerator $urlGenerator,
		private ITrustedDomainHelper $trustedDomainHelper,
	) {
		$this->cache = $cacheFactory->createDistributed('richdocuments_remote/');
		try {
			$this->trustedServers = \OCP\Server::get(\OCA\Federation\TrustedServers::class);
		} catch (NotFoundExceptionInterface|ContainerExceptionInterface|AutoloadNotAllowedException) {
		}
	}

	public function getTrustedServers(): array {
		if (!$this->trustedServers) {
			return [];
		}

		return array_map(fn (array $server) => $server['url'], $this->trustedServers->getServers());
	}

	/**
	 * @param $remote
	 * @return string
	 * @throws \Exception
	 */
	public function getRemoteCollaboraURL($remote) {
		// If no protocol is provided we default to https
		if (!str_starts_with($remote, 'http://') && !str_starts_with($remote, 'https://')) {
			$remote = 'https://' . $remote;
		}

		if (!$this->isTrustedRemote($remote)) {
			throw new \Exception('Unable to determine collabora URL of remote server ' . $remote . ' - Remote is not a trusted server');
		}

		if ($this->trustedDomainHelper->isTrustedUrl($remote)) {
			return $this->appConfig->getCollaboraUrlInternal();
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
		if (str_starts_with($domainWithPort, 'http://') || str_starts_with($domainWithPort, 'https://')) {
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

			// This regular expression ensures that wildcards for trusted domains
			// are parsed properly in order to match subdomains:
			// *.example.com => /^[-\.a-zA-Z0-9]*\.example\.com$/i
			$regex = '/^' . implode('[-\.a-zA-Z0-9]*', array_map(fn ($v) => preg_quote($v, '/'), explode('*', $trusted))) . '$/i';

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
			$this->logger->error($e->getMessage(), ['message' => 'COOL-Federation-Source: Unable to fetch remote file details for ' . $remoteToken . ' from ' . $remote, 'exception' => $e]);
		}
		return null;
	}

	/**
	 * @param File $item
	 * @return string|null
	 * @throws NotFoundException
	 * @throws InvalidPathException
	 */
	public function getRemoteRedirectURL(File $item, ?Direct $direct = null, ?IShare $share = null) {
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

			$url = rtrim($remote, '/') . '/index.php/apps/richdocuments/remote';
			$params = [
				'shareToken' => $item->getStorage()->getToken(),
				'remoteServer' => $initiatorServer,
				'remoteServerToken' => $initiatorToken,
			];

			if ($item->getInternalPath() !== '') {
				$params['filePath'] = $item->getInternalPath();
			}

			return $url . '?' . http_build_query($params);
		}

		throw new NotFoundException('Failed to connect to remote collabora instance for ' . $item->getId());
	}
}
