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
		async uiMention(search) {
			let users = []

			if (Config.get('userId') !== null) {
				try {
					const result = await axios.get(generateOcsUrl('core/autocomplete/get'), {
						params: { search },
					})
					users = result.data.ocs.data
				} catch (e) { }
			}

			const list = users.map((user) => {
				const profile = window.location.protocol + '//' + getNextcloudUrl() + '/index.php/u/' + user.id
				return { username: user.label, profile }
			})

			this.sendPostMessage('Action_Mention', { list })
		},
	},
}
