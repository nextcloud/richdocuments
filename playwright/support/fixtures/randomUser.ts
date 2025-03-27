/**
 * SPDX-FileCopyrightText: 2024 Ferdinand Thiessen <opensource@fthiessen.de>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { test as base } from '@playwright/test'
import { createRandomUser, login } from '@nextcloud/e2e-test-server/playwright'

/**
 * This test fixture ensures a new random user is created and used for the test (current page)
 */
export const test = base.extend({
	page: async ({ browser, baseURL }, use) => {
		// Important: make sure we authenticate in a clean environment by unsetting storage state.
		const page = await browser.newPage({
			storageState: undefined,
			baseURL,
		})

		const user = await createRandomUser()
		await login(page.request, user)

		await use(page)
		await page.close()
	},
})