<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcSettingsSection v-if="templatesAvailable"
		:name="t('richdocuments', 'Global Templates')"
		:description="description">
		<input ref="newTemplateInput"
			type="file"
			class="hidden-visually"
			:accept="acceptedFileExtensions"
			@change="selectFile">

		<div class="template-buttons">
			<FileCard class="new-template-btn" @click="newTemplate">
				<template #preview>
					<NewTemplateIcon :size="38" />
				</template>
				<template #name>
					{{ t('richdocuments', 'New') }}
				</template>
			</FileCard>

			<FileCard v-for="template in existingTemplates"
				:key="template.id"
				:data-cy-template-btn-name="basename(template.name)"
				@click="deleteTemplate(template.id)">
				<template #preview>
					<div class="template-preview"
						:style="`background-image: url(${template.preview})`">
						<div class="template-delete-overlay">
							<DeleteIcon :size="38" />
						</div>
					</div>
				</template>
				<template #name>
					{{ basename(template.name) }}
				</template>
			</FileCard>
		</div>
	</NcSettingsSection>
</template>

<script lang="js">
import { NcSettingsSection } from '@nextcloud/vue'
import { translate as t } from '@nextcloud/l10n'
import { generateUrl } from '@nextcloud/router'
import { showError, showSuccess } from '@nextcloud/dialogs'
import { loadState } from '@nextcloud/initial-state'
import '@nextcloud/dialogs/style.css'
import axios from '@nextcloud/axios'
import NewTemplateIcon from 'vue-material-design-icons/FileDocumentPlusOutline.vue'
import DeleteIcon from 'vue-material-design-icons/TrashCanOutline.vue'

import FileCard from '../FileCard.vue'

export default {
	name: 'GlobalTemplates',

	components: {
		NcSettingsSection,
		FileCard,
		NewTemplateIcon,
		DeleteIcon,
	},

	data() {
		return {
			existingTemplates: [],
			templatesAvailable: false,
			templateExtensions: [],
		}
	},

	computed: {
		acceptedFileExtensions() {
			return this.templateExtensions.join(', ')
		},
		description() {
			return t(
				'richdocuments',
				'Instance-wide templates that should be available to all users.',
			)
		},
	},

	mounted() {
		// Later maybe we can retrieve these settings from AdminSettings.vue`
		// and pass them in as props (once AdminSettings is cleaned up)
		const settings = loadState('richdocuments', 'adminSettings', {})

		this.templateExtensions = settings.acceptedTemplateTypes

		this.templatesAvailable = settings.templatesAvailable
		this.existingTemplates = settings.templates?.filter((template) => {
			return template.name !== 'Empty'
		})
	},

	methods: {
		t,
		newTemplate() {
			this.$refs.newTemplateInput?.click()
		},
		async selectFile() {
			const selectedFile = this.$refs.newTemplateInput?.files[0]
			const templateAlreadyExists = this.existingTemplates.some((template) => {
				return template.name === selectedFile.name
			})

			if (!templateAlreadyExists) {
				const template = await this.uploadTemplate(selectedFile)

				this.existingTemplates.push(template)
				showSuccess(t('richdocuments', 'Uploaded template "{name}"', { name: template.name }))
			} else {
				showError(t('richdocuments', 'Template "{name}" already exists', { name: selectedFile.name }))
			}
		},
		async uploadTemplate(file) {
			const url = generateUrl('/apps/richdocuments/template')
			const formData = new FormData()

			formData.append('files', file)

			let res = null
			try {
				res = await axios.post(url, formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				})
			} catch (error) {
				showError(error.response.data.data.message)
			}

			return res.data.data
		},
		async deleteTemplate(templateId) {
			const url = generateUrl('/apps/richdocuments/template/' + templateId)

			try {
				await axios.delete(url)
			} catch {
				showError(t('richdocuments', 'Unable to delete template'))
				return
			}

			const templateIndex = this.existingTemplates.findIndex((template) => {
				return template.id === templateId
			})

			if (templateIndex !== -1) {
				this.existingTemplates.splice(templateIndex, 1)
			}

			showSuccess(t('richdocuments', 'Deleted template'))
		},
		basename(filename) {
			return filename.substr(0, filename.lastIndexOf('.'))
		},
	},
}
</script>

<style lang="scss">
$padding: calc(var(--default-grid-baseline) * 3);

.template-buttons {
	display: grid;
	gap: calc(var(--default-grid-baseline) * 4);
	grid-template-columns: repeat(auto-fit, 175px);
}

.template-preview {
	width: 100%;
	height: 100%;
	background-size: cover;
	background-position: center;
	display: flex;
}

.file-card:hover .template-delete-overlay {
	background-color: var(--color-box-shadow);

	svg { visibility: visible; }
}

.template-delete-overlay {
	border-radius: var(--border-radius-element);
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;

	svg {
		visibility: hidden;
		color: var(--color-error);
	}
}

.new-template-btn .file-card__preview {
	justify-content: center;
	align-items: center;

	svg { color: var(--color-text-lighter); }
}

.new-template-btn .file-card__name {
	text-align: center;
	font-weight: bold;
}
</style>
