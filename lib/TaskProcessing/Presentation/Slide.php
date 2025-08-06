<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\TaskProcessing\Presentation;

class Slide {
	private string $title;

	public function __construct(string $title = '') {
		$this->title = $title;
	}

	public function setTitle(string $title): void {
		$this->title = $title;
	}

	public function getTitle(): string {
		return $this->title;
	}

	public function getSlideCommands(): array {
		return [
			[ 'ChangeLayoutByName' => 'AUTOLAYOUT_TITLE_CONTENT' ],
			[ 'SetText.0' => $this->title ]
		];
	}
}
