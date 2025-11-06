/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import './init-shared.js'

import Vue from 'vue'
import { translate as t } from '@nextcloud/l10n'

import { registerCustomPickerElement, NcCustomPickerRenderResult } from '@nextcloud/vue/dist/Components/NcRichText.js'

import DocumentTargetPicker from './view/DocumentTargetPicker.vue'
import FollowMePresentationPicker from './view/FollowMePresentationPicker.vue'

Vue.mixin({
	methods: {
		t,
	},
})
registerCustomPickerElement('office-target', (el, { providerId, accessible }) => {
	const Element = Vue.extend(DocumentTargetPicker)
	const vueElement = new Element({
		propsData: {
			providerId,
			accessible,
		},
	}).$mount(el)
	return new NcCustomPickerRenderResult(vueElement.$el, vueElement)
}, (el, renderResult) => {
	renderResult.object.$destroy()
})

registerCustomPickerElement('office-target-presentation', (el, { providerId, accessible }) => {
	const Element = Vue.extend(FollowMePresentationPicker)
	const vueElement = new Element({
		propsData: {
			providerId,
			accessible,
		},
	}).$mount(el)
	return new NcCustomPickerRenderResult(vueElement.$el, vueElement)
}, (el, renderResult) => {
	renderResult.object.$destroy()
})
