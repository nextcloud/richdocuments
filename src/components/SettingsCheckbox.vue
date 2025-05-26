<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="settings-entry">
		<NcCheckboxRadioSwitch v-model="inputVal"
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
import NcCheckboxRadioSwitch from '@nextcloud/vue/dist/Components/NcCheckboxRadioSwitch.js'

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
		value: {
			type: Boolean,
			default: false,
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
			this.inputVal = this.value
		},
		inputVal(newVal) {
			this.$emit('input', newVal)
		},
	},
}
</script>

<style scoped>
.checkbox-hint {
	margin-right: calc(var(--default-grid-baseline) * 3);
}
</style>
