import { translate as t } from '@nextcloud/l10n'

const GENERATE_TEXT = 'core:text2text'
const GENERATE_IMAGE = 'core:text2image'
export default {
	data() {
		return {
			task: null,
			buttons: [
				{
					label: t('richdocuments', 'Insert into document'),
					title: t('richdocuments', 'Insert into document'),
					onClick: () => this.sendAIContent(this.task),
				},
			],
		}
	},
	methods: {
		async openAssistant() {
			this.task = await OCA.Assistant.openAssistantForm({
				appId: 'richdocuments',
				isInsideViewer: true,
				actionButtons: this.buttons,
			})
		},
		sendAIContent(task) {
			switch (task.type) {
			case GENERATE_TEXT:
				this.sendPostMessage('Action_Paste', {
					Mimetype: 'text/plain;charset=utf-8',
					Data: task.output.output,
				})

				break
			case GENERATE_IMAGE:
				break
			default:
				break
			}

			console.log({ aiGeneratedContent: task })
		},
	},
}
