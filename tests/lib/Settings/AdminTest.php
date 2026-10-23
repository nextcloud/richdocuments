<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Service\CapabilitiesService;
use OCA\Richdocuments\Service\DemoService;
use OCA\Richdocuments\Service\FontService;
use OCA\Richdocuments\Service\InitialStateService;
use OCA\Richdocuments\Settings\Admin;
use OCA\Richdocuments\TemplateManager;
use OCA\Richdocuments\TokenManager;
use OCP\IConfig;
use OCP\SystemTag\ISystemTag;
use OCP\SystemTag\ISystemTagManager;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class AdminTest extends TestCase {
	private AppConfig|MockObject $appConfig;
	private ISystemTagManager|MockObject $systemTagManager;
	private Admin $admin;

	protected function setUp(): void {
		parent::setUp();

		$_SERVER['SERVER_SOFTWARE'] ??= 'phpunit';

		$this->appConfig = $this->createMock(AppConfig::class);
		$this->systemTagManager = $this->createMock(ISystemTagManager::class);

		$this->admin = new Admin(
			$this->createMock(IConfig::class),
			$this->appConfig,
			$this->createMock(TemplateManager::class),
			$this->createMock(CapabilitiesService::class),
			$this->createMock(DemoService::class),
			$this->createMock(FontService::class),
			$this->createMock(InitialStateService::class),
			$this->createMock(TokenManager::class),
			$this->systemTagManager,
		);
	}

	/**
	 * @param list<int> $existingTagIds
	 */
	private function existingTags(array $existingTagIds): void {
		$tags = [];
		foreach ($existingTagIds as $tagId) {
			$tags[$tagId] = $this->createMock(ISystemTag::class);
		}

		$this->systemTagManager->method('getAllTags')->willReturn($tags);
	}

	private function settingsFromForm(): array {
		return $this->admin->getForm()->getParams()['settings']['settings'];
	}

	public function testGetFormDropsDeletedTags(): void {
		$this->appConfig->method('getAppSettings')->willReturn([
			'watermark_allTagsList' => [1, 2, 3],
			'watermark_linkTagsList' => [2, 4],
		]);
		$this->existingTags([1, 3]);

		$settings = $this->settingsFromForm();

		self::assertSame([1, 3], $settings['watermark_allTagsList']);
		self::assertSame([], $settings['watermark_linkTagsList']);
	}

	public function testGetFormKeepsExistingTags(): void {
		$this->appConfig->method('getAppSettings')->willReturn([
			'watermark_allTagsList' => [1, 2],
			'watermark_linkTagsList' => [3],
		]);
		$this->existingTags([1, 2, 3]);

		$settings = $this->settingsFromForm();

		self::assertSame([1, 2], $settings['watermark_allTagsList']);
		self::assertSame([3], $settings['watermark_linkTagsList']);
	}

	public function testGetFormWithoutConfiguredTagLists(): void {
		$this->appConfig->method('getAppSettings')->willReturn([
			'watermark_enabled' => true,
		]);
		$this->existingTags([1]);

		$settings = $this->settingsFromForm();

		self::assertTrue($settings['watermark_enabled']);
		self::assertArrayNotHasKey('watermark_allTagsList', $settings);
		self::assertArrayNotHasKey('watermark_linkTagsList', $settings);
	}

	public function testGetFormKeepsTagListsIndexedSequentially(): void {
		$this->appConfig->method('getAppSettings')->willReturn([
			'watermark_allTagsList' => [1, 2, 3],
		]);
		$this->existingTags([1, 3]);

		self::assertSame([0, 1], array_keys($this->settingsFromForm()['watermark_allTagsList']));
	}
}
