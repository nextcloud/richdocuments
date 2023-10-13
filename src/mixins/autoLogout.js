/*
 * @copyright Copyright (c) 2023 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import axios from '@nextcloud/axios'
import { loadState } from '@nextcloud/initial-state'
import { generateUrl } from '@nextcloud/router'
import { getCurrentUser } from '@nextcloud/auth'

const config = loadState('core', 'config', {})

const getInterval = () => {
	const interval = config.session_lifetime ? Math.floor(config.session_lifetime / 2) : 900
	return Math.min(24 * 3600, Math.max(60, interval))
}

export default {

	data() {
		return {
			autoLogoutInterval: null,
			autoLogoutRegistered: false,
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

	beforeDestroy() {
		if (this.autoLogoutInterval) {
			clearInterval(this.autoLogoutInterval)
		}
	},

	methods: {
		extendAutoLogout() {
			const oldValue = localStorage.getItem('lastActive')
			const newValue = Date.now().toString()
			localStorage.setItem('lastActive', newValue)
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

			const elapsed = args.Elapsed
			const lastActive = Number(localStorage.getItem('lastActive'))
			const timeSinceLastActive = Date.now() - lastActive
			const recheckAfter = (getInterval() * 1000)

			if (!config.session_keepalive && timeSinceLastActive > recheckAfter) {
				axios.get(generateUrl('/apps/richdocuments/heartbeat'))
			}

			if (elapsed < 30) {
				console.debug('[richdocuments] Extending auto logout timeout, office idle since ' + elapsed, timeSinceLastActive, recheckAfter, timeSinceLastActive > recheckAfter)
				this.extendAutoLogout()
			}
		},
	},

}
