/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import axios from '@nextcloud/axios'
import { emit } from '@nextcloud/event-bus'
import Types from '../helpers/types.js'
import { createEmptyFile } from '../services/api.js'
import { generateOcsUrl } from '@nextcloud/router'
import { showError, spawnDialog } from '@nextcloud/dialogs'
import { getCapabilities } from '../services/capabilities.ts'
import { File, addNewFileMenuEntry, isFilenameValid, getUniqueName } from '@nextcloud/files'
import TemplatePicker from '../components/Modal/TemplatePicker.vue'

const createFileTypeEntry = (type, displayName, iconClass, index) => ({
	id: 'add-' + type.extension,
	displayName: t('richdocuments', displayName),
	iconClass,
	order: 10 + index,
	async handler(context, content) {
		const filename = t('richdocuments', displayName) + '.' + type.extension
		if (getCapabilities().templates) {
			await openTemplatePicker(context, type.name, type.mime, filename, content)
		} else {
			await createDocument(context, type.mime, filename, null, content)
		}
	},
})

export const registerNewFileMenuEntries = () => {
	const fileTypes = [
		{ type: Types.getFileType('document'), displayName: 'New document', iconClass: 'icon-filetype-document' },
		{ type: Types.getFileType('spreadsheet'), displayName: 'New spreadsheet', iconClass: 'icon-filetype-spreadsheet' },
		{ type: Types.getFileType('presentation'), displayName: 'New presentation', iconClass: 'icon-filetype-presentation' },
		{ type: Types.getFileType('drawing'), displayName: 'New drawing', iconClass: 'icon-filetype-draw' },
	]

	fileTypes.forEach(({ type, displayName, iconClass }, index) => {
		addNewFileMenuEntry(createFileTypeEntry(type, displayName, iconClass, index))
	})
}

const createDocument = async (context, mimetype, filename, templateId = null, content = []) => {
	if (!isFilenameValid(filename)) {
		return
	}

	filename = getUniqueName(
		filename,
		content.map((n) => n.basename),
	)

	try {
		const response = await createEmptyFile(context, mimetype, filename, templateId)
		const { data } = response

		const file = new File({
			source: context.source + '/' + filename,
			basename: filename,
			id: data.id,
			mtime: new Date(data.mtime),
			mime: data.mimetype,
			owner: null,
			permissions: data.permissions,
			root: context?.root,
		})
		emit('files:node:created', file)

		if (response && response.status === 'success') {
			OCA.Viewer.open({ path: context.dirname + '/' + filename })
		} else {
			showError(t('core', 'Could not create file') + ': ' + response.data.message)
		}
	} catch (error) {
		console.error(error)
		showError(t('core', 'Could not create file'))
	}
}

const openTemplatePicker = async (context, type, mimetype, filename, content = []) => {
	try {
		const { data: response } = await axios.get(generateOcsUrl(`apps/richdocuments/api/v1/templates/${type}`, 2))
		const templates = response.ocs.data

		if (templates.length === 1) {
			await createDocument(context, mimetype, filename, templates[0].id, content)
			return
		}

		await spawnDialog(TemplatePicker, {
			templates,
			suggestedFilename: filename,
			content,
			initialTemplateId: templates[0]?.id,
		}, (templateId, filename) => {
			if (templateId) {
				createDocument(context, mimetype, filename, templateId, content)
			}
		})
	} catch (error) {
		console.error(error)
		showError(t('core', 'Could not load templates'))
	}
}
