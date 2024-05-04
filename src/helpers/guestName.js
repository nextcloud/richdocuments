/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { getCurrentUser } from '@nextcloud/auth'
import getLoggedInUser from '../helpers/getLoggedInUser.js'

const cookieAlreadySet = (cookieName) => {
	return document.cookie
		.split(';')
		.some(cookie => {
			return cookie.trim().startsWith(`${cookieName}=`)
		})
}

const setGuestNameCookie = (username) => {
	if (username !== '') {
		document.cookie = 'guestUser=' + encodeURIComponent(username) + '; path=/'
	}
}

const shouldAskForGuestName = () => {
	const noLoggedInUser = !getLoggedInUser()
	const noGuestCookie = !cookieAlreadySet('guestUser')
	const noCurrentUser = !getCurrentUser() || getCurrentUser()?.uid === ''

	return noLoggedInUser && noGuestCookie && noCurrentUser
}

export {
	setGuestNameCookie,
	shouldAskForGuestName,
}
