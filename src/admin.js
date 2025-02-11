/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import './init-shared.js'
import Vue from 'vue'
import AdminSettings from './components/AdminSettings.vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import '../css/admin.scss'

// CSP config for webpack dynamic chunk loading
// eslint-disable-next-line
__webpack_nonce__ = btoa(OC.requestToken)

// Correct the root of the app for chunk loading
// OC.linkTo matches the apps folders
// eslint-disable-next-line
__webpack_public_path__ = OC.linkTo('richdocuments', 'js/')

Vue.prototype.t = t
Vue.prototype.n = n
Vue.prototype.OC = OC
Vue.prototype.OCA = OCA

Vue.use(PiniaVuePlugin)

const pinia = createPinia()
const element = document.getElementById('admin-vue')
const initialSettings = JSON.parse(element.dataset.initial)

// Hydrate the adminSettings store with the initial settings
// provided by the initial state
pinia.state.value = {
	adminSettings: {
		fonts: initialSettings.fonts,
	},
}

/* eslint-disable-next-line no-new */
new Vue({
	pinia,
	render: h => h(
		AdminSettings,
		{
			props: { initial: JSON.parse(element.dataset.initial) },
		}),
}).$mount('#admin-vue')
