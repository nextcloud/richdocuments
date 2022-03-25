<?php

namespace OCA\Richdocuments\Service;

use OCP\Files\IAppData;
use OCP\Files\NotFoundException;
use OCP\Http\Client\IClientService;
use OCP\ICache;
use OCP\ICacheFactory;
use OCP\IConfig;
use Psr\Log\LoggerInterface;

class BaseRemoteService {
	public const DEFAULT_REMOTE_TIMEOUT = 5;
	protected ICache $cache;
	private mixed $data = null;

	public function __construct(
		protected IAppData $appData,
		protected IClientService $clientService,
		protected IConfig $config,
		protected LoggerInterface $logger,
		ICacheFactory $cacheFactory,
	) {
		$this->cache = $cacheFactory->createDistributed(self::class);
	}
	protected function getCache(string $key): mixed {
		if ($this->data) {
			return $this->data;
		}

		if ($cached = $this->cache->get($key)) {
			return $cached;
		}

		if ($cached = $this->getAppDataFile($key)) {
			$this->data = json_decode($cached->getContent(), true);
			$this->cache->set($key, $this->data);
		}

		return $this->data;
	}

	protected function setCache(string $key, mixed $data): void {
		$this->data = $data;
		$this->cache->set($key, $this->data);
		$file = $this->getAppDataFile($key);
		$file->putContent(json_encode($this->data));
	}

	private function getAppDataFile(string $key) {
		try {
			$folder = $this->appData->getFolder('cache');
		} catch (NotFoundException $e) {
			$folder = $this->appData->newFolder('cache');
		}

		try {
			$file = $folder->getFile($key);
		} catch (NotFoundException $e) {
			$file = $folder->newFile($key);
		}

		return $file;
	}

	protected function getRequestOptions(): array {
		$options = [
			'timeout' => self::DEFAULT_REMOTE_TIMEOUT,
			'nextcloud' => ['allow_local_address' => true]
		];

		if ($this->config->getAppValue('richdocuments', 'disable_certificate_verification') === 'yes') {
			$options['verify'] = false;
		}

		return $options;
	}

	protected function getRemoteUrl(string $endpoint): ?string {
		$remoteHost = $this->config->getAppValue('richdocuments', 'wopi_url', '');
		if ($remoteHost === '') {
			return null;
		};

		return rtrim($remoteHost, '/') . '/' . ltrim($endpoint, '/');
	}

	public function clearCache($key): void {
		$this->cache->clear();
		$this->getAppDataFile($key)->delete();
	}
}
