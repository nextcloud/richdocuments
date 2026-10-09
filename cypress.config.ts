/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { defineConfig } from 'cypress'
import setupPlugins from './cypress/plugins/index.js'

export default defineConfig({
	env: {
		collaboraUrl: process.env.CYPRESS_collaboraUrl ?? 'https://localhost:9980/',
	},
	projectId: 'fef71b',
	viewportWidth: 1280,
	viewportHeight: 720,
	chromeWebSecurity: false,
	modifyObstructiveCode: false,
	e2e: {
		setupNodeEvents(on, config) {
			return setupPlugins(on, config)
		},
		baseUrl: 'https://localhost:8081/index.php/',
		specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
	},
})
