<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Middleware;

use OCA\Richdocuments\Db\WopiMapper;
use OCA\Richdocuments\Service\DiscoveryService;
use OCA\Richdocuments\Service\ProofKeyService;
use OCP\IConfig;
use OCP\IRequest;
use OCP\IURLGenerator;
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
	private $discoveryService;
	private $urlGenerator;
	private $proofKeyService;
	private WOPIMiddleware $middleware;

	public function setUp(): void {
		parent::setUp();
		$this->config = $this->createMock(IConfig::class);
		$this->request = $this->createMock(IRequest::class);
		$this->wopiMapper = $this->createMock(WopiMapper::class);
		$this->logger = $this->createMock(LoggerInterface::class);
		$this->discoveryService = $this->createMock(DiscoveryService::class);
		$this->urlGenerator = $this->createMock(IURLGenerator::class);
		$this->proofKeyService = $this->createMock(ProofKeyService::class);
		
		$this->middleware = new WOPIMiddleware(
			$this->config,
			$this->urlGenerator,
			$this->request,
			$this->discoveryService,
			$this->wopiMapper,
			$this->logger,
			$this->proofKeyService,
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
