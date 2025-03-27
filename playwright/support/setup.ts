/**
 * SPDX-FileCopyrightText: 2024 Ferdinand Thiessen <opensource@fthiessen.de>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { test as setup } from '@playwright/test'
import { configureNextcloud, runOcc, setSystemConfig } from '@nextcloud/e2e-test-server/docker'

/**
 * We use this to ensure Nextcloud is configured correctly before running our tests
 *
 * This can not be done in the webserver startup process,
 * as that only checks for the URL to be accessible which happens already before everything is configured.
 */
setup('configure nextcloud', async () => {
	setup.slow()
	await configureNextcloud(['richdocuments', 'testing'])

	if (process.env.CI) {
		await setSystemConfig('trusted_domains 1', '172.17.0.1')
	}

	await runOcc(['config:app:set', 'richdocuments', 'wopi_url', '--value', 'http://localhost:9980'])
	await runOcc(['config:app:set', 'richdocuments', 'public_wopi_url', '--value', 'http://localhost:9980'])
	await runOcc(['richdocuments:activate-config'])
})
