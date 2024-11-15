import { registerFileAction, FileAction } from '@nextcloud/files'
import { getCapabilities } from '@nextcloud/capabilities'
import { translate as t } from '@nextcloud/l10n'

// eslint-disable-next-line import/no-unresolved
import appIcon from '../img/app.svg?raw'

const richdocuments = getCapabilities().richdocuments

const openPdf = new FileAction({
	id: 'office-open-pdf',

	iconSvgInline: () => {
		// Make sure the icon is the correct color
		return appIcon.replaceAll(/#(fff|0{6})/g, 'currentColor')
	},

	displayName: () => {
		return t('richdocuments',
			'Edit with {productName}',
			{ productName: richdocuments.productName })
	},

	enabled: (files) => {
		if (files.length !== 1) {
			return false
		}

		const isPdf = files[0].mime === 'application/pdf'
		// Only enable the file action when files_pdfviewer is enabled
		const optionalMimetypes = richdocuments.mimetypesNoDefaultOpen
		return isPdf && optionalMimetypes.includes('application/pdf')
	},

	exec: (file) => {
		// If no viewer API, we can't open the document
		if (!OCA.Viewer) {
			return
		}

		OCA.Viewer.openWith('richdocuments', { path: file.path })
	},
})

registerFileAction(openPdf)
