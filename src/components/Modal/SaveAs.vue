<!--
  - SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcModal :name="t('richdocuments', 'Save as')">
		<div class="saveas-dialog">
			<h1>{{ name }}</h1>
			<p>{{ description }}</p>
			<NcTextField ref="nameInput"
				v-model="newFileName"
				:label-visible="true"
				:label="t('richdocuments', 'Path to save')"
				:placeholder="'/path/to/save'" />
			<div class="saveas-dialog--buttons">
				<NcButton type="secondary"
					@click="cancel">
					{{ t('richdocuments', 'Cancel') }}
				</NcButton>
				<NcButton type="primary"
					:disabled="isChecking"
					@click="close">
					{{ isChecking ? t('richdocuments', 'Checking…') : t('richdocuments', 'Save') }}
				</NcButton>
			</div>
		</div>
	</NcModal>
</template>

<script>
import { translate as t } from '@nextcloud/l10n'
import { showError } from '@nextcloud/dialogs'
import { getClient, getDefaultPropfind, resultToNode, defaultRootPath } from '@nextcloud/files/dav'
import { emit } from '@nextcloud/event-bus'

import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcModal from '@nextcloud/vue/dist/Components/NcModal.js'
import NcTextField from '@nextcloud/vue/dist/Components/NcTextField.js'

export default {
	name: 'SaveAs',
	components: {
		NcModal,
		NcButton,
		NcTextField,
	},
	props: {
		name: {
			type: String,
			default: t('richdocuments', 'Save As'),
		},
		description: {
			type: String,
			default: '',
		},
		buttonText: {
			type: String,
			default: t('richdocuments', 'Save'),
		},
		path: {
			type: String,
			default: '',
		},
		format: {
			type: String,
			default: '',
		},
	},
	emits: ['close'],
	data() {
		return {
			selectedPath: '',
			isChecking: false,
		}
	},
	computed: {
		newFileName: {
			get() {
				if (this.selectedPath !== '') {
					return this.selectedPath
				}
				const filename = this.path
				const extension = filename.split('.').pop()
				const filenameWithoutExtension = filename.substring(0, filename.length - extension.length - 1)
				return filenameWithoutExtension + '.' + (this.format !== '' ? this.format : extension)
			},
			set(value) {
				this.selectedPath = value
			},
		},
	},
	mounted() {
		const filename = this.path
		const extension = filename.split('.').pop()
		const filenameWithoutExtension = filename.substring(0, filename.length - extension.length - 1)
		this.$nextTick(() => {
			const input = this.$refs.nameInput.$refs.inputField.$el.querySelector('input')
			input.setSelectionRange(0, filenameWithoutExtension.length)
			input.focus()
		})
	},
	methods: {
		t,
		async close() {
			if (this.isChecking) {
				return
			}

			this.isChecking = true

			try {
				const client = getClient()
				const filename = this.newFileName

				try {
					const result = await client.stat(`${defaultRootPath}${filename}`, {
						details: true,
						data: getDefaultPropfind(),
					})

					if (result) {
						showError(t('richdocuments', 'A file with that name already exists.'))
						const node = resultToNode(result.data)
						emit('files:node:updated', node)
						this.isChecking = false
						return
					}
				} catch (error) {
					if (error.response?.status !== 404) {
						console.error('Error checking file existence:', error)
						showError(t('richdocuments', 'Error checking if file exists.'))
						this.isChecking = false
						return
					}
				}

				this.$emit('close', this.newFileName)
			} finally {
				this.isChecking = false
			}
		},
		cancel() {
			this.$emit('close', null)
		},
	},
}
</script>
<style lang="scss" scoped>
.saveas-dialog {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 24px;

	h1 {
        font-size: 120%;
        font-weight: bold;
        margin-bottom: 12px;
    }

	p {
		margin-bottom: 12px;
	}

    &--buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-top: 24px;
    }
}
</style>
