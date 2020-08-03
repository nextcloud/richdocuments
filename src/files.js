import { getDocumentUrlFromTemplate, getDocumentUrlForPublicFile, getDocumentUrlForFile } from './helpers/url'
import PostMessageService from './services/postMessage'
import Config from './services/config'
import Preload from './services/preload'
import Types from './helpers/types'
import FilesAppIntegration from './view/FilesAppIntegration'
import '../css/viewer.scss'
import { splitPath } from './helpers'
import NewFileMenu from './view/NewFileMenu'

const FRAME_DOCUMENT = 'FRAME_DOCUMENT'
const PostMessages = new PostMessageService({
	FRAME_DOCUMENT: () => document.getElementById('richdocumentsframe').contentWindow
})

const isDownloadHidden = document.getElementById('hideDownload') && document.getElementById('hideDownload').value === 'true'

const isPublic = document.getElementById('isPublic') && document.getElementById('isPublic').value === '1'

const odfViewer = {

	open: false,
	receivedLoading: false,
	isCollaboraConfigured: (
		(OC.getCapabilities().richdocuments.config.wopi_url.indexOf('proxy.php') !== -1)
		|| (typeof OC.getCapabilities().richdocuments.collabora === 'object' && OC.getCapabilities().richdocuments.collabora.length !== 0)),
	supportedMimes: OC.getCapabilities().richdocuments.mimetypes.concat(OC.getCapabilities().richdocuments.mimetypesNoDefaultOpen),
	excludeMimeFromDefaultOpen: OC.getCapabilities().richdocuments.mimetypesNoDefaultOpen,
	hideDownloadMimes: ['image/jpeg', 'image/svg+xml', 'image/cgm', 'image/vnd.dxf', 'image/x-emf', 'image/x-wmf', 'image/x-wpg', 'image/x-freehand', 'image/bmp', 'image/png', 'image/gif', 'image/tiff', 'image/jpg', 'image/jpeg', 'text/plain', 'application/pdf'],

	registerFileActions() {
		const EDIT_ACTION_NAME = 'Edit with ' + OC.getCapabilities().richdocuments.productName
		for (let mime of odfViewer.supportedMimes) {
			OCA.Files.fileActions.register(
				mime,
				EDIT_ACTION_NAME,
				OC.PERMISSION_READ,
				OC.imagePath('core', 'actions/rename'),
				(fileName, context) => {
					const fileModel = context.fileList.findFile(fileName)
					const shareOwnerId = fileModel.shareOwnerId
					return this.onEdit(fileName, { ...context, shareOwnerId })
				},
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
		if (context) {
			var fileDir = context.dir
			var fileId = context.fileId || context.$file.attr('data-id')
			var templateId = context.templateId
		}
		FilesAppIntegration.startLoading()
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

		const reloadForFederationCSP = (fileName, shareOwnerId) => {
			const preloadId = Preload.open ? parseInt(Preload.open.id) : -1
			if (typeof shareOwnerId !== 'undefined') {
				const lastIndex = shareOwnerId.lastIndexOf('@')
				// only redirect if remote file, not opened though reload and csp blocks the request
				if (shareOwnerId.substr(lastIndex).indexOf('/') !== -1 && fileId !== preloadId) {
					canAccessCSP('https://' + shareOwnerId.substr(lastIndex) + '/status.php', () => {
						window.location = OC.generateUrl('/apps/richdocuments/open?fileId=' + fileId)
					})
				}
			}
			return false
		}

		if (context) {
			reloadForFederationCSP(fileName, context.shareOwnerId)
		}

		$('head').append($('<link rel="stylesheet" type="text/css" href="' + OC.filePath('richdocuments', 'css', 'mobile.css') + '"/>'))

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
				fileList: context ? context.fileList : undefined,
				fileModel: context ? context.fileModel : undefined,
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
	}
}

const settings = OC.getCapabilities()['richdocuments']['config'] || {}
Config.update('ooxml', settings['doc_format'] === 'ooxml')

window.OCA.RichDocuments = {
	config: {
		create: Types.getFileTypes()
	},
	open: ({ path, fileId, fileModel, fileList = {} }) => {
		const [dir, file] = splitPath(path)
		odfViewer.onEdit(file, {
			fileId,
			dir,
			shareOwnerId: fileModel.get('shareOwnerId'),
			fileList,
			fileModel
		})
	},
	openWithTemplate: ({ path, fileId, templateId, fileModel, fileList = {} }) => {
		const [dir, file] = splitPath(path)
		odfViewer.onEdit(file, {
			fileId,
			dir,
			templateId,
			shareOwnerId: fileModel.get('shareOwnerId'),
			fileList,
			fileModel
		})
	},
	FilesAppIntegration: {
		registerHandler: FilesAppIntegration.registerHandler.bind(FilesAppIntegration)
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

		odfViewer.registerFileActions()
		OC.Plugins.register('OCA.Files.NewFileMenu', NewFileMenu)
	}

	// Open the template picker if there was a create parameter detected on load
	if (Preload.create && Preload.create.type && Preload.create.filename) {
		const fileType = Types.getFileType(Preload.create.type, Config.get('ooxml'))
		NewFileMenu._openTemplatePicker(Preload.create.type, fileType.mime, Preload.create.filename + '.' + fileType.extension)
	}

	if (Preload.open) {
		FileList.$fileList.one('updated', function() {
			odfViewer.onEdit(Preload.open.filename, {
				fileId: Preload.open.id,
				dir: document.getElementById('dir').value
			})
		})
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
			FilesAppIntegration.rename(args.NewName)
			break
		case 'Action_Save_Resp':
			FilesAppIntegration.saveAs()
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
})
