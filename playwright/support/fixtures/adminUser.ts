/**
 * SPDX-FileCopyrightText: 2024 Elizabeth Danzberger <lizzy7128@tutanota.de>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { test as base } from '@playwright/test'
import { login } from '@nextcloud/e2e-test-server/playwright'
import { User } from '@nextcloud/e2e-test-server'

export const test = base.extend({
    page: async ({ browser, baseURL }, use) => {
        const page = await browser.newPage({
            storageState: undefined,
            baseURL,
        })

        const adminUser = new User('admin', 'admin')
        await login(page.request, adminUser)

        await use(page)
        await page.close()
    }
})