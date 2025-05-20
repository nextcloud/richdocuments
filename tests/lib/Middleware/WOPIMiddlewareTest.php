<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Middleware;

use OCA\Richdocuments\Db\WopiMapper;
use OCP\IConfig;
use OCP\IRequest;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class WOPIMiddlewareTest extends TestCase {
	/**
	 * @var IConfig|IConfig&MockObject|MockObject
	 */
	private $config;
	/**
	 * @var IRequest|IRequest&MockObject|MockObject
	 */
	private $request;
	/**
	 * @var WopiMapper|WopiMapper&MockObject|MockObject
	 */
	private $wopiMapper;
	/**
	 * @var MockObject|LoggerInterface|LoggerInterface&MockObject
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

	public static function dataAllow() {
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
