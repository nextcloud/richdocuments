/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'

export async function setOverviewGridView(value) {
	await axios.put(generateUrl('/apps/richdocuments/settings/overview/grid_view'), { value })
}
