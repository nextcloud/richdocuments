/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
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
