/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { defineConfig } from 'cypress'

export default defineConfig({
  collaboraUrl: 'https://localhost:9980/',
  projectId: 'fef71b',
  viewportWidth: 1280,
  viewportHeight: 720,
  chromeWebSecurity: false,
  modifyObstructiveCode: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://localhost:8081/index.php/',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
