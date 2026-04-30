<?php
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
\OCP\Util::addScript('richdocuments', 'richdocuments-overview');
\OCP\Util::addStyle('richdocuments', 'overview');
// The Vue app mounts at #content (replacing it) — matching the pattern
// used by the Files app. Mounting inside a wrapper div would cause
// NcContent's position:fixed layout to overlay the Nextcloud chrome.
?>
