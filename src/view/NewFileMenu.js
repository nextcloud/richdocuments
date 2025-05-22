/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import axios from '@nextcloud/axios'
import { emit } from '@nextcloud/event-bus'
import Types from '../helpers/types.js'
import { createEmptyFile } from '../services/api.js'
import { generateUrl, generateFilePath, generateOcsUrl } from '@nextcloud/router'
import { showError } from '@nextcloud/dialogs'
import { getCapabilities } from '../services/capabilities.ts'
import { File, addNewFileMenuEntry, isFilenameValid, getUniqueName } from '@nextcloud/files'

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

		await showTemplatePickerDialog(context, type, mimetype, filename, templates, content)
	} catch (error) {
		console.error(error)
		showError(t('core', 'Could not load templates'))
	}
}

const showTemplatePickerDialog = async (context, type, mimetype, filename, templates, content) => {
	const { data: tmpl } = await axios.get(generateFilePath('richdocuments', 'templates', 'templatePicker.html'))
	const $tmpl = $(tmpl).eq(2)
	const $dlg = $tmpl.octemplate({
		dialog_name: 'template-picker',
		dialog_title: t('richdocuments', 'Select template'),
	})

	templates.forEach((template) => {
		appendTemplateFromData($dlg[0], template)
	})

	$('body').append($dlg)

	const buttonlist = [
		{
			text: t('core', 'Cancel'),
			classes: 'cancel',
			click() {
				$(this).ocdialog('close')
			},
		},
		{
			text: t('richdocuments', 'Create'),
			classes: 'primary',
			click() {
				const templateId = this.dataset.templateId
				createDocument(context, mimetype, filename, templateId, content)
				$(this).ocdialog('close')
			},
		}
	]

	$('#template-picker').ocdialog({
		closeOnEscape: true,
		modal: true,
		buttons: buttonlist,
	})
}

const appendTemplateFromData = (dlg, data) => {
	const template = dlg.querySelector('.template-model').cloneNode(true)
	template.className = ''
	template.querySelector('img').src = generateUrl('apps/richdocuments/template/preview/' + data.id)
	template.querySelector('h2').textContent = data.name
	template.onclick = function(e) {
		e.preventDefault()
		dlg.dataset.templateId = data.id
	}
	if (!dlg.dataset.templateId) {
		dlg.dataset.templateId = data.id
	}

	dlg.querySelector('.template-container').appendChild(template)
}
