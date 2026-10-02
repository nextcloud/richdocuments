/*!
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import './init-shared.js'

import { defineCustomElement } from 'vue'
import { translate as t, translatePlural as n } from '@nextcloud/l10n'
import { registerHandler } from '@nextcloud/viewer'
import { getCapabilities } from './services/capabilities.ts'
import Viewer from './view/Viewer.vue'

const tagName = 'richdocuments-viewer'

if (!window.customElements.get(tagName)) {
	window.customElements.define(tagName, defineCustomElement(Viewer, {
		shadowRoot: false,
		configureApp(app) {
			app.config.globalProperties.t = t
			app.config.globalProperties.n = n
		},
	}))
}

registerHandler({
	id: 'richdocuments',
	displayName: getCapabilities().productName,
	tagName,
	enabled: (nodes) => nodes.every((node) => getCapabilities().mimetypes.includes(node.mime)),
	theme: 'default',
})
