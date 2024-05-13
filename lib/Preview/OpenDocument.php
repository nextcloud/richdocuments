<?php
/**
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */
namespace OCA\Richdocuments\Preview;

//.odt, .ott, .oth, .odm, .odg, .otg, .odp, .otp, .ods, .ots, .odc, .odf, .odb, .odi, .oxt
class OpenDocument extends Office {
	public const MIMETYPE_REGEX = '/application\/vnd.oasis.opendocument.*/';
	/**
	 * {@inheritDoc}
	 */
	public function getMimeType(): string {
		return self::MIMETYPE_REGEX;
	}
}
