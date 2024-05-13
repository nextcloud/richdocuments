<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Preview;

class EMF extends Office {
	public const MIMETYPE_REGEX = '/image\/emf/';
	/**
	 * {@inheritDoc}
	 */
	public function getMimeType(): string {
		return self::MIMETYPE_REGEX;
	}
}
