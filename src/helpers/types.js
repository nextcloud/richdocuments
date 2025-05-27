/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { getCapabilities } from '../services/capabilities.ts'

const ooxml = getCapabilities().config.doc_format === 'ooxml'

const getFileTypes = () => {
	if (ooxml) {
		return {
			document: {
				extension: 'docx',
				mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			},
			spreadsheet: {
				extension: 'xlsx',
				mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			},
			presentation: {
				extension: 'pptx',
				mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
			},
			drawing: {
				extension: 'odg',
				mime: 'application/vnd.oasis.opendocument.graphics',
			},
		}
	}
	return {
		document: {
			extension: 'odt',
			mime: 'application/vnd.oasis.opendocument.text',
		},
		spreadsheet: {
			extension: 'ods',
			mime: 'application/vnd.oasis.opendocument.spreadsheet',
		},
		presentation: {
			extension: 'odp',
			mime: 'application/vnd.oasis.opendocument.presentation',
		},
		drawing: {
			extension: 'odg',
			mime: 'application/vnd.oasis.opendocument.graphics',
		},
	}
}

const getFileType = (document) => {
	return {
		...getFileTypes()[document],
		name: document,
	}
}

export default {
	getFileTypes,
	getFileType,
}
