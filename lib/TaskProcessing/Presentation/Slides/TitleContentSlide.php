<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\TaskProcessing\Presentation\Slides;

use OCA\Richdocuments\TaskProcessing\Presentation\ISlide;

class TitleContentSlide implements ISlide {
	private int $position;
	private string $title;
	private string|array $content;

	public function __construct(
		int $position,
		string $title,
		string|array $content) {
		$this->position = $position;
		$this->title = $title;
		$this->content = $content;
	}

	public function getTitle(): string {
		return $this->title;
	}

	public function getContent(): string|array {
		return $this->content;
	}

	public function getPosition(): int {
		return $this->position;
	}

	public function getSlideCommands(): array {
		$slideCommands = [];

		if ($this->getPosition() > 1) {
			$slideCommands[] = [ 'DuplicateSlide' => $this->getPosition() - 1 ];
		}

		$slideCommands[] = [ 'JumpToSlide' => $this->getPosition() ];

		$slideCommands[] = [
			'EditTextObject.0' => [
				'SelectParagraph' => 0,
				'InsertText' => $this->getTitle(),
			]
		];

		if (is_array($this->getContent())) {
			$slideCommands[] = [
				'EditTextObject.1' => [
					'SelectText' => [],
					'UnoCommand' => '.uno:Cut',
					'InsertText' => implode(PHP_EOL, array_map(function ($bulletPoint) {
						return '• ' . $bulletPoint;
					}, $this->getContent())),
				]
			];
		} else {
			$slideCommands[] = [
				'EditTextObject.1' => [
					'SelectText' => [],
					'UnoCommand' => '.uno:Cut',
					'InsertText' => $this->getContent(),
				]
			];
		}

		return $slideCommands;
	}
}
