/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { translate as t } from '@nextcloud/l10n'
import { generateUrl } from '@nextcloud/router'
import axios from '@nextcloud/axios'

const SupportedTaskTypes = {
	Text: 'core:text2text',
	Image: 'core:text2image',
}

export default {
	data() {
		return {
			task: null,
		}
	},
	methods: {
		async openAssistant() {
			this.task = await window.OCA.Assistant.openAssistantForm({
				appId: 'richdocuments',
				customId: 'richdocuments:' + this.fileid,
				isInsideViewer: true,
				actionButtons: [
					{
						label: t('richdocuments', 'Insert into document'),
						title: t('richdocuments', 'Insert into document'),
						onClick: () => this.handleTask(this.task),
					},
				],
			})
		},
		handleTask(task) {
			switch (task.type) {

			case SupportedTaskTypes.Text:
				this.insertAIText(task.output.output)
				break

			case SupportedTaskTypes.Image:
				this.insertAIImages(task.output.images)
				break

			default:
				break
			}
		},
		insertAIText(text) {
			this.sendPostMessage('Action_Paste', {
				Mimetype: 'text/plain;charset=utf-8',
				Data: text,
			})
		},
		async insertAIImages(images) {
			const assets = await axios({
				method: 'post',
				url: generateUrl('apps/richdocuments/assets/tasks'),
				data: {
					taskId: this.task.id,
					fileIds: [images[0]],
				},
			})

			// For now, we only insert the first generated image
			const firstImage = assets.data[0]

			this.sendPostMessage('Action_InsertGraphic', {
				filename: firstImage.filename,
				url: firstImage.url,
			})
		},
	},
}
