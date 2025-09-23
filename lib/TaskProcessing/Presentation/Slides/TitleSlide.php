<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\TaskProcessing\Presentation\Slides;

use OCA\Richdocuments\TaskProcessing\Presentation\ISlide;

class TitleSlide implements ISlide {
	private int $position;
	private string $title;
	private string $subtitle;

	public function __construct(
		int $position,
		string $title,
		string $subtitle) {
		$this->position = $position;
		$this->title = $title;
		$this->subtitle = $subtitle;
	}

	public function getTitle(): string {
		return $this->title;
	}

	public function getSubtitle(): string {
		return $this->subtitle;
	}

	public function getPosition(): int {
		return $this->position;
	}

	public function getSlideCommands(): array {
		$slideCommands = [];

		$slideCommands[] = [
			'EditTextObject.0' => [
				'SelectParagraph' => 0,
				'InsertText' => $this->getTitle(),
			]
		];

		$slideCommands[] = [
			'EditTextObject.1' => [
				'SelectParagraph' => 0,
				'InsertText' => $this->getSubtitle(),
			]
		];

		return $slideCommands;
	}
}
