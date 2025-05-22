/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import axios from '@nextcloud/axios'
import { generateOcsUrl, generateFilePath } from '@nextcloud/router'
import { getSharingToken } from '@nextcloud/sharing/public'

export const createEmptyFile = async (context, mimeType, fileName, templateId = null) => {
	const shareToken = getSharingToken()

	const response = await axios.post(generateOcsUrl('apps/richdocuments/api/v1/file', 2), {
		mimeType,
		fileName,
		directoryPath: context.dirname,
		shareToken,
		templateId,
	})

	return response.data
}

export const savePersonalSetting = (data) => {
	return axios.post(generateFilePath('richdocuments', 'ajax', 'personal.php'), data)
}
