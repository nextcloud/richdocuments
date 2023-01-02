<?php

declare(strict_types=1);

/**
 * @copyright Copyright (c) 2022 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
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
 */


namespace OCA\Richdocuments\Middleware;

use OCA\Richdocuments\Db\WopiMapper;
use OCP\IConfig;
use OCP\IRequest;
use Psr\Log\LoggerInterface;

class WOPIMiddlewareTest extends \PHPUnit\Framework\TestCase {
	/**
	 * @var IConfig|(IConfig&\PHPUnit\Framework\MockObject\MockObject)|\PHPUnit\Framework\MockObject\MockObject
	 */
	private $config;
	/**
	 * @var IRequest|(IRequest&\PHPUnit\Framework\MockObject\MockObject)|\PHPUnit\Framework\MockObject\MockObject
	 */
	private $request;
	/**
	 * @var WopiMapper|(WopiMapper&\PHPUnit\Framework\MockObject\MockObject)|\PHPUnit\Framework\MockObject\MockObject
	 */
	private $wopiMapper;
	/**
	 * @var \PHPUnit\Framework\MockObject\MockObject|LoggerInterface|(LoggerInterface&\PHPUnit\Framework\MockObject\MockObject)
	 */
	private $logger;
	private WOPIMiddleware $middleware;

	public function setUp(): void {
		parent::setUp();
		$this->config = $this->createMock(IConfig::class);
		$this->request = $this->createMock(IRequest::class);
		$this->wopiMapper = $this->createMock(WopiMapper::class);
		$this->logger = $this->createMock(LoggerInterface::class);
		$this->middleware = new WOPIMiddleware(
			$this->config,
			$this->request,
			$this->wopiMapper,
			$this->logger,
		);
	}

	/** @dataProvider dataAllow */
	public function testAllow($ip, $allowList, $result) {
		$this->request->expects($this->once())
			->method('getRemoteAddress')
			->willReturn($ip);
		$this->config->expects(self::any())
			->method('getAppValue')
			->willReturn($allowList);
		self::assertEquals($result, $this->middleware->isWOPIAllowed());
	}

	public function dataAllow() {
		return [
			['192.168.178.1', '192.168.178.1', true],
			['192.168.178.1', '192.168.178.2', false],
			['192.168.178.1', '192.168.178.1/24', true],
			['192.168.178.230', '192.168.178.1/24', true],
			['192.168.179.1', '192.168.178.1/24', false],
			['10.0.0.10', '10.0.0.0/8', true],
			['2001:0DB8:8280:97e8:6c18:0000:a53f:0001', '2001:0DB8:8280:97e8:6c18:0000:a53f:0001', true],
			['2001:0DB8:8280:97e8:6c18:0000:a53f:0001', '2001:0DB8:8280:97e8:6c18:0000:a53f:0001/128', true],
			['2001:0DB8:8280:97e8:6c18:0000:a53f:0001', '2001:0DB8:8280::/48', true],
			['2001:0DB8:8180:97e8:6c18:0000:a53f:0001', '2001:0DB8:8280::/48', false],
			['2001:0DB8:8180:97e8:6c18:0000:a53f:0001', '2001:0DB8::/32', true],
		];
	}
}
