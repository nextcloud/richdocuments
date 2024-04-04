/**
 * @copyright Copyright (c) 2024 Elizabeth Danzberger <lizzy7128@tutanota.de>
 *
 * @author Elizabeth Danzberger <lizzy7128@tutanota.de>
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

import { loadState } from '@nextcloud/initial-state'

/**
 * Gets the current user's display name if logged in.
 *
 * @return boolean | string
 */
function getLoggedInUser() {
	return loadState('richdocuments', 'loggedInUser')
}

export default getLoggedInUser
