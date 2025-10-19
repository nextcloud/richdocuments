/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { generateOcsUrl } from '@nextcloud/router'
import axios from '@nextcloud/axios'
import Config from '../services/config.tsx'
import { getNextcloudUrl } from '../helpers/url.js'
import { getCurrentUser } from '@nextcloud/auth'

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

				// Workaround to add the current user to the suggestions if they are not already in the list
				// https://github.com/nextcloud/server/issues/48180
				const currentUser = getCurrentUser()
				const userExists = users.some(user => user.id === currentUser.uid)

				if (!userExists) {
					const matchesSearch = currentUser.uid.toLowerCase().includes(text.toLowerCase()) || currentUser.displayName.toLowerCase().includes(text.toLowerCase())
					if (matchesSearch) {
						users.push({ id: currentUser.uid, label: currentUser.displayName })
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
