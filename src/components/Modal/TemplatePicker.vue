<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<NcModal :title="t('richdocuments', 'Select template')" @close="onCancel">
		<div class="template-picker">
			<NcTextField v-model="filename"
				class="filename-input"
				type="text"
				:label="t('richdocuments', 'File name')"
				:error="!!filenameError"
				:helper-text="filenameError ?? ''"
				@keyup.enter="onCreate" />
			<div class="template-container">
				<div v-for="template in templates"
					:key="template.id"
					class="template"
					:class="{ selected: selectedTemplateId === template.id }"
					@click="selectTemplate(template.id)">
					<img v-if="template.preview" :src="templatePreviewUrl(template.id)" :alt="template.name">
					<h2>{{ stripFileExtension(template.name) }}</h2>
				</div>
			</div>
			<div class="buttons">
				<NcButton type="tertiary" @click="onCancel">
					{{ t('core', 'Cancel') }}
				</NcButton>
				<NcButton type="primary" :disabled="!!filenameError" @click="onCreate">
					{{ t('richdocuments', 'Create') }}
				</NcButton>
			</div>
		</div>
	</NcModal>
</template>

<script>
import { generateUrl } from '@nextcloud/router'
import { translate as t } from '@nextcloud/l10n'
import { NcModal, NcButton, NcTextField } from '@nextcloud/vue'
import { isFilenameValid, getUniqueName } from '@nextcloud/files'

export default {
	name: 'TemplatePicker',
	components: {
		NcModal,
		NcButton,
		NcTextField,
	},
	props: {
		suggestedFilename: {
			type: String,
			default: '',
		},
		templates: {
			type: Array,
			required: true,
		},
		initialTemplateId: {
			type: [String, Number],
			default: null,
		},
		content: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			selectedTemplateId: this.initialTemplateId || (this.templates[0]?.id || null),
			filename: '',
		}
	},
	computed: {
		filenameError() {
			if (!isFilenameValid(this.filename)) {
				return t('core', 'Invalid file name')
			}

			if (this.content.some((n) => n.basename === this.filenameWithExtension || n.basename === this.filename)) {
				return t('core', 'File name already exists')
			}

			return null
		},
		filenameWithExtension() {
			if (!this.filename.includes('.')) {
				const extension = this.suggestedFilename.split('.').pop()
				return this.filename + '.' + extension
			}
			return this.filename
		},
	},
	mounted() {
		this.filename = getUniqueName(this.suggestedFilename, this.content.map((n) => n.basename))
	},
	methods: {
		t,
		stripFileExtension(filename) {
			return filename.replace(/\.[^/.]+$/, '')
		},
		templatePreviewUrl(templateId) {
			return generateUrl('apps/richdocuments/template/preview/' + templateId)
		},
		selectTemplate(templateId) {
			this.selectedTemplateId = templateId
		},
		onCancel() {
			this.$emit('close')
		},
		onCreate() {
			if (this.filenameError) {
				return
			}

			this.$emit('close', this.selectedTemplateId, this.filenameWithExtension)
		},
	},
}
</script>

<style lang="scss" scoped>
.template-picker {
  padding: calc(var(--default-grid-baseline) * 3);

  .filename-input {
    margin-bottom: calc(var(--default-grid-baseline) * 3);
  }

  .template-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: calc(var(--default-grid-baseline) * 3);
    margin-bottom: calc(var(--default-grid-baseline) * 3);
  }

  .template {
    cursor: pointer;
    padding: 10px;
    border: var(--border-width-input-focused) solid transparent;
    border-radius: var(--border-radius-large);
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: var(--color-background-hover);
    }

    &.selected {
      border-color: var(--color-primary);
    }

    img {
      width: 100%;
      height: auto;
      border-radius: var(--border-radius-small);
    }

    h2 {
      margin: calc(var(--default-grid-baseline) * 2) 0 0;
      text-align: center;
      margin-top: auto;
	  font-size: var(--font-size-small);
    }
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: calc(var(--default-grid-baseline) * 2);
  }
}
</style>
