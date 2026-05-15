<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\DirectEditing;

use OCP\DirectEditing\ATemplate;

class OfficeTemplate extends ATemplate {

	public function __construct(
		private string $id,
		private string $title,
		private string $preview,
	) {
	}

	#[\Override]
	public function getId(): string {
		return $this->id;
	}

	#[\Override]
	public function getTitle(): string {
		return $this->title;
	}

	#[\Override]
	public function getPreview(): string {
		return $this->preview;
	}
}
