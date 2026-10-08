/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import './init-shared.js'
import { createApp } from 'vue'
import AdminSettings from './components/AdminSettings.vue'
import '../css/admin.scss'

// CSP config for webpack dynamic chunk loading
// eslint-disable-next-line
__webpack_nonce__ = btoa(OC.requestToken)

// Correct the root of the app for chunk loading
// OC.linkTo matches the apps folders
// eslint-disable-next-line
__webpack_public_path__ = OC.linkTo('richdocuments', 'js/')

const element = document.getElementById('admin-vue')

const app = createApp(AdminSettings, { initial: JSON.parse(element.dataset.initial) })
app.config.globalProperties.t = t
app.config.globalProperties.n = n
app.config.globalProperties.OC = OC
app.config.globalProperties.OCA = OCA
app.mount(element)
