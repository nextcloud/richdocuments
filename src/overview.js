/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import './init-shared.js'
import Vue from 'vue'
import OfficeOverview from './views/OfficeOverview.vue'

Vue.prototype.t = t
Vue.prototype.n = n

new Vue({
	render: h => h(OfficeOverview),
}).$mount('#content')
