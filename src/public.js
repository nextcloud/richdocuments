/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import {
	isPublic,
	isPdf,
	isDocument,
	isDownloadHidden,
} from './helpers/index.js'
import { getCapabilities } from './services/capabilities.ts'
import { getCurrentUser } from '@nextcloud/auth'
import NewFileMenu from './view/NewFileMenu.js'

document.addEventListener('DOMContentLoaded', () => {
	if (!isPublic() || !OCA.Viewer) {
		return
	}

	const userGroups = getCurrentUser()?.groups || [];
	const editGroups = getCapabilities().config.edit_groups || [];
	const editGroupsArray = Array.isArray(editGroups) ? editGroups : [editGroups];
	const userInEditGroups = editGroupsArray.some(group => userGroups.includes(group));

	if (OCA.Files && OCA.Files.fileActions && userInEditGroups) {
		OC.Plugins.register('OCA.Files.NewFileMenu', NewFileMenu)
	}

	const isEnabledFilesPdfViewer = getCapabilities().mimetypesNoDefaultOpen.includes('application/pdf')

	if ((isDownloadHidden() || !isEnabledFilesPdfViewer) && isPdf()) {
		OCA.Viewer.openWith('richdocuments', { path: '/' })
	} else if (isDocument()) {
		OCA.Viewer.open({ path: '/' })
	}
})
