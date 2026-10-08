/*!
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { translatePlural as n, translate as t } from '@nextcloud/l10n'
import { registerHandler } from '@nextcloud/viewer'
import { defineCustomElement } from 'vue'
import Viewer from './view/Viewer.vue'
import { getCapabilities } from './services/capabilities.ts'

import './init-shared.js'

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
	canCompare: true,
})
