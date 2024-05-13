<?php
/**
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */
namespace OCA\Richdocuments\Preview;

class MSWord extends Office {
	public const MIMETYPE_REGEX = '/application\/msword/';
	/**
	 * {@inheritDoc}
	 */
	public function getMimeType(): string {
		return self::MIMETYPE_REGEX;
	}
}
