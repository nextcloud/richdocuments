/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'

/**
 * Persist the user's grid/list view preference for the Office Overview.
 *
 * @param {boolean} value True for grid view, false for list view
 * @return {Promise<void>}
 */
export async function setOverviewGridView(value) {
	await axios.put(generateUrl('/apps/richdocuments/settings/overview/grid_view'), { value })
}
