/*
 * @copyright Copyright (c) 2020 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import Types from '../helpers/types'

/** @type OC.Plugin */
const NewFileMenu = {
	attach(newFileMenu) {
		const self = this
		const document = Types.getFileType('document')
		const spreadsheet = Types.getFileType('spreadsheet')
		const presentation = Types.getFileType('presentation')

		newFileMenu.addMenuEntry({
			id: 'add-' + document.extension,
			displayName: t('richdocuments', 'New document'),
			templateName: t('richdocuments', 'New document') + '.' + document.extension,
			iconClass: 'icon-filetype-document',
			fileType: 'x-office-document',
			actionHandler(filename) {
				if (OC.getCapabilities().richdocuments.templates) {
					self._openTemplatePicker('document', document.mime, filename)
				} else {
					self._createDocument(document.mime, filename)
				}
			},
		})

		newFileMenu.addMenuEntry({
			id: 'add-' + spreadsheet.extension,
			displayName: t('richdocuments', 'New spreadsheet'),
			templateName: t('richdocuments', 'New spreadsheet') + '.' + spreadsheet.extension,
			iconClass: 'icon-filetype-spreadsheet',
			fileType: 'x-office-spreadsheet',
			actionHandler(filename) {
				if (OC.getCapabilities().richdocuments.templates) {
					self._openTemplatePicker('spreadsheet', spreadsheet.mime, filename)
				} else {
					self._createDocument(spreadsheet.mime, filename)
				}
			},
		})

		newFileMenu.addMenuEntry({
			id: 'add-' + presentation.extension,
			displayName: t('richdocuments', 'New presentation'),
			templateName: t('richdocuments', 'New presentation') + '.' + presentation.extension,
			iconClass: 'icon-filetype-presentation',
			fileType: 'x-office-presentation',
			actionHandler(filename) {
				if (OC.getCapabilities().richdocuments.templates) {
					self._openTemplatePicker('presentation', presentation.mime, filename)
				} else {
					self._createDocument(presentation.mime, filename)
				}
			},
		})
	},

	_createDocument(mimetype, filename) {
		OCA.Files.Files.isFileNameValid(filename)
		filename = FileList.getUniqueName(filename)

		$.post(
			OC.generateUrl('apps/richdocuments/ajax/documents/create'),
			{ mimetype, filename, dir: document.getElementById('dir').value },
			function(response) {
				if (response && response.status === 'success') {
					FileList.add(response.data, { animate: true, scrollTo: true })
				} else {
					OC.dialogs.alert(response.data.message, t('core', 'Could not create file'))
				}
			}
		)
	},

	_createDocumentFromTemplate(templateId, mimetype, filename) {
		OCA.Files.Files.isFileNameValid(filename)
		filename = FileList.getUniqueName(filename)
		$.post(
			OC.generateUrl('apps/richdocuments/ajax/documents/create'),
			{ mimetype, filename, dir: document.getElementById('dir').value },
			function(response) {
				if (response && response.status === 'success') {
					FileList.add(response.data, { animate: false, scrollTo: false })
					const fileModel = FileList.getModelForFile(filename)
					const path = document.getElementById('dir').value + '/' + filename
					OCA.RichDocuments.openWithTemplate({
						fileId: -1,
						path,
						templateId,
						fileList: window.FileList,
						fileModel,
					})
				} else {
					OC.dialogs.alert(response.data.message, t('core', 'Could not create file'))
				}
			}
		)
	},

	_openTemplatePicker(type, mimetype, filename) {
		const self = this
		$.ajax({
			url: OC.linkToOCS('apps/richdocuments/api/v1/templates', 2) + type,
			dataType: 'json',
		}).then(function(response) {
			if (response.ocs.data.length === 1) {
				const { id } = response.ocs.data[0]
				self._createDocumentFromTemplate(id, mimetype, filename)
				return
			}
			self._buildTemplatePicker(response.ocs.data)
				.then(function() {
					const buttonlist = [{
						text: t('core', 'Cancel'),
						classes: 'cancel',
						click() {
							$(this).ocdialog('close')
						},
					}, {
						text: t('richdocuments', 'Create'),
						classes: 'primary',
						click() {
							const templateId = this.dataset.templateId
							self._createDocumentFromTemplate(templateId, mimetype, filename)
							$(this).ocdialog('close')
						},
					}]

					$('#template-picker').ocdialog({
						closeOnEscape: true,
						modal: true,
						buttons: buttonlist,
					})
				})
		})
	},

	_buildTemplatePicker(data) {
		const self = this
		return $.get(OC.filePath('richdocuments', 'templates', 'templatePicker.html'), function(tmpl) {
			const $tmpl = $(tmpl)
			// init template picker
			const $dlg = $tmpl.octemplate({
				dialog_name: 'template-picker',
				dialog_title: t('richdocuments', 'Select template'),
			})

			// create templates list
			const templates = _.values(data)
			templates.forEach(function(template) {
				self._appendTemplateFromData($dlg[0], template)
			})

			$('body').append($dlg)
		})
	},

	_appendTemplateFromData(dlg, data) {
		const template = dlg.querySelector('.template-model').cloneNode(true)
		template.className = ''
		template.querySelector('img').src = OC.generateUrl('apps/richdocuments/template/preview/' + data.id)
		template.querySelector('h2').textContent = data.name
		template.onclick = function() {
			dlg.dataset.templateId = data.id
		}
		if (!dlg.dataset.templateId) {
			dlg.dataset.templateId = data.id
		}

		dlg.querySelector('.template-container').appendChild(template)
	},
}

export default NewFileMenu
