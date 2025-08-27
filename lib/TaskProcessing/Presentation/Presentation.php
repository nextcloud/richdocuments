<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\TaskProcessing\Presentation;

class Presentation {
	/** @var ISlide[] $slides */
	private $slides = [];

	public function __construct() {
	}

	/**
	 * @param ISlide $slide Slide to be inserted into the presentation
	 */
	public function addSlide(ISlide $slide): void {
		$this->slides[] = $slide;
	}

	/**
	 * @return ISlide[] Array of slides in the presentation
	 */
	public function getSlides(): array {
		return $this->slides;
	}

	/**
	 * @return array Slide commands to be passed to an external API
	 */
	public function getSlideCommands(): array {
		$slideCommands = array_map(
			function (ISlide $slide) {
				return $slide->getSlideCommands();
			},
			$this->getSlides(),
		);

		$slideCommands = array_merge([], ...$slideCommands);

		return [ 'SlideCommands' => $slideCommands ];
	}
}
