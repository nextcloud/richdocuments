import { getDocumentUrlFromTemplate, getDocumentUrlForPublicFile, getDocumentUrlForFile, getSearchParam } from './helpers/url'
import PostMessageService from './services/postMessage'
import Config from './services/config'
import Types from './helpers/types'
import FilesAppIntegration from './view/FilesAppIntegration'

const FRAME_DOCUMENT = 'FRAME_DOCUMENT'
const PostMessages = new PostMessageService({
	FRAME_DOCUMENT: () => document.getElementById('richdocumentsframe').contentWindow
})

const preloadCreate = getSearchParam('richdocuments_create')
const preloadOpen = getSearchParam('richdocuments_open')
const Preload = {}

if (preloadCreate) {
	Preload.create = {
		type: getSearchParam('richdocuments_create'),
		filename: getSearchParam('richdocuments_filename')
	}
}

if (preloadOpen) {
	Preload.open = {
		filename: preloadOpen,
		id: getSearchParam('richdocuments_fileId'),
		dir: getSearchParam('dir')
	}
}

const isDownloadHidden = document.getElementById('hideDownload') && document.getElementById('hideDownload').value === 'true'

const isPublic = document.getElementById('isPublic') && document.getElementById('isPublic').value === '1'

const odfViewer = {

	open: false,
	receivedLoading: false,
	isCollaboraConfigured: typeof OC.getCapabilities().richdocuments.collabora === 'object' && OC.getCapabilities().richdocuments.collabora.length !== 0,
	supportedMimes: OC.getCapabilities().richdocuments.mimetypes.concat(OC.getCapabilities().richdocuments.mimetypesNoDefaultOpen),
	excludeMimeFromDefaultOpen: OC.getCapabilities().richdocuments.mimetypesNoDefaultOpen,
	hideDownloadMimes: ['image/jpeg', 'image/svg+xml', 'image/cgm', 'image/vnd.dxf', 'image/x-emf', 'image/x-wmf', 'image/x-wpg', 'image/x-freehand', 'image/bmp', 'image/png', 'image/gif', 'image/tiff', 'image/jpg', 'image/jpeg', 'text/plain', 'application/pdf'],

	register() {
		const EDIT_ACTION_NAME = 'Edit with ' + OC.getCapabilities().richdocuments.productName
		for (let mime of odfViewer.supportedMimes) {
			OCA.Files.fileActions.register(
				mime,
				EDIT_ACTION_NAME,
				0,
				OC.imagePath('core', 'actions/rename'),
				this.onEdit,
				t('richdocuments', 'Edit with {productName}', { productName: OC.getCapabilities().richdocuments.productName })
			)
			if (odfViewer.excludeMimeFromDefaultOpen.indexOf(mime) === -1 || isDownloadHidden) {
				OCA.Files.fileActions.setDefault(mime, EDIT_ACTION_NAME)
			}
		}
	},

	onEdit: function(fileName, context) {
		if (!odfViewer.isCollaboraConfigured) {
			const setupUrl = OC.generateUrl('/settings/admin/richdocuments')
			const installHint = OC.isUserAdmin()
				? `<a href="${setupUrl}">Collabora Online is not setup yet. <br />Click here to configure your own server or connect to a demo server.</a>`
				: t('richdocuments', 'Collabora Online is not setup yet. Please contact your administrator.')

			if (OCP.Toast) {
				OCP.Toast.error(installHint, {
					isHTML: true,
					timeout: 0
				})
			} else {
				OC.Notification.showHtml(installHint)
			}
			return
		}
		if (odfViewer.open === true) {
			return
		}
		odfViewer.open = true
		let fileList = null
		if (context) {
			fileList = context.fileList
			var fileDir = context.dir
			var fileId = context.fileId || context.$file.attr('data-id')
			var templateId = context.templateId
			if (context.fileList) {
				context.fileList.setViewerMode(true)
				context.fileList.setPageTitle(fileName)
				context.fileList.showMask()
			}
		}
		odfViewer.receivedLoading = false

		let documentUrl = getDocumentUrlForFile(fileDir, fileId)
		if (isPublic) {
			documentUrl = getDocumentUrlForPublicFile(fileName, fileId)
		}
		if (typeof (templateId) !== 'undefined') {
			documentUrl = getDocumentUrlFromTemplate(templateId, fileName, fileDir)
		}

		/**
		 * We need to reload the page to set a proper CSP if the file is federated
		 * and the reload didn't happen for the exact same file
		 */
		const canAccessCSP = (url, callback) => {
			let canEmbed = false
			let frame = document.createElement('iframe')
			frame.setAttribute('src', url)
			frame.setAttribute('onload', () => {
				canEmbed = true
			})
			document.body.appendChild(frame)
			setTimeout(() => {
				if (!canEmbed) {
					callback()
				}
				document.body.removeChild(frame)
			}, 50)

		}

		const reloadForFederationCSP = (fileName) => {
			const preloadId = Preload.open ? parseInt(Preload.open.id) : -1
			const fileModel = fileList.findFile(fileName)
			const shareOwnerId = fileModel.shareOwnerId
			if (typeof shareOwnerId !== 'undefined') {
				const lastIndex = shareOwnerId.lastIndexOf('@')
				// only redirect if remote file, not opened though reload and csp blocks the request
				if (shareOwnerId.substr(lastIndex).indexOf('/') !== -1 && fileModel.id !== preloadId) {
					canAccessCSP('https://' + shareOwnerId.substr(lastIndex) + '/status.php', () => {
						window.location = OC.generateUrl('/apps/richdocuments/open?fileId=' + fileId)
					})
				}
			}
			return false
		}

		if (context) {
			reloadForFederationCSP(fileName)
		}

		OC.addStyle('richdocuments', 'mobile')

		var $iframe = $('<iframe id="richdocumentsframe" nonce="' + btoa(OC.requestToken) + '" scrolling="no" allowfullscreen src="' + documentUrl + '" />')
		odfViewer.loadingTimeout = setTimeout(function() {
			if (!odfViewer.receivedLoading) {
				odfViewer.onClose()
				OC.Notification.showTemporary(t('richdocuments', 'Failed to load {productName} - please try again later', { productName: OC.getCapabilities().richdocuments.productName || 'Collabora Online' }))
			}
		}, 15000)
		$iframe.src = documentUrl

		$('body').css('overscroll-behavior-y', 'none')
		var viewport = document.querySelector('meta[name=viewport]')
		viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no')
		if (isPublic) {
			// force the preview to adjust its height
			$('#preview').append($iframe).css({ height: '100%' })
			$('body').css({ height: '100%' })
			$('#content').addClass('full-height')
			$('footer').addClass('hidden')
			$('#imgframe').addClass('hidden')
			$('.directLink').addClass('hidden')
			$('.directDownload').addClass('hidden')
			$('#controls').addClass('hidden')
			$('#content').addClass('loading')
		} else {
			$('body').css('overflow', 'hidden')
			$('#app-content').append($iframe)
			$iframe.hide()
		}

		$('#app-content #controls').addClass('hidden')
		setTimeout(() => {
			FilesAppIntegration.init({
				fileName,
				fileId,
				fileList,
				sendPostMessage: (msgId, values) => {
					PostMessages.sendWOPIPostMessage(FRAME_DOCUMENT, msgId, values)
				}
			})
		})
	},

	onReceiveLoading() {
		odfViewer.receivedLoading = true
		$('#richdocumentsframe').show()
		$('html, body').scrollTop(0)
		$('#content').removeClass('loading')
		FilesAppIntegration.initAfterReady()
	},

	onClose: function() {
		odfViewer.open = false
		clearTimeout(odfViewer.loadingTimeout)
		odfViewer.receivedLoading = false
		$('link[href*="richdocuments/css/mobile"]').remove()
		$('#app-content #controls').removeClass('hidden')
		$('#richdocumentsframe').remove()
		$('.searchbox').show()
		$('body').css('overflow', 'auto')

		if (isPublic) {
			$('#content').removeClass('full-height')
			$('footer').removeClass('hidden')
			$('#imgframe').removeClass('hidden')
			$('.directLink').removeClass('hidden')
			$('.directDownload').removeClass('hidden')
		}

		OC.Util.History.replaceState()

		FilesAppIntegration.close()
	},

	registerFilesMenu: function() {

		const registerFilesMenu = (OCA) => {
			OCA.FilesLOMenu = {
				attach: function(newFileMenu) {
					var self = this
					const document = Types.getFileType('document')
					const spreadsheet = Types.getFileType('spreadsheet')
					const presentation = Types.getFileType('presentation')

					newFileMenu.addMenuEntry({
						id: 'add-' + document.extension,
						displayName: t('richdocuments', 'New Document'),
						templateName: t('richdocuments', 'New Document') + '.' + document.extension,
						iconClass: 'icon-filetype-document',
						fileType: 'x-office-document',
						actionHandler: function(filename) {
							if (OC.getCapabilities().richdocuments.templates) {
								self._openTemplatePicker('document', document.mime, filename)
							} else {
								self._createDocument(document.mime, filename)
							}
						}
					})

					newFileMenu.addMenuEntry({
						id: 'add-' + spreadsheet.extension,
						displayName: t('richdocuments', 'New Spreadsheet'),
						templateName: t('richdocuments', 'New Spreadsheet') + '.' + spreadsheet.extension,
						iconClass: 'icon-filetype-spreadsheet',
						fileType: 'x-office-spreadsheet',
						actionHandler: function(filename) {
							if (OC.getCapabilities().richdocuments.templates) {
								self._openTemplatePicker('spreadsheet', spreadsheet.mime, filename)
							} else {
								self._createDocument(spreadsheet.mime, filename)
							}
						}
					})

					newFileMenu.addMenuEntry({
						id: 'add-' + presentation.extension,
						displayName: t('richdocuments', 'New Presentation'),
						templateName: t('richdocuments', 'New Presentation') + '.' + presentation.extension,
						iconClass: 'icon-filetype-presentation',
						fileType: 'x-office-presentation',
						actionHandler: function(filename) {
							if (OC.getCapabilities().richdocuments.templates) {
								self._openTemplatePicker('presentation', presentation.mime, filename)
							} else {
								self._createDocument(presentation.mime, filename)
							}
						}
					})
				},

				_createDocument: function(mimetype, filename) {
					OCA.Files.Files.isFileNameValid(filename)
					filename = FileList.getUniqueName(filename)

					$.post(
						OC.generateUrl('apps/richdocuments/ajax/documents/create'),
						{ mimetype: mimetype, filename: filename, dir: $('#dir').val() },
						function(response) {
							if (response && response.status === 'success') {
								FileList.add(response.data, { animate: true, scrollTo: true })
							} else {
								OC.dialogs.alert(response.data.message, t('core', 'Could not create file'))
							}
						}
					)
				},

				_createDocumentFromTemplate: function(templateId, mimetype, filename) {
					OCA.Files.Files.isFileNameValid(filename)
					filename = FileList.getUniqueName(filename)
					$.post(
						OC.generateUrl('apps/richdocuments/ajax/documents/create'),
						{ mimetype: mimetype, filename: filename, dir: $('#dir').val() },
						function(response) {
							if (response && response.status === 'success') {
								FileList.add(response.data, { animate: false, scrollTo: false })
								odfViewer.onEdit(filename, {
									fileId: -1,
									dir: $('#dir').val(),
									templateId: templateId,
									fileList: FileList
								})
							} else {
								OC.dialogs.alert(response.data.message, t('core', 'Could not create file'))
							}
						}
					)
				},

				_openTemplatePicker: function(type, mimetype, filename) {
					var self = this
					$.ajax({
						url: OC.linkToOCS('apps/richdocuments/api/v1/templates', 2) + type,
						dataType: 'json'
					}).then(function(response) {
						if (response.ocs.data.length === 1) {
							const { id } = response.ocs.data[0]
							self._createDocumentFromTemplate(id, mimetype, filename)
							return
						}
						self._buildTemplatePicker(response.ocs.data)
							.then(function() {
								var buttonlist = [{
									text: t('core', 'Cancel'),
									classes: 'cancel',
									click: function() {
										$(this).ocdialog('close')
									}
								}, {
									text: t('richdocuments', 'Create'),
									classes: 'primary',
									click: function() {
										var templateId = this.dataset.templateId
										self._createDocumentFromTemplate(templateId, mimetype, filename)
										$(this).ocdialog('close')
									}
								}]

								$('#template-picker').ocdialog({
									closeOnEscape: true,
									modal: true,
									buttons: buttonlist
								})
							})
					})
				},

				_buildTemplatePicker: function(data) {
					var self = this
					return $.get(OC.filePath('richdocuments', 'templates', 'templatePicker.html'), function(tmpl) {
						var $tmpl = $(tmpl)
						// init template picker
						var $dlg = $tmpl.octemplate({
							dialog_name: 'template-picker',
							dialog_title: t('richdocuments', 'Select template')
						})

						// create templates list
						var templates = _.values(data)
						templates.forEach(function(template) {
							self._appendTemplateFromData($dlg[0], template)
						})

						$('body').append($dlg)
					})
				},

				_appendTemplateFromData: function(dlg, data) {
					var template = dlg.querySelector('.template-model').cloneNode(true)
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
				}
			}
		}
		registerFilesMenu(OCA)

		OC.Plugins.register('OCA.Files.NewFileMenu', OCA.FilesLOMenu)

		// Open the template picker if there was a create parameter detected on load
		if (Preload.create && Preload.create.type && Preload.create.filename) {
			const fileType = Types.getFileType(Preload.create.type, Config.get('ooxml'))
			OCA.FilesLOMenu._openTemplatePicker(Preload.create.type, fileType.mime, Preload.create.filename + '.' + fileType.extension)
		}

		if (Preload.open) {
			FileList.$fileList.one('updated', function() {
				odfViewer.onEdit(Preload.open.filename, {
					fileId: Preload.open.id,
					dir: document.getElementById('dir').value,
					fileList: FileList
				})
			})
		}
	}
}

const settings = OC.getCapabilities()['richdocuments']['config'] || {}
Config.update('ooxml', settings['doc_format'] === 'ooxml')

window.OCA.RichDocuments = {
	config: {
		create: Types.getFileTypes()
	}
}

$(document).ready(function() {
	// register file actions and menu
	if (typeof OCA !== 'undefined'
		&& typeof OCA.Files !== 'undefined'
		&& typeof OCA.Files.fileActions !== 'undefined'
	) {
		// check if texteditor app is enabled and loaded...
		if (typeof OCA.Files_Texteditor === 'undefined' && typeof OCA.Text === 'undefined') {
			odfViewer.supportedMimes.push('text/plain')
		}
		odfViewer.register()
		odfViewer.registerFilesMenu()
	}

	// Open documents if a public page is opened for a supported mimetype
	const isSupportedMime = isPublic && odfViewer.supportedMimes.indexOf($('#mimetype').val()) !== -1 && odfViewer.excludeMimeFromDefaultOpen.indexOf($('#mimetype').val()) === -1
	const showSecureView = isPublic && isDownloadHidden && odfViewer.hideDownloadMimes.indexOf($('#mimetype').val()) !== -1
	if (isSupportedMime || showSecureView) {
		odfViewer.onEdit(document.getElementById('filename').value)
	}

	PostMessages.registerPostMessageHandler(({ parsed }) => {
		console.debug('[viewer] Received post message', parsed)
		const { msgId, args, deprecated } = parsed
		if (deprecated) { return }

		switch (msgId) {
		case 'loading':
			odfViewer.onReceiveLoading()
			break
		case 'App_LoadingStatus':
			if (args.Status === 'Timeout') {
				odfViewer.onClose()
				OC.Notification.showTemporary(t('richdocuments', 'Failed to connect to {productName}. Please try again later or contact your server administrator.',
					{ productName: OC.getCapabilities().richdocuments.productName }
				))
			}
			break
		case 'UI_Share':
			FilesAppIntegration.share()
			break
		case 'UI_CreateFile':
			FilesAppIntegration.createNewFile(args.DocumentType)
			break
		case 'UI_InsertGraphic':
			FilesAppIntegration.insertGraphic((filename, url) => {
				PostMessages.sendWOPIPostMessage(FRAME_DOCUMENT, 'postAsset', { FileName: filename, Url: url })
			})
			break
		case 'File_Rename':
			FileList.reload()
			OC.Apps.hideAppSidebar()
			FilesAppIntegration.fileName = args.NewName
			break
		case 'close':
			odfViewer.onClose()
			break
		case 'Get_Views_Resp':
		case 'Views_List':
			FilesAppIntegration.setViews(args)
			break
		case 'UI_FileVersions':
		case 'rev-history':
			FilesAppIntegration.showRevHistory()
			break
		case 'App_VersionRestore':
			if (args.Status === 'Pre_Restore_Ack') {
				FilesAppIntegration.restoreVersionExecute()
			}
			break
		}

		// legacy view handling
		if (msgId === 'View_Added') {
			FilesAppIntegration.views[args.ViewId] = args
			FilesAppIntegration.renderAvatars()
		} else if (msgId === 'View_Removed') {
			delete FilesAppIntegration.views[args.ViewId]
			FilesAppIntegration.renderAvatars()
		} else if (msgId === 'FollowUser_Changed') {
			if (args.IsFollowEditor) {
				FilesAppIntegration.followingEditor = true
			} else {
				FilesAppIntegration.followingEditor = false
			}
			if (args.IsFollowUser) {
				FilesAppIntegration.following = args.FollowedViewId
			} else {
				FilesAppIntegration.following = null
			}
			FilesAppIntegration.renderAvatars()
		}

	})
	window.FilesAppIntegration = FilesAppIntegration
})
