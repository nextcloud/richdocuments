<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Service\CapabilitiesService;
use OCA\Richdocuments\Service\ConnectivityService;
use OCA\Richdocuments\Service\DiscoveryService;
use OCA\Richdocuments\WOPI\Parser;
use OCP\Http\Client\IClient;
use OCP\Http\Client\IClientService;
use OCP\Http\Client\IResponse;
use OCP\IL10N;
use OCP\IURLGenerator;
use PHPUnit\Framework\TestCase;

class ConnectivityServiceTest extends TestCase {
	private function makeService(bool $hasWopiAccessCheck, ?string $body, IClient $client): ConnectivityService {
		$appConfig = $this->createStub(AppConfig::class);
		$appConfig->method('getNextcloudUrl')->willReturn('https://nextcloud.example');
		$capabilitiesService = $this->createStub(CapabilitiesService::class);
		$capabilitiesService->method('hasWopiAccessCheck')->willReturn($hasWopiAccessCheck);
		$capabilitiesService->method('getCapabilitiesEndpoint')->willReturn('https://collabora.example/hosting/capabilities');
		$response = $this->createStub(IResponse::class);
		$response->method('getBody')->willReturn($body);
		$client->method('post')->willReturn($response);
		$clientService = $this->createStub(IClientService::class);
		$clientService->method('newClient')->willReturn($client);
		$l10n = $this->createStub(IL10N::class);
		$l10n->method('t')->willReturnArgument(0);

		return new ConnectivityService(
			$appConfig,
			$this->createStub(DiscoveryService::class),
			$capabilitiesService,
			$clientService,
			$this->createStub(IURLGenerator::class),
			$this->createStub(Parser::class),
			$l10n,
		);
	}

	public function testWopiAccessSkippedWithoutCapability(): void {
		$client = $this->createMock(IClient::class);
		$client->expects($this->never())->method('post');

		$this->makeService(false, null, $client)->testWopiAccess();
	}

	public function testWopiAccessOk(): void {
		$client = $this->createMock(IClient::class);
		$service = $this->makeService(true, '{"status":"Ok"}', $client);
		$client->expects($this->once())->method('post')->with(
			'https://collabora.example/hosting/wopiAccessCheck',
			$this->callback(fn (array $options) => json_decode($options['body'], true)['callbackUrl'] === 'https://nextcloud.example/index.php/apps/richdocuments/settings/access-check'),
		);

		$service->testWopiAccess();
	}

	public static function dataWopiAccessFailure(): array {
		return [
			'known error' => ['{"status":"WopiHostNotAllowed"}'],
			'unknown error' => ['{"status":"SomethingNew"}'],
			'invalid response' => ['<html></html>'],
		];
	}

	/** @dataProvider dataWopiAccessFailure */
	public function testWopiAccessFailure(string $body): void {
		$this->expectException(\Exception::class);

		$this->makeService(true, $body, $this->createStub(IClient::class))->testWopiAccess();
	}
}
