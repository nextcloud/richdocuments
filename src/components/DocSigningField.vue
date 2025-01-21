<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="doc-signing-field">
		<NcTextArea :value="localValue"
			:label="label"
			:disabled="disabled"
			:placeholder="placeholder"
			:helper-text="helperText"
			@update:value="handleUpdate" />
		<div class="doc-signing-actions">
			<NcButton type="secondary" @click="onClickSave">
				{{ t('richdocuments', 'Save') }}
			</NcButton>
			<NcButton type="secondary" :title="t('richdocuments', 'Remove')" @click="onClickRemove">
				<DeleteIcon :size="20" />
			</NcButton>
		</div>
	</div>
</template>

<script>
import NcTextArea from '@nextcloud/vue/dist/Components/NcTextArea.js'
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'

export default {
	name: 'DocSigningField',
	components: {
		NcTextArea,
		NcButton,
		DeleteIcon,
	},
	props: {
		label: {
			type: String,
			required: true,
		},
		value: {
			type: String,
			default: '',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		placeholder: {
			type: String,
			default: '',
		},
		helperText: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			localValue: this.value,
		}
	},
	watch: {
		value(newVal) {
			this.localValue = newVal
		},
	},
	methods: {
		t(scope, text) {
			return window.t ? window.t(scope, text) : text
		},
		handleUpdate(val) {
			this.localValue = val
			this.$emit('update:value', val)
		},
		onClickSave() {
			this.$emit('save', this.localValue)
		},
		onClickRemove() {
			this.$emit('remove')
		},
	},
}
</script>

<style scoped>
.doc-signing-field {
	display: flex;
	flex-direction: column;
}

.doc-signing-actions {
	display: flex;
	align-items: center;
	gap: 1rem;
}
</style>
