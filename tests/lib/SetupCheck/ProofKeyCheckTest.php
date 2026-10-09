<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Service\DiscoveryService;
use OCA\Richdocuments\SetupCheck\ProofKeyCheck;
use OCP\IL10N;
use OCP\SetupCheck\SetupResult;
use PHPUnit\Framework\TestCase;

class ProofKeyCheckTest extends TestCase {
	public static function dataRun(): array {
		return [
			'not configured' => ['', false, SetupResult::SUCCESS],
			'proof key present' => ['https://collabora.example', true, SetupResult::SUCCESS],
			'proof key missing' => ['https://collabora.example', false, SetupResult::WARNING],
		];
	}

	/** @dataProvider dataRun */
	public function testRun(string $wopiUrl, bool $hasProofKey, string $expected): void {
		$appConfig = $this->createStub(AppConfig::class);
		$appConfig->method('getCollaboraUrlInternal')->willReturn($wopiUrl);
		$discoveryService = $this->createStub(DiscoveryService::class);
		$discoveryService->method('hasProofKey')->willReturn($hasProofKey);

		$check = new ProofKeyCheck($this->createStub(IL10N::class), $appConfig, $discoveryService);

		$this->assertSame($expected, $check->run()->getSeverity());
	}
}
