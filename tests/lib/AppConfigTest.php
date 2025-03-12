<?php
/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments;

use OCA\Richdocuments\AppConfig;
use OCP\App\IAppManager;
use OCP\AppFramework\Services\IAppConfig;
use OCP\GlobalScale\IConfig as IGlobalScaleConfig;
use OCP\IConfig;
use PHPUnit\Framework\MockObject\MockObject;
use Test\TestCase;

class AppConfigTest extends TestCase {
	/** @var IConfig|MockObject */
	private $config;
	/** @var IAppConfig */
	private $appConfig;

	public function setUp(): void {
		parent::setUp();
		$this->config = $this->createMock(IConfig::class);
		$this->appManager = $this->createMock(IAppManager::class);
		$this->appConfig = $this->createMock(IAppConfig::class);
		$this->gsConfig = $this->createMock(IGlobalScaleConfig::class);

		$this->appConfig = new AppConfig($this->config, $this->appConfig, $this->appManager, $this->gsConfig);
	}

	public function testGetAppValueArrayWithValues() {
		$this->config->expects($this->once())
			->method('getAppValue')
			->with('files', 'watermark_allGroupsList', [])
			->willReturn('1,2,3');

		$result = $this->appConfig->getAppValueArray('watermark_allGroupsList');

		$this->assertSame(['1', '2', '3'], $result);
	}

	public function testGetAppValueArrayWithSingleValue() {
		$this->config->expects($this->once())
			->method('getAppValue')
			->with('files', 'watermark_allTagsList', [])
			->willReturn('1');

		$result = $this->appConfig->getAppValueArray('watermark_allTagsList');

		$this->assertSame(['1'], $result);
	}

	public function testGetAppValueArrayWithNoneValue() {
		$this->config->expects($this->once())
			->method('getAppValue')
			->with('files', 'watermark_allTagsList', [])
			->willReturn('');

		$result = $this->appConfig->getAppValueArray('watermark_allTagsList');

		$this->assertSame([], $result);
	}
}
