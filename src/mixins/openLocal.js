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

import { getRootUrl } from '@nextcloud/router'
import axios from '@nextcloud/axios'
import { getNextcloudUrl } from '../helpers/url.js'
import { getCurrentUser } from '@nextcloud/auth'

// FIXME: Migrate to vue component
export default {
	data() {
		return {
			openingLocally: false,
		}
	},
	methods: {
		unlockAndOpenLocally() {
			if (this.openingLocally) {
				this.unlockFile()
					.catch(_ => {}) // Unlocking failed, possibly because file was not locked, we want to proceed regardless.
					.then(() => {
						this.openLocally()
					})
			}
		},
		showOpenLocalConfirmation() {
			// FIXME: Migrate to vue
			window.OC.dialogs.confirmDestructive(
				t('richdocuments', 'When opening a file locally, the document will close for all users currently viewing the document.'),
				t('richdocuments', 'Open file locally'),
				{
					type: OC.dialogs.YES_NO_BUTTONS,
					confirm: t('richdocuments', 'Open locally'),
					confirmClasses: 'error',
					cancel: t('richdocuments', 'Continue editing online'),
				},
				(decision) => {
					if (!decision) {
						return
					}
					this.openingLocally = true
					this.sendPostMessage('Get_Views')
				})
		},

		unlockFile() {
			const unlockUrl = getRootUrl() + '/index.php/apps/richdocuments/wopi/files/' + this.fileid
			const unlockConfig = {
				headers: { 'X-WOPI-Override': 'UNLOCK' },
			}
			return axios.post(unlockUrl, { access_token: this.formData.accessToken }, unlockConfig)
		},

		openLocally() {
			if (this.openingLocally) {
				this.openingLocally = false

				axios.post(
					OC.linkToOCS('apps/files/api/v1', 2) + 'openlocaleditor?format=json',
					{ path: this.filename }
				).then((result) => {
					const url = 'nc://open/'
						+ getCurrentUser()?.uid + '@' + getNextcloudUrl()
						+ OC.encodePath(this.filename)
						+ '?token=' + result.data.ocs.data.token

					this.showOpenLocalConfirmation(url, window.top)
					window.location.href = url
				})
			}
		},
	},
}
