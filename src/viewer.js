/**
 * SPDX-FileCopyrightText: 2013 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import './init-shared.js'
import '../css/filetypes.scss'
import semver from 'semver'

import { getCapabilities } from './services/capabilities.ts'
import { autoSetupBuiltInCodeServerIfNeeded } from './services/builtInCode.ts'

// if this Nextcloud version ships a viewer with init script support, then we do not need to register the legacy viewer
// but if no we need to register it:
if (semver.lt(semver.coerce(globalThis.OC.config.version), '30.0.15')) {
	const supportedMimes = getCapabilities().mimetypes
	const AsyncViewerComponent = () => import('./view/Viewer.vue')

	if (OCA.Viewer) {
		OCA.Viewer.registerHandler({
			id: 'richdocuments',
			group: null,
			mimes: supportedMimes,
			component: AsyncViewerComponent,
			theme: 'default',
			canCompare: true,
		})
	} else {
		console.error('Unable to register viewer handler')
	}
}

autoSetupBuiltInCodeServerIfNeeded()
