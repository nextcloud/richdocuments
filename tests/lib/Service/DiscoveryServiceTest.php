<?php

declare(strict_types = 1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments;

use OCA\Richdocuments\Service\DiscoveryService;
use OCP\Files\AppData\IAppDataFactory;
use OCP\Http\Client\IClientService;
use OCP\IAppConfig;
use OCP\ICacheFactory;
use OCP\IConfig;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class DiscoveryServiceTest extends TestCase {
	private IClientService $clientService;
	private ICacheFactory $cacheFactory;
	private IAppDataFactory $appDataFactory;
	private IAppConfig $appConfig;
	private LoggerInterface $logger;
	private IConfig $config;

	private DiscoveryService $discoveryService;

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
	}

	public function testHasProofKey(): void {
		$discoveryXml = <<<END
        <wopi-discovery>
            <proof-key value="" modulus="" exponent=""/>
        </wopi-discovery>
        END;

		$this->discoveryService->method('get')
			->willReturn($discoveryXml);
		
		$this->assertTrue($this->discoveryService->hasProofKey());
	}

	public function testDoesNotHaveProofKey(): void {
		$discoveryXml = <<<END
        <wopi-discovery>
        </wopi-discovery>
        END;

		$this->discoveryService->method('get')
			->willReturn($discoveryXml);
		
		$this->assertFalse($this->discoveryService->hasProofKey());
	}

	public function testGetProofKey(): void {
		$discoveryXml = <<<END
        <wopi-discovery>
            <proof-key value="helloworld" modulus="hello" exponent="world"/>
        </wopi-discovery>
        END;

		$this->discoveryService->method('get')
			->willReturn($discoveryXml);

		$proofKey = $this->discoveryService->getProofKey();

		$this->assertEquals('helloworld', $proofKey->getValue());
		$this->assertEquals('hello', $proofKey->getModulus());
		$this->assertEquals('world', $proofKey->getExponent());
	}

	public function testGetProofKeyOld(): void {
		$discoveryXml = <<<END
        <wopi-discovery>
            <proof-key oldvalue="helloworld" oldmodulus="hello" oldexponent="world"/>
        </wopi-discovery>
        END;

		$this->discoveryService->method('get')
			->willReturn($discoveryXml);

		$proofKey = $this->discoveryService->getProofKeyOld();

		$this->assertEquals('helloworld', $proofKey->getValue());
		$this->assertEquals('hello', $proofKey->getModulus());
		$this->assertEquals('world', $proofKey->getExponent());
	}
}
