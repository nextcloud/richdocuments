/**
 * SPDX-FileCopyrightText: 2023 Julius Härtl <jus@bitgrid.net>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import './commands.js'

Cypress.Screenshot.defaults({
	overwrite: true,
	capture: 'viewport',
})

Cypress.on('uncaught:exception', (err) => {
	if (err.message.includes('ResizeObserver')) {
		return false
	}

	if (err.message.includes('fetchpriority')) {
		return false
	}

	// NcModal activates its focus trap with the mask element as fallback, which
	// is already gone when a dialog unmounts while the viewer is closing.
	if (err.message.includes('fallbackFocus')) {
		return false
	}

	return true
})
