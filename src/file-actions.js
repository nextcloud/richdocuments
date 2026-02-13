/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { DefaultType, Permission, getFileActions, registerFileAction } from '@nextcloud/files'
import { getCapabilities } from './services/capabilities.ts'
import { translate as t } from '@nextcloud/l10n'

// eslint-disable-next-line import/no-unresolved
import appIcon from '../img/app.svg?raw'

const supportedMimes = getCapabilities()?.mimetypes ?? []

// Default file action for document types handled by richdocuments.
// The Viewer app registers a generic 'view' file action that checks
// window.OCA.Viewer.mimetypes, but those mimetypes are only populated
// on DOMContentLoaded which can race with the file list rendering.
// This action uses richdocuments' own capability list (available
// immediately from OCS initial state) so it is not affected by timing.
const openDocument = {
	id: 'richdocuments-default',

	displayName: () => {
		return t('richdocuments',
			'Open in {productName}',
			{ productName: getCapabilities()?.productName ?? 'Nextcloud Office' })
	},

	iconSvgInline: () => {
		return appIcon.replaceAll(/#(fff|0{6})/g, 'currentColor')
	},

	default: DefaultType.DEFAULT,

	enabled: ({ nodes }) => {
		if (nodes.length !== 1) {
			return false
		}
		const node = nodes[0]
		if (!node.isDavResource || !node.root?.startsWith('/files')) {
			return false
		}
		if (!(node.permissions & Permission.READ)) {
			return false
		}
		return supportedMimes.includes(node.mime)
	},

	exec: async ({ nodes, view, folder }) => {
		// Delegate to the Viewer's own 'view' action when available
		// so that URL history and prev/next navigation work correctly.
		const viewAction = getFileActions().find(a => a.id === 'view')
		if (viewAction?.exec) {
			return viewAction.exec({ nodes, view, folder })
		}

		// Fallback: open directly through the Viewer API
		if (window.OCA?.Viewer) {
			window.OCA.Viewer.open({ path: nodes[0].path })
			return null
		}
		return false
	},
}

registerFileAction(openDocument)

const openPdf = {
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

	enabled: ({ nodes }) => {
		if (nodes.length !== 1) {
			return false
		}

		const isPdf = nodes[0].mime === 'application/pdf'
		// Only enable the file action when files_pdfviewer is enabled
		const optionalMimetypes = getCapabilities().mimetypesNoDefaultOpen
		return isPdf && optionalMimetypes.includes('application/pdf')
	},

	exec: ({ nodes }) => {
		const file = nodes[0]

		// If no viewer API, we can't open the document
		if (!OCA.Viewer) {
			return
		}

		OCA.Viewer.openWith('richdocuments', { path: file.path })
	},
}

registerFileAction(openPdf)
