<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments;

use OCA\Richdocuments\Service\CapabilitiesService;
use OCP\App\IAppManager;
use OCP\Files\AppData\IAppDataFactory;
use OCP\Files\GenericFileException;
use OCP\Files\IAppData;
use OCP\Files\SimpleFS\ISimpleFile;
use OCP\Files\SimpleFS\ISimpleFolder;
use OCP\Http\Client\IClient;
use OCP\Http\Client\IClientService;
use OCP\Http\Client\IResponse;
use OCP\IAppConfig;
use OCP\ICache;
use OCP\ICacheFactory;
use OCP\IConfig;
use OCP\IL10N;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class CapabilitiesServiceTest extends TestCase {
	public function testFetchRefreshesCapabilities(): void {
		$cache = $this->createStub(ICache::class);
		$cache->method('get')->willReturnOnConsecutiveCalls('{"productVersion":"1.0"}', '{"productVersion":"2.0"}');
		$cacheFactory = $this->createStub(ICacheFactory::class);
		$cacheFactory->method('createDistributed')->willReturn($cache);

		$appData = $this->createStub(IAppData::class);
		$appData->method('getFolder')->willReturn($this->createStub(ISimpleFolder::class));
		$appDataFactory = $this->createStub(IAppDataFactory::class);
		$appDataFactory->method('get')->willReturn($appData);

		$response = $this->createStub(IResponse::class);
		$response->method('getBody')->willReturn('{"productVersion":"2.0"}');
		$client = $this->createStub(IClient::class);
		$client->method('get')->willReturn($response);
		$clientService = $this->createStub(IClientService::class);
		$clientService->method('newClient')->willReturn($client);

		$config = $this->createStub(IConfig::class);
		$config->method('getAppValue')->willReturn('https://collabora.example');

		$service = new CapabilitiesService(
			$clientService,
			$cacheFactory,
			$appDataFactory,
			$this->createStub(IAppConfig::class),
			$this->createStub(LoggerInterface::class),
			$config,
			$this->createStub(IAppManager::class),
			$this->createStub(IL10N::class),
		);

		$this->assertSame('1.0', $service->getProductVersion());
		$service->fetch();
		$this->assertSame('2.0', $service->getProductVersion());
	}

	public function testGetCapabilitiesWithUnreadableCachedFile(): void {
		$cache = $this->createStub(ICache::class);
		$cache->method('get')->willReturn(null);
		$cacheFactory = $this->createStub(ICacheFactory::class);
		$cacheFactory->method('createDistributed')->willReturn($cache);

		$file = $this->createStub(ISimpleFile::class);
		$file->method('getContent')->willThrowException(new GenericFileException());
		$folder = $this->createStub(ISimpleFolder::class);
		$folder->method('fileExists')->willReturn(true);
		$folder->method('getFile')->willReturn($file);

		$appData = $this->createStub(IAppData::class);
		$appData->method('getFolder')->willReturn($folder);
		$appDataFactory = $this->createStub(IAppDataFactory::class);
		$appDataFactory->method('get')->willReturn($appData);

		$config = $this->createStub(IConfig::class);
		$config->method('getAppValue')->willReturn('https://collabora.example');

		$service = new CapabilitiesService(
			$this->createStub(IClientService::class),
			$cacheFactory,
			$appDataFactory,
			$this->createStub(IAppConfig::class),
			$this->createStub(LoggerInterface::class),
			$config,
			$this->createStub(IAppManager::class),
			$this->createStub(IL10N::class),
		);

		$this->assertSame([], $service->getCapabilities());
		$this->assertNull($service->getProductVersion());
		$this->assertFalse($service->hasTemplateSource());
	}
}
