import { emit } from '@nextcloud/event-bus'
import { getDocumentUrlFromTemplate, getDocumentUrlForPublicFile, getDocumentUrlForFile } from './helpers/url'
import PostMessageService from './services/postMessage.tsx'
import Config from './services/config.tsx'
import Preload from './services/preload'
import Types from './helpers/types'
import FilesAppIntegration from './view/FilesAppIntegration'
import '../css/viewer.scss'
import { splitPath } from './helpers'
import NewFileMenu from './view/NewFileMenu'

const FRAME_DOCUMENT = 'FRAME_DOCUMENT'
const PostMessages = new PostMessageService({
	FRAME_DOCUMENT: () => document.getElementById('richdocumentsframe').contentWindow,
})

// Workaround for Safari to resize the iframe to the proper height
// as 100vh is not the proper viewport height there
const handleResize = () => {
	const frame = document.getElementById('richdocumentsframe')
	if (frame) {
		frame.style.maxHeight = (document.documentElement.clientHeight - 50) + 'px'
	}
}
window.addEventListener('resize', handleResize)
if (window && window.visualViewport) {
	visualViewport.addEventListener('resize', handleResize)
}

const isDownloadHidden = document.getElementById('hideDownload') && document.getElementById('hideDownload').value === 'true'

const isPublic = document.getElementById('isPublic') && document.getElementById('isPublic').value === '1'

const odfViewer = {

	open: false,
	receivedLoading: false,
	isProxyStarting: false,
	isCollaboraConfigured: (
		(OC.getCapabilities().richdocuments.config.wopi_url.indexOf('proxy.php') !== -1)
		|| (typeof OC.getCapabilities().richdocuments.collabora === 'object' && OC.getCapabilities().richdocuments.collabora.length !== 0)),
	supportedMimes: OC.getCapabilities().richdocuments.mimetypes.concat(OC.getCapabilities().richdocuments.mimetypesNoDefaultOpen),
	excludeMimeFromDefaultOpen: OC.getCapabilities().richdocuments.mimetypesNoDefaultOpen,
	hideDownloadMimes: ['image/jpeg', 'image/svg+xml', 'image/cgm', 'image/vnd.dxf', 'image/x-emf', 'image/x-wmf', 'image/x-wpg', 'image/x-freehand', 'image/bmp', 'image/png', 'image/gif', 'image/tiff', 'image/jpg', 'image/jpeg', 'text/plain', 'application/pdf'],

	registerFileActions() {
		const EDIT_ACTION_NAME = 'Edit with ' + OC.getCapabilities().richdocuments.productName
		for (const mime of odfViewer.supportedMimes) {
			OCA.Files.fileActions.register(
				mime,
				EDIT_ACTION_NAME,
				OC.PERMISSION_READ,
				OC.imagePath('core', 'actions/rename'),
				(fileName, context) => {
					// Workaround since the new template frontend doesn't pass
					// the full context yet nor the filelist contains the element
					// at the point when the action is triggered.
					// This will be fixed by https://github.com/nextcloud/server/pull/25797
					// but this should be kept for backward compatibility for now
					if (!context?.$file) {
						if (context?.fileList) {
							context.fileList.setViewerMode(true)
						}
						const filePath = (context.dir === '/' ? '/' : context.dir + '/') + fileName
						OCA.Files.App.fileList.filesClient.getFileInfo(filePath).then((status, fileInfo) => {
							const fileModel = context.fileList.findFile(fileName)
							const shareOwnerId = fileModel?.shareOwnerId || fileInfo?.shareOwnerId
							context.fileId = fileInfo.id
							return this.onEdit(fileName, {
								...context,
								shareOwnerId,
							})
						})
						return
					}

					const fileModel = context.fileList.findFile(fileName)
					const shareOwnerId = fileModel?.shareOwnerId
					return this.onEdit(fileName, {
						...context,
						shareOwnerId,
					})
				},
				t('richdocuments', 'Edit with {productName}', { productName: OC.getCapabilities().richdocuments.productName }, undefined, { escape: false })
			)
			if (odfViewer.excludeMimeFromDefaultOpen.indexOf(mime) === -1 || isDownloadHidden) {
				OCA.Files.fileActions.setDefault(mime, EDIT_ACTION_NAME)
			}
		}
	},

	onEdit(fileName, context) {
		let fileDir
		let fileId
		let templateId

		if (!odfViewer.isCollaboraConfigured) {
			$.get(OC.linkToOCS('cloud') + '/capabilities?format=json').then(
				e => {
					if ((OC.getCapabilities().richdocuments.config.wopi_url.indexOf('proxy.php') !== -1)
						|| (typeof e.ocs.data.capabilities.richdocuments.collabora === 'object'
						&& e.ocs.data.capabilities.richdocuments.collabora.length !== 0)) {
						odfViewer.isCollaboraConfigured = true
						odfViewer.onEdit(fileName, context)
					} else {
						const setupUrl = OC.generateUrl('/settings/admin/richdocuments')
						const installHint = OC.isUserAdmin()
							? `<a href="${setupUrl}">Collabora Online is not setup yet. <br />Click here to configure your own server or connect to a demo server.</a>`
							: t('richdocuments', 'Collabora Online is not setup yet. Please contact your administrator.')

						if (OCP.Toast) {
							OCP.Toast.error(installHint, {
								isHTML: true,
								timeout: 0,
							})
						} else {
							OC.Notification.showHtml(installHint)
						}
					}
				}
			)
			return
		}
		if (odfViewer.open === true) {
			return
		}
		odfViewer.open = true
		if (context) {
			if (context?.$file?.attr('data-mounttype') === 'external-session') {
				OCP.Toast.error(t('richdocuments', 'Opening the file is not supported, since the credentials for the external storage are not available without a session'), {
					timeout: 0,
				})
				odfViewer.open = false
				return
			}
			fileDir = context.dir
			fileId = context.fileId || context.$file?.attr('data-id')
			templateId = context.templateId
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
		 *
		 * @param {string} url the url
		 * @param {Function} callback to be run after reload is complete
		 */
		const canAccessCSP = (url, callback) => {
			let canEmbed = false
			const frame = document.createElement('iframe')
			frame.style.display = 'none'
			frame.onload = () => {
				canEmbed = true
			}
			document.body.appendChild(frame)
			frame.setAttribute('src', url)
			setTimeout(() => {
				if (!canEmbed) {
					callback()
				}
				document.body.removeChild(frame)
			}, 1000)

		}

		// FIXME: Once Nextcloud 16 is minimum requirement we can just pass the allowed domains to initial state
		// to check then if they are set properly
		const reloadForFederationCSP = (fileName, shareOwnerId) => {
			const preloadId = Preload.open ? parseInt(Preload.open.id) : -1
			if (typeof shareOwnerId !== 'undefined') {
				const lastIndex = shareOwnerId.lastIndexOf('@')
				// only redirect if remote file, not opened though reload and csp blocks the request
				if (shareOwnerId.substr(lastIndex).indexOf('/') !== -1 && fileId !== preloadId) {
					canAccessCSP('https://' + shareOwnerId.substr(lastIndex) + '/ocs/v2.php/apps/richdocuments/api/v1/federation', () => {
						console.debug('Cannot load federated instance though CSP, navigating to ', OC.generateUrl('/apps/richdocuments/open?fileId=' + fileId))
						window.location = OC.generateUrl('/apps/richdocuments/open?fileId=' + fileId)
					})
				}
			}
			return false
		}

		if (context) {
			reloadForFederationCSP(fileName, context?.shareOwnerId)
		}

		$('head').append($('<link rel="stylesheet" type="text/css" href="' + OC.filePath('richdocuments', 'css', 'mobile.css') + '"/>'))

		const $iframe = $('<iframe id="richdocumentsframe" nonce="' + btoa(OC.requestToken) + '" scrolling="no" allowfullscreen src="' + documentUrl + '" />')
		odfViewer.loadingTimeout = setTimeout(odfViewer.onTimeout,
			(OC.getCapabilities().richdocuments.config.timeout * 1000 || 15000))
		$iframe.src = documentUrl

		if ((OC.appswebroots.richdocumentscode || OC.appswebroots.richdocumentscode_arm64)
			&& OC.getCapabilities().richdocuments.config.wopi_url.indexOf('proxy.php') >= 0) {
			odfViewer.checkProxyStatus()
		}

		$('body').css('overscroll-behavior-y', 'none')
		const viewport = document.querySelector('meta[name=viewport]')
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
				filePath: fileDir,
				fileList: context ? context.fileList : undefined,
				fileModel: context ? context.fileModel : undefined,
				sendPostMessage: (msgId, values) => {
					PostMessages.sendWOPIPostMessage(FRAME_DOCUMENT, msgId, values)
				},
			})
			emit('richdocuments:file-open:started', {
				...FilesAppIntegration.loggingContext(),
			})
		})
	},

	onReceiveLoading() {
		odfViewer.receivedLoading = true
		$('#richdocumentsframe').prop('title', 'Collabora Online')
		$('#richdocumentsframe').show()
		handleResize()
		$('html, body').scrollTop(0)
		$('#content').removeClass('loading')
		FilesAppIntegration.initAfterReady()
	},

	onClose() {
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

	onTimeout() {
		if (!odfViewer.receivedLoading && !odfViewer.isProxyStarting) {
			emit('richdocuments:file-open:failed', {
				reason: 'timeout',
				...FilesAppIntegration.loggingContext(),
			})
			odfViewer.onClose()
			OC.Notification.showTemporary(t('richdocuments', 'Failed to load {productName} - please try again later', { productName: OC.getCapabilities().richdocuments.productName || 'Collabora Online' }))
		} else if (!odfViewer.receivedLoading) {
			odfViewer.loadingTimeout = setTimeout(odfViewer.onTimeout,
				(OC.getCapabilities().richdocuments.config.timeout * 1000 || 15000))
		}
	},

	checkProxyStatus() {
		const wopiUrl = OC.getCapabilities().richdocuments.config.wopi_url
		const url = wopiUrl.substr(0, wopiUrl.indexOf('proxy.php') + 'proxy.php'.length)
		$.get(url + '?status').done(function(result) {
			if (result && result.status) {
				if (result.status === 'OK' || result.status === 'error') {
					odfViewer.isProxyStarting = false
				} else if (result.status === 'starting'
					|| result.status === 'stopped'
					|| result.status === 'restarting') {
					odfViewer.isProxyStarting = true

					setTimeout(function() {
						odfViewer.checkProxyStatus()
					}, 1000)
				}
			}
		})
	},
}

const settings = OC.getCapabilities().richdocuments.config || {}
Config.update('ooxml', settings.doc_format === 'ooxml')

window.OCA.RichDocuments = {
	config: {
		create: Types.getFileTypes(),
	},
	open: ({ path, fileId, fileModel, fileList = {} }) => {
		const [dir, file] = splitPath(path)
		odfViewer.onEdit(file, {
			fileId,
			dir,
			shareOwnerId: fileModel.get('shareOwnerId'),
			fileList,
			fileModel,
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
			fileModel,
		})
	},
	FilesAppIntegration: {
		registerHandler: FilesAppIntegration.registerHandler.bind(FilesAppIntegration),
	},
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
		if (isPublic) {
			OC.Plugins.register('OCA.Files.NewFileMenu', NewFileMenu)
		}
	}

	// Open the template picker if there was a create parameter detected on load
	if (Preload.create && Preload.create.type && Preload.create.filename) {
		FilesAppIntegration.preloadCreate()
	}

	if (Preload.open) {
		FilesAppIntegration.preloadOpen()
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
		case 'Action_Load_Resp':
			if (!args?.success) {
				emit('richdocuments:file-open:failed', {
					reason: 'collabora',
					collaboraResponse: parsed?.args?.errorMsg,
					...FilesAppIntegration.loggingContext(),
				})
			} else {
				emit('richdocuments:file-open:succeeded', {
					...FilesAppIntegration.loggingContext(),
				})
			}
			break
		case 'App_LoadingStatus':
			if (args.Status === 'Timeout') {
				emit('richdocuments:file-open:failed', {
					reason: 'timeout',
					...FilesAppIntegration.loggingContext(),
				})
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
			FilesAppIntegration.saveAs(args.fileName)
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
