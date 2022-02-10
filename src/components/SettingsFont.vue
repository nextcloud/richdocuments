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
	<div class="settings-font">
		<label>{{ name }}</label>
		<img :src="overviewUrl" />
		<button
			:class="{
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
		}
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

	button {
		margin-left: 15px;
	}
}
</style>
