/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { subscribe, emit } from '@nextcloud/event-bus'

/**
 * Reloads the current directory in the Files app
 */
function triggerUIRefresh() {
	// Only run in Files app
	if (!window.location.pathname.includes('/apps/files')) {
		return
	}

	emit('files:list:changed')

	const urlParams = new URLSearchParams(window.location.search)
	const currentDir = urlParams.get('dir') || '/'
	const cleanUrl = `${window.location.origin}/index.php/apps/files/files?dir=${encodeURIComponent(currentDir)}`
	window.location.href = cleanUrl
}

// Listen for export completion events and and trigger a delayed refresh
subscribe('richdocuments:export-completed', (event) => {
	// Minimal delay to ensure we're back in Files app context
	setTimeout(() => {
		triggerUIRefresh()
	}, 200)
})

// Also provide immediate refresh functionality for other triggers
window.richdocumentsRefreshFiles = triggerUIRefresh
