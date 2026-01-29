/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import $ from 'jquery'
import { generateUrl } from '@nextcloud/router'
import { getFilePickerBuilder, spawnDialog } from '@nextcloud/dialogs'
import { isPublicShare } from '@nextcloud/sharing/public'
import axios from '@nextcloud/axios'
import { emit } from '@nextcloud/event-bus'
import {
	getSidebar,
} from '@nextcloud/files'
import {
	getClient,
	getDefaultPropfind,
	resultToNode,
	defaultRootPath,
} from '@nextcloud/files/dav'
import SaveAs from '../components/Modal/SaveAs.vue'

export default {

	fileNode: undefined,

	filePath: undefined,

	followingEditor: false,

	following: null,

	handlers: {},

	init({ fileName, fileId, filePath, sendPostMessage }) {
		this.fileNode = undefined
		this.fileName = fileName
		this.fileId = fileId
		this.filePath = filePath
		this.sendPostMessage = sendPostMessage

		this.getFileNode(true)
	},

	registerHandler(event, callback) {
		this.handlers[event] = callback
	},

	initAfterReady() {
		this.handlers.initAfterReady?.(this)
	},

	close() {
		this.handlers.close?.(this)
	},

	async saveAs(newName) {
		if (this.handlers.saveAs?.(this)) {
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

		getSidebar()?.close()
	},

	async share() {
		if (this.handlers.share?.(this)) {
			return
		}

		if (isPublicShare()) {
			console.error('[FilesAppIntegration] Sharing is not supported')
			return
		}

		const node = await this.getFileNode()
		const sidebar = getSidebar()
		sidebar?.open(node)
		sidebar?.setActiveTab('sharing')
	},

	rename(newName) {
		this.updateFileInfo(newName, Date.now())

		this.fileName = newName

		if (this.handlers.rename?.(this)) {
			return
		}

		getSidebar()?.close()
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
			(filesAppIntegration, mimeTypeFilter, { insertFileFromPath }) => {
				return this.handlers.insertGraphic?.(filesAppIntegration, { insertFileFromPath })
			})
	},

	insertFile(mimeTypeFilter, insertFileProc) {
		this.insertFile_impl(mimeTypeFilter, insertFileProc, this.handlers.insertFile)
	},

	async showRevHistory() {
		if (this.handlers.showRevHistory?.(this)) {
			return
		}

		if (isPublicShare()) {
			console.error('[FilesAppIntegration] Versions are not supported')
			return
		}

		const node = await this.getFileNode()
		const sidebar = getSidebar()
		sidebar?.open(node)
		sidebar?.setActiveTab('files_versions')
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
		if (this.handlers.createNewFile?.(this, { type })) {
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
					const url = generateUrl('/apps/files/?dir=' + this.filePath + '&richdocuments_create=' + type + '&richdocuments_filename=' + encodeURI(value))
					window.open(url, '_blank')
				}
			},
		)
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
			const client = getClient()
			const results = await client.getDirectoryContents(`${defaultRootPath}${path}`, {
				details: true,
				data: getDefaultPropfind(),
			})
			const nodes = results.data.map((result) => resultToNode(result))

			this.fileNode = nodes[0] ?? null
		} catch (e) {
			console.error('Failed to fetch file metadata from webdav', e)
			this.fileNode = null
		}

		return this.fileNode
	},

	/**
	 * Fetch metadata for a newly created file and emit files:node:created event
	 * This is used when exporting a document (e.g., DOCX -> PDF) to make the
	 * new file appear in the files list without manual reload
	 *
	 * @param {string} basename - The name of the new file (e.g., "test.pdf")
	 */
	async createNodeForNewFile(basename) {
		if (isPublicShare()) {
			return
		}

		try {
			const path = `${this.filePath}/${basename}`
			const client = getClient()
			const results = await client.getDirectoryContents(`${defaultRootPath}${path}`, {
				details: true,
				data: getDefaultPropfind(),
			})
			const nodes = results.data.map((result) => resultToNode(result))

			if (nodes[0]) {
				console.debug('[FilesAppIntegration] Emitting files:node:created for', basename)
				emit('files:node:created', nodes[0])
			} else {
				console.warn('[FilesAppIntegration] New file not found:', basename)
			}
		} catch (e) {
			console.error('Failed to fetch new file metadata from webdav', e)
		}
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
