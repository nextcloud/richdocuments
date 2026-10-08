/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import axios from '@nextcloud/axios'
import { generateFilePath } from '@nextcloud/router'

/**
 *
 * @param data
 */
export function savePersonalSetting(data) {
	return axios.post(generateFilePath('richdocuments', 'ajax', 'personal.php'), data)
}
