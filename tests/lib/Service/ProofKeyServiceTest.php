<?php

declare(strict_types = 1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments;

use OCA\Richdocuments\Service\ProofKeyService;
use PHPUnit\Framework\TestCase;

class ProofKeyServiceTest extends TestCase {
	private ProofKeyService $proofKeyService;

	public function setUp(): void {
		parent::setUp();

		$this->proofKeyService = new ProofKeyService();
	}

	public function testWindowsToUnixTimestamp(): void {
		// Timestamps representing 15 February, 2024 00:00:00
		$windowsTimestamp = '133524468000000000';
		$expectedUnixTimestamp = '1707973200';
		
		$unixTimestamp = $this->proofKeyService->windowsToUnixTimestamp($windowsTimestamp);

		$this->assertEquals($expectedUnixTimestamp, $unixTimestamp);
	}
}
