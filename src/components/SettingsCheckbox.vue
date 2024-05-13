<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="settings-entry">
		<input :id="id"
			type="checkbox"
			class="checkbox"
			:checked="inputVal"
			:disabled="disabled"
			@change="$emit('input', $event.target.checked)">
		<label :for="id">{{ label }}</label><br>
		<em v-if="hint !== ''">{{ hint }}</em>
		<div>
			<slot />
		</div>
	</div>
</template>

<script>
let uuid = 0
export default {
	name: 'SettingsCheckbox',
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
	computed: {
		id() {
			return 'settings-checkbox-' + this.uuid
		},
	},
	watch: {
		value(newVal) {
			this.inputVal = this.value
		},
	},
	beforeCreate() {
		this.uuid = uuid.toString()
		uuid += 1
	},
}
</script>

<style scoped>
	.settings-entry {
		padding-bottom: 15px;
	}
</style>
