/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { generateUrl } from '@nextcloud/router'
import { getCurrentUser } from '@nextcloud/auth'
import { getFilePickerBuilder, spawnDialog } from '@nextcloud/dialogs'
import { isPublicShare } from '@nextcloud/sharing/public'
import axios from '@nextcloud/axios'
import { emit } from '@nextcloud/event-bus'
import { getCurrentDirectory } from '../helpers/filesApp.js'
import {
	davGetClient,
	davGetDefaultPropfind,
	davResultToNode,
	davRootPath,
} from '@nextcloud/files'
import SaveAs from '../components/Modal/SaveAs.vue'

export default {

	fileNode: undefined,

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
		this.fileNode = undefined
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

		this.getFileNode(true)
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
	},

	close() {
		if (this.handlers.close && this.handlers.close(this)) {
			return
		}

		this.fileModel = null
		$('#richdocuments-header').remove()
	},

	async saveAs(newName) {
		const oldFile = this.getFileModel()

		if (this.handlers.saveAs && this.handlers.saveAs(this)) {
			return
		}

		if (newName) {
			this.fileName = newName
		}

		const node = await this.getFileNode(true)

		if (!node) {
			return
		}

		this.changeFilesRoute(node.fileid)

		OCA?.Files?.Sidebar?.close()

		if (this.getFileList()) {
			const newFileModel = oldFile.clone()
			newFileModel.set('id', node.fileid)
			newFileModel.set('name', newName)
			newFileModel.set('mtime', Date.now())
			this.getFileList()
				.add(newFileModel.toJSON())

			OC.Apps.hideAppSidebar()
		}
	},

	share() {
		if (this.handlers.share && this.handlers.share(this)) {
			return
		}

		if (isPublicShare()) {
			console.error('[FilesAppIntegration] Sharing is not supported')
			return
		}

		OCA?.Files?.Sidebar?.open(this.filePath + '/' + this.fileName)
		OCA?.Files?.Sidebar?.setActiveTab('sharing')
	},

	rename(newName) {
		this.updateFileInfo(newName, Date.now())

		this.fileName = newName

		if (this.handlers.rename && this.handlers.rename(this)) {
			return
		}

		if (this.getFileList()) {
			OC.Apps.hideAppSidebar()
		}
	},

	/**
	 * @param mimeTypeFilter
	 * @param insertFileProc
	 * @param insertHandler
	 * @private
	 */
	insertFile_impl(mimeTypeFilter, insertFileProc, insertHandler) {
		if (isPublicShare()) {
			console.error('[FilesAppIntegration] insertFile is not supported')
		}

		const insertFileFromPath = async (path) => {
			const filename = path.substring(path.lastIndexOf('/') + 1)
			const { data } = await axios.post(generateUrl('apps/richdocuments/assets'), { path })
			insertFileProc(filename, data.url)
		}

		if (insertHandler && insertHandler(this, mimeTypeFilter, { insertFileFromPath })) {
			return
		}

		getFilePickerBuilder(t('richdocuments', 'Insert file from {name}', { name: OC.theme.name }))
			.setMimeTypeFilter(mimeTypeFilter)
			.setFilter((node) => {
				const downloadShareAttribute = JSON.parse(node.attributes['share-attributes']).find((shareAttribute) => shareAttribute.key === 'download')
				const downloadPermissions = downloadShareAttribute !== undefined ? (downloadShareAttribute.enabled || downloadShareAttribute.value) : true
				return (node.permissions & OC.PERMISSION_READ) && downloadPermissions
			})
			.addButton({
				label: t('richdocuments', 'Insert file'),
				callback: (files) => {
					if (files && files.length) {
						insertFileFromPath(files[0].path)
					}
				},
			})
			.build()
			.pick()
	},

	insertGraphic(insertFileProc) {
		this.insertFile_impl(['image/png', 'image/gif', 'image/jpeg', 'image/svg'],
			insertFileProc,
			(filesAppIntegration, mimeTypeFilter, { insertFileFromPath }) => { return this.handlers.insertGraphic && this.handlers.insertGraphic(filesAppIntegration, { insertFileFromPath }) })
	},

	insertFile(mimeTypeFilter, insertFileProc) {
		this.insertFile_impl(mimeTypeFilter, insertFileProc, this.handlers.insertFile)
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
		try {
			this.getFileList()._updateDetailsView(this.fileName, false)

			this.fileModel = this.getFileList().getModelForFile(this.fileName)

			if (this.fileModel && this.fileModel.on) {
				this.fileModel.on('change', () => {
					this._addHeaderFileActions()
				})
			}
		} catch (e) {
			return null
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
	 * @return {$|HTMLElement}
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

		const isFileOwner = !isPublicShare() && this.getFileModel() && typeof this.getFileModel().get('shareOwner') === 'undefined'
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
	 * @return {$|HTMLElement}
	 * @private
	 */
	_avatarForView(view) {
		const userId = (view.UserId === '') ? view.UserName : view.UserId
		const avatarContainer = $('<div class="richdocuments-avatar"><div class="avatar" title="' + view.UserName + '" data-user="' + userId + '"></div></div>')
		const avatar = avatarContainer.find('.avatar')

		avatar.css({
			borderColor: '#' + ('000000' + Number(view.Color).toString(16)).slice(-6),
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

	showRevHistory() {
		if (this.handlers.showRevHistory && this.handlers.showRevHistory(this)) {
			return
		}

		if (isPublicShare() || !OCA?.Files?.Sidebar) {
			console.error('[FilesAppIntegration] Versions are not supported')
			return
		}
		OCA?.Files?.Sidebar?.open(this.filePath + '/' + this.fileName)
		OCA?.Files?.Sidebar?.setActiveTab('version_vue')
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

		spawnDialog(
			SaveAs,
			{
				name: t('richdocuments', 'New file'),
				description: t('richdocuments', 'Please enter the filename for the new file'),
				buttonText: t('richdocuments', 'Create'),
			},
			(value) => {
				if (value) {
					if (type === 'text') {
						type = 'document'
					}
					const url = generateUrl('/apps/files/?dir=' + getCurrentDirectory() + '&richdocuments_create=' + type + '&richdocuments_filename=' + encodeURI(value))
					window.open(url, '_blank')
				}
			},
		)
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

	async updateFileInfo(name, mtime) {
		const node = await this.getFileNode()

		if (node) {
			if (name) {
				node.rename(name)
				emit('files:node:renamed', this.source)
			}
			if (mtime) {
				node._data.mtime = new Date(mtime)
			}

			emit('files:node:updated', node)
		}

		// FIXME: Remove once all files app is moved to vue
		const fileInfo = this.getFileModel()
		if (!fileInfo) {
			return
		}

		if (name) {
			fileInfo.set('name', name)
		}

		if (mtime) {
			fileInfo.set('mtime', mtime)
		}
		fileInfo.trigger('change', this.getFileModel())
	},

	async getFileNode(forceFetch = false) {
		if (isPublicShare()) {
			return
		}

		if (this.fileNode !== undefined && !forceFetch) {
			return this.fileNode
		}

		try {
			const path = this.filePath + '/' + this.fileName
			const client = davGetClient()
			const results = await client.getDirectoryContents(`${davRootPath}${path}`, {
				details: true,
				data: davGetDefaultPropfind(),
			})
			const nodes = results.data.map((result) => davResultToNode(result))

			this.fileNode = nodes[0] ?? null
		} catch (e) {
			console.error('Failed to fetch file metadata from webdav', e)
			this.fileNode = null
		}

		return this.fileNode
	},

	changeFilesRoute(fileId) {
		OCP?.Files?.Router?.goToRoute(
			OCP.Files.Router.name,
			{ ...OCP.Files.Router.params, fileid: fileId },
			OCP.Files.Router.query,
			true,
		)
	},

}
