import './init-shared.js'

import isPublic from './helpers/isPublicPage.js'
import isDocument from './helpers/isDocument.js'
import isPdf from './helpers/isPdf.js'

document.addEventListener('DOMContentLoaded', () => {
	const validMimetype = (isDocument() || isPdf())

	// Viewer app not enabled
	if (!OCA.Viewer) {
		return
	}

	// Not a public share or is not a valid mimetype
	if (!isPublic() || !validMimetype) {
		return
	}

	// If the share is a PDF or another supported document, we proceed to open it
	if (isPdf()) {
		OCA.Viewer.openWith('richdocuments', { path: '/' })
	} else if (isDocument()) {
		OCA.Viewer.open({ path: '/' })
	}
})
