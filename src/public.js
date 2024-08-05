/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import isPublic from './helpers/isPublicPage.js'
import isDocument from './helpers/isDocument.js'
import isPdf from './helpers/isPdf.js'
import NewFileMenu from './view/NewFileMenu.js'

document.addEventListener('DOMContentLoaded', () => {
	if (!isPublic() || !OCA.Viewer) {
		return
	}

	if (OCA.Files && OCA.Files.fileActions) {
		OC.Plugins.register('OCA.Files.NewFileMenu', NewFileMenu)
	}

	if (isPdf()) {
		OCA.Viewer.openWith('richdocuments', { path: '/' })
	} else if (isDocument()) {
		OCA.Viewer.open({ path: '/' })
	}
})
