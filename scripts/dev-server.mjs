/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

// Starts a throwaway Nextcloud with this checkout mounted, plus Collabora.
// Used for local browser testing and as the target of the Cypress e2e tests.
//
//   node scripts/dev-server.mjs start   (BRANCH=master by default)
//   node scripts/dev-server.mjs stop

import { execFileSync } from 'node:child_process'
import { copyFileSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { configureNextcloud, runExec, runOcc, startNextcloud, stopNextcloud, waitOnNextcloud } from '@nextcloud/e2e-test-server/docker'

const NEXTCLOUD_PORT = 8081
const COLLABORA_PORT = 9980
const COLLABORA_CONTAINER = 'richdocuments-dev-collabora'
const PRODUCTION_COMPOSER = join(tmpdir(), 'richdocuments-dev-composer')
const COLLABORA_IMAGE = process.env.COLLABORA_IMAGE ?? 'collabora/code:latest'
// How the containers reach each other through the host's published ports
const DOCKER_HOST = process.env.DOCKER_HOST_ADDRESS ?? (process.platform === 'linux' ? '172.17.0.1' : 'host.docker.internal')

const nextcloudUrl = `http://localhost:${NEXTCLOUD_PORT}`
const internalNextcloudUrl = `http://${DOCKER_HOST}:${NEXTCLOUD_PORT}`
const collaboraUrl = `http://localhost:${COLLABORA_PORT}`
const internalCollaboraUrl = `http://${DOCKER_HOST}:${COLLABORA_PORT}`

const docker = (...args) => execFileSync('docker', args, { stdio: 'inherit' })

function startCollabora() {
	execFileSync('docker', ['rm', '-f', COLLABORA_CONTAINER], { stdio: 'ignore' })
	docker('run', '-d', '--name', COLLABORA_CONTAINER,
		'-p', `${COLLABORA_PORT}:9980`,
		'--cap-add', 'SYS_ADMIN', '--cap-add', 'SYS_CHROOT',
		'-e', 'extra_params=--o:ssl.enable=false --o:home_mode.enable=true',
		'-e', `aliasgroup1=${internalNextcloudUrl}`,
		// Discovery reports this host to the browser, whichever host Nextcloud used to fetch it
		'-e', `server_name=localhost:${COLLABORA_PORT}`,
		COLLABORA_IMAGE)
}

async function waitOnCollabora() {
	for (let attempt = 0; attempt < 60; attempt++) {
		try {
			if ((await fetch(`${collaboraUrl}/hosting/discovery`)).ok) {
				return
			}
		} catch {}
		await new Promise((resolve) => setTimeout(resolve, 1000))
	}
	throw new Error(`Collabora did not come up on ${collaboraUrl}`)
}

async function start() {
	startCollabora()
	// The server gets a vendor without dev dependencies, whose OCP stubs would shadow its own classes.
	// Built next to a copy of the composer files so the autoloader paths stay relative to the app.
	mkdirSync(PRODUCTION_COMPOSER, { recursive: true })
	for (const file of ['composer.json', 'composer.lock']) {
		copyFileSync(file, join(PRODUCTION_COMPOSER, file))
	}
	execFileSync('composer', ['install', '--no-dev', '--no-interaction', '--quiet', '--working-dir', PRODUCTION_COMPOSER], { stdio: 'inherit' })
	const mounts = { 'apps-writable/richdocuments/vendor': join(PRODUCTION_COMPOSER, 'vendor') }
	await startNextcloud(process.env.BRANCH ?? 'master', true, { exposePort: NEXTCLOUD_PORT, mounts })
	await waitOnNextcloud('localhost:' + NEXTCLOUD_PORT)
	await configureNextcloud(['files_pdfviewer'])

	const occ = (...args) => runOcc(args, { verbose: true })
	await occ('config:system:set', 'trusted_domains', '1', '--value', 'localhost')
	await occ('config:system:set', 'trusted_domains', '2', '--value', DOCKER_HOST)
	await occ('config:system:set', 'allow_local_remote_servers', '--value', 'true', '--type', 'bool')
	await occ('config:system:set', 'debug', '--value', 'true', '--type', 'bool')
	await occ('app:enable', '--force', 'richdocuments')
	await waitOnCollabora()
	await occ('richdocuments:activate-config', '--wopi-url', internalCollaboraUrl, '--callback-url', internalNextcloudUrl)

	// Let a rebuild show up on reload, and drop the web server's APCu copy of discovery
	await runExec(['sed', '-i', 's/Header set Cache-Control "max-age=15778463[^"]*"/Header set Cache-Control "no-cache"/', '/var/www/html/.htaccess'], { user: 'root' })
	await runExec(['apache2ctl', 'graceful'], { user: 'root', failOnError: false })

	console.log(`\nReady: ${nextcloudUrl} (admin / admin)\nRebuild with "npm run watch", then reload the page.`)
}

async function stop() {
	execFileSync('docker', ['rm', '-f', COLLABORA_CONTAINER], { stdio: 'ignore' })
	await stopNextcloud()
}

const command = process.argv[2]
if (command === 'start') {
	await start()
} else if (command === 'stop') {
	await stop()
} else {
	console.error('Usage: node scripts/dev-server.mjs start|stop')
	process.exit(1)
}
