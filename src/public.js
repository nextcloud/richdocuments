/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import {
	isPublic,
	isPdf,
	isDownloadHidden,
} from './helpers/index.js'
import NewFileMenu from './view/NewFileMenu.js'

document.addEventListener('DOMContentLoaded', () => {
	if (!isPublic() || !OCA.Viewer) {
		return
	}

	if (OCA.Files && OCA.Files.fileActions) {
		OC.Plugins.register('OCA.Files.NewFileMenu', NewFileMenu)
	}

	if (isDownloadHidden() && isPdf()) {
		OCA.Viewer.openWith('richdocuments', { path: '/' })
	} else {
		OCA.Viewer.open({ path: '/' })
	}
})
