<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments;

use OCA\Richdocuments\TaskProcessing\Presentation\LayoutType;
use OCA\Richdocuments\TaskProcessing\Presentation\Slides\TitleContentSlide;
use PHPUnit\Framework\TestCase;

class TitleContentSlideTest extends TestCase {
	public function setUp(): void {
		parent::setUp();
	}

	public function testCreateWithStringContent(): void {
		$slide = new TitleContentSlide(0, 'Title', 'Content');
		
		$this->assertInstanceOf(TitleContentSlide::class, $slide);

		$this->assertEquals($slide->getPosition(), 0);
		$this->assertEquals($slide->getTitle(), 'Title');

		$this->assertIsString($slide->getContent());
		$this->assertEquals($slide->getContent(), 'Content');
	}

	public function testCreateWithArrayContent(): void {
		$slide = new TitleContentSlide(0, 'Title', ['Content', 'Content']);

		$this->assertInstanceOf(TitleContentSlide::class, $slide);

		$this->assertEquals($slide->getPosition(), 0);
		$this->assertEquals($slide->getTitle(), 'Title');

		$this->assertIsArray($slide->getContent());
		$this->assertEquals($slide->getContent(), ['Content', 'Content']);
	}

	public function testSlideCommandsWithStringContent(): void {
		$slide = new TitleContentSlide(0, 'Title', 'Content');

		$expectedSlideCommands = [
			[ 'ChangeLayoutByName' => LayoutType::TitleContent->value ],
			[ 'SetText.0' => 'Title' ],
			[ 'SetText.1' => 'Content' ],
		];

		$this->assertJsonStringEqualsJsonString(
			json_encode($expectedSlideCommands),
			json_encode($slide->getSlideCommands()),
		);
	}

	public function testSlideCommandsWithArrayContent(): void {
		$slide = new TitleContentSlide(0, 'Title', ['Content', 'Content']);

		$expectedSlideCommands = [
			[ 'ChangeLayoutByName' => LayoutType::TitleContent->value ],
			[ 'SetText.0' => 'Title' ],
			[
				'EditTextObject.1' => [
					[ 'SelectParagraph' => 0 ],
					[ 'InsertText' => 'Content' . PHP_EOL . 'Content' ],
				],
			]
		];

		$this->assertJsonStringEqualsJsonString(
			json_encode($expectedSlideCommands),
			json_encode($slide->getSlideCommands()),
		);
	}

	public function testSlideCommandsWithPosition(): void {
		$slide = new TitleContentSlide(2, 'Title', 'Content');

		$expectedSlideCommands = [
			[ 'JumpToSlide' => 'last' ],
			[ 'InsertMasterSlide' => 0 ],
			[ 'ChangeLayoutByName' => LayoutType::TitleContent->value ],
			[ 'SetText.0' => 'Title' ],
			[ 'SetText.1' => 'Content' ],
		];

		$this->assertJsonStringEqualsJsonString(
			json_encode($expectedSlideCommands),
			json_encode($slide->getSlideCommands()),
		);
	}
}
