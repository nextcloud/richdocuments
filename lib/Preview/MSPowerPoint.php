<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Preview;

class MSPowerPoint extends Office {
	public const MIMETYPE_REGEX = '/application\/vnd.ms-powerpoint/';
	/**
	 * {@inheritDoc}
	 */
	#[\Override]
	public function getMimeType(): string {
		return self::MIMETYPE_REGEX;
	}
}
