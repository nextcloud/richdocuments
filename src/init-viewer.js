/*!
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import './init-shared.js'

import { getCapabilities } from './services/capabilities.ts'
import { registerHandler } from '@nextcloud/viewer'

const supportedMimes = getCapabilities().mimetypes
const AsyncViewerComponent = () => import('./view/Viewer.vue')

const viewerHandler = {
	id: 'richdocuments',
	group: null,
	mimes: supportedMimes,
	component: AsyncViewerComponent,
	theme: 'default',
	canCompare: true,
}

registerHandler(viewerHandler)
