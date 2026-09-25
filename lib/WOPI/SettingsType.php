<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\WOPI;

/**
 * The setting types that may be read or written through the WOPI endpoints.
 *
 * The value is the name of the directory the settings of that type are stored in, below the app
 * data folder. Use {@see self::tryFrom()} to turn a request supplied type into a case; anything
 * that is not one of these must be refused rather than reaching the file system.
 */
enum SettingsType: string {
	/** Settings of a single user, stored per user below the type directory. */
	case UserConfig = 'userconfig';

	/** Instance wide settings an admin distributes to every session. */
	case SystemConfig = 'systemconfig';
}
