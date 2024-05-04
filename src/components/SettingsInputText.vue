<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<form @submit.prevent="submit">
		<div class="input-wrapper">
			<label :for="id">{{ label }}</label>
			<input :id="id"
				v-model="inputVal"
				type="text"
				:disabled="disabled"
				@input="$emit('input', $event.target.value)">
			<input type="submit"
				class="icon-confirm"
				value="">
		</div>
		<p v-if="hint !== ''" class="hint">
			{{ hint }}
		</p>
	</form>
</template>

<script>
let uuid = 0
export default {
	name: 'SettingsInputText',
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
	computed: {
		id() {
			return 'settings-input-text-' + this.uuid
		},
	},
	watch: {
		value(newVal) {
			this.inputVal = newVal
		},
	},
	beforeCreate() {
		this.uuid = uuid.toString()
		uuid += 1
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
		flex-wrap: wrap;
		width: 100%;
		max-width: 400px;
	}

	label {
		width: 100%;
	}

	input[type=text] {
		flex-grow: 1;
	}

	.hint {
		color: var(--color-text-lighter);
	}
</style>
