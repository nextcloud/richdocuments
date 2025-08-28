<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments;

use OCA\Richdocuments\TaskProcessing\Presentation\Presentation;
use PHPUnit\Framework\TestCase;

class PresentationTest extends TestCase {
	public function setUp(): void {
		parent::setUp();
	}

	public function testCreatePresentation(): void {
		$this->assertInstanceOf(Presentation::class, new Presentation());
	}
}
