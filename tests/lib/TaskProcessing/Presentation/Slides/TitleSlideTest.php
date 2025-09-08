<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments;

use OCA\Richdocuments\TaskProcessing\Presentation\Slides\TitleSlide;
use PHPUnit\Framework\TestCase;

class TitleSlideTest extends TestCase {
	public function setUp(): void {
		parent::setUp();
	}

	public function testCreateTitleSlide(): void {
		$slide = new TitleSlide(0, 'Title', 'Subtitle');
		
		$this->assertInstanceOf(TitleSlide::class, $slide);

		$this->assertEquals($slide->getPosition(), 0);
		$this->assertEquals($slide->getTitle(), 'Title');
		$this->assertEquals($slide->getSubtitle(), 'Subtitle');
	}

	public function testSlideCommands(): void {
		$slide = new TitleSlide(0, 'Title', 'Subtitle');

		$expectedSlideCommands = [
			[
				'EditTextObject.0' => [
					'SelectParagraph' => 0,
					'InsertText' => 'Title',
				],
			],
			[
				'EditTextObject.1' => [
					'SelectParagraph' => 0,
					'InsertText' => 'Subtitle',
				]
			],
		];

		$this->assertJsonStringEqualsJsonString(
			json_encode($expectedSlideCommands),
			json_encode($slide->getSlideCommands()),
		);
	}
}
