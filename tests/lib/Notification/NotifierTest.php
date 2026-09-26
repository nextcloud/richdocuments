<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments\Notification;

use OCA\Richdocuments\Notification\Notifier;
use OCA\Richdocuments\Service\CapabilitiesService;
use OCP\Files\IRootFolder;
use OCP\IURLGenerator;
use OCP\IUserManager;
use OCP\L10N\IFactory;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class NotifierTest extends TestCase {
	private CapabilitiesService&MockObject $capabilitiesService;
	private IFactory&MockObject $l10nFactory;
	private IUserManager&MockObject $userManager;
	private IURLGenerator&MockObject $urlGenerator;
	private IRootFolder&MockObject $rootFolder;
	private LoggerInterface&MockObject $logger;
	private Notifier $notifier;

	protected function setUp(): void {
		parent::setUp();

		$this->capabilitiesService = $this->createMock(CapabilitiesService::class);
		$this->l10nFactory = $this->createMock(IFactory::class);
		$this->userManager = $this->createMock(IUserManager::class);
		$this->urlGenerator = $this->createMock(IURLGenerator::class);
		$this->rootFolder = $this->createMock(IRootFolder::class);
		$this->logger = $this->createMock(LoggerInterface::class);

		$this->notifier = new Notifier(
			$this->capabilitiesService,
			$this->l10nFactory,
			$this->userManager,
			$this->urlGenerator,
			$this->rootFolder,
			$this->logger,
		);
	}

	public function testGetNameReturnsProductName(): void {
		$this->capabilitiesService->method('getProductName')
			->willReturn('Vendor Office');

		$this->assertSame('Vendor Office', $this->notifier->getName());
	}

	public function testGetNameFallsBackWhenProductNameLookupThrows(): void {
		// getProductName() reads the cached capabilities and therefore touches
		// app data, which can throw. getName() was a constant before, so a
		// failure here must not take down the notifier list.
		$this->capabilitiesService->method('getProductName')
			->willThrowException(new \RuntimeException('app data unavailable'));

		$this->assertSame('Collabora Online', $this->notifier->getName());
	}

	public function testGetNameLogsWhenProductNameLookupThrows(): void {
		$exception = new \RuntimeException('app data unavailable');
		$this->capabilitiesService->method('getProductName')
			->willThrowException($exception);

		$this->logger->expects($this->once())
			->method('debug')
			->with(
				$this->anything(),
				$this->callback(static fn (array $context): bool => ($context['exception'] ?? null) === $exception),
			);

		$this->notifier->getName();
	}

	public function testGetIdIsStable(): void {
		$this->assertSame('richdocuments', $this->notifier->getID());
	}
}
