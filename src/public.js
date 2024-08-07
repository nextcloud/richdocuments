import './init-shared.js'

import { getCapabilities } from '@nextcloud/capabilities'
import {
	isPdf,
	isPublic,
	isDocument,
	isDownloadHidden,
} from './helpers/index.js'
import NewFileMenu from './view/NewFileMenu.js'

const optionalMimetypes = getCapabilities().richdocuments.mimetypesNoDefaultOpen

document.addEventListener('DOMContentLoaded', () => {
	if (!isPublic() || !OCA.Viewer) {
		return
	}

	if (OCA.Files && OCA.Files.fileActions) {
		OC.Plugins.register('OCA.Files.NewFileMenu', NewFileMenu)
	}

	const isEnabledFilesPdfViewer = optionalMimetypes.includes('application/pdf')

	if ((isDownloadHidden() || !isEnabledFilesPdfViewer) && isPdf()) {
		OCA.Viewer.openWith('richdocuments', { path: '/' })
	} else if (isDocument()) {
		OCA.Viewer.open({ path: '/' })
	}
})
