/**
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
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

import { generateUrl, generateRemoteUrl, getRootUrl } from '@nextcloud/router'
import { getCurrentUser } from '@nextcloud/auth'
import moment from '@nextcloud/moment'

const isPublic = document.getElementById('isPublic') && document.getElementById('isPublic').value === '1'

export default {

	fileModel: null,

	fileList: undefined,

	filePath: undefined,

	/* Views: people currently editing the file */
	views: {},

	followingEditor: false,

	following: null,

	handlers: {},

	startLoading() {
		if (this.getFileList()) {
			this.getFileList().setViewerMode && this.getFileList().setViewerMode(true)
			this.getFileList().showMask && this.getFileList().showMask()
		}
	},

	init({ fileName, fileId, filePath, sendPostMessage, fileList, fileModel }) {
		this.fileName = fileName
		this.fileId = fileId
		this.fileList = fileList
		this.filePath = filePath
		this.fileModel = fileModel
		this.sendPostMessage = sendPostMessage

		if (this.fileModel && this.fileModel.on) {
			this.fileModel.on('change', () => {
				this._addHeaderFileActions()
			})
		}
	},

	registerHandler(event, callback) {
		this.handlers[event] = callback
	},

	initAfterReady() {
		if (this.handlers.initAfterReady && this.handlers.initAfterReady(this)) {
			return
		}

		if (this.getFileList()) {
			this.getFileModel()
			this.getFileList().hideMask && this.getFileList().hideMask()
			this.getFileList().setPageTitle && this.getFileList().setPageTitle(this.fileName)
		}

		if (!isPublic) {
			this.addVersionSidebarEvents()
		}
	},

	close() {
		if (this.handlers.close && this.handlers.close(this)) {
			return
		}

		if (this.getFileList()) {
			this.getFileList().setViewerMode && this.getFileList().setViewerMode(false)
			this.getFileList().reload && this.getFileList().reload()
		}
		this.fileModel = null
		if (!isPublic) {
			this.removeVersionSidebarEvents()
		}
		$('#richdocuments-header').remove()
	},

	saveAs(newName) {
		if (this.handlers.saveAs && this.handlers.saveAs(this)) {
			return
		}

		if (newName) {
			this.fileName = newName
		}

		if (this.getFileList()) {
			this.getFileList()
				.reload()
			OC.Apps.hideAppSidebar()
		}
	},

	share() {
		if (this.handlers.share && this.handlers.share(this)) {
			return
		}

		if (isPublic || !this.getFileList()) {
			console.error('[FilesAppIntegration] Sharing is not supported')
			return
		}
		if (OCA.Files.Sidebar) {
			OCA.Files.Sidebar.open(this.filePath + '/' + this.fileName)
		}
	},

	rename(newName) {
		this.fileName = newName

		if (this.handlers.rename && this.handlers.rename(this)) {
			return
		}
		if (this.getFileList()) {
			this.getFileList().reload && this.getFileList().reload()
			OC.Apps.hideAppSidebar()
		}
	},

	insertGraphic(insertFile) {
		if (isPublic) {
			console.error('[FilesAppIntegration] insertGraphic is not supported')
		}

		const insertFileFromPath = (path) => {
			const filename = path.substring(path.lastIndexOf('/') + 1)
			$.ajax({
				type: 'POST',
				url: generateUrl('apps/richdocuments/assets'),
				data: {
					path,
				},
			}).done(function(resp) {
				insertFile(filename, resp.url)
			})
		}

		if (this.handlers.insertGraphic && this.handlers.insertGraphic(this, { insertFileFromPath })) {
			return
		}

		OC.dialogs.filepicker(t('richdocuments', 'Insert from {name}', { name: OC.theme.name }), function(path, type) {
			if (type === OC.dialogs.FILEPICKER_TYPE_CHOOSE) {
				insertFileFromPath(path)
			}
		}, false, ['image/png', 'image/gif', 'image/jpeg', 'image/svg'], true, OC.dialogs.FILEPICKER_TYPE_CHOOSE)
	},

	getFileList() {
		if (this.fileList) {
			return this.fileList
		}
		if (OCA.Files && OCA.Files.App) {
			return OCA.Files.App.fileList
		}
		if (OCA.Sharing && OCA.Sharing.PublicApp) {
			return OCA.Sharing.PublicApp.fileList
		}
		return null
	},

	getFileModel() {
		if (this.fileModel) {
			return this.fileModel
		}
		if (!this.getFileList() || !this.getFileList().getModelForFile || !this.getFileList()._updateDetailsView) {
			return null
		}
		this.getFileList()._updateDetailsView(this.fileName, false)
		this.fileModel = this.getFileList().getModelForFile(this.fileName)

		if (this.fileModel && this.fileModel.on) {
			this.fileModel.on('change', () => {
				this._addHeaderFileActions()
			})
		}

		return this.fileModel
	},

	setViews(views) {
		this.views = {}
		views.forEach((view) => {
			this.views[view.ViewId] = view
		})
		this.renderAvatars()
	},

	followReset(event) {
		this.sendPostMessage('Action_FollowUser', { Follow: false })
		this.following = null
		this.followingEditor = false
		this.renderAvatars()
	},
	followCurrentEditor(event) {
		this.sendPostMessage('Action_FollowUser', { Follow: true })
		this.following = null
		this.followingEditor = true
		this.renderAvatars()
	},
	followView(view) {
		this.sendPostMessage('Action_FollowUser', { ViewId: view.ViewId, Follow: true })
		this.following = view.ViewId
		this.followingEditor = false
		this.renderAvatars()
	},

	_addAvatarList() {
		// Add the avatar toolbar if possible
		const avatarList = $('<div id="richdocuments-avatars">')
		avatarList.on('click', function(e) {
			e.stopPropagation()
			$('#editors-menu').toggle()
		})
		$('#richdocuments-header').append(avatarList)
	},

	_addHeaderShareButton() {
		if ($('header').length) {
			const isInverted = Boolean(window?.OCA?.Theming?.inverted)
			const $button = $('<div id="richdocuments-sharing"><a class="icon-collabora icon-shared ' + (isInverted ? 'icon-black' : 'icon-white') + '"></a></div>')
			$('#richdocuments-header').append($button)
			$button.on('click', () => {
				if (!$('#app-sidebar').is(':visible')) {
					return this.share()
				}
				OC.Apps.hideAppSidebar()
			})
			$('.searchbox').hide()
		}
	},

	_addHeaderFileActions() {
		console.debug('[FilesAppIntegration] Adding header file actions')
		OC.unregisterMenu($('#richdocuments-actions .icon-more'), $('#richdocuments-actions-menu'))
		$('#richdocuments-actions').remove()
		const isInverted = Boolean(window?.OCA?.Theming?.inverted)
		const actionsContainer = $('<div id="richdocuments-actions"><div class="icon-collabora icon-more ' + (isInverted ? 'icon-black' : 'icon-white') + '"></div><ul id="richdocuments-actions-menu" class="popovermenu"></ul></div>')
		const actions = actionsContainer.find('#richdocuments-actions-menu').empty()

		const getContext = () => ({
			$file: this.getFileList().$el ? this.getFileList().$el.find('[data-id=' + this.fileId + ']').first() : null,
			fileActions: this.getFileList().fileActions,
			fileList: this.getFileList(),
			fileInfoModel: this.getFileModel(),
		})

		const isFavorite = function(fileInfo) {
			return fileInfo.get('tags') && fileInfo.get('tags').indexOf(OC.TAG_FAVORITE) >= 0
		}
		const $favorite = $('<li><a></a></li>').click((event) => {
			$favorite.find('a').removeClass('icon-starred').removeClass('icon-star-dark').addClass('icon-loading-small')
			if (this.handlers.actionFavorite && this.handlers.actionFavorite(this)) {
				return
			}
			this.getFileList().fileActions.triggerAction('Favorite', this.getFileModel(), this.getFileList())
			this.getFileModel().trigger('change', this.getFileModel())
		})
		if (isFavorite(this.getFileModel())) {
			$favorite.find('a').text(t('files', 'Remove from favorites'))
			$favorite.find('a').addClass('icon-starred')
		} else {
			$favorite.find('a').text(t('files', 'Add to favorites'))
			$favorite.find('a').addClass('icon-star-dark')
		}

		const $info = $('<li><a class="icon-info"></a></li>').click(() => {
			if (this.handlers.actionDetails && this.handlers.actionDetails(this)) {
				return
			}
			this.getFileList().fileActions.actions.all.Details.action(this.fileName, getContext())
			OC.hideMenus()
		})
		$info.find('a').text(t('files', 'Details'))
		const $download = $('<li><a class="icon-download">Download</a></li>').click(() => {
			if (this.handlers.actionDownload && this.handlers.actionDownload(this)) {
				return
			}
			this.getFileList().fileActions.actions.all.Download.action(this.fileName, getContext())
			OC.hideMenus()
		})
		$download.find('a').text(t('files', 'Download'))
		actions.append($favorite).append($info).append($download)
		$('#richdocuments-header').append(actionsContainer)
		OC.registerMenu($('#richdocuments-actions .icon-more'), $('#richdocuments-actions-menu'), false, true)
	},

	/**
	 * @param {View} view the view
	 * @returns {$|HTMLElement}
	 * @private
	 */
	_userEntry(view) {
		const entry = $('<li></li>')
		entry.append(this._avatarForView(view))

		const label = $('<div class="label"></div>')
		label.text(view.UserName)
		if (view.ReadOnly === '1') {
			label.text(view.UserName + ' ' + t('richdocuments', '(read only)'))

		}
		label.click((event) => {
			event.stopPropagation()
			this.followView(view)
		})
		if (this.following === view.ViewId) {
			$('#editors-menu').find('li').removeClass('active')
			entry.addClass('active')
		}
		entry.append(label)

		const isFileOwner = !isPublic && this.getFileModel() && typeof this.getFileModel().get('shareOwner') === 'undefined'
		const canEdit = this.getFileModel() && !!(this.getFileModel().get('permissions') & OC.PERMISSION_UPDATE)
		if (isFileOwner && canEdit && !view.IsCurrentView) {
			const removeButton = $('<div class="icon-close" title="' + t('richdocuments', 'Remove user') + '"/>')
			removeButton.click(() => {
				this.sendPostMessage('Action_RemoveView', { ViewId: view.ViewId })
			})
			entry.append(removeButton)
		}
		return entry
	},

	/**
	 * @param {View} view the view
	 * @returns {$|HTMLElement}
	 * @private
	 */
	_avatarForView(view) {
		const userId = (view.UserId === '') ? view.UserName : view.UserId
		const avatarContainer = $('<div class="richdocuments-avatar"><div class="avatar" title="' + view.UserName + '" data-user="' + userId + '"></div></div>')
		const avatar = avatarContainer.find('.avatar')

		avatar.css({
			borderColor: '#' + ('000000' + Number(view.Color).toString(16)).substr(-6),
			borderWidth: '2px',
			borderStyle: 'solid',
		})
		if (view.ReadOnly === '1') {
			avatarContainer.addClass('read-only')
			$(avatar).attr('title', view.UserName + ' ' + t('richdocuments', '(read only)'))
		} else {
			$(avatar).attr('title', view.UserName)
		}

		$(avatar).avatar(userId, 32, undefined, true, undefined, view.UserName)
		return avatarContainer
	},

	renderAvatars() {
		const avatardiv = $('#header .header-right #richdocuments-avatars')
		avatardiv.empty()
		const popover = $('<div id="editors-menu" class="popovermenu"><ul></ul></div>')

		const users = []
		// Add new avatars
		let i = 0
		for (const viewId in this.views) {
			/**
			 * @type {View}
			 */
			const view = this.views[viewId]
			view.UserName = view.UserName !== '' ? view.UserName : t('richdocuments', 'Guest')
			popover.find('ul').append(this._userEntry(view))

			if (view.UserId === getCurrentUser()?.uid) {
				continue
			}
			if (view.UserId !== '' && users.indexOf(view.UserId) > -1) {
				continue
			}
			users.push(view.UserId)
			if (i++ < 4) {
				avatardiv.append(this._avatarForView(view))
			}
		}
		const followCurrentEditor = $('<li><input type="checkbox" class="checkbox" /><label class="label">' + t('richdocuments', 'Follow current editor') + '</label></li>')
		followCurrentEditor.find('label').click((event) => {
			event.stopPropagation()
			if (this.followingEditor) {
				this.followReset()
			} else {
				this.followCurrentEditor()
			}
		})
		followCurrentEditor.find('.checkbox').prop('checked', this.followingEditor)
		popover.find('ul').append(followCurrentEditor)
		avatardiv.append(popover)
	},

	addVersionSidebarEvents() {
		$(document.querySelector('#content')).on('click.revisions', '.app-sidebar .preview-container', this.showVersionPreview.bind(this))
		$(document.querySelector('#content')).on('click.revisions', '.app-sidebar .downloadVersion', this.showVersionPreview.bind(this))
		$(document.querySelector('#content')).on('mousedown.revisions', '.app-sidebar .revertVersion', this.restoreVersion.bind(this))
		$(document.querySelector('#content')).on('click.revisionsTab', '.app-sidebar [data-tabid=versionsTabView]', this.addCurrentVersion.bind(this))
	},

	removeVersionSidebarEvents() {
		$(document.querySelector('#content')).off('click.revisions')
		$(document.querySelector('#content')).off('click.revisions')
		$(document.querySelector('#content')).off('mousedown.revisions')
		$(document.querySelector('#content')).off('click.revisionsTab')
	},

	addCurrentVersion() {
		$('#lastSavedVersion').remove()
		$('#currentVersion').remove()
		if (this.getFileModel()) {
			const preview = OC.MimeType.getIconUrl(this.getFileModel().get('mimetype'))
			const mtime = this.getFileModel().get('mtime')
			$('.tab.versionsTabView').prepend('<ul id="lastSavedVersion"><li data-revision="0"><div><div class="preview-container"><img src="' + preview + '" width="44" /></div><div class="version-container">\n'
				+ '<div><a class="downloadVersion">' + t('richdocuments', 'Last saved version') + ' (<span class="versiondate has-tooltip live-relative-timestamp" data-timestamp="' + mtime + '"></span>)</div></div></li></ul>')
			$('.tab.versionsTabView').prepend('<ul id="currentVersion"><li data-revision="" class="active"><div><div class="preview-container"><img src="' + preview + '" width="44" /></div><div class="version-container">\n'
				+ '<div><a class="downloadVersion">' + t('richdocuments', 'Current version (unsaved changes)') + '</a></div></div></li></ul>')
			$('.live-relative-timestamp').each(function() {
				$(this).text(moment(parseInt($(this).attr('data-timestamp'), 10)).fromNow())
			})
		}
	},

	showRevHistory() {
		if (this.handlers.showRevHistory && this.handlers.showRevHistory(this)) {
			return
		}

		if (this.getFileList()) {
			this.getFileList()
				.showDetailsView(this.fileName, 'versionsTabView')
			this.addCurrentVersion()
		}
	},

	showVersionPreview(e) {
		e.preventDefault()
		let element = e.currentTarget.parentElement.parentElement
		if ($(e.currentTarget).hasClass('downloadVersion')) {
			element = e.currentTarget.parentElement.parentElement.parentElement.parentElement
		}
		const version = element.dataset.revision
		const fileId = this.fileId
		const title = this.fileName
		console.debug('[FilesAppIntegration] showVersionPreview', version, fileId, title)
		this.sendPostMessage('Action_loadRevViewer', { fileId, title, version })
		$(element.parentElement.parentElement).find('li').removeClass('active')
		$(element).addClass('active')
	},

	restoreVersion(e) {
		e.preventDefault()
		e.stopPropagation()

		this.sendPostMessage('Host_VersionRestore', { Status: 'Pre_Restore' })

		const version = e.currentTarget.parentElement.parentElement.dataset.revision

		this._restoreVersionCallback = () => {
			this._restoreDAV(version)
			this._restoreVersionCallback = null
		}

		return false
	},

	restoreVersionExecute() {
		if (this._restoreVersionCallback !== null) {
			this._restoreVersionCallback()
		}
	},

	restoreVersionAbort() {
		this._restoreVersionCallback = null
	},

	_restoreSuccess(response) {
		if (response.status === 'error') {
			OC.Notification.showTemporary(t('richdocuments', 'Failed to revert the document to older version'))
		}
		// Reload the document frame to get the new file
		// TODO: ideally we should have a post messsage that can be sent to collabora to just reload the file once the restore is finished
		document.getElementById('richdocumentsframe').src = document.getElementById('richdocumentsframe').src
		OC.Apps.hideAppSidebar()
	},

	_restoreError() {
		OC.Notification.showTemporary(t('richdocuments', 'Failed to revert the document to older version'))
	},

	_restoreDAV(version) {
		const restoreUrl = getRootUrl() + '/remote.php/dav/versions/' + getCurrentUser().uid
			+ '/versions/' + this.fileId + '/' + version
		$.ajax({
			type: 'MOVE',
			url: restoreUrl,
			headers: {
				Destination: generateRemoteUrl('dav') + '/versions/' + getCurrentUser().uid + '/restore/target',
			},
			success: this._restoreSuccess.bind(this),
			error: this._restoreError.bind(this),
		})
	},

	/**
	 * Called when a new file creation has been triggered from collabora
	 *
	 * Ask for a new filename and open the files app in a new tab
	 * the parameters richdocuments_create and richdocuments_filename are
	 * parsed by viewer.js and open a template picker in the new tab with
	 * FilesAppIntegration.preloadCreate
	 *
	 * @param {string} type the file type
	 */
	createNewFile(type) {
		if (this.handlers.createNewFile && this.handlers.createNewFile(this, { type })) {
			return
		}

		OC.dialogs.prompt(
			t('richdocuments', 'Please enter the filename for the new document'),
			t('richdocuments', 'Save As'),
			function(result, value) {
				if (result === true && value) {
					if (type === 'text') {
						type = 'document'
					}
					const dir = parent.$('#dir').val()
					const url = generateUrl('/apps/files/?dir=' + dir + '&richdocuments_create=' + type + '&richdocuments_filename=' + encodeURI(value))
					window.open(url, '_blank')
				}
			},
			true,
			t('richdocuments', 'New filename'),
			false
		).then(function() {
			const $dialog = parent.$('.oc-dialog:visible')
			const $buttons = $dialog.find('button')
			$buttons.eq(0).text(t('richdocuments', 'Cancel'))
			$buttons.eq(1).text(t('richdocuments', 'Create a new document'))
		})
	},

	loggingContext() {
		return {
			currentUser: getCurrentUser()?.uid,
			file: {
				sharingToken: document.getElementById('sharingToken')?.value,
				fileId: this.fileId,
				filePath: (this.filePath ?? '') + '/' + this.fileName,
			},
		}
	},

}
