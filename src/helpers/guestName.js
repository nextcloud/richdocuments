/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import {
	getCurrentUser,
	getGuestNickname,
} from '@nextcloud/auth'
import getLoggedInUser from '../helpers/getLoggedInUser.js'

/**
 * Determines if the user should be asked to enter a guest name
 *
 * @param {string} mimetype - Mimetype of the file
 * @param {boolean} canWrite - If write access is granted
 */
export function shouldAskForGuestName(mimetype, canWrite) {
	const noLoggedInUser = !getLoggedInUser()
	const noGuest = !getGuestNickname()
	const noCurrentUser = !getCurrentUser() || getCurrentUser()?.uid === ''
	const isReadOnlyPDF = mimetype === 'application/pdf' && !canWrite

	if (!canWrite) {
		return false
	}

	return noLoggedInUser && noGuest && noCurrentUser && !isReadOnlyPDF
}
