<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Service;

use OCA\Richdocuments\AppInfo\Application;
use OCP\Files\AppData\IAppDataFactory;
use OCP\Files\NotFoundException;
use OCP\Files\SimpleFS\ISimpleFolder;
use OCP\Http\Client\IClient;
use OCP\Http\Client\IClientService;
use OCP\IAppConfig;
use OCP\ICacheFactory;
use Psr\Log\LoggerInterface;

abstract class CachedRequestService {
	public function __construct(
		private IClientService $clientService,
		private ICacheFactory $cacheFactory,
		private IAppDataFactory $appDataFactory,
		private IAppConfig $appConfig,
		private LoggerInterface $logger,
		private string $cacheKey,
	) {
	}

	/**
	 * Method to implement sending a request and returning the result as a string
	 * @throw \Exception in case the request fails
	 */
	abstract protected function sendRequest(IClient $client): string;

	public function get(): ?string {
		$cache = $this->cacheFactory->createDistributed('richdocuments');

		if ($cached = $cache->get($this->cacheKey)) {
			return $cached;
		}

		$folder = $this->getAppDataFolder();
		if ($folder->fileExists($this->cacheKey)) {
			$value = $folder->getFile($this->cacheKey)->getContent();
			$cache->set($this->cacheKey, $value, 3600);
			return $value;
		}

		return null;
	}

	public function getLastUpdate(): ?int {
		$folder = $this->getAppDataFolder();
		if (!$folder->fileExists($this->cacheKey)) {
			return null;
		}
		return $folder->getFile($this->cacheKey)->getMTime();
	}

	/**
	 * Cached value will be kept if the request fails
	 *
	 * @return string
	 * @throws \Exception
	 */
	final public function fetch(): string {
		$cache = $this->cacheFactory->createDistributed('richdocuments');
		$client = $this->clientService->newClient();

		$startTime = microtime(true);
		$response = $this->sendRequest($client);
		$duration = round(((microtime(true) - $startTime)), 3);
		$this->logger->info('Fetched remote endpoint from ' . $this->cacheKey . ' in ' . $duration . ' seconds');

		$this->getAppDataFolder()->newFile($this->cacheKey, $response);
		$cache->set($this->cacheKey, $response);
		return $response;
	}

	public function resetCache(): void {
		$cache = $this->cacheFactory->createDistributed('richdocuments');
		$cache->remove($this->cacheKey);
		$folder = $this->getAppDataFolder();
		if ($folder->fileExists($this->cacheKey)) {
			$folder->getFile($this->cacheKey)->delete();
		}
	}

	protected function getDefaultRequestOptions(): array {
		$options = RemoteOptionsService::getDefaultOptions();

		if ($this->appConfig->getValueString('richdocuments', 'disable_certificate_verification') === 'yes') {
			$options['verify'] = false;
		}

		if ($this->isProxyStarting()) {
			$options['timeout'] = 180;
		}

		return $options;
	}

	private function getAppDataFolder(): ISimpleFolder {
		$appData = $this->appDataFactory->get(Application::APPNAME);
		try {
			$folder = $appData->getFolder('remoteData');
		} catch (NotFoundException) {
			$folder = $appData->newFolder('remoteData');
		}
		return $folder;
	}

	/**
	 * @return boolean indicating if proxy.php is in initialize or false otherwise
	 */
	private function isProxyStarting(): bool {
		$url = $this->appConfig->getValueString('richdocuments', 'wopi_url', '');
		$usesProxy = false;
		$proxyPos = strrpos($url, 'proxy.php');
		if ($proxyPos !== false) {
			$usesProxy = true;
		}

		if ($usesProxy === true) {
			$statusUrl = substr($url, 0, $proxyPos);
			$statusUrl = $statusUrl . 'proxy.php?status';

			$client = $this->clientService->newClient();
			$options = ['timeout' => 5, 'nextcloud' => ['allow_local_address' => true]];

			if ($this->appConfig->getValueString('richdocuments', 'disable_certificate_verification') === 'yes') {
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
			} catch (\Exception) {
				// ignore
			}
		}

		return false;
	}
}
