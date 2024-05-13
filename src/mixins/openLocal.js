/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { getCurrentUser } from '@nextcloud/auth'
import axios from '@nextcloud/axios'
import { spawnDialog } from '@nextcloud/dialogs'
import { encodePath } from '@nextcloud/paths'
import { generateOcsUrl } from '@nextcloud/router'
import { getNextcloudUrl } from '../helpers/url.js'
import Confirmation from '../components/Modal/Confirmation.vue'

export default {
	data() {
		return {
			openingLocally: false,
		}
	},
	methods: {
		startOpenLocalProcess() {
			this.showOpenLocalConfirmation()
		},

		showOpenLocalConfirmation() {
			spawnDialog(
				Confirmation,
				{
					name: t('richdocuments', 'Open file locally'),
					description: t('richdocuments', 'When opening a file locally, the document will close for all users currently viewing the document.'),
					confirmButtonText: t('richdocuments', 'Open locally'),
					cancelButtonText: t('richdocuments', 'Continue editing online'),
				},
				(decision) => {
					if (!decision) {
						return
					}
					this.openingLocally = true
					this.postMessage.registerPostMessageHandler(this.handleCloseSession)
					this.sendPostMessage('Action_Save', {
						DontTerminateEdit: false,
						DontSaveIfUnmodified: false,
						Notify: false,
					})
					this.sendPostMessage('Close_Session')
				},
			)
		},

		handleCloseSession() {
			this.postMessage.unregisterPostMessageHandler(this.handleCloseSession)
			this.openLocally()
		},

		showOpenLocalFinished() {
			const fileName = this.filename
			spawnDialog(
				Confirmation,
				{
					name: t('richdocuments', 'Open file locally'),
					description: t('richdocuments', 'The file should now open locally. If you don\'t see this happening, make sure that the desktop client is installed on your system.'),
					confirmButtonText: t('richdocuments', 'Retry to open locally'),
					cancelButtonText: t('richdocuments', 'Continue editing online'),
				},
				(decision) => {
					if (!decision) {
						window.OCA.Viewer.open({ path: fileName })
						return
					}
					this.openingLocally = true
					this.openLocally()
				},
			)
		},

		unlockFile() {
			return axios.post(generateOcsUrl('apps/richdocuments/api/v1/local'), { fileId: this.fileid })
		},

		openLocally() {
			if (this.openingLocally) {
				axios.post(
					generateOcsUrl('apps/files/api/v1/openlocaleditor'),
					{ path: this.filename },
				).then((result) => {
					const url = 'nc://open/'
						+ getCurrentUser()?.uid + '@' + getNextcloudUrl()
						+ encodePath(this.filename)
						+ '?token=' + result.data.ocs.data.token

					this.showOpenLocalFinished()
					// Firefox may cancel requests that the files app could send when updating the file meta data
					// so we need to wait a bit before closing the viewer
					setTimeout(() => {
						this.openingLocally = false
						this.close()
					}, 1000)
					window.open(url, '_self')
				})
			}
		},
	},
}
