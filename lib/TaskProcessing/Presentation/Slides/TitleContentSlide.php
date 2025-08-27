<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\TaskProcessing\Presentation\Slides;

use OCA\Richdocuments\TaskProcessing\Presentation\ISlide;
use OCA\Richdocuments\TaskProcessing\Presentation\LayoutType;

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

		if ($this->getPosition() > 0) {
			$slideCommands[] = [ 'JumpToSlide' => 'last' ];
			$slideCommands[] = [ 'InsertMasterSlide' => 0 ];
		}

		$slideCommands[] = [ 'ChangeLayoutByName' => LayoutType::TitleContent->value ];
		$slideCommands[] = [ 'SetText.0' => $this->getTitle() ];

		if (is_array($this->getContent())) {
			$editTextObjectCommands = [
				[ 'SelectParagraph' => 0 ],
				[ 'InsertText' => implode(PHP_EOL, $this->getContent()) ],
			];

			$slideCommands[] = [ 'EditTextObject.1' => $editTextObjectCommands ];
		} else {
			$slideCommands[] = [ 'SetText.1' => $this->getContent() ];
		}

		return $slideCommands;
	}
}
