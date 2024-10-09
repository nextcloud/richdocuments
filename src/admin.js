/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import './init-shared.js'
import Vue from 'vue'
import AdminSettings from './components/AdminSettings.vue'
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

const element = document.getElementById('admin-vue')

/* eslint-disable-next-line no-new */
new Vue({
	render: h => h(AdminSettings, { props: { initial: JSON.parse(element.dataset.initial) } }),
}).$mount('#admin-vue')
