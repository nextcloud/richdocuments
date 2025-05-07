/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import './init-shared.js'
import { emit } from '@nextcloud/event-bus'
import { generateOcsUrl, getRootUrl, imagePath } from '@nextcloud/router'
import { getRequestToken } from '@nextcloud/auth'
import { loadState } from '@nextcloud/initial-state'
import Config from './services/config.tsx'
import { getUIDefaults, generateCSSVarTokens, getCollaboraTheme } from './helpers/coolParameters.js'
import { enableScrollLock } from './helpers/safariFixer.js'
import PostMessageService from './services/postMessage.tsx'
import { getCapabilities } from './services/capabilities.ts'
import {
	callMobileMessage,
	isDirectEditing,
	isMobileInterfaceAvailable,
} from './helpers/mobile.js'
import { getWopiUrl, getSearchParam, getNextcloudUrl } from './helpers/url.js'
import '../css/document.scss'
import axios from '@nextcloud/axios'
import { spawnDialog } from '@nextcloud/dialogs'
import SaveAs from './components/Modal/SaveAs.vue'

const PostMessages = new PostMessageService({
	parent: window.parent,
	loolframe: () => document.getElementById('loleafletframe').contentWindow,
})

if (isDirectEditing()) {
	enableScrollLock()
}

let checkingProxyStatus = false

const checkProxyStatus = () => {
	checkingProxyStatus = true
	const url = Config.get('urlsrc').slice(0, Config.get('urlsrc').indexOf('proxy.php') + 'proxy.php'.length)
	$.get(url + '?status').done(function(val) {
		if (val && val.status && val.status !== 'OK') {
			if (val.status === 'starting' || val.status === 'stopped') {
				document.getElementById('proxyLoadingIcon').classList.add('icon-loading-small')
				document.getElementById('proxyLoadingMessage').textContent = t('richdocuments', 'Built-in CODE Server is starting up shortly, please wait.')
			} else if (val.status === 'restarting') {
				document.getElementById('proxyLoadingIcon').classList.add('icon-loading-small')
				document.getElementById('proxyLoadingMessage').textContent = t('richdocuments', 'Built-in CODE Server is restarting, please wait.')
			} else if (val.status === 'error') {
				if (val.error === 'appimage_missing') {
					document.getElementById('proxyLoadingMessage').textContent = t('richdocuments', 'Error: Cannot find the AppImage, please reinstall the Collabora Online Built-in server.')
				} else if (val.error === 'chmod_failed' || val.error === 'appimage_not_executable') {
					document.getElementById('proxyLoadingMessage').textContent = t('richdocuments', 'Error: Unable to make the AppImage executable, please setup a standalone server.')
				} else if (val.error === 'exec_disabled') {
					document.getElementById('proxyLoadingMessage').textContent = t('richdocuments', 'Error: Exec disabled in PHP, please enable it, or setup a standalone server.')
				} else if (val.error === 'not_linux' || val.error === 'not_x86_64' || val.error === 'not_aarch64') {
					document.getElementById('proxyLoadingMessage').textContent = t('richdocuments', 'Error: Not running on x86-64 or ARM64 (aarch64) Linux, please setup a standalone server.')
				} else if (val.error === 'no_fontconfig') {
					document.getElementById('proxyLoadingMessage').textContent = t('richdocuments', 'Error: The fontconfig library is not installed on your server, please install it or setup a standalone server.')
				} else if (val.error === 'no_glibc') {
					document.getElementById('proxyLoadingMessage').textContent = t('richdocuments', 'Error: Not running on glibc-based Linux, please setup a standalone server.')
				} else {
					document.getElementById('proxyLoadingMessage').textContent = t('richdocuments', 'Error: Cannot start the Collabora Online Built-in server, please setup a standalone one.')
				}

				// probably not even worth re-trying
				return
			}

			// retry...
			setTimeout(function() { checkProxyStatus() }, 100)
			return
		}

		checkingProxyStatus = false
	})
}

const showLoadingIndicator = () => {
	if ((OC.appswebroots.richdocumentscode || OC.appswebroots.richdocumentscode_arm64) && Config.get('urlsrc').indexOf('proxy.php') >= 0) {
		checkProxyStatus()
	} else {
		document.getElementById('loadingContainer').classList.add('icon-loading')
	}
}

const hideLoadingIndicator = () => {
	if (checkingProxyStatus) {
		setTimeout(function() { hideLoadingIndicator() }, 100)
		return
	}

	document.getElementById('loadingContainer').classList.remove('icon-loading')
	document.getElementById('proxyLoadingIcon').classList.remove('icon-loading-small')
	document.getElementById('proxyLoadingMessage').textContent = ''
}

showLoadingIndicator()

/**
 * Type definitions for WOPI Post message objects
 *
 * @typedef {object} View
 * @property {number} ViewId
 * @property {string} UserName
 * @property {string} UserId
 * @property {number} Color
 * @property {boolean} ReadOnly
 * @property {boolean} IsCurrentView
 */

const documentsMain = {
	isEditorMode: false,
	isViewerMode: false,
	isFrameReady: false,
	isPublic: false,
	ready: false,
	fileName: null,
	baseName: null,
	canShare: false,
	canEdit: false,
	renderComplete: false, // false till page is rendered with all required data about the document(s)
	$deferredVersionRestoreAck: null,
	wopiClientFeatures: null,
	users: [],

	// generates docKey for given fileId
	_generateDocKey(wopiFileId) {
		let canonicalWebroot = Config.get('canonical_webroot')
		let ocurl = getRootUrl() + '/index.php/apps/richdocuments/wopi/files/' + wopiFileId
		if (canonicalWebroot) {
			if (!canonicalWebroot.startsWith('/')) {
				canonicalWebroot = '/' + canonicalWebroot
			}
			Config.update('canonical_webroot', canonicalWebroot)
			ocurl = ocurl.replace(getRootUrl(), canonicalWebroot)
		}

		return ocurl
	},

	UI: {
		/* Editor wrapper HTML */
		container: '<div id="mainContainer" class="claro">'
					+ '</div>',

		viewContainer: '<div id="revViewerContainer" class="claro">'
						+ '<div id="revViewer"></div>'
						+ '</div>',

		showViewer(fileId, title) {
			// remove previous viewer, if open, and set a new one
			if (documentsMain.isViewerMode) {
				$('#revViewer').remove()
				$('#revViewerContainer').prepend($('<div id="revViewer">'))
			}

			const urlsrc = getWopiUrl({ fileId, title, readOnly: true, closeButton: !documentsMain.hideCloseButton })

			// access_token & access_token_ttl - must be passed via a form post
			const accessToken = encodeURIComponent(documentsMain.token)
			const accessTokenTtl = encodeURIComponent(documentsMain.tokenTtl)

			// form to post the access token for WOPISrc
			const form = '<form id="loleafletform_viewer" name="loleafletform_viewer" target="loleafletframe_viewer" action="' + urlsrc + '" method="post">'
				+ '<input name="access_token" value="' + accessToken + '" type="hidden"/>'
				+ '<input name="access_token_ttl" value="' + accessTokenTtl + '" type="hidden"/>'
				+ '<input name="ui_defaults" value="' + getUIDefaults() + '" type="hidden"/>'
				+ '<input name="css_variables" value="' + generateCSSVarTokens() + '" type="hidden"/>'
				+ '<input name="theme" value="' + getCollaboraTheme() + '" type="hidden"/>'
				// buy product for new customer users
				+ '<input name="buy_product" value="https://nextcloud.com/pricing" type="hidden"/>'
				+ '<input name="host_session_id" value="nextcloud ' + OC.config.version
					+ ' - richdocuments ' + getCapabilities().version + '" type="hidden"/>'
				+ '</form>'

			// iframe that contains the Collabora Online Viewer
			const frame = '<iframe data-cy="coolframe" id="loleafletframe" name="loleafletframe_viewer" allowfullscreen allow="clipboard-read *; clipboard-write *" nonce="' + btoa(getRequestToken()) + '" style="width:100%;height:100%;position:absolute;" title="' + getCapabilities().productName + '"/>'

			$('#revViewer').append(form)
			$('#revViewer').append(frame)
			$('#loleafletframe_viewer').focus()

			// submit that
			$('#loleafletform_viewer').submit()
			documentsMain.isViewerMode = true
			// for closing revision mode
			$('#revViewerContainer .closeButton').click(function(e) {
				e.preventDefault()
				documentsMain.onCloseViewer()
			})
		},

		loadRevViewerContainer() {
			if (!$('revViewerContainer').length) {
				$(document.body).prepend(documentsMain.UI.viewContainer)
				const closeButton = $('<button class="icon-close closeButton" title="' + t('richdocuments', 'Close version preview') + '"/>')
				$('#revViewerContainer').prepend(closeButton)
			}
		},

		showEditor(title, fileId, action) {
			if (!documentsMain.renderComplete) {
				setTimeout(function() { documentsMain.UI.showEditor(title, fileId, action) }, 10)
				console.debug('Waiting for page to render…')
				return
			}

			if (!isDirectEditing()) {
				OC.Util.History.addOnPopStateHandler(_.bind(documentsMain.onClose))
				OC.Util.History.pushState()
			}

			PostMessages.sendPostMessage('parent', 'loading')
			hideLoadingIndicator()

			$(document.body).addClass('claro')
			$(document.body).prepend(documentsMain.UI.container)

			const urlsrc = getWopiUrl({ fileId, title, readOnly: false, closeButton: !documentsMain.hideCloseButton, revisionHistory: !documentsMain.isPublic, target: Config.get('target') })

			// access_token - must be passed via a form post
			const accessToken = encodeURIComponent(documentsMain.token)
			const accessTokenTtl = encodeURIComponent(documentsMain.tokenTtl)

			// form to post the access token for WOPISrc
			const form = '<form id="loleafletform" name="loleafletform" target="loleafletframe" action="' + urlsrc + '" method="post">'
				+ '<input name="access_token" value="' + accessToken + '" type="hidden"/>'
				+ '<input name="access_token_ttl" value="' + accessTokenTtl + '" type="hidden"/>'
				+ '<input name="ui_defaults" value="' + getUIDefaults() + '" type="hidden"/>'
				+ '<input name="css_variables" value="' + generateCSSVarTokens() + '" type="hidden"/>'
				+ '<input name="theme" value="' + getCollaboraTheme() + '" type="hidden"/>'
				// buy product for new customer users
				+ '<input name="buy_product" value="https://nextcloud.com/pricing" type="hidden"/>'
				+ '<input name="host_session_id" value="nextcloud ' + OC.config.version
					+ ' - richdocuments ' + getCapabilities().version + '" type="hidden"/>'
				+ '</form>'

			// iframe that contains the Collabora Online
			const frame = '<iframe data-cy="coolframe" id="loleafletframe" name="loleafletframe" nonce="' + btoa(getRequestToken()) + '" scrolling="no" allowfullscreen allow="clipboard-read *; clipboard-write *" style="width:100%;height:100%;position:absolute;" title="' + getCapabilities().productName + '"/>'

			$('#mainContainer').append(form)
			$('#mainContainer').append(frame)
			$('#loleafletframe').focus()

			documentsMain.registerAutoLogout($('#loleafletframe')[0])

			emit('richdocuments:wopi-load:started', {
				wopiFileId: fileId,
			})
			// Listen for App_LoadingStatus as soon as possible
			$('#loleafletframe').ready(function() {
				const editorInitListener = ({ parsed, data }) => {
					console.debug('[document] editorInitListener: Received post message ', parsed)
					const { msgId, args } = parsed

					if (msgId === 'Action_Load_Resp') {
						if (!parsed.args.success) {
							emit('richdocuments:wopi-load:failed', {
								reason: 'collabora',
								collaboraResponse: parsed?.args?.errorMsg,
								wopiFileId: fileId,
							})
						}
						if (!isDirectEditing()) {
							PostMessages.sendPostMessage('parent', data)
						}
					}
					if (msgId !== 'App_LoadingStatus') {
						return
					}

					// Pass though all messages to viewer.js if not direct editing
					if (!isDirectEditing()) {
						PostMessages.sendPostMessage('parent', data)
					}

					switch (args.Status) {
					case 'Frame_Ready':
						documentsMain.isFrameReady = true
						documentsMain.wopiClientFeatures = args.Features
						callMobileMessage('documentLoaded')
						break
					case 'Document_Loaded':
						PostMessages.unregisterPostMessageHandler(editorInitListener)

						// Hide buttons when using the mobile app integration
						if (isDirectEditing()) {
							PostMessages.sendWOPIPostMessage('loolframe', 'Hide_Button', { id: 'fullscreen' })
							PostMessages.sendWOPIPostMessage('loolframe', 'Hide_Menu_Item', { id: 'fullscreen' })
						}
						if (!(Config.get('permissions') & OC.PERMISSION_SHARE)) {
							PostMessages.sendWOPIPostMessage('loolframe', 'Hide_Menu_Item', { id: 'shareas' })
						}

						if (Config.get('userId') === null) {
							PostMessages.sendWOPIPostMessage('loolframe', 'Hide_Menu_Item', { id: 'insertgraphicremote' })
						}

						if (Config.get('userId') !== null && !Config.get('isPublicShare')) {
							PostMessages.sendWOPIPostMessage('loolframe', 'Insert_Button', {
								id: 'Open_Local_Editor',
								imgurl: window.location.protocol + '//' + getNextcloudUrl() + imagePath('richdocuments', 'launch.svg'),
								mobile: false,
								tablet: false,
								label: t('richdocuments', 'Open in local editor'),
								hint: t('richdocuments', 'Open in local editor'),
								insertBefore: 'print',
							})
						}

						emit('richdocuments:wopi-load:succeeded', {
							wopiFileId: fileId,
						})
						break
					case 'Failed':
						// Loading failed but editor shows the error
						documentsMain.isFrameReady = true
						emit('richdocuments:wopi-load:failed', {
							reason: 'collabora',
							collaboraResponse: 'App_LoadingStatus Failed',
							wopiFileId: fileId,
						})
						break
					}
				}

				PostMessages.registerPostMessageHandler(editorInitListener)

				// In case of editor inactivity
				setTimeout(function() {
					if (!documentsMain.isFrameReady) {
						const message = { MessageId: 'App_LoadingStatus', Values: { Status: 'Timeout' } }
						editorInitListener({ data: JSON.stringify(message), parsed: message })
					}
				}, 45000)
			})

			$('#loleafletframe').on('load', function() {
				const ViewerToLool = [
					'Action_FollowUser',
					'Host_VersionRestore',
					'Action_RemoveView',
					'Action_InsertLink',
					'Action_Paste',
					'Action_GetLinkPreview_Resp',
				]
				PostMessages.registerPostMessageHandler(({ parsed, data }) => {
					console.debug('[document] Received post message ', parsed)
					const { msgId, args, deprecated } = parsed

					if (deprecated) {
						return
					}

					if (documentsMain.isViewerMode) {
						let { fileId, title, version } = args
						switch (parsed.msgId) {
						case 'Action_loadRevViewer':
							documentsMain.UI.loadRevViewerContainer()
							if (fileId) {
								fileId += '_' + Config.get('instanceId')
								if (version) {
									fileId += `_${version}`
									title += `_${version}`
								}
								documentsMain.UI.showViewer(
									fileId, title,
								)
							}
							break
						case 'Host_VersionRestore':
							// resolve the deferred object immediately if client doesn't support version states
							if (!documentsMain.wopiClientFeatures || !documentsMain.wopiClientFeatures.VersionStates) {
								console.error('No version support')
								// Not forwarding message to collabora
								return
							}
							documentsMain.onCloseViewer()
							break
						case 'App_VersionRestore':
							// Status = Pre_Restore_Ack -> Ready to restore version
							break
						case 'UI_Share':
							break
						default:
							return
						}

					}

					// Pass all messages to viewer if not direct editing or
					if (!isDirectEditing() && ViewerToLool.indexOf(msgId) === -1) {
						PostMessages.sendPostMessage('parent', data)
					}
					// Pass messages from viewer to lool
					if (ViewerToLool.indexOf(msgId) >= 0) {
						return PostMessages.sendPostMessage('loolframe', data)
					}

					if (isMobileInterfaceAvailable()) {
						if (msgId === 'Download_As') {
							return callMobileMessage('downloadAs', args)
						}
						if (msgId === 'File_Rename') {
							return callMobileMessage('fileRename', args)
						} else if (msgId === 'UI_Paste') {
							callMobileMessage('paste')
							return
						}
						if (msgId === 'UI_Close') {
							callMobileMessage('close')
						} else if (msgId === 'UI_InsertGraphic') {
							callMobileMessage('insertGraphic')
						} else if (msgId === 'UI_Share') {
							callMobileMessage('share')
						} else if (msgId === 'UI_Hyperlink') {
							callMobileMessage('hyperlink', args)
						}
						// Fallback to web UI for SaveAs, otherwise ignore other post messages
						if (msgId !== 'UI_SaveAs') {
							return
						}
					}

					switch (parsed.msgId) {
					case 'UI_Close':
					case 'close':
						documentsMain.onClose()
						break
						// Messages received from the viewer
					case 'postAsset':
						documentsMain.postAsset(args.FileName, args.Url)
						break
					case 'UI_FileVersions':
					case 'rev-history':
						documentsMain.UI.loadRevViewerContainer()
						documentsMain.UI.showViewer(
							documentsMain.fileId, documentsMain.title,
						)
						break
					case 'RD_Version_Restored':
						$('#loleafletform_viewer').submit()
						break
					case 'File_Rename':
						documentsMain.fileName = args.NewName
						break
					case 'Views_List':
						documentsMain.users = []
						parsed.args.forEach((view) => {
							if (!view.UserId.startsWith('Guest-')) {
								documentsMain.users.push({ id: view.UserId, label: view.UserName })
							}
						})
						break
					case 'Get_Views_Resp':
						if (documentsMain.openingLocally) {
							documentsMain.UI.removeViews(parsed.args)
							documentsMain.unlockFile()
								.catch(_ => {}) // Unlocking failed, possibly because file was not locked, we want to proceed regardless.
								.then(() => {
									documentsMain.openLocally()
								})
						}
						break
					case 'UI_Mention':
						documentsMain.sendUserList(parsed.args.text)
						break
					default:
						console.debug('[document] Unhandled post message', parsed)
					}

					if (msgId === 'UI_SaveAs') {
						spawnDialog(
							SaveAs,
							{
								path: documentsMain.fileName,
								format: args.Format,
							},
							(value) => value && PostMessages.sendWOPIPostMessage('loolframe', 'Action_SaveAs', { Filename: value, Notify: true }),
						)
					} else if (msgId === 'Action_Save_Resp') {
						if (args.success && args.fileName) {
							documentsMain.fileName = args.fileName
						}
					}
				})

				// Tell the LOOL iframe that we are ready now
				PostMessages.sendWOPIPostMessage('loolframe', 'Host_PostmessageReady', {})

				// In the mobile apps, don't let Collabora Online handle the
				// hyperlinks, instead do that in the apps
				if (isMobileInterfaceAvailable()) {
					PostMessages.sendWOPIPostMessage('loolframe', 'Disable_Default_UIAction', { action: 'UI_Hyperlink', disable: true })
				}
			})

			// submit that
			$('#loleafletform').submit()
		},

		hideEditor() {
			// Fade out editor
			$('#mainContainer').fadeOut('fast', function() {
				$('#mainContainer').remove()
				$('#content-wrapper').fadeIn('fast')
				$(document.body).removeClass('claro')
			})
		},

		removeViews(views) {
			PostMessages.sendWOPIPostMessage('loolframe', 'Action_Save', {
				DontTerminateEdit: false,
				DontSaveIfUnmodified: false,
				Notify: false,
			})

			views.forEach((view) => {
				PostMessages.sendWOPIPostMessage('loolframe', 'Action_RemoveView', { ViewId: Number(view.ViewId) })
			})
		},
	},

	unlockFile() {
		const unlockUrl = getRootUrl() + '/index.php/apps/richdocuments/wopi/files/' + documentsMain.fileId
		const unlockConfig = {
			headers: { 'X-WOPI-Override': 'UNLOCK' },
		}
		return axios.post(unlockUrl, { access_token: documentsMain.token }, unlockConfig)
	},

	async sendUserList(search) {
		let users = documentsMain.users

		if (Config.get('userId') !== null) {
			try {
				const result = await axios.get(generateOcsUrl('core/autocomplete/get'), {
					params: { search },
				})
				users = result.data.ocs.data
			} catch (e) { }
		}

		const list = users.map((user) => {
			const profile = window.location.protocol + '//' + getNextcloudUrl() + '/index.php/u/' + user.id
			return { username: user.label, profile }
		})
		PostMessages.sendWOPIPostMessage('loolframe', 'Action_Mention', { list })
	},

	onStartup() {
		// Does anything indicate that we need to autostart a session?
		const fileId = (getSearchParam('fileId') || '').replace(/^\W*/, '')

		if (fileId && Number.isInteger(Number(fileId)) && $('#nickname').length === 0) {
			documentsMain.isEditorMode = true
			documentsMain.originalFileId = fileId
		}

		documentsMain.ready = true
	},

	initSession() {
		PostMessages.sendPostMessage('parent', 'loading')

		documentsMain.urlsrc = Config.get('urlsrc')
		documentsMain.fullPath = Config.get('path')
		documentsMain.token = Config.get('token')
		documentsMain.tokenTtl = Config.get('token_ttl') * 1000
		documentsMain.fileId = Config.get('fileId')
		documentsMain.fileName = Config.get('title')
		documentsMain.canEdit = Boolean(Config.get('permissions') & OC.PERMISSION_UPDATE)
		documentsMain.canShare = typeof OC.Share !== 'undefined' && Config.get('permissions') & OC.PERMISSION_SHARE
		documentsMain.isPublic = !Config.get('userId')
		documentsMain.hideCloseButton = Config.get('hideCloseButton')

		$('footer,nav').hide()
		// fade out file list and show the document
		$('#content-wrapper').fadeOut('fast').promise().done(function() {
			documentsMain.loadDocument(documentsMain.fileName, documentsMain.fileId)
		})
	},

	loadDocument(title, fileId) {
		documentsMain.UI.showEditor(title, fileId, 'write')
	},

	onEditorShutdown(message) {
		OC.Notification.show(message)

		$(window).off('beforeunload')
		$(window).off('unload')
		if (documentsMain.isEditorMode) {
			documentsMain.isEditorMode = false
		} else {
			setTimeout(OC.Notification.hide, 7000)
		}
		documentsMain.UI.hideEditor()

		$('footer,nav').show()
	},

	onClose() {
		documentsMain.isEditorMode = false
		$(window).off('beforeunload')
		$(window).off('unload')

		$('footer,nav').show()
		documentsMain.UI.hideEditor()
		documentsMain.openLocally()

		PostMessages.sendPostMessage('parent', 'close', '*')
	},

	onCloseViewer() {
		$('#revisionsContainer *').off()

		$('#revPanelContainer').remove()
		$('#revViewerContainer').remove()
		documentsMain.isViewerMode = false

		$('#loleafletframe').focus()
	},

	/**
	 * Called by mobile clients to properly end the COOL session
	 *
	 * @public
	 */
	close() {
		documentsMain.onClose()
	},

	/**
	 * Called by mobile clients post a selected graphic to COOL
	 *
	 * @param {string} filename the file name
	 * @param {string} url the url
	 * @public
	 */
	postAsset(filename, url) {
		PostMessages.sendWOPIPostMessage('loolframe', 'Action_InsertGraphic', {
			filename,
			url,
		})
	},

	/**
	 * Called by mobile clients to indicate that their app got back to an active state
	 *
	 * @public
	 */
	postGrabFocus() {
		PostMessages.sendWOPIPostMessage('loolframe', 'Grab_Focus')
	},

	/**
	 * Register activity listeners that prevent auto_logout from kicking in
	 * (Core mechanism for this doesn't work, because we create a new frame)
	 *
	 * @param window
	 */
	registerAutoLogout(window) {
		const config = loadState('core', 'config')

		if (!config.auto_logout) {
			return
		}

		window.addEventListener('mousemove', e => {
			localStorage.setItem('lastActive', Date.now())
		})

		window.addEventListener('touchstart', e => {
			localStorage.setItem('lastActive', Date.now())
		})
	},
}

document.addEventListener('DOMContentLoaded', async () => {

	if (!OCA.RichDocuments) {
		OCA.RichDocuments = {}
	}

	if (!OC.Share) {
		OC.Share = {}
	}

	OCA.RichDocuments.documentsMain = documentsMain

	Config.update('wopi_callback_url', loadState('richdocuments', 'wopi_callback_url', ''))

	documentsMain.initSession()
	documentsMain.renderComplete = true

	const viewport = document.querySelector('meta[name=viewport]')
	viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no')

	documentsMain.onStartup()

	window.documentsMain = documentsMain
})
