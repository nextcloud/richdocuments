<?php
/**
 * @copyright Copyright (c) 2023 Andrii Ilkiv <a.ilkiv.ye@gmail.com>
 *
 * @author Andrii Ilkiv <a.ilkiv.ye@gmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace Tests\Richdocuments;

use OCA\Richdocuments\AppConfig;
use OCP\App\IAppManager;
use OCP\IConfig;
use PHPUnit\Framework\MockObject\MockObject;
use Test\TestCase;

class AppConfigTest extends TestCase {
	private IConfig|MockObject $config;
	private IConfig|MockObject $appManager;
	private AppConfig $appConfig;

	public function setUp(): void {
		parent::setUp();
		$this->config = $this->createMock(IConfig::class);
		$this->appManager = $this->createMock(IAppManager::class);

		$this->appConfig = new AppConfig($this->config, $this->appManager, $this->createMock(\OCP\GlobalScale\IConfig::class));
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
