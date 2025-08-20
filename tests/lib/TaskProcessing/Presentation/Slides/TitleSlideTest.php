<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments;

use OCA\Richdocuments\TaskProcessing\Presentation\LayoutType;
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
			[ 'ChangeLayoutByName' => LayoutType::Title->value ],
			[ 'SetText.0' => 'Title' ],
			[ 'SetText.1' => 'Subtitle' ],
		];

		$this->assertJsonStringEqualsJsonString(
			json_encode($expectedSlideCommands),
			json_encode($slide->getSlideCommands()),
		);
	}

	public function testSlideCommandsWithPosition(): void {
		$slide = new TitleSlide(2, 'Title', 'Subtitle');

		$expectedSlideCommands = [
			[ 'JumpToSlide' => 'last' ],
			[ 'InsertMasterSlide' => 0 ],
			[ 'ChangeLayoutByName' => LayoutType::Title->value ],
			[ 'SetText.0' => 'Title' ],
			[ 'SetText.1' => 'Subtitle' ],
		];

		$this->assertJsonStringEqualsJsonString(
			json_encode($expectedSlideCommands),
			json_encode($slide->getSlideCommands()),
		);
	}
}
