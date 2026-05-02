/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { spawnDialog } from '@nextcloud/dialogs'
import { subscribe, unsubscribe } from '@nextcloud/event-bus'
import { basename } from 'path'
import SaveAs from '../components/Modal/SaveAs.vue'

export default {
	mounted() {
		subscribe('richdocuments:grab-focus', this.grabFocus)
	},
	beforeDestroy() {
		unsubscribe('richdocuments:grab-focus', this.grabFocus)
	},
	methods: {
		grabFocus() {
			this.sendPostMessage('Grab_Focus')
		},
		async saveAs(format) {
			spawnDialog(
				SaveAs,
				{
					path: this.filename,
					format,
					description: t('richdocuments', 'Save a copy of the file under a new name and continue editing the new file'),
				},
				(value) => {
					if (value) {
						// Track the requested filename for export operations
						this.lastSaveAsFilename = basename(value)
						this.sendPostMessage('Action_SaveAs', { Filename: value, Notify: true })
					}
				},
			)
		},
	},
}
