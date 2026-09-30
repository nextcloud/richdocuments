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
use OCP\Http\Client\IClientService;
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

	public function testGetProductNameReturnsDefaultOnDefaultInstall(): void {
		// A vendor name is present but the theme is untouched, so it must be ignored.
		$this->withCapabilities(['productName' => 'Vendor Office']);
		$this->withTheme('nextcloud');

		$this->assertSame('Collabora Online', $this->service->getProductName());
	}

	public function testGetProductNameReturnsVendorNameOnWhiteLabelInstall(): void {
		// Previously unreachable: the settings section hardcoded 'Office' for any
		// Collabora >= 21.11, so a white-label vendor name never surfaced.
		$this->withCapabilities(['productName' => 'Vendor Office']);
		$this->withTheme('vendor');

		$this->assertSame('Vendor Office', $this->service->getProductName());
	}

	public function testGetProductNameFallsBackWhenCapabilitiesCarryNoProductName(): void {
		$this->withCapabilities(['productVersion' => '24.04.5.2']);
		$this->withTheme('vendor');

		$this->assertSame('Collabora Online', $this->service->getProductName());
	}

	public function testDefaultProductNameIsNotTranslated(): void {
		// The product name is a brand, not a translatable string. Guard the
		// constant so it cannot drift back into the l10n pipeline unnoticed.
		$this->assertSame('Collabora Online', CapabilitiesService::DEFAULT_PRODUCT_NAME);
	}
}
