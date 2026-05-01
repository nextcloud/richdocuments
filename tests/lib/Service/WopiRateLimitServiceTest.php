<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace Tests\Richdocuments;

use OCA\Richdocuments\Db\Wopi;
use OCA\Richdocuments\Service\WopiRateLimitService;
use OCP\IRequest;
use OCP\Security\RateLimiting\ILimiter;
use OCP\Security\RateLimiting\IRateLimitExceededException;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class WopiRateLimitServiceTest extends TestCase {
	private ILimiter&MockObject $limiter;
	private IRequest&MockObject $request;
	private WopiRateLimitService $service;

	protected function setUp(): void {
		parent::setUp();
		$this->limiter = $this->createMock(ILimiter::class);
		$this->request = $this->createMock(IRequest::class);
		$this->service = new WopiRateLimitService($this->limiter, $this->request);
	}

	private function createWopiMock(int $id = 42): Wopi&MockObject {
		$wopi = $this->getMockBuilder(Wopi::class)
			->addMethods(['getId'])
			->getMock();
		$wopi->method('getId')->willReturn($id);
		return $wopi;
	}

	public function testRegisterRequestCallsLimiterWithCorrectParameters(): void {
		$wopi = $this->createWopiMock(7);
		$this->request->method('getRemoteAddress')->willReturn('127.0.0.1');

		$this->limiter->expects($this->once())
			->method('registerAnonRequest')
			->with(
				'richdocuments::wopi::checkFileInfo::7',
				10,
				120,
				'127.0.0.1'
			);

		$this->service->registerRequest($wopi, 'checkFileInfo');
	}

	public function testRegisterRequestPropagatesRateLimitExceeded(): void {
		$wopi = $this->createWopiMock();
		$this->request->method('getRemoteAddress')->willReturn('127.0.0.1');

		$exception = $this->createMock(IRateLimitExceededException::class);
		$this->limiter->method('registerAnonRequest')->willThrowException($exception);

		$this->expectException(IRateLimitExceededException::class);
		$this->service->registerRequest($wopi, 'checkFileInfo');
	}
}
