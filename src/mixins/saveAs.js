/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { spawnDialog } from '@nextcloud/dialogs'
import SaveAs from '../components/Modal/SaveAs.vue'

export default {
	methods: {
		async saveAs(format) {
			spawnDialog(
				SaveAs,
				{
					path: this.filename,
					format,
					description: t('richdocuments', 'Save a copy of the file under a new name and continue editing the new file'),
				},
				(value) => value && this.sendPostMessage('Action_SaveAs', { Filename: value, Notify: true }),
			)
		},
	},
}
