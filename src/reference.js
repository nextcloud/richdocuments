/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import './init-shared.js'

import { createApp } from 'vue'
import { translate as t } from '@nextcloud/l10n'

import { registerCustomPickerElement, NcCustomPickerRenderResult } from '@nextcloud/vue/functions/reference'

import DocumentTargetPicker from './view/DocumentTargetPicker.vue'

registerCustomPickerElement('office-target', (el, { providerId, accessible }) => {
	const app = createApp(DocumentTargetPicker, {
		providerId,
		accessible,
		onSubmit: (link) => el.dispatchEvent(new CustomEvent('submit', { detail: link })),
		onCancel: () => el.dispatchEvent(new CustomEvent('cancel')),
	})
	app.config.globalProperties.t = t
	app.mount(el)
	return new NcCustomPickerRenderResult(el, app)
}, (el, renderResult) => {
	renderResult.object.unmount()
})
