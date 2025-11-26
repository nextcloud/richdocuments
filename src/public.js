/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { isPublicShare } from '@nextcloud/sharing/public'
import {
	isPdf,
	isDocument,
	isDownloadHidden,
} from './helpers/index.js'
import { getCapabilities } from './services/capabilities.ts'

document.addEventListener('DOMContentLoaded', () => {
	if (!isPublicShare() || !OCA.Viewer) {
		return
	}

	const isEnabledFilesPdfViewer = getCapabilities().mimetypesNoDefaultOpen.includes('application/pdf')

	if ((isDownloadHidden() || !isEnabledFilesPdfViewer) && isPdf()) {
		OCA.Viewer.openWith('richdocuments', { path: '/' })
	} else if (isDocument()) {
		OCA.Viewer.open({ path: '/' })
	}
})
