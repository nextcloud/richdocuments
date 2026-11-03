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
use OCP\Files\Template\TemplateFileCreator;
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
		$this->permissionManager->method('userCanEdit')->willReturn(true);
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
		$this->permissionManager->method('userCanEdit')->willReturn(true);
		$this->capabilitiesService->method('getCapabilities')->willReturn(['something']);
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

	public function testHandleDoesNotRegisterIfUserCannotEdit() {
		$event = $this->createMock(RegisterTemplateCreatorEvent::class);
		$event->method('getTemplateManager')->willReturn($this->templateManager);
		$this->permissionManager->method('loggedInUser')->willReturn('user');
		$this->permissionManager->method('isEnabledForUser')->willReturn(true);
		$this->permissionManager->method('userCanEdit')->willReturn(false);
		$this->capabilitiesService->method('getCapabilities')->willReturn(['something']);

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

	/**
	 * @return TemplateFileCreator[] indexed by label
	 */
	private function registeredCreators(string $docFormat): array {
		$event = $this->createMock(RegisterTemplateCreatorEvent::class);
		$event->method('getTemplateManager')->willReturn($this->templateManager);
		$this->permissionManager->method('isEnabledForUser')->willReturn(true);
		$this->permissionManager->method('userCanEdit')->willReturn(true);
		$this->capabilitiesService->method('getCapabilities')->willReturn(['something']);
		$this->config->method('getAppValue')->willReturn($docFormat);
		$this->appManager->method('getAppPath')->willReturn(realpath(__DIR__ . '/../../..'));
		$this->l10n->method('t')->willReturnArgument(0);

		$creators = [];
		$this->templateManager->method('registerTemplateFileCreator')
			->willReturnCallback(function (callable $callback) use (&$creators): void {
				$creator = $callback();
				$creators[$creator->jsonSerialize()['label']] = $creator;
			});

		$listener = new RegisterTemplateFileCreatorListener(
			$this->l10n,
			$this->config,
			$this->appManager,
			$this->capabilitiesService,
			$this->permissionManager
		);
		$listener->handle($event);

		return $creators;
	}

	/**
	 * Sorts by declared order, as the app menu does: the office app turns every
	 * registered creator into a navigation action carrying the creator's order,
	 * and OC\NavigationManager sorts those actions by it.
	 *
	 * @param TemplateFileCreator[] $creators
	 * @return string[] action names in menu order
	 */
	private function menuOrder(array $creators): array {
		$creators = array_values($creators);
		usort($creators, static fn (TemplateFileCreator $a, TemplateFileCreator $b): int => $a->getOrder() - $b->getOrder());
		return array_map(static fn (TemplateFileCreator $creator): string => $creator->jsonSerialize()['label'], $creators);
	}

	public static function docFormatProvider(): array {
		return [
			'ooxml' => ['ooxml'],
			'odf' => ['odf'],
		];
	}

	/**
	 * @dataProvider docFormatProvider
	 */
	public function testOfficeCreatorsAreOrderedDocumentSpreadsheetPresentation(string $docFormat) {
		$creators = $this->registeredCreators($docFormat);

		$this->assertSame(
			['Document', 'Spreadsheet', 'Presentation', 'Diagram'],
			$this->menuOrder($creators)
		);
		$this->assertLessThan($creators['Spreadsheet']->getOrder(), $creators['Document']->getOrder());
		$this->assertLessThan($creators['Presentation']->getOrder(), $creators['Spreadsheet']->getOrder());
	}

	/**
	 * @dataProvider docFormatProvider
	 */
	public function testOfficeCreatorsSortBeforeCreatorsOfOtherApps(string $docFormat) {
		$creators = $this->registeredCreators($docFormat);

		// Orders other apps may declare: the lowest non-negative one, the text
		// app's markdown creator (10) and the TemplateFileCreator default (100).
		$foreign = [
			(new TemplateFileCreator('other', 'Zero', '.zero'))->setOrder(0),
			(new TemplateFileCreator('text', 'Text document', '.md'))->setOrder(10),
			new TemplateFileCreator('other', 'Default', '.other'),
		];

		$order = $this->menuOrder(array_merge($foreign, array_values($creators)));

		$this->assertSame(['Document', 'Spreadsheet', 'Presentation'], array_slice($order, 0, 3));
		foreach (['Document', 'Spreadsheet', 'Presentation'] as $office) {
			$this->assertLessThan(0, $creators[$office]->getOrder());
		}
	}

	/**
	 * @dataProvider docFormatProvider
	 */
	public function testDiagramIsNotPrioritisedOverOtherApps(string $docFormat) {
		$creators = $this->registeredCreators($docFormat);

		$this->assertSame(
			(new TemplateFileCreator('other', 'Default', '.other'))->getOrder(),
			$creators['Diagram']->getOrder()
		);
	}
}
