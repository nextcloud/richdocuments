<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments;

use OCA\Richdocuments\Service\CapabilitiesService;
use OCA\Richdocuments\SetupCheck\CollaboraUpdate;
use OCP\Http\Client\IClient;
use OCP\Http\Client\IClientService;
use OCP\Http\Client\IResponse;
use OCP\ICache;
use OCP\ICacheFactory;
use OCP\IConfig;
use OCP\IL10N;
use OCP\SetupCheck\SetupResult;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class CollaboraUpdateTest extends TestCase {
	public static function dataRun(): array {
		return [
			'not configured' => [null, true, '{"coolwsd_version":"25.04.2"}', SetupResult::SUCCESS],
			'cached outdated' => ['25.04.1', true, null, SetupResult::WARNING, '25.04.2'],
			'cached unknown' => ['25.04.1', true, null, SetupResult::SUCCESS, ''],
			'no internet connection' => ['25.04.1', false, '{"coolwsd_version":"25.04.2"}', SetupResult::SUCCESS],
			'up to date' => ['25.04.2', true, '{"coolwsd_version":"25.04.2"}', SetupResult::SUCCESS],
			'outdated' => ['25.04.1', true, '{"coolwsd_version":"25.04.2"}', SetupResult::WARNING],
			'unexpected response' => ['25.04.1', true, 'error', SetupResult::SUCCESS],
			'request failed' => ['25.04.1', true, null, SetupResult::INFO],
		];
	}

	/** @dataProvider dataRun */
	public function testRun(?string $installedVersion, bool $hasInternet, ?string $body, string $expected, ?string $cachedVersion = null): void {
		$capabilitiesService = $this->createStub(CapabilitiesService::class);
		$capabilitiesService->method('getProductVersion')->willReturn($installedVersion);
		$capabilitiesService->method('isCode')->willReturn(true);
		$config = $this->createStub(IConfig::class);
		$config->method('getSystemValueBool')->willReturn($hasInternet);

		$client = $this->createStub(IClient::class);
		if ($body === null) {
			$client->method('get')->willThrowException(new \Exception('timeout'));
		} else {
			$response = $this->createStub(IResponse::class);
			$response->method('getBody')->willReturn($body);
			$client->method('get')->willReturn($response);
		}
		$clientService = $this->createStub(IClientService::class);
		$clientService->method('newClient')->willReturn($client);
		$cache = $this->createStub(ICache::class);
		$cache->method('get')->willReturn($cachedVersion);
		$cacheFactory = $this->createStub(ICacheFactory::class);
		$cacheFactory->method('createDistributed')->willReturn($cache);

		$check = new CollaboraUpdate(
			$this->createStub(IL10N::class),
			$capabilitiesService,
			$config,
			$clientService,
			$cacheFactory,
			$this->createStub(LoggerInterface::class),
		);

		$this->assertSame($expected, $check->run()->getSeverity());
	}
}
