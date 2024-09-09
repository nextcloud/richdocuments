<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="settings-font">
		<label :title="name">{{ name }}</label>
		<img :src="overviewUrl" :alt="t('richdocuments', 'No font overview')">
		<button :class="{
				'icon-delete': true,
				svg: true,
				'loading-small': disabled,
			}"
			:disabled="disabled"
			:title="t('richdocuments', 'Delete this font')"
			@click="onDeleteClick" />
	</div>
</template>

<script>
import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'
import { showError } from '@nextcloud/dialogs'

export default {
	name: 'SettingsFont',
	props: {
		name: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			disabled: false,
		}
	},
	computed: {
		overviewUrl() {
			return generateUrl('/apps/richdocuments/settings/fonts/{name}/overview', {
				name: this.name,
			})
		},
	},
	methods: {
		onDeleteClick() {
			this.disabled = true
			const url = generateUrl('/apps/richdocuments/settings/fonts/{name}', {
				name: this.name,
			})
			axios.delete(url).then((response) => {
				this.$emit('deleted')
			}).catch((error) => {
				console.error(error)
				showError(error?.response?.data?.error)
			}).then(() => {
				this.disabled = false
			})
		},
	},
}
</script>

<style scoped lang="scss">
.settings-font {
	display: flex;
	align-items: center;

	label {
		width: 250px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	button,
	img {
		margin-left: 15px;
	}

	img {
		color: var(--color-text-maxcontrast);
		width: 250px;
	}
}
</style>
