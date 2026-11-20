<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments\Service;

use OCA\Richdocuments\AppInfo\Application;
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
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class CapabilitiesServiceTest extends TestCase {
	private IClientService&MockObject $clientService;
	private ICacheFactory&MockObject $cacheFactory;
	private ICache&MockObject $cache;
	private IAppDataFactory&MockObject $appDataFactory;
	private IAppConfig&MockObject $appConfig;
	private LoggerInterface&MockObject $logger;
	private IConfig&MockObject $config;
	private IAppManager&MockObject $appManager;
	private CapabilitiesService $service;

	protected function setUp(): void {
		parent::setUp();

		$this->clientService = $this->createMock(IClientService::class);
		$this->cacheFactory = $this->createMock(ICacheFactory::class);
		$this->cache = $this->createMock(ICache::class);
		$this->appDataFactory = $this->createMock(IAppDataFactory::class);
		$this->appConfig = $this->createMock(IAppConfig::class);
		$this->logger = $this->createMock(LoggerInterface::class);
		$this->config = $this->createMock(IConfig::class);
		$this->appManager = $this->createMock(IAppManager::class);

		$this->cacheFactory->method('createDistributed')->willReturn($this->cache);

		$this->service = new CapabilitiesService(
			$this->clientService,
			$this->cacheFactory,
			$this->appDataFactory,
			$this->appConfig,
			$this->logger,
			$this->config,
			$this->appManager,
		);
	}

	/**
	 * Serve the capabilities straight from the distributed cache, so the
	 * service never reaches app data or the network during the test.
	 */
	private function withCapabilities(array $capabilities): void {
		$this->cache->method('get')
			->with('capabilities')
			->willReturn(json_encode($capabilities));
	}

	private function withTheme(string $theme): void {
		$this->config->method('getAppValue')
			->with(Application::APPNAME, 'theme', 'nextcloud')
			->willReturn($theme);
	}

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
		);

		$this->assertSame([], $service->getCapabilities());
		$this->assertNull($service->getProductVersion());
		$this->assertFalse($service->hasTemplateSource());
	}

	public function testGetProductNameReturnsDefaultOnDefaultInstall(): void {
		// A vendor name is present but the theme is untouched, so it must be ignored.
		$this->withCapabilities(['productName' => 'Vendor Office']);
		$this->withTheme('nextcloud');

		$this->assertSame('Collabora Online', $this->service->getProductName());
	}

	public function testGetProductNameReturnsServerNameWithNonDefaultTheme(): void {
		// Any theme other than 'nextcloud' (e.g. 'collabora', the classic look)
		// shows the name the server reports, as the editor already did.
		$this->withCapabilities(['productName' => 'Vendor Office']);
		$this->withTheme('collabora');

		$this->assertSame('Vendor Office', $this->service->getProductName());
	}

	public function testGetProductNameFallsBackWhenCapabilitiesCarryNoProductName(): void {
		$this->withCapabilities(['productVersion' => '24.04.5.2']);
		$this->withTheme('collabora');

		$this->assertSame('Collabora Online', $this->service->getProductName());
	}

	public static function invalidProductNames(): array {
		return [
			'array' => [['Vendor Office']],
			'number' => [42],
			'empty string' => [''],
			'whitespace' => ['  '],
			'null' => [null],
		];
	}

	/** @dataProvider invalidProductNames */
	public function testGetProductNameFallsBackOnInvalidProductName(mixed $productName): void {
		$this->withCapabilities(['productName' => $productName]);
		$this->withTheme('collabora');

		$this->assertSame('Collabora Online', $this->service->getProductName());
	}

	public function testDefaultProductNameIsNotTranslated(): void {
		// The product name is a brand, not a translatable string. Guard the
		// constant so it cannot drift back into the l10n pipeline unnoticed.
		$this->assertSame('Collabora Online', CapabilitiesService::DEFAULT_PRODUCT_NAME);
	}
}
