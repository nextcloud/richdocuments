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
					onClick: () => this.handleTask(this.task),
				},
			],
		}
	},
	methods: {
		async openAssistant(task) {
			const formOptions = task ?? {
				appId: 'richdocuments',
				isInsideViewer: true,
				actionButtons: this.buttons,
			}

			this.task = await window.OCA.Assistant.openAssistantForm(formOptions)
		},
		handleTask(task) {
			switch (task.type) {
			case GENERATE_TEXT:
				this.insertAIText(task.output.output)
				break
			case GENERATE_IMAGE:
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
	},
}
