<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="settings-entry">
		<NcCheckboxRadioSwitch
			v-model="inputVal"
			type="checkbox"
			:disabled="disabled">
			{{ label }}
		</NcCheckboxRadioSwitch>
		<em v-if="hint !== ''" class="checkbox-hint">{{ hint }}</em>
		<div>
			<slot />
		</div>
	</div>
</template>

<script>
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'

export default {
	name: 'SettingsCheckbox',
	components: {
		NcCheckboxRadioSwitch,
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

		modelValue: {
			type: Boolean,
			default: false,
		},

		disabled: {
			type: Boolean,
			default: false,
		},
	},

	emits: ['update:modelValue'],
	data() {
		return {
			inputVal: this.modelValue,
		}
	},

	watch: {
		modelValue(newVal) {
			this.inputVal = this.modelValue
		},

		inputVal(newVal) {
			this.$emit('update:modelValue', newVal)
		},
	},
}
</script>

<style scoped>
.checkbox-hint {
	margin-right: calc(var(--default-grid-baseline) * 3);
}
</style>
