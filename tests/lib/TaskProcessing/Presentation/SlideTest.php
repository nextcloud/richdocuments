<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments;

use OCA\Richdocuments\TaskProcessing\Presentation\Slide;
use PHPUnit\Framework\TestCase;

class SlideTest extends TestCase {
	public function setUp(): void {
		parent::setUp();
	}

	public function testCreateSlide(): void {
		$this->assertInstanceOf(Slide::class, new Slide());
	}

	public function testCreateSlideWithTitle(): void {
		$slide = new Slide('Hello World');

		$this->assertEquals('Hello World', $slide->getTitle());
	}

	public function testSetSlideTitle(): void {
		$slide = new Slide();
		$this->assertEquals('', $slide->getTitle());

		$slide->setTitle('Hello World');
		$this->assertEquals('Hello World', $slide->getTitle());
	}
}
