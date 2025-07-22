<?php

declare(strict_types = 1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments;

use DateTimeImmutable;
use OCA\Richdocuments\Service\DiscoveryService;
use OCA\Richdocuments\Service\ProofKeyService;
use OCP\Files\AppData\IAppDataFactory;
use OCP\Http\Client\IClientService;
use OCP\IAppConfig;
use OCP\ICacheFactory;
use OCP\IConfig;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class ProofKeyServiceTest extends TestCase {
	private IClientService $clientService;
	private ICacheFactory $cacheFactory;
	private IAppDataFactory $appDataFactory;
	private IAppConfig $appConfig;
	private LoggerInterface $logger;
	private IConfig $config;
	private DiscoveryService $discoveryService;

	private ProofKeyService $proofKeyService;

	public function setUp(): void {
		parent::setUp();

		$this->clientService = $this->createStub(IClientService::class);
		$this->cacheFactory = $this->createStub(ICacheFactory::class);
		$this->appDataFactory = $this->createStub(IAppDataFactory::class);
		$this->appConfig = $this->createStub(IAppConfig::class);
		$this->logger = $this->createStub(LoggerInterface::class);
		$this->config = $this->createStub(IConfig::class);

		$this->discoveryService = $this->getMockBuilder(DiscoveryService::class)
			->setConstructorArgs([
				$this->clientService,
				$this->cacheFactory,
				$this->appDataFactory,
				$this->appConfig,
				$this->logger,
				$this->config
			])
			->onlyMethods(['get'])
			->getMock();

		$this->proofKeyService = new ProofKeyService($this->discoveryService);
	}

	public function testWindowsToUnixTimestamp(): void {
		// Timestamps representing 15 February, 2024 00:00:00
		$windowsTimestamp = '133524468000000000';
		$expectedUnixTimestamp = '1707973200';
		
		$unixTimestamp = $this->proofKeyService->windowsToUnixTimestamp($windowsTimestamp);

		$this->assertEquals($expectedUnixTimestamp, $unixTimestamp);
	}

	public function testIsOldTimestamp(): void {
		$now = new DateTimeImmutable();

		$validAge = $now->modify('-10 minutes');
		$isOld = $this->proofKeyService->isOldTimestamp($validAge->getTimestamp());
		$this->assertFalse($isOld);

		$invalidAge = $now->modify('-30 minutes');
		$isOld = $this->proofKeyService->isOldTimestamp($invalidAge->getTimestamp());
		$this->assertTrue($isOld);
	}
}
