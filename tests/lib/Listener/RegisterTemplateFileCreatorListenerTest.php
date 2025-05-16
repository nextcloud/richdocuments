<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Tests\Listener;

use OCA\Richdocuments\Listener\RegisterTemplateFileCreatorListener;
use OCA\Richdocuments\PermissionManager;
use OCA\Richdocuments\Service\CapabilitiesService;
use OCP\App\IAppManager;
use OCP\EventDispatcher\Event;
use OCP\Files\Template\ITemplateManager;
use OCP\Files\Template\RegisterTemplateCreatorEvent;
use OCP\IConfig;
use OCP\IL10N;
use PHPUnit\Framework\TestCase;

class RegisterTemplateFileCreatorListenerTest extends TestCase {
	private $l10n;
	private $config;
	private $appManager;
	private $capabilitiesService;
	private $permissionManager;
	private $templateManager;

	protected function setUp(): void {
		parent::setUp();
		$this->l10n = $this->createMock(IL10N::class);
		$this->config = $this->createMock(IConfig::class);
		$this->appManager = $this->createMock(IAppManager::class);
		$this->capabilitiesService = $this->createMock(CapabilitiesService::class);
		$this->permissionManager = $this->createMock(PermissionManager::class);
		$this->templateManager = $this->createMock(ITemplateManager::class);
	}

	public function testHandleDoesNotRegisterIfEventIsNotRegisterTemplateCreatorEvent() {
		$listener = new RegisterTemplateFileCreatorListener(
			$this->l10n,
			$this->config,
			$this->appManager,
			$this->capabilitiesService,
			$this->permissionManager
		);
		$event = $this->createMock(Event::class);
		$this->templateManager->expects($this->never())->method('registerTemplateFileCreator');
		$listener->handle($event);
	}

	public function testHandleDoesNotRegisterIfPermissionOrCapabilitiesMissing() {
		$event = $this->createMock(RegisterTemplateCreatorEvent::class);
		$event->method('getTemplateManager')->willReturn($this->templateManager);
		$this->permissionManager->method('isEnabledForUser')->willReturn(false);
		$this->capabilitiesService->method('getCapabilities')->willReturn([]);

		$listener = new RegisterTemplateFileCreatorListener(
			$this->l10n,
			$this->config,
			$this->appManager,
			$this->capabilitiesService,
			$this->permissionManager
		);
		$this->templateManager->expects($this->never())->method('registerTemplateFileCreator');
		$listener->handle($event);
	}

	public function testHandleRegistersTemplateFileCreators() {
		$event = $this->createMock(RegisterTemplateCreatorEvent::class);
		$event->method('getTemplateManager')->willReturn($this->templateManager);
		$this->permissionManager->method('isEnabledForUser')->willReturn(true);
		$this->capabilitiesService->method('getCapabilities')->willReturn(['something']);
		$this->capabilitiesService->method('hasDrawSupport')->willReturn(true);
		$this->config->method('getAppValue')->willReturn('ooxml');
		$this->appManager->method('getAppPath')->willReturn('/tmp');

		$this->templateManager->expects($this->exactly(4))->method('registerTemplateFileCreator');

		$listener = new RegisterTemplateFileCreatorListener(
			$this->l10n,
			$this->config,
			$this->appManager,
			$this->capabilitiesService,
			$this->permissionManager
		);
		$listener->handle($event);
	}

	public function testHandleRegistersWithoutDrawSupport() {
		$event = $this->createMock(RegisterTemplateCreatorEvent::class);
		$event->method('getTemplateManager')->willReturn($this->templateManager);
		$this->permissionManager->method('isEnabledForUser')->willReturn(true);
		$this->capabilitiesService->method('getCapabilities')->willReturn(['something']);
		$this->capabilitiesService->method('hasDrawSupport')->willReturn(false);
		$this->config->method('getAppValue')->willReturn('ooxml');
		$this->appManager->method('getAppPath')->willReturn('/tmp');

		$this->templateManager->expects($this->exactly(3))->method('registerTemplateFileCreator');

		$listener = new RegisterTemplateFileCreatorListener(
			$this->l10n,
			$this->config,
			$this->appManager,
			$this->capabilitiesService,
			$this->permissionManager
		);
		$listener->handle($event);
	}
}
