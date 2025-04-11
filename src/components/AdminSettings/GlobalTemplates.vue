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
			<NcButton type="tertiary-no-background" @click="newTemplate">
				<div class="template-btn new-template-btn">
					<div class="template-icon">
						<NewTemplateIcon :size="38" />
					</div>
					<span>{{ t('richdocuments', 'New') }}</span>
				</div>
			</NcButton>

			<div v-for="template in existingTemplates" :key="template.id">
				<NcButton type="tertiary-no-background"
					@click="deleteTemplate(template.id)">
					<div class="template-btn" :data-cy-template-btn-name="basename(template.name)">
						<div class="template-icon"
							:style="`background-image: url(${template.preview})`">
							<div class="template-delete-overlay">
								<DeleteIcon :size="38" />
							</div>
						</div>
						<span :title="template.name">
							{{ basename(template.name) }}
						</span>
					</div>
				</NcButton>
			</div>
		</div>
	</NcSettingsSection>
</template>

<script lang="js">
import { NcSettingsSection, NcButton } from '@nextcloud/vue'
import { translate as t } from '@nextcloud/l10n'
import { generateUrl } from '@nextcloud/router'
import { showError, showSuccess } from '@nextcloud/dialogs'
import { loadState } from '@nextcloud/initial-state'
import '@nextcloud/dialogs/style.css'
import axios from '@nextcloud/axios'
import NewTemplateIcon from 'vue-material-design-icons/FileDocumentPlusOutline.vue'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'

export default {
	name: 'GlobalTemplates',

	components: {
		NcSettingsSection,
		NcButton,
		NewTemplateIcon,
		DeleteIcon,
	},

	data() {
		return {
			existingTemplates: [],
			templatesAvailable: false,
			templateExtensions: [
				'.ott', '.otg', '.otp', '.ots',
				'.dot', '.dotx',
				'.xlt', '.xltx',
				'.pot', '.potx',
			],
		}
	},

	computed: {
		acceptedFileExtensions() {
			return this.templateExtensions.join(', ')
		},
		description() {
			return t(
				'richdocuments',
				'Accepted file types: {accepts}',
				{
					/*
					 * TRANSLATORS
					 * The file extensions will be displayed as
					 *  .ott, .otg, .otp, .ots, and so on
					 */
					accepts: this.acceptedFileExtensions,
				},
			)
		},
	},

	mounted() {
		// Later maybe we can retrieve these settings from AdminSettings.vue`
		// and pass them in as props (once AdminSettings is cleaned up)
		const settings = loadState('richdocuments', 'adminSettings', {})

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

	button {
		padding: 0 !important;
	}
}

.template-btn {
    display: flex;
    flex-flow: column nowrap;
    border:
        var(--border-width-input)
        solid
        var(--color-border)
    ;
    border-radius: var(--border-radius-element);
    width: 175px;
    height: calc(175px * 1.5);
    padding: $padding;

	span {
		text-align: start;
		overflow: hidden;
		text-overflow: ellipsis;
		font-weight: normal;
		flex-basis: var(--default-line-height);
	}
}

.template-btn:hover .template-delete-overlay {
	background-color: var(--color-box-shadow);

	svg { visibility: visible; }
}

.template-icon {
	flex-basis: 100%;
	display: flex;
	border-radius: var(--border-radius-element);
	background-size: cover;
	margin-bottom: $padding;

	svg { color: var(--color-text-lighter); }
}

.template-delete-overlay {
	border-radius: var(--border-radius-element);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-basis: 100%;

	svg {
		visibility: hidden;
		color: var(--color-error);
	}
}

.new-template-btn {
	.template-icon { justify-content: center; }

	span {
		text-align: center;
		font-weight: bold;
	}
}
</style>
