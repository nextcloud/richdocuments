<?php

declare(strict_types = 1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments;

use OCA\Federation\TrustedServers;
use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Service\FederationService;
use OCA\Richdocuments\TokenManager;
use OCP\Http\Client\IClientService;
use OCP\ICacheFactory;
use OCP\IRequest;
use OCP\IURLGenerator;
use OCP\Security\ITrustedDomainHelper;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class FederationServiceTest extends TestCase {
	public const NEXTCLOUD_ADDRESS = 'https://nextcloud.local';
	public const COLLABORA_ADDRESS = 'https://collabora.local';

	public function setUp(): void {
		parent::setUp();

		$this->cacheFactory = $this->createMock(ICacheFactory::class);
		$this->clientService = $this->createMock(IClientService::class);
		$this->logger = $this->createMock(LoggerInterface::class);
		$this->tokenManager = $this->createMock(TokenManager::class);
		$this->appConfig = $this->createStub(AppConfig::class);
		$this->request = $this->createMock(IRequest::class);
		$this->urlGenerator = $this->createMock(IURLGenerator::class);
		$this->trustedDomainHelper = $this->createStub(ITrustedDomainHelper::class);

		$this->federationService = new FederationService(
			$this->cacheFactory,
			$this->clientService,
			$this->logger,
			$this->tokenManager,
			$this->appConfig,
			$this->request,
			$this->urlGenerator,
			$this->trustedDomainHelper
		);
	}

	/**
	 * @test
	 * @testdox returns own instance's Collabora URL
	 */
	public function getRemoteCollaboraURLFromOwnInstance(): void {
		// Ensure that trusted domains can be used for federated editing
		$this->appConfig->method('isTrustedDomainAllowedForFederation')
			->willReturn(true);
		$this->appConfig->method('getCollaboraUrlInternal')
			->willReturn(self::COLLABORA_ADDRESS);

		$this->trustedDomainHelper->method('isTrustedUrl')
			->with(self::NEXTCLOUD_ADDRESS)
			->willReturn(true);

		// Create a stub TrustedServers class which always tells us
		// the server is trusted
		$trustedServers = $this->createStub(TrustedServers::class);
		$trustedServers->method('isTrustedServer')
			->with('nextcloud.local')
			->willReturn(true);

		// Do some reflection property manipulation to set the TrustedServers object
		// It would be nice if the TrustedServers were passed into FederationService
		// instead of being set manually in the constructor to make testing easier
		$reflection = new \ReflectionClass($this->federationService);
		$reflectionProperty = $reflection->getProperty('trustedServers');
		$reflectionProperty->setAccessible(true);
		$reflectionProperty->setValue($this->federationService, $trustedServers);

		$this->assertEquals(self::COLLABORA_ADDRESS, $this->federationService->getRemoteCollaboraURL(self::NEXTCLOUD_ADDRESS));
	}
}
