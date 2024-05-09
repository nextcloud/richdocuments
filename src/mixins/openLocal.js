/*
 * @copyright Copyright (c) 2023 Julius Härtl <jus@bitgrid.net>
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
