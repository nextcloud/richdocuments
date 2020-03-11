/*
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

const isPublic = document.getElementById('isPublic') && document.getElementById('isPublic').value === '1'

export default {

	fileModel: null,

	fileList: FileList,

	/* Views: people currently editing the file */
	views: {},

	followingEditor: false,

	following: null,

	init({ fileName, fileId, sendPostMessage, fileList }) {
		this.fileName = fileName
		this.fileId = fileId
		this.fileList = fileList
		this.sendPostMessage = sendPostMessage
	},

	initAfterReady() {
		if (this.getFileList()) {
			this.getFileModel()
			this.getFileList().hideMask()
		}

		const headerRight = document.querySelector('#header .header-right')
		const wopiHeader = document.createElement('div')
		wopiHeader.id = 'wopi-header'
		headerRight.insertBefore(wopiHeader, headerRight.firstChild)

		this._addAvatarList()
		if (!isPublic) {
			this._addHeaderShareButton()
			this._addHeaderFileActions()
			this.addVersionSidebarEvents()
		}
	},

	close() {
		if (this.getFileList()) {
			this.getFileList().setViewerMode(false)
			this.getFileList().reload()
		}
		this.fileModel = null
		if (!isPublic) {
			this.removeVersionSidebarEvents()
		}
		$('#wopi-header').remove()
	},

	share() {
		if (isPublic || !this.getFileList()) {
			console.error('[FilesAppIntegration] Sharing is not supported')
			return
		}
		this.getFileList().showDetailsView(this.fileName, 'shareTabView')
		OC.Apps.showAppSidebar()
	},

	insertGraphic(callback) {
		if (isPublic) {
			console.error('[FilesAppIntegration] insertGraphic is not supported')
		}
		OC.dialogs.filepicker(t('wopi', 'Insert from {name}', { name: OC.theme.name }), function(path, type) {
			if (type === OC.dialogs.FILEPICKER_TYPE_CHOOSE) {
				const filename = path.substring(path.lastIndexOf('/') + 1)
				$.ajax({
					type: 'POST',
					url: OC.generateUrl('apps/wopi/assets'),
					data: {
						path: path
					}
				}).done(function(resp) {
					callback(filename, resp.url)
				})
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
		if (this.fileModel !== null) {
			return this.fileModel
		}
		if (!this.getFileList()) {
			return null
		}
		this.getFileList()._updateDetailsView(this.fileName, false)
		this.fileModel = this.getFileList().getModelForFile(this.fileName)

		if (this.fileModel !== null) {
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
		const avatarList = $('<div id="wopi-avatars">')
		avatarList.on('click', function(e) {
			e.stopPropagation()
			$('#editors-menu').toggle()
		})
		$('#wopi-header').append(avatarList)
	},

	_addHeaderShareButton() {
		if ($('header').length && this.getFileList()) {
			var $button = $('<div id="wopi-sharing"><a class="icon-shared icon-white"></a></div>')
			$('#wopi-header').append($button)
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
		OC.unregisterMenu($('#wopi-actions .icon-more'), $('#wopi-actions-menu'))
		$('#wopi-actions').remove()
		if (!this.getFileList()) {
			return
		}
		var actionsContainer = $('<div id="wopi-actions"><div class="icon-more icon-white"></div><ul id="wopi-actions-menu" class="popovermenu"></ul></div>')
		var actions = actionsContainer.find('#wopi-actions-menu').empty()

		var context = {
			'$file': this.getFileList().$el.find('[data-id=' + this.originalFileId + ']').first(),
			fileActions: this.getFileList().fileActions,
			fileList: this.getFileList(),
			fileInfoModel: this.getFileModel()
		}

		const isFavorite = function(fileInfo) {
			return fileInfo.get('tags') && fileInfo.get('tags').indexOf(OC.TAG_FAVORITE) >= 0
		}
		const $favorite = $('<li><a></a></li>').click((event) => {
			$favorite.find('a').removeClass('icon-starred').removeClass('icon-star-dark').addClass('icon-loading-small')
			this.getFileList().fileActions.triggerAction('Favorite', this.getFileModel(), this.getFileList())
			this.getFileModel().trigger('change', this.getFileModel())
		})
		if (isFavorite(context.fileInfoModel)) {
			$favorite.find('a').text(t('files', 'Remove from favorites'))
			$favorite.find('a').addClass('icon-starred')
		} else {
			$favorite.find('a').text(t('files', 'Add to favorites'))
			$favorite.find('a').addClass('icon-star-dark')
		}

		var $info = $('<li><a class="icon-info"></a></li>').click(() => {
			this.getFileList().fileActions.actions.all.Details.action(this.fileName, context)
			OC.hideMenus()
		})
		$info.find('a').text(t('files', 'Details'))
		var $download = $('<li><a class="icon-download">Download</a></li>').click(() => {
			this.getFileList().fileActions.actions.all.Download.action(this.fileName, context)
			OC.hideMenus()
		})
		$download.find('a').text(t('files', 'Download'))
		actions.append($favorite).append($info).append($download)
		$('#wopi-header').append(actionsContainer)
		OC.registerMenu($('#wopi-actions .icon-more'), $('#wopi-actions-menu'), false, true)
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
			label.text(view.UserName + ' ' + t('wopi', '(read only)'))

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
			var removeButton = $('<div class="icon-close" title="Remove user"/>')
			removeButton.click(() => {
				this.sendPostMessage('Action_RemoveView', { ViewId: view.ViewId })
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
		const userId = (view.UserId === '') ? view.UserName : view.UserId
		var avatarContainer = $('<div class="wopi-avatar"><div class="avatar" title="' + view.UserName + '" data-user="' + userId + '"></div></div>')
		var avatar = avatarContainer.find('.avatar')

		avatar.css({
			'border-color': '#' + ('000000' + Number(view.Color).toString(16)).substr(-6),
			'border-width': '2px',
			'border-style': 'solid'
		})
		if (view.ReadOnly === '1') {
			avatarContainer.addClass('read-only')
			$(avatar).attr('title', view.UserName + ' ' + t('wopi', '(read only)'))
		} else {
			$(avatar).attr('title', view.UserName)
		}

		$(avatar).avatar(userId, 32, undefined, true, undefined, view.UserName)
		return avatarContainer
	},

	renderAvatars: function() {
		var avatardiv = $('#header .header-right #wopi-avatars')
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
			view.UserName = view.UserName !== '' ? view.UserName : t('wopi', 'Guest')
			popover.find('ul').append(this._userEntry(view))

			if (view.UserId === OC.currentUser) {
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
		var followCurrentEditor = $('<li><input type="checkbox" class="checkbox" /><label class="label">' + t('wopi', 'Follow current editor') + '</label></li>')
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
		$(document.querySelector('#content')).on('click.revisions', '#app-sidebar .preview-container', this.showVersionPreview.bind(this))
		$(document.querySelector('#content')).on('click.revisions', '#app-sidebar .downloadVersion', this.showVersionPreview.bind(this))
		$(document.querySelector('#content')).on('mousedown.revisions', '#app-sidebar .revertVersion', this.restoreVersion.bind(this))
	},

	removeVersionSidebarEvents() {
		$(document.querySelector('#content')).off('click.revisions')
		$(document.querySelector('#content')).off('click.revisions')
		$(document.querySelector('#content')).off('mousedown.revisions')
	},

	addCurrentVersion() {
		if (this.getFileModel()) {
			const preview = OC.MimeType.getIconUrl(this.getFileModel().get('mimetype'))
			const mtime = this.getFileModel().get('mtime')
			$('#versionsTabView').prepend('<ul id="lastSavedVersion"><li data-revision="0"><div><div class="preview-container"><img src="' + preview + '" width="44" /></div><div class="version-container">\n'
				+ '<div><a class="downloadVersion">' + t('wopi', 'Last saved version') + '<span class="versiondate has-tooltip live-relative-timestamp" data-timestamp="' + mtime + '"></span></div></div></li></ul>')
			$('#versionsTabView').prepend('<ul id="currentVersion"><li data-revision="" class="active"><div><div class="preview-container"><img src="' + preview + '" width="44" /></div><div class="version-container">\n'
				+ '<div><a class="downloadVersion">' + t('wopi', 'Current version') + '</a></div></div></li></ul>')
			$('.live-relative-timestamp').each(function() {
				$(this).text(OC.Util.relativeModifiedDate(parseInt($(this).attr('data-timestamp'), 10)))
			})
		}
	},

	showRevHistory() {
		if (this.getFileList()) {
			this.getFileList()
				.showDetailsView(this.fileName, 'versionsTabView')
			this.addCurrentVersion()
		}
	},

	showVersionPreview: function(e) {
		e.preventDefault()
		var element = e.currentTarget.parentElement.parentElement
		if ($(e.currentTarget).hasClass('downloadVersion')) {
			element = e.currentTarget.parentElement.parentElement.parentElement.parentElement
		}
		var version = element.dataset.revision
		var fileId = this.fileId
		var title = this.fileName
		console.debug('[FilesAppIntegration] showVersionPreview', version, fileId, title)
		this.sendPostMessage('Action_loadRevViewer', { fileId, title, version })
		$(element.parentElement.parentElement).find('li').removeClass('active')
		$(element).addClass('active')
	},

	restoreVersion: function(e) {
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

	_restoreSuccess: function(response) {
		if (response.status === 'error') {
			OC.Notification.showTemporary(t('wopi', 'Failed to revert the document to older version'))
		}
		// Reload the document frame to get the new file
		// TODO: ideally we should have a post messsage that can be sent to collabora to just reload the file once the restore is finished
		document.getElementById('wopiframe').src = document.getElementById('wopiframe').src
		OC.Apps.hideAppSidebar()
	},

	_restoreError: function() {
		OC.Notification.showTemporary(t('wopi', 'Failed to revert the document to older version'))
	},

	_restoreDAV: function(version) {
		var restoreUrl = OC.linkToRemoteBase('dav') + '/versions/' + OC.getCurrentUser().uid
			+ '/versions/' + this.fileId + '/' + version
		$.ajax({
			type: 'MOVE',
			url: restoreUrl,
			headers: {
				Destination: OC.linkToRemote('dav') + '/versions/' + OC.getCurrentUser().uid + '/restore/target'
			},
			success: this._restoreSuccess.bind(this),
			error: this._restoreError.bind(this)
		})
	},

	/* Ask for a new filename and open the files app in a new tab
	 * the parameters wopi_create and wopi_filename are
	 * parsed by viewer.js and open a template picker in the new tab
	 */
	createNewFile: function(type) {
		OC.dialogs.prompt(
			t('wopi', 'Please enter the filename for the new document'),
			t('wopi', 'Save As'),
			function(result, value) {
				if (result === true && value) {
					if (type === 'text') {
						type = 'document'
					}
					var dir = parent.$('#dir').val()
					var url = OC.generateUrl('/apps/files/?dir=' + dir + '&wopi_create=' + type + '&wopi_filename=' + encodeURI(value))
					window.open(url, '_blank')
				}
			},
			true,
			t('wopi', 'New filename'),
			false
		).then(function() {
			var $dialog = parent.$('.oc-dialog:visible')
			var $buttons = $dialog.find('button')
			$buttons.eq(0).text(t('wopi', 'Cancel'))
			$buttons.eq(1).text(t('wopi', 'Create a new document'))
		})
	}
}
