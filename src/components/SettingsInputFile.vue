<!--
  - @copyright Copyright (c) 2022 Julien Veyssier <eneiluj@posteo.net>
  -
  - @author Julien Veyssier <eneiluj@posteo.net>
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
		<label :for="id">{{ label }}</label><br>
		<button
			id="uploadlogo"
			:class="{
				'icon-upload': true,
				svg: true,
				'loading-small': uploading,
			}"
			:disabled="uploading"
			@click="onUploadClick" />
		<em v-if="hint !== ''">{{ hint }}</em>
		<input :id="id"
			ref="fileInput"
			type="file"
			aria-hidden="true"
			class="hidden-visually"
			:accept="acceptedMimeTypes"
			@change="$emit('change', $event)">
	</div>
</template>

<script>
let uuid = 0
export default {
	name: 'SettingsInputFile',
	props: {
		label: {
			type: String,
			required: true,
		},
		hint: {
			type: String,
			default: '',
		},
		uploading: {
			type: Boolean,
			default: false,
		},
		mimetypes: {
			type: Array,
			default: () => ['*'],
		}
	},
	data() {
		return {
		}
	},
	computed: {
		id() {
			return 'settings-file-' + this.uuid
		},
		acceptedMimeTypes() {
			return this.mimetypes.join(',')
		},
	},
	watch: {
	},
	beforeCreate() {
		this.uuid = uuid.toString()
		uuid += 1
	},
	methods: {
		onUploadClick() {
			this.$refs.fileInput.click()
		},
	},
}
</script>

<style scoped lang="scss">
	.settings-entry {
		padding: 15px 0 15px 0;
		display: flex;
		align-items: center;

		button {
			margin-left: 15px;
		}
	}
</style>
