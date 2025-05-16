<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<form @submit.prevent="submit">
		<div class="input-wrapper">
			<NcTextField v-model="inputVal"
				:label="label"
				:disabled="disabled"
				@input="$emit('input', $event.target.value)" />
			<NcButton type="submit"
				:disabled="disabled"
				@click="submit">
				{{ t('richdocuments', 'Save') }}
			</NcButton>
		</div>
	</form>
</template>

<script>
import NcTextField from '@nextcloud/vue/dist/Components/NcTextField.js'
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'

export default {
	name: 'SettingsInputText',
	components: {
		NcTextField,
		NcButton,
	},
	props: {
		label: {
			type: String,
			required: true,
		},
		hint: {
			type: String,
			default: '',
		},
		value: {
			type: String,
			default: '',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			inputVal: this.value,
		}
	},
	watch: {
		value(newVal) {
			this.inputVal = newVal
		},
	},
	methods: {
		submit() {
			this.$emit('update', this.inputVal)
		},
	},
}
</script>

<style scoped>
	.input-wrapper {
		display: flex;
		width: 100%;
		gap: calc(var(--default-grid-baseline) * 2);
		align-items: baseline;
	}

	.input-field {
		width: auto;
		max-width: 400px;
		flex-grow: 1;
	}

	.hint {
		color: var(--color-text-lighter);
	}
</style>
