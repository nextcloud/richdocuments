<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="settings-entry">
		<label :for="id">{{ label }}</label><br>
		<button id="uploadlogo"
			:class="{
				'icon-upload': true,
				svg: true,
				'loading-small': uploading,
			}"
			:disabled="uploading"
			:title="buttonTitle"
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
		buttonTitle: {
			type: String,
			default: '',
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
		},
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
		padding: 0 0 15px 0;
		display: flex;
		align-items: center;

		button {
			margin-left: 15px;
		}
	}
</style>
