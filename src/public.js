/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import isPublic from './helpers/isPublicPage.js'
import isDocument from './helpers/isDocument.js'

document.addEventListener('DOMContentLoaded', () => {

	// Public share, but not a supported mimetype - do nothing
	if (isPublic() && !isDocument()) {
		return
	}

	// Public share, and is a supported mimetype - open viewer
	if (isPublic() && isDocument()) {
		if (OCA.Viewer) {
			OCA.Viewer.open({ path: '/' })
		}
	}
})
