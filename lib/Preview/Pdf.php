<?php
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Preview;

class Pdf extends Office {
	public const MIMETYPE_REGEX = '/application\/pdf/';
	/**
	 * {@inheritDoc}
	 */
	public function getMimeType(): string {
		return self::MIMETYPE_REGEX;
	}
}
