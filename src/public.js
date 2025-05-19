import { getCapabilities } from '@nextcloud/capabilities'
import {
	isPublic,
	isPdf,
	isDocument,
	isDownloadHidden,
} from './helpers/index.js'
import { getCurrentUser } from '@nextcloud/auth'
import NewFileMenu from './view/NewFileMenu.js'

const optionalMimetypes = getCapabilities().richdocuments.mimetypesNoDefaultOpen

document.addEventListener('DOMContentLoaded', () => {
	if (!isPublic() || !OCA.Viewer) {
		return
	}

	const userGroups = getCurrentUser()?.groups || []
	const editGroups = getCapabilities().richdocuments.config.edit_groups || []
	const editGroupsArray = Array.isArray(editGroups) ? editGroups : [editGroups]
	const userInEditGroups = editGroupsArray.some(group => userGroups.includes(group))

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
