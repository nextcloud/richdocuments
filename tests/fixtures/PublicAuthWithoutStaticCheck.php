<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\DAV\Connector\Sabre;

use OCP\Share\IShare;

/**
 * Shape of PublicAuth on servers before the static isShareInSession
 */
class PublicAuth {
	private function isShareInSession(IShare $share): bool {
		return true;
	}
}
