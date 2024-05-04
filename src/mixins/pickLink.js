/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { generateOcsUrl } from '@nextcloud/router'
import axios from '@nextcloud/axios'
import { getLinkWithPicker } from '@nextcloud/vue/dist/Components/NcRichText.js'

// FIXME: Migrate to vue component
export default {
	methods: {
		async pickLink() {
			try {
				if (this.showLinkPicker) {
					return
				}
				this.showLinkPicker = true
				const link = await getLinkWithPicker(null, true)
				try {
					const url = new URL(link)
					if (url.protocol === 'http:' || url.protocol === 'https:') {
						this.sendPostMessage('Action_InsertLink', { url: link })
						return
					}
				} catch (e) {
					console.debug('error when parsing the link picker result')
				}
				this.sendPostMessage('Action_Paste', { Mimetype: 'text/plain', Data: link })
			} catch (e) {
				console.error('Link picker promise rejected :', e)
			} finally {
				this.showLinkPicker = false
			}
		},
		async resolveLink(url) {
			try {
				const result = await axios.get(generateOcsUrl('references/resolve', 2), {
					params: {
						reference: url,
					},
				})
				const resolvedLink = result.data.ocs.data.references[url]
				const title = resolvedLink?.openGraphObject?.name
				const thumbnailUrl = resolvedLink?.openGraphObject?.thumb
				if (thumbnailUrl) {
					try {
						const imageResponse = await axios.get(thumbnailUrl, { responseType: 'blob' })
						if (imageResponse?.status === 200 && imageResponse?.data) {
							const reader = new FileReader()
							reader.addEventListener('loadend', (e) => {
								const b64Image = e.target.result
								this.sendPostMessage('Action_GetLinkPreview_Resp', { url, title, image: b64Image })
							})
							reader.readAsDataURL(imageResponse.data)
						}
					} catch (e) {
						console.error('Error loading the reference image', e)
					}
				} else {
					this.sendPostMessage('Action_GetLinkPreview_Resp', { url, title, image: null })
				}
			} catch (e) {
				console.error('Error resolving a reference', e)
			}
		},
	},
}
