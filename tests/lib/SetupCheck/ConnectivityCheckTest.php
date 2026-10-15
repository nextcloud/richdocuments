<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Service\ConnectivityService;
use OCA\Richdocuments\SetupCheck\ConnectivityCheck;
use OCP\IL10N;
use OCP\SetupCheck\SetupResult;
use PHPUnit\Framework\TestCase;

class ConnectivityCheckTest extends TestCase {
	public static function dataRun(): array {
		return [
			'not configured' => ['', false, 0, SetupResult::SUCCESS],
			'reachable' => ['https://collabora.example', false, 1, SetupResult::SUCCESS],
			'unreachable' => ['https://collabora.example', true, 1, SetupResult::ERROR],
		];
	}

	/** @dataProvider dataRun */
	public function testRun(string $wopiUrl, bool $fails, int $expectedTests, string $expected): void {
		$appConfig = $this->createStub(AppConfig::class);
		$appConfig->method('getCollaboraUrlInternal')->willReturn($wopiUrl);
		$connectivityService = $this->createMock(ConnectivityService::class);
		$test = $connectivityService->expects($this->exactly($expectedTests))->method('test');
		if ($fails) {
			$test->willThrowException(new \Exception('unreachable'));
		}

		$check = new ConnectivityCheck($this->createStub(IL10N::class), $appConfig, $connectivityService);

		$this->assertSame($expected, $check->run()->getSeverity());
	}
}
