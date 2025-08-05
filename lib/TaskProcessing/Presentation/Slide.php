<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\TaskProcessing\Presentation;

class Slide {
	private string $title = '';
	private SlideLayout $layout = SlideLayout::Blank;

	public function __construct(
		string $title = '',
		SlideLayout $layout = SlideLayout::Blank,
	) {
		$this->title = $title;
		$this->$layout = $layout;
	}

	public function getSlideCommands(): array {
		return [];
	}
}
