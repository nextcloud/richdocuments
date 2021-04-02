<!--
  - @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
  -
  - @author Julius Härtl <jus@bitgrid.net>
  -
  - @license GNU AGPL version 3 or any later version
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as
  - published by the Free Software Foundation, either version 3 of the
  - License, or (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program. If not, see <http://www.gnu.org/licenses/>.
  -
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
