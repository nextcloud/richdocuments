/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { generateOcsUrl } from '@nextcloud/router'
import axios from '@nextcloud/axios'
import Config from '../services/config.tsx'
import { getNextcloudUrl } from '../helpers/url.js'

export default {
	methods: {
		async uiMention({ type, text, username }) {
			if (type === 'autocomplete') {
				let users = []

				if (Config.get('userId') !== null) {
					try {
						const result = await axios.get(generateOcsUrl('core/autocomplete/get'), {
							params: { search: text },
						})
						users = result.data.ocs.data
					} catch (e) {
					}
				}

				const list = users.map((user) => {
					const profile = window.location.protocol + '//' + getNextcloudUrl() + '/index.php/u/' + user.id
					return {
						label: user.label,
						username: user.id,
						profile,
					}
				})

				this.sendPostMessage('Action_Mention', { list })
			}
			if (type === 'selected') {
				await axios.post(generateOcsUrl(`apps/richdocuments/api/v1/mention/${this.fileid}`), { mention: username })
			}
		},
	},
}
