/**
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
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
 *
 */

import Config from './../services/config.tsx'
import { getCurrentUser } from '@nextcloud/auth'
import mobile from './mobile'

const getGuestNameCookie = function() {
	const name = 'guestUser='
	const matchedCookie = document.cookie.split(';')
		.map((cookie) => {
			try {
				return decodeURIComponent(cookie.trim())
			} catch (e) {
				return cookie.trim()
			}
		}).find((cookie) => {
			return cookie.indexOf(name) === 0
		})
	return matchedCookie ? matchedCookie.substring(name.length) : ''
}

const setGuestNameCookie = function(username) {
	if (username !== '') {
		document.cookie = 'guestUser=' + encodeURIComponent(username) + '; path=/'
	}
}

const shouldAskForGuestName = () => {
	return !mobile.isDirectEditing()
		&& (!getCurrentUser() || getCurrentUser()?.uid === '')
		&& !Config.get('userId')
		&& getGuestNameCookie() === ''
		&& (Config.get('permissions') & OC.PERMISSION_UPDATE)
}

export {
	getGuestNameCookie,
	setGuestNameCookie,
	shouldAskForGuestName,
}
