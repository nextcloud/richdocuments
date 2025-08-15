<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\TaskProcessing\Presentation\Slides;

use OCA\Richdocuments\TaskProcessing\Presentation\ISlide;
use OCA\Richdocuments\TaskProcessing\Presentation\LayoutType;

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

		if ($this->getPosition() > 0) {
			$slideCommands[] = [ 'JumpToSlide' => 'last' ];
			$slideCommands[] = [ 'InsertMasterSlide' => 0 ];
		}

		$slideCommands[] = [ 'ChangeLayoutByName' => LayoutType::Title->value ];
		$slideCommands[] = [ 'SetText.0' => $this->getTitle() ];
		$slideCommands[] = [ 'SetText.1' => $this->getSubtitle() ];

		return $slideCommands;
	}
}
