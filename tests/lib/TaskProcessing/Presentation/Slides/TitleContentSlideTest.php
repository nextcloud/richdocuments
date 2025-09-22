<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments;

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
			[ 'JumpToSlide' => 0 ],

			[
				'EditTextObject.0' => [
					'SelectParagraph' => 0,
					'InsertText' => 'Title',
				]
			],
			[
				'EditTextObject.1' => [
					'SelectText' => [],
					'UnoCommand' => '.uno:Cut',
					'InsertText' => 'Content',
				]
			]
		];

		$this->assertJsonStringEqualsJsonString(
			json_encode($expectedSlideCommands),
			json_encode($slide->getSlideCommands()),
		);
	}

	public function testSlideCommandsWithArrayContent(): void {
		$slide = new TitleContentSlide(0, 'Title', ['Content', 'Content']);

		$expectedSlideCommands = [
			// Jump to slide at $this->getPosition()
			[ 'JumpToSlide' => 0 ],

			[
				'EditTextObject.0' => [
					'SelectParagraph' => 0,
					'InsertText' => 'Title',
				]
			],
			[
				'EditTextObject.1' => [
					'SelectText' => [],
					'UnoCommand' => '.uno:Cut',
					'InsertText' => '• Content' . PHP_EOL . '• Content',
				]
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
			// Duplicates slide at index $this->getPosition() - 1
			[ 'DuplicateSlide' => 1 ],

			// Jump to slide at $this->getPosition()
			[ 'JumpToSlide' => 2 ],

			[
				'EditTextObject.0' => [
					'SelectParagraph' => 0,
					'InsertText' => 'Title',
				]
			],
			[
				'EditTextObject.1' => [
					'SelectText' => [],
					'UnoCommand' => '.uno:Cut',
					'InsertText' => 'Content',
				]
			]
		];

		$this->assertJsonStringEqualsJsonString(
			json_encode($expectedSlideCommands),
			json_encode($slide->getSlideCommands()),
		);
	}
}
