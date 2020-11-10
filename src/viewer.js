import Office from './view/Office'
import { getCapabilities } from '@nextcloud/capabilities'

const supportedMimes = 	getCapabilities().richdocuments.mimetypes

document.addEventListener('DOMContentLoaded', function(event) {
	// Only use it outside the files app for now
	if (typeof OCA !== 'undefined'
		&& typeof OCA.Files !== 'undefined'
		&& typeof OCA.Files.fileActions !== 'undefined'
	) {
		return
	}

	if (OCA.Viewer) {
		OCA.Viewer.registerHandler({
			id: 'richdocuments',
			group: null,
			mimes: supportedMimes,
			component: Office
		})
	}
})
