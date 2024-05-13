/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
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
