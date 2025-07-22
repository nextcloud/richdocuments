<?php

declare(strict_types = 1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments;

use DateTimeImmutable;
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

	public function testIsOldTimestamp(): void {
		$now = new DateTimeImmutable();

		$validAge = $now->modify('-10 minutes');
		$isOld = $this->proofKeyService->isOldTimestamp($validAge->getTimestamp());
		$this->assertFalse($isOld);

		$invalidAge = $now->modify('-30 minutes');
		$isOld = $this->proofKeyService->isOldTimestamp($invalidAge->getTimestamp());
		$this->assertTrue($isOld);
	}
}
