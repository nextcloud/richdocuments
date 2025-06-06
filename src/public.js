import { getCapabilities } from '@nextcloud/capabilities'
import {
	isPublic,
	isPdf,
	isDocument,
	isDownloadHidden,
} from './helpers/index.js'
import NewFileMenu from './view/NewFileMenu.js'
import { loadState } from '@nextcloud/initial-state'

const optionalMimetypes = getCapabilities().richdocuments.mimetypesNoDefaultOpen

document.addEventListener('DOMContentLoaded', () => {
	if (!isPublic() || !OCA.Viewer) {
		return
	}

	const userInEditGroups = loadState('richdocuments', 'userInEditGroups', true)

	if (OCA.Files && OCA.Files.fileActions && userInEditGroups) {
		OC.Plugins.register('OCA.Files.NewFileMenu', NewFileMenu)
	}

	const isEnabledFilesPdfViewer = optionalMimetypes.includes('application/pdf')

	if ((isDownloadHidden() || !isEnabledFilesPdfViewer) && isPdf()) {
		OCA.Viewer.openWith('richdocuments', { path: '/' })
	} else if (isDocument()) {
		OCA.Viewer.open({ path: '/' })
	}
})
