<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\TaskProcessing\Presentation;

interface ISlide {
	public function getPosition(): int;
	public function getSlideCommands(): array;
}
