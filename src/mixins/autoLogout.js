/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { getCurrentUser } from '@nextcloud/auth'
import axios from '@nextcloud/axios'
import { loadState } from '@nextcloud/initial-state'
import { generateUrl } from '@nextcloud/router'

const config = loadState('core', 'config', {})

/**
 *
 */
function getInterval() {
	const interval = config.session_lifetime ? Math.floor(config.session_lifetime / 2) : 900
	return Math.min(24 * 3600, Math.max(60, interval))
}

export default {

	data() {
		return {
			autoLogoutInterval: null,
			autoLogoutRegistered: false,
			lastHeartbeat: Date.now(),
		}
	},

	mounted() {
		if (!getCurrentUser()) {
			return
		}

		if (config?.auto_logout || !config?.session_keepalive) {
			this.autoLogoutInterval = setInterval(this.registerCheck, 10000)
		}
	},

	beforeUnmount() {
		if (this.autoLogoutInterval) {
			clearInterval(this.autoLogoutInterval)
		}
		if (this.autoLogoutRegistered) {
			this.postMessage.unregisterPostMessageHandler(this.handleGetUserStateResponse)
		}
	},

	methods: {
		extendAutoLogout() {
			const newValue = Date.now().toString()
			let oldValue = null
			try {
				oldValue = localStorage.getItem('lastActive')
				localStorage.setItem('lastActive', newValue)
			} catch (error) {
				// Core reads the activity from the event below, so only other tabs miss it
				console.debug('[richdocuments] Could not store the last activity', error)
			}
			const event = new StorageEvent('storage', {
				key: 'lastActive',
				oldValue,
				newValue,
			})
			window.dispatchEvent(event)
		},
		registerCheck() {
			if (!this.autoLogoutRegistered && this.postMessage) {
				this.postMessage.registerPostMessageHandler(this.handleGetUserStateResponse)
				this.autoLogoutRegistered = true
			}
			if (this.autoLogoutRegistered && this.postMessage) {
				this.sendPostMessage('Get_User_State')
			}
		},
		handleGetUserStateResponse({ parsed: { msgId, args } }) {
			if (msgId !== 'Get_User_State_Resp') {
				return
			}

			// Seconds since the last user interaction in the document
			if (args.Elapsed < 30) {
				console.debug('[richdocuments] Extending auto logout timeout, office idle since ' + args.Elapsed)
				this.extendAutoLogout()
			}

			// Collabora does not extend the user session on interaction
			const lastInteraction = Date.now() - args.Elapsed * 1000
			if (!config.session_keepalive && lastInteraction > this.lastHeartbeat && Date.now() - this.lastHeartbeat > getInterval() * 1000) {
				const previousHeartbeat = this.lastHeartbeat
				const heartbeat = Date.now()
				this.lastHeartbeat = heartbeat
				axios.get(generateUrl('/apps/richdocuments/heartbeat')).catch((error) => {
					console.debug('[richdocuments] Heartbeat failed, retrying with the next check', error)
					// A request that hangs past the next interval must not undo the newer attempt
					if (this.lastHeartbeat === heartbeat) {
						this.lastHeartbeat = previousHeartbeat
					}
				})
			}
		},
	},

}
