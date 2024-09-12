/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import axios from '@nextcloud/axios'
import { generateOcsUrl, generateFilePath } from '@nextcloud/router'
import { getSharingToken } from '@nextcloud/sharing/public'
import { getCurrentDirectory } from '../helpers/filesApp.js'

export const createEmptyFile = async (mimeType, fileName, templateId = null) => {
	const shareToken = getSharingToken()
	const directoryPath = getCurrentDirectory()

	const response = await axios.post(generateOcsUrl('apps/richdocuments/api/v1/file', 2), {
		mimeType,
		fileName,
		directoryPath,
		shareToken,
		templateId,
	})

	return response.data
}

export const savePersonalSetting = (data) => {
	return axios.post(generateFilePath('richdocuments', 'ajax', 'personal.php'), data)
}
