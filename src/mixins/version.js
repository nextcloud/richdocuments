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

import { emit, subscribe, unsubscribe } from '@nextcloud/event-bus'
import { generateRemoteUrl, getRootUrl } from '@nextcloud/router'
import { getCurrentUser } from '@nextcloud/auth'
import axios from '@nextcloud/axios'
import { showError } from '@nextcloud/dialogs'

export default {
	data() {
		return {
			versionToRestore: null,
		}
	},
	mounted() {
		subscribe('files_versions:restore:requested', this.onRestoreRequested)

	},

	beforeDestroy() {
		unsubscribe('files_versions:restore:requested', this.onRestoreRequested)
	},

	methods: {
		onRestoreRequested(eventState) {
			// Tell Collabora that we are about to restore a version
			this.sendPostMessage('Host_VersionRestore', {
				Status: 'Pre_Restore',
			})

			this.versionToRestore = eventState.version

			// Prevent files_versions own restore as we'd need to wait for Collabora to be ready
			eventState.preventDefault = true
		},
		async handlePreRestoreAck() {
			const restoreUrl = getRootUrl() + '/remote.php/dav/versions/' + getCurrentUser().uid
				+ '/versions/' + this.fileid + '/' + this.versionToRestore.fileVersion
			try {
				await axios({
					method: 'MOVE',
					url: restoreUrl,
					headers: {
						Destination: generateRemoteUrl('dav') + '/versions/' + getCurrentUser().uid + '/restore/target',
					},
				})
				emit('files_versions:restore:restored', this.versionToRestore)
			} catch (e) {
				showError(t('richdocuments', 'Failed to revert the document to older version'))
			}
			this.versionToRestore = null
		},

	},
}
