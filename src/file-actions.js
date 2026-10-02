/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { Permission, registerFileAction } from '@nextcloud/files'
import { getCapabilities } from './services/capabilities.ts'
import { translate as t } from '@nextcloud/l10n'
import { openNode } from './helpers/viewer.js'

// eslint-disable-next-line import/no-unresolved
import appIcon from '../img/app.svg?raw'

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

		if ((nodes[0].permissions & Permission.READ) === 0) {
			return false
		}

		const isPdf = nodes[0].mime === 'application/pdf'
		// Only enable the file action when files_pdfviewer is enabled
		const optionalMimetypes = getCapabilities().mimetypesNoDefaultOpen
		return isPdf && optionalMimetypes.includes('application/pdf')
	},

	exec: async ({ nodes }) => {
		await openNode(nodes[0], 'richdocuments')
		return null
	},
}

registerFileAction(openPdf)

const openMarkdown = {
	id: 'office-open-markdown',

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

		if ((nodes[0].permissions & Permission.READ) === 0) {
			return false
		}

		const isMarkdown = nodes[0].mime === 'text/markdown'
		// Only enable the file action when Collabora is not the default handler
		const optionalMimetypes = getCapabilities().mimetypesNoDefaultOpen
		return isMarkdown && optionalMimetypes.includes('text/markdown')
	},

	exec: async ({ nodes }) => {
		await openNode(nodes[0], 'richdocuments')
		return null
	},
}

registerFileAction(openMarkdown)
