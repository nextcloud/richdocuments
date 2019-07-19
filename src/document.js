import { getRootUrl } from 'nextcloud-router'
import { getRequestToken, getCurrentUser } from 'nextcloud-auth'
import { languageToBCP47 } from './helpers'
import { getGuestNameCookie, setGuestNameCookie, shouldAskForGuestName } from './helpers/guestName'

/* TODO: move to one object */
/* global richdocuments_directEdit richdocuments_fileId richdocuments_urlsrc richdocuments_token richdocuments_path richdocuments_permissions richdocuments_title getURLParameter richdocuments_canonical_webroot */

const showLoadingIndicator = () => document.getElementById('loadingContainer').classList.add('icon-loading')
const hideLoadingIndicator = () => document.getElementById('loadingContainer').classList.remove('icon-loading')

showLoadingIndicator()

$.widget('oc.guestNamePicker', {
	_create: function() {
		hideLoadingIndicator()

		var text = document.createElement('div')
		$(text).attr('style', 'margin: 0 auto; margin-top: 100px; text-align: center;')

		var para = t('richdocuments', 'Please choose your nickname to continue as guest user.')
		text.innerHTML = para

		var div = document.createElement('div')
		$(div).attr('style', 'margin: 0 auto; width: 250px; display: flex;')
		var nick = '<input type="text" placeholder="' + t('richdocuments', 'Nickname') + '" id="nickname" style="flex-grow: 1; border-right:none; border-top-right-radius: 0; border-bottom-right-radius: 0">'
		var btn = '<input style="border-left:none; border-top-left-radius: 0; border-bottom-left-radius: 0; margin-left: -3px" type="button" id="btn" type="button" value="' + t('richdocuments', 'Set') + '">'
		div.innerHTML = nick + btn

		$('#documents-content').prepend(div)
		$('#documents-content').prepend(text)
		var that = this
		const setGuestNameSubmit = () => {
			var username = $('#nickname').val()
			setGuestNameCookie(username)
			window.location.reload(true)
		}

		$('#nickname').keyup(function(event) {
			if (event.which === 13) {
				setGuestNameSubmit()
			}
		})
		$('#btn').click(() => setGuestNameSubmit())
	}
})

/**
 * Type definitions for WOPI Post message objects
 *
 * @typedef {Object} View
 * @property {Number} ViewId
 * @property {string} UserName
 * @property {string} UserId
 * @property {Number} Color
 * @property {Boolean} ReadOnly
 * @property {Boolean} IsCurrentView
 */

const documentsMain = {
	isEditorMode: false,
	isViewerMode: false,
	isFrameReady: false,
	ready: false,
	fileName: null,
	baseName: null,
	canShare: false,
	canEdit: false,
	loadError: false,
	loadErrorMessage: '',
	loadErrorHint: '',
	fileModel: null,
	renderComplete: false, // false till page is rendered with all required data about the document(s)
	toolbar: '<div id="ocToolbar"><div id="ocToolbarInside"></div><span id="toolbar" class="claro"></span></div>',
	$deferredVersionRestoreAck: null,
	wopiClientFeatures: null,

	// generates docKey for given fileId
	_generateDocKey: function(wopiFileId) {
		var ocurl = getRootUrl() + '/index.php/apps/richdocuments/wopi/files/' + wopiFileId
		if (richdocuments_canonical_webroot) {
			if (!richdocuments_canonical_webroot.startsWith('/')) { richdocuments_canonical_webroot = '/' + richdocuments_canonical_webroot }

			ocurl = ocurl.replace(getRootUrl(), richdocuments_canonical_webroot)
		}

		return ocurl
	},

	getFileList: function() {
		if (window === parent) {
			return null
		}
		if (parent.OCA.Files.App) {
			return parent.OCA.Files.App.fileList
		}
		if (parent.OCA.Sharing.PublicApp) {
			return parent.OCA.Sharing.PublicApp.fileList
		}
		return null
	},

	UI: {
		/* Editor wrapper HTML */
		container: '<div id="mainContainer" class="claro">'
					+ '</div>',

		viewContainer: '<div id="revViewerContainer" class="claro">'
						+ '<div id="revViewer"></div>'
						+ '</div>',

		/* Previous window title */
		mainTitle: '',
		/* Number of revisions already loaded */
		revisionsStart: 0,

		/* Views: people currently editing the file */
		views: {},

		followingEditor: false,

		following: null,

		init: function() {
			if (!richdocuments_directEdit && parent.$('#richdocuments-avatars').length === 0) {
				documentsMain.UI.mainTitle = parent.document.title

				// Add the avatar toolbar if possible
				var avatarList = $('<div id="richdocuments-avatars">')
				avatarList.on('click', function(e) {
					e.stopPropagation()
					parent.$('#editors-menu').toggle()
				})
				var headerRight = parent.$('#header .header-right')
				headerRight.prepend(avatarList)

				this.addVersionSidebarEvents()
			}
		},

		_addHeaderFileActions: function() {
			parent.OC.unregisterMenu(parent.$('#richdocuments-actions .icon-more'), parent.$('#richdocuments-actions-menu'))
			parent.$('#richdocuments-actions').remove()
			var actionsContainer = $('<div id="richdocuments-actions"><div class="icon-more icon-white"></div><ul id="richdocuments-actions-menu" class="popovermenu"></ul></div>')
			var actions = actionsContainer.find('#richdocuments-actions-menu').empty()

			var context = {
				'$file': documentsMain.getFileList().$el.find('[data-id=' + documentsMain.originalFileId + ']').first(),
				fileActions: documentsMain.getFileList().fileActions,
				fileList: documentsMain.getFileList(),
				fileInfoModel: documentsMain.getFileModel()
			}

			var isFavorite = function(fileInfo) {
				return fileInfo.get('tags') && fileInfo.get('tags').indexOf(parent.OC.TAG_FAVORITE) >= 0
			}
			var $favorite = $('<li><a></a></li>').click(function(e) {
				$favorite.find('a').removeClass('icon-starred').removeClass('icon-star-dark').addClass('icon-loading-small')
				documentsMain.getFileList().fileActions.triggerAction('Favorite', documentsMain.getFileModel(), documentsMain.getFileList())
				documentsMain.getFileModel().trigger('change', documentsMain.getFileModel())
			})
			if (isFavorite(context.fileInfoModel)) {
				$favorite.find('a').text(parent.t('files', 'Remove from favorites'))
				$favorite.find('a').addClass('icon-starred')
			} else {
				$favorite.find('a').text(parent.t('files', 'Add to favorites'))
				$favorite.find('a').addClass('icon-star-dark')
			}

			var $info = $('<li><a class="icon-info"></a></li>').click(function() {
				documentsMain.getFileList().fileActions.actions.all.Details.action(documentsMain.fileName, context)
				parent.OC.hideMenus()
			})
			$info.find('a').text(parent.t('files', 'Details'))
			var $download = $('<li><a class="icon-download">Download</a></li>').click(function() {
				documentsMain.getFileList().fileActions.actions.all.Download.action(documentsMain.fileName, context)
				parent.OC.hideMenus()
			})
			$download.find('a').text(parent.t('files', 'Download'))
			actions.append($favorite).append($info).append($download)
			actionsContainer.insertAfter(parent.$('#header .richdocuments-sharing'))
			parent.OC.registerMenu(parent.$('#richdocuments-actions .icon-more'), parent.$('#richdocuments-actions-menu'), false, true)
		},

		/**
		 * @param {View} view
		 * @private
		 */
		_userEntry: function(view) {
			var entry = $('<li></li>')
			entry.append(this._avatarForView(view))

			var label = $('<div class="label"></div>')
			label.text(view.UserName)
			if (view.ReadOnly === '1') {
				label.text(view.UserName + ' ' + t('richdocuments', '(read only)'))

			}
			label.click(function(event) {
				event.stopPropagation()
				documentsMain.UI.followView(view)
			})
			if (this.following === view.ViewId) {
				parent.$('#editors-menu').find('li').removeClass('active')
				entry.addClass('active')
			}
			entry.append(label)

			var isFileOwner = documentsMain.getFileModel() && typeof documentsMain.getFileModel().get('shareOwner') === 'undefined'
			if (documentsMain.canEdit && isFileOwner && !view.IsCurrentView) {
				var removeButton = $('<div class="icon-close" title="Remove user"/>')
				removeButton.click(function() {
					documentsMain.WOPIPostMessage($('#loleafletframe')[0], 'Action_RemoveView', { ViewId: view.ViewId })
				})
				entry.append(removeButton)
			}
			return entry
		},

		/**
		 * @param {View} view
		 * @returns {$|HTMLElement}
		 * @private
		 */
		_avatarForView: function(view) {
			var avatarContainer = $('<div class="richdocuments-avatar"><div class="avatar" title="' + view.UserName + '" data-user="' + view.UserId + '"></div></div>')
			var avatar = avatarContainer.find('.avatar')
			avatar.css({ 'border-color': view.Color,
				'border-width': '2px',
				'border-style': 'solid' })
			if (view.ReadOnly === '1') {
				avatarContainer.addClass('read-only')
				$(avatar).attr('title', view.UserName + ' ' + t('richdocuments', '(read only)'))
			} else {
				$(avatar).attr('title', view.UserName)
			}
			$(avatar).avatar(view.UserId, 32, undefined, true, undefined, view.UserName)
			if (parent.OC.currentUser !== null && view.UserId !== '') {
				// $(avatar).contactsMenu(view.UserId, 0, avatarContainer);
			}
			return avatarContainer
		},

		renderAvatars: function() {
			var avatardiv = parent.$('#header .header-right #richdocuments-avatars')
			avatardiv.empty()
			var popover = $('<div id="editors-menu" class="popovermenu menu-center"><ul></ul></div>')

			var users = []
			// Add new avatars
			var i = 0
			for (var viewId in this.views) {
				/**
				 * @type {View}
				 */
				var view = this.views[viewId]
				view.UserName = view.UserName !== '' ? view.UserName : t('richdocuments', 'Guest')
				popover.find('ul').append(this._userEntry(view))

				if (view.UserId === parent.OC.currentUser) {
					continue
				}
				if (view.UserId !== '' && users.indexOf(view.UserId) > -1) {
					continue
				}
				users.push(view.UserId)
				if (i++ < 3) {
					avatardiv.append(this._avatarForView(view))
				}
			}
			var followCurrentEditor = $('<li><input type="checkbox" class="checkbox" /><label class="label">' + t('richdocuments', 'Follow current editor') + '</label></li>')
			followCurrentEditor.find('label').click(function(event) {
				event.stopPropagation()
				if (documentsMain.UI.followingEditor) {
					documentsMain.UI.followReset()
				} else {
					documentsMain.UI.followCurrentEditor()
				}
			})
			followCurrentEditor.find('.checkbox').prop('checked', documentsMain.UI.followingEditor)
			popover.find('ul').append(followCurrentEditor)
			avatardiv.append(popover)
		},
		followReset: function(event) {
			documentsMain.WOPIPostMessage($('#loleafletframe')[0], 'Action_FollowUser', { Follow: false })
			this.following = null
			this.followingEditor = false
			this.renderAvatars()
		},
		followCurrentEditor: function(event) {
			documentsMain.WOPIPostMessage($('#loleafletframe')[0], 'Action_FollowUser', { Follow: true })
			this.following = null
			this.followingEditor = true
			this.renderAvatars()
		},
		followView: function(view) {
			documentsMain.WOPIPostMessage($('#loleafletframe')[0], 'Action_FollowUser', { ViewId: view.ViewId, Follow: true })
			documentsMain.UI.following = view.ViewId
			documentsMain.UI.followingEditor = false
			documentsMain.UI.renderAvatars()
		},

		showViewer: function(fileId, title) {
			// remove previous viewer, if open, and set a new one
			if (documentsMain.isViewerMode) {
				$('#revViewer').remove()
				$('#revViewerContainer').prepend($('<div id="revViewer">'))
			} else {
				this.addCurrentVersion()
			}

			// WOPISrc - URL that loolwsd will access (ie. pointing to ownCloud)
			// index.php is forced here to avoid different wopi srcs for the same document
			var wopiurl = window.location.protocol + '//' + window.location.host + getRootUrl() + '/index.php/apps/richdocuments/wopi/files/' + fileId
			var wopisrc = encodeURIComponent(wopiurl)

			// urlsrc - the URL from discovery xml that we access for the particular
			// document; we add various parameters to that.
			// The discovery is available at
			//   https://<loolwsd-server>:9980/hosting/discovery
			var urlsrc = documentsMain.urlsrc
				+ 'WOPISrc=' + wopisrc
				+ '&title=' + encodeURIComponent(title)
				+ '&lang=' + languageToBCP47()
				+ '&permission=readonly'

			// access_token - must be passed via a form post
			var accessToken = encodeURIComponent(documentsMain.token)

			// form to post the access token for WOPISrc
			var form = '<form id="loleafletform_viewer" name="loleafletform_viewer" target="loleafletframe_viewer" action="' + urlsrc + '" method="post">'
				+ '<input name="access_token" value="' + accessToken + '" type="hidden"/></form>'

			// iframe that contains the Collabora Online Viewer
			var frame = '<iframe id="loleafletframe_viewer" name="loleafletframe_viewer" nonce="' + btoa(getRequestToken()) + '" style="width:100%;height:100%;position:absolute;"/>'

			$('#revViewer').append(form)
			$('#revViewer').append(frame)

			// submit that
			$('#loleafletform_viewer').submit()
			documentsMain.isViewerMode = true

			// for closing revision mode
			$('#revViewerContainer .closeButton').click(function(e) {
				e.preventDefault()
				documentsMain.onCloseViewer()
			})
		},

		loadRevViewerContainer: function() {
			if (!$('revViewerContainer').length) {
				$(document.body).prepend(documentsMain.UI.viewContainer)
				var closeButton = $('<button class="icon-close closeButton" title="' + parent.t('richdocuments', 'Close version preview') + '"/>')
				$('#revViewerContainer').prepend(closeButton)
			}
		},

		showRevHistory: function(documentPath) {
			// TODO: make sure this also works if using the sidebar with the share icon and navigating to versions then
			parent.FileList.showDetailsView(documentsMain.fileName, 'versionsTabView')
			this.loadRevViewerContainer()
			// Load current revision
			// TODO: add entry to versions
			var fileId = documentsMain.fileId
			var title = documentsMain.fileName
			documentsMain.UI.showViewer(
				fileId, title
			)

		},

		addVersionSidebarEvents: function() {
			$(parent.document.querySelector('#content')).on('click.revisions', '#app-sidebar .preview-container', this.showVersionPreview.bind(this))
			$(parent.document.querySelector('#content')).on('click.revisions', '#app-sidebar .downloadVersion', this.showVersionPreview.bind(this))
			// Use mousedown event to overwrite behavior of the versions app
			$(parent.document.querySelector('#content')).on('mousedown.revisions', '#app-sidebar .revertVersion', this.restoreVersion.bind(this))
		},

		removeVersionSidebarEvents: function() {
			$(parent.document.querySelector('#content')).off('click.revisions')
			$(parent.document.querySelector('#content')).off('click.revisions')
			$(parent.document.querySelector('#content')).off('mousedown.revisions')
		},

		addCurrentVersion: function() {
			if (documentsMain.fileModel) {
				var preview = OC.MimeType.getIconUrl(documentsMain.fileModel.get('mimetype'))
				parent.$('#versionsTabView').prepend('<ul id="lastSavedVersion"><li data-revision="0"><div><div class="preview-container"><img src="' + preview + '" width="44" /></div><div class="version-container">\n'
					+ '<div><a class="downloadVersion"><span class="versiondate has-tooltip live-relative-timestamp" data-timestamp="1551294326000"></span></div></div></li></ul>')
				parent.$('#versionsTabView').prepend('<ul id="currentVersion"><li data-revision="" class="active"><div><div class="preview-container"><img src="' + preview + '" width="44" /></div><div class="version-container">\n'
					+ '<div><a class="downloadVersion">' + t('richdocuments', 'Current version') + '</a></div></div></li></ul>')
				parent.$('.live-relative-timestamp').each(function() {
					$(this).text(OC.Util.relativeModifiedDate(parseInt($(this).attr('data-timestamp'), 10)))
				})
			}
		},

		showVersionPreview: function(e) {
			e.preventDefault()
			documentsMain.UI.loadRevViewerContainer()
			var element = e.currentTarget.parentElement.parentElement
			if ($(e.currentTarget).hasClass('downloadVersion')) {
				element = e.currentTarget.parentElement.parentElement.parentElement.parentElement
			}
			var version = element.dataset.revision
			var fileId = documentsMain.fileId
			var title = documentsMain.fileName
			if (version !== '') {
				fileId += '_' + version
				title += '_' + version
			}
			documentsMain.UI.showViewer(
				fileId, title
			)

			// mark only current <li> as active
			$(element.parentElement.parentElement).find('li').removeClass('active')
			$(element).addClass('active')
		},

		restoreVersion: function(e) {
			var self = this
			e.preventDefault()
			e.stopPropagation()

			documentsMain.onCloseViewer()

			documentsMain.WOPIPostMessage($('#loleafletframe')[0], 'Host_VersionRestore', { Status: 'Pre_Restore' })

			var version = e.currentTarget.parentElement.parentElement.dataset.revision

			documentsMain.$deferredVersionRestoreAck = $.Deferred()
			$.when(documentsMain.$deferredVersionRestoreAck).done(function(args) {
				self._restoreDAV(version)
			})

			// resolve the deferred object immediately if client doesn't support version states
			if (!documentsMain.wopiClientFeatures || !documentsMain.wopiClientFeatures.VersionStates) {
				documentsMain.$deferredVersionRestoreAck.resolve()
			}

			return false
		},

		_restoreSuccess: function(response) {
			if (response.status === 'error') {
				documentsMain.UI.notify(t('richdocuments', 'Failed to revert the document to older version'))
			}

			// load the file again, it should get reverted now
			window.location = $(parent.document.querySelector('#richdocumentsframe')).attr('src')
			parent.OC.Apps.hideAppSidebar()
		},

		_restoreError: function() {
			documentsMain.UI.notify(t('richdocuments', 'Failed to revert the document to older version'))
		},

		_restoreDAV: function(version) {
			var restoreUrl = OC.linkToRemoteBase('dav') + '/versions/' + getCurrentUser().uid
				+ '/versions/' + documentsMain.originalFileId + '/' + version
			$.ajax({
				type: 'MOVE',
				url: restoreUrl,
				headers: {
					Destination: OC.linkToRemote('dav') + '/versions/' + getCurrentUser().uid + '/restore/target'
				},
				success: this._restoreSuccess,
				error: this._restoreError
			})
		},

		showEditor: function(title, fileId, action) {
			if (documentsMain.loadError) {
				documentsMain.onEditorShutdown(documentsMain.loadErrorMessage + '\n' + documentsMain.loadErrorHint)
				return
			}

			if (!documentsMain.renderComplete) {
				setTimeout(function() { documentsMain.UI.showEditor(title, action) }, 10)
				console.debug('Waiting for page to render…')
				return
			}

			OC.Util.History.addOnPopStateHandler(_.bind(documentsMain.onClose))
			OC.Util.History.pushState()

			parent.postMessage('loading', '*')
			hideLoadingIndicator()

			$(document.body).addClass('claro')
			$(document.body).prepend(documentsMain.UI.container)

			// WOPISrc - URL that loolwsd will access (ie. pointing to ownCloud)
			var wopiurl = window.location.protocol + '//' + window.location.host + getRootUrl() + '/index.php/apps/richdocuments/wopi/files/' + documentsMain.fileId
			var wopisrc = encodeURIComponent(wopiurl)

			// urlsrc - the URL from discovery xml that we access for the particular
			// document; we add various parameters to that.
			// The discovery is available at
			//	 https://<loolwsd-server>:9980/hosting/discovery
			var urlsrc = documentsMain.urlsrc
				+ 'WOPISrc=' + wopisrc
				+ '&title=' + encodeURIComponent(title)
				+ '&lang=' + languageToBCP47()
				+ '&closebutton=1'
				+ '&revisionhistory=1'
			if (!documentsMain.canEdit || action === 'view') {
				urlsrc += '&permission=readonly'
			}

			// access_token - must be passed via a form post
			var accessToken = encodeURIComponent(documentsMain.token)

			// form to post the access token for WOPISrc
			var form = '<form id="loleafletform" name="loleafletform" target="loleafletframe" action="' + urlsrc + '" method="post">'
				+ '<input name="access_token" value="' + accessToken + '" type="hidden"/></form>'

			// iframe that contains the Collabora Online
			var frame = '<iframe id="loleafletframe" name="loleafletframe" scrolling="no" allowfullscreen style="width:100%;height:100%;position:absolute;" />'

			$('#mainContainer').append(form)
			$('#mainContainer').append(frame)

			// Listen for App_LoadingStatus as soon as possible
			$('#loleafletframe').ready(function() {
				var editorInitListener = function(e) {
					var msg = {}
					try {
						msg = JSON.parse(e.data)
					} catch (e) {
						return
					}
					if (msg.MessageId === 'App_LoadingStatus') {
						if (msg.Values.Status === 'Frame_Ready') {
							documentsMain.isFrameReady = true
							documentsMain.wopiClientFeatures = msg.Values.Features

							// Forward to mobile handler
							if (window.RichDocumentsMobileInterface) {
								window.RichDocumentsMobileInterface.documentLoaded()
							}

							// iOS webkit fallback
							if (window.webkit
								&& window.webkit.messageHandlers
								&& window.webkit.messageHandlers.RichDocumentsMobileInterface) {
								window.webkit.messageHandlers.RichDocumentsMobileInterface.postMessage('documentLoaded')
							}
						} else if (msg.Values.Status === 'Document_Loaded') {
							window.removeEventListener('message', editorInitListener, false)
							if (documentsMain.getFileList()) {
								documentsMain.getFileModel()
							}
							// Hide buttons when using the mobile app integration
							if (
								window.RichDocumentsMobileInterface
								|| (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.RichDocumentsMobileInterface)
							) {
								documentsMain.WOPIPostMessage($('#loleafletframe')[0], 'Hide_Button', { id: 'fullscreen' })
								documentsMain.WOPIPostMessage($('#loleafletframe')[0], 'Hide_Menu_Item', { id: 'fullscreen' })
							}
						} else if (msg.Values.Status === 'Failed') {
							// Loading failed but editor shows the error
							documentsMain.isFrameReady = true
						} else if (msg.Values.Status === 'Timeout') {
							// Timeout - no response from the editor
							documentsMain.onClose()
							parent.OC.Notification.showTemporary(t('richdocuments', 'Failed to connect to {productName}. Please try again later or contact your server administrator.',
								{ productName: OC.getCapabilities().richdocuments.productName }
							))
						}
					}
				}
				window.addEventListener('message', editorInitListener, false)

				// In case of editor inactivity
				setTimeout(function() {
					if (!documentsMain.isFrameReady) {
						editorInitListener({ data: '{"MessageId": "App_LoadingStatus", "Values": {"Status": "Timeout"}}' })
					}
				}, 15000)
			})

			$('#loleafletframe').load(function() {
				// And start listening to incoming post messages
				window.addEventListener('message', function(e) {
					if (documentsMain.isViewerMode) {
						return
					}

					try {
						var msg = JSON.parse(e.data)
						var msgId = msg.MessageId
						var args = msg.Values
						var deprecated = !!args.Deprecated
					} catch (exc) {
						msgId = e.data
					}

					if (msgId === 'Download_As') {
						console.debug('download for ' + args.Type + '.  Use this url: ' + args.URL)
						if (
							window.RichDocumentsMobileInterface
							|| (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.RichDocumentsMobileInterface)
						) {
							documentsMain.callMobileMessage('downloadAs', args)
							return
						}
					} else if (msgId === 'File_Rename') {
						documentsMain.fileModel = null
						documentsMain.fileName = args.NewName
						if (
							window.RichDocumentsMobileInterface
							|| (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.RichDocumentsMobileInterface)
						) {
							documentsMain.callMobileMessage('fileRename', args)
						} else {
							documentsMain.getFileList().reload()
							parent.OC.Apps.hideAppSidebar()
						}
						return
					} else if (msgId === 'UI_Paste') {
						documentsMain.callMobileMessage('paste');
						return;
					}

					// Check for webview handler
					if (window.RichDocumentsMobileInterface) {
						if (msgId === 'UI_Close') {
							window.RichDocumentsMobileInterface.close()
						} else if (msgId === 'UI_InsertGraphic') {
							window.RichDocumentsMobileInterface.insertGraphic()
						} else if (msgId === 'UI_Share') {
							window.RichDocumentsMobileInterface.share()
						}
						// Fallback to web UI for SaveAs
						if (msgId !== 'UI_SaveAs') {
							return
						}
					}

					// iOS webkit fallback
					if (window.webkit
						&& window.webkit.messageHandlers
						&& window.webkit.messageHandlers.RichDocumentsMobileInterface) {
						if (msgId === 'UI_Close') {
							window.webkit.messageHandlers.RichDocumentsMobileInterface.postMessage('close')
						} else if (msgId === 'UI_InsertGraphic') {
							window.webkit.messageHandlers.RichDocumentsMobileInterface.postMessage('insertGraphic')
						} else if (msgId === 'UI_Share') {
							window.webkit.messageHandlers.RichDocumentsMobileInterface.postMessage('share')
						}
						// Fallback to web UI for SaveAs
						if (msgId !== 'UI_SaveAs') {
							return
						}
					}

					if (msgId === 'UI_Close' || msgId === 'close' /* deprecated */) {
						// If a postmesage API is deprecated, we must ignore it and wait for the standard postmessage
						// (or it might already have been fired)
						if (deprecated) { return }

						documentsMain.onClose()
					} else if (msgId === 'UI_FileVersions' || msgId === 'rev-history' /* deprecated */) {
						if (deprecated) { return }

						documentsMain.UI.showRevHistory(documentsMain.fullPath)
					} else if (msgId === 'UI_Share') {
						if (documentsMain.getFileList()) {
							documentsMain.getFileList().showDetailsView(documentsMain.fileName, 'shareTabView')
							parent.OC.Apps.showAppSidebar()
						}
					} else if (msgId === 'UI_SaveAs') {
						// TODO Move to file picker dialog with input field
						OC.dialogs.prompt(
							t('richdocuments', 'Please enter the filename to store the document as.'),
							t('richdocuments', 'Save As'),
							function(result, value) {
								if (result === true && value) {
									documentsMain.WOPIPostMessage($('#loleafletframe')[0], 'Action_SaveAs', { 'Filename': value })
								}
							},
							true,
							t('richdocuments', 'New filename'),
							false
						).then(function() {
							var $dialog = $('.oc-dialog:visible')
							var $buttons = $dialog.find('button')
							$buttons.eq(0).text(t('richdocuments', 'Cancel'))
							$buttons.eq(1).text(t('richdocuments', 'Save'))
						})
					} else if (msgId === 'UI_CreateFile') {
						documentsMain.UI.createNewFile(args.DocumentType)

					} else if (msgId === 'UI_InsertGraphic') {
						parent.OC.dialogs.filepicker(t('richdocuments', 'Insert from {name}', { name: OC.theme.name }), function(path, type) {
							if (type === OC.dialogs.FILEPICKER_TYPE_CHOOSE) {
								var filename = path.substring(path.lastIndexOf('/') + 1)
								$.ajax({
									type: 'POST',
									url: OC.generateUrl('apps/richdocuments/assets'),
									data: {
										path: path
									}
								}).done(function(resp) {
									documentsMain.postAsset(filename, resp.url)
								})
							}
						}, false, ['image/png', 'image/gif', 'image/jpeg', 'image/svg'], true, OC.dialogs.FILEPICKER_TYPE_CHOOSE)
					} else if (msgId === 'App_VersionRestore') {
						if (!documentsMain.$deferredVersionRestoreAck) {
							console.warn('No version restore deferred object found.')
							return
						}

						if (args.Status === 'Pre_Restore_Ack') {
							// user instructed to restore the version
							documentsMain.$deferredVersionRestoreAck.resolve()
						}
					} else if (msgId === 'View_Added') {
						if (deprecated) { return }

						documentsMain.UI.views[args.ViewId] = args
						documentsMain.UI.renderAvatars()
					} else if (msgId === 'View_Removed') {
						if (deprecated) { return }

						delete documentsMain.UI.views[args.ViewId]
						documentsMain.UI.renderAvatars()
					} else if (msgId === 'Get_Views_Resp' || msgId === 'Views_List') {
						documentsMain.UI.views = {}
						args.forEach(function(view) {
							documentsMain.UI.views[view.ViewId] = view
						})
						documentsMain.UI.renderAvatars()
					} else if (msgId === 'FollowUser_Changed') {
						if (args.IsFollowEditor) {
							documentsMain.UI.followingEditor = true
						} else {
							documentsMain.UI.followingEditor = false
						}
						if (args.IsFollowUser) {
							documentsMain.UI.following = args.FollowedViewId
						} else {
							documentsMain.UI.following = null
						}
						documentsMain.UI.renderAvatars()
					}
				})

				// Tell the LOOL iframe that we are ready now
				documentsMain.WOPIPostMessage($('#loleafletframe')[0], 'Host_PostmessageReady', {})
			})

			// submit that
			$('#loleafletform').submit()
		},

		/* Ask for a new filename and open the files app in a new tab
		 * the parameters richdocuments_create and richdocuments_filename are
		 * parsed by viewer.js and open a template picker in the new tab
		 */
		createNewFile: function(type) {
			parent.OC.dialogs.prompt(
				t('richdocuments', 'Please enter the filename for the new document'),
				t('richdocuments', 'Save As'),
				function(result, value) {
					if (result === true && value) {
						if (type === 'text') {
							type = 'document'
						}
						var dir = parent.$('#dir').val()
						var url = OC.generateUrl('/apps/files/?dir=' + dir + '&richdocuments_create=' + type + '&richdocuments_filename=' + encodeURI(value))
						window.open(url, '_blank')
					}
				},
				true,
				t('richdocuments', 'New filename'),
				false
			).then(function() {
				var $dialog = parent.$('.oc-dialog:visible')
				var $buttons = $dialog.find('button')
				$buttons.eq(0).text(t('richdocuments', 'Cancel'))
				$buttons.eq(1).text(t('richdocuments', 'Create a new document'))
			})
		},

		hideEditor: function() {
			// Fade out editor
			$('#mainContainer').fadeOut('fast', function() {
				$('#mainContainer').remove()
				$('#content-wrapper').fadeIn('fast')
				$(document.body).removeClass('claro')
				parent.document.title = documentsMain.UI.mainTitle
			})
		},

		notify: function(message) {
			OC.Notification.show(message)
			setTimeout(OC.Notification.hide, 10000)
		}
	},

	onStartup: function() {
		var fileId
		documentsMain.UI.init()

		// Does anything indicate that we need to autostart a session?
		fileId = getURLParameter('fileId').replace(/^\W*/, '')

		if (fileId && Number.isInteger(Number(fileId)) && $('#nickname').length === 0) {
			documentsMain.prepareSession()
			documentsMain.originalFileId = fileId
		}

		documentsMain.ready = true
	},

	WOPIPostMessage: function(iframe, msgId, values) {
		if (iframe) {
			var msg = {
				'MessageId': msgId,
				'SendTime': Date.now(),
				'Values': values
			}

			iframe.contentWindow.postMessage(JSON.stringify(msg), '*')
		}
	},

	callMobileMessage: function(messageName, attributes) {
		var message = messageName
		if (typeof attributes !== 'undefined') {
			message = {
				MessageName: messageName,
				Values: attributes
			}
		}
		// Forward to mobile handler
		if (window.RichDocumentsMobileInterface && typeof window.RichDocumentsMobileInterface[messageName] === 'function') {
			window.RichDocumentsMobileInterface[messageName](JSON.stringify(attributes))
		}

		// iOS webkit fallback
		if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.RichDocumentsMobileInterface) {
			window.webkit.messageHandlers.RichDocumentsMobileInterface.postMessage(message)
		}
	},

	prepareSession: function() {
		documentsMain.isEditorMode = true
	},

	initSession: function() {
		documentsMain.urlsrc = richdocuments_urlsrc
		documentsMain.fullPath = richdocuments_path
		documentsMain.token = richdocuments_token

		$('footer,nav').hide()
		$(documentsMain.toolbar).appendTo('#header')

		documentsMain.canShare = typeof OC.Share !== 'undefined' && richdocuments_permissions & OC.PERMISSION_SHARE

		// fade out file list and show the document
		$('#content-wrapper').fadeOut('fast').promise().done(function() {

			documentsMain.fileId = richdocuments_fileId
			documentsMain.fileName = richdocuments_title

			documentsMain.canEdit = Boolean(richdocuments_permissions & OC.PERMISSION_UPDATE)

			documentsMain.loadDocument(documentsMain.fileName, documentsMain.fileId)
		})
	},

	getFileModel: function() {
		if (documentsMain.getFileList() && documentsMain.getFileList()._detailsView && documentsMain.getFileList()._detailsView.getFileInfo()) {
			if (documentsMain.fileModel && documentsMain.fileModel !== documentsMain.getFileList()._detailsView.getFileInfo()) {
				documentsMain.fileModel = documentsMain.getFileList()._detailsView.getFileInfo()
				documentsMain.fileModel.on('change', function() {
					documentsMain.UI._addHeaderFileActions()
				})
			}
		}

		if (documentsMain.fileModel) {
			return documentsMain.fileModel
		}
		if (documentsMain.getFileList()) {
			documentsMain.getFileList().scrollTo([documentsMain.fileName, ''])
			var fileModel = documentsMain.getFileList().getModelForFile(documentsMain.fileName)

			if (fileModel) {
				fileModel.on('change', function() {
					documentsMain.UI._addHeaderFileActions()
				})
				documentsMain.fileModel = fileModel
				documentsMain.UI._addHeaderFileActions()
			} else {
				setTimeout(documentsMain.getFileModel, 500)
			}
		}
	},

	loadDocument: function(title, fileId) {
		documentsMain.UI.showEditor(title, fileId, 'write')
	},

	onEditorShutdown: function(message) {
		OC.Notification.show(message)

		$(window).off('beforeunload')
		$(window).off('unload')
		if (documentsMain.isEditorMode) {
			documentsMain.isEditorMode = false
			parent.location.hash = ''
		} else {
			setTimeout(OC.Notification.hide, 7000)
		}
		documentsMain.UI.hideEditor()

		$('footer,nav').show()
	},

	onClose: function() {
		documentsMain.isEditorMode = false
		$(window).off('beforeunload')
		$(window).off('unload')
		parent.location.hash = ''

		$('footer,nav').show()
		documentsMain.UI.hideEditor()
		$('#ocToolbar').remove()

		parent.document.title = documentsMain.UI.mainTitle
		parent.postMessage('close', '*')
		documentsMain.UI.removeVersionSidebarEvents()
	},

	onCloseViewer: function() {
		$('#revisionsContainer *').off()

		$('#revPanelContainer').remove()
		$('#revViewerContainer').remove()
		documentsMain.isViewerMode = false
		documentsMain.UI.revisionsStart = 0
		parent.$('#versionsTabView .active').removeClass('active')
		parent.$('#versionsTabView #currentVersion').remove()
		parent.OC.Apps.hideAppSidebar()
		$('#loleafletframe').focus()
	},

	postAsset: function(filename, url) {
		documentsMain.WOPIPostMessage($('#loleafletframe')[0], 'Action_InsertGraphic', {
			filename: filename,
			url: url
		})
	},

	postGrabFocus: function() {
		documentsMain.WOPIPostMessage($('#loleafletframe')[0], 'Grab_Focus')
	}
}

$(document).ready(function() {

	if (!OCA.RichDocuments) {
		OCA.RichDocuments = {}
	}

	if (!OC.Share) {
		OC.Share = {}
	}

	OCA.RichDocuments.documentsMain = documentsMain

	if (shouldAskForGuestName()) {
		$('#documents-content').guestNamePicker()
	} else {
		documentsMain.initSession()
	}
	documentsMain.renderComplete = true

	var viewport = document.querySelector('meta[name=viewport]')
	viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no')

	documentsMain.onStartup()
})
