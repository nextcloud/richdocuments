/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { registerFileAction, FileAction } from '@nextcloud/files'
import { getCapabilities } from './services/capabilities.ts'
import { translate as t } from '@nextcloud/l10n'

// eslint-disable-next-line import/no-unresolved
import appIcon from '../img/app.svg?raw'

const openPdf = new FileAction({
	id: 'office-open-pdf',

	iconSvgInline: () => {
		// Make sure the icon is the correct color
		return appIcon.replaceAll(/#(fff|0{6})/g, 'currentColor')
	},

	displayName: () => {
		return t('richdocuments',
			'Edit with {productName}',
			{ productName: getCapabilities().productName })
	},

	enabled: (files) => {
		if (files.length !== 1) {
			return false
		}

		const isPdf = files[0].mime === 'application/pdf'
		// Only enable the file action when files_pdfviewer is enabled
		const optionalMimetypes = getCapabilities().mimetypesNoDefaultOpen
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
