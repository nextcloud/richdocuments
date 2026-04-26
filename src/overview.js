/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import './init-shared.js'
import Vue from 'vue'
import VueRouter from 'vue-router'
import { generateUrl } from '@nextcloud/router'
import { translate as t, translatePlural as n } from '@nextcloud/l10n'

import OverviewApp from './views/Overview/OverviewApp.vue'
import HomeView from './views/Overview/HomeView.vue'
import RecentView from './views/Overview/RecentView.vue'
import SharedView from './views/Overview/SharedView.vue'
import TemplatesView from './views/Overview/TemplatesView.vue'
import { mountHoverPreview } from './views/Overview/hoverPreviewMount.js'

Vue.prototype.t = t
Vue.prototype.n = n
Vue.prototype.OC = OC
Vue.prototype.OCA = OCA

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	// The Nextcloud route /apps/richdocuments/overview is the SPA shell;
	// every sub-path (recent, shared, templates) is rendered client-side.
	// No trailing slash here — vue-router 3 normalises base internally and
	// matches the Files app pattern.
	base: generateUrl('/apps/richdocuments/overview'),
	routes: [
		{ path: '/', name: 'home', component: HomeView },
		{ path: '/recent', name: 'recent', component: RecentView },
		{ path: '/shared', name: 'shared', component: SharedView },
		{ path: '/templates', name: 'templates', component: TemplatesView },
		{ path: '*', redirect: { name: 'home' } },
	],
})

// Mount AT #content (replacing it) the same way the Files app does. NcContent
// uses position:fixed and was designed to BE #content, so wrapping it inside
// a child div makes it overlay the Nextcloud header / app menu instead of
// sitting alongside them.
const OverviewAppVue = Vue.extend(OverviewApp)
new OverviewAppVue({
	router,
}).$mount('#content')

// Singleton hover-preview popover lives directly under <body> so it
// escapes the overflow:hidden / transform of cards and NcContent.
mountHoverPreview()
