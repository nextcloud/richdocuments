/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { isPublicShare } from '@nextcloud/sharing/public'
import {
	isDocument,
	isDownloadHidden,
	isPdf,
} from './helpers/index.js'
import { openPath } from './helpers/viewer.js'
import { getCapabilities } from './services/capabilities.ts'

document.addEventListener('DOMContentLoaded', () => {
	if (!isPublicShare()) {
		return
	}

	const isEnabledFilesPdfViewer = getCapabilities().mimetypesNoDefaultOpen.includes('application/pdf')

	if ((isDownloadHidden() || !isEnabledFilesPdfViewer) && isPdf()) {
		openPath('', 'richdocuments')
	} else if (isDocument()) {
		openPath('')
	}
})
