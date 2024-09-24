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
