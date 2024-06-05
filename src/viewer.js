/**
 * SPDX-FileCopyrightText: 2013 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import './init-shared.js'
import '../css/filetypes.scss'

import Office from './view/Office.vue'
import { getCapabilities } from '@nextcloud/capabilities'

const supportedMimes = getCapabilities().richdocuments.mimetypes

if (OCA.Viewer) {
	OCA.Viewer.registerHandler({
		id: 'richdocuments',
		group: null,
		mimes: supportedMimes,
		component: Office,
		theme: 'light',
		canCompare: true,
	})
}
