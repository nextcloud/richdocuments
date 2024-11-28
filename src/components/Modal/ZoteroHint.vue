<!--
  - @copyright Copyright (c) 2023 Julius Härtl <jus@bitgrid.net>
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
  -->

<template>
	<NcModal :show="show" @close="close" :name="t('richdocument', 'Link to your Zotero library')">
		<div class="zotero-hint">
			<h2>{{ t('richdocument', 'Link to your Zotero library') }}</h2>
			<BookOpenPageVariantOutline :size="96" />
			<p>{{ t('richdocuments', 'Connect your Zotero account to make use of references within Office.') }}</p>
			<p>
				{{ t('richdocuments', 'You can generate an account key here:') }}
				<a href="https://www.zotero.org/settings/keys/new" target="_blank" class="external">
					{{ t('richdocuments', 'Zotero account settings') }}
				</a>
			</p>
			<form @submit.prevent="submit">
				<NcTextField :value.sync="apiKey"
					:label="t('richdocuments', 'Zotero API key')"
					:placeholder="t('richdocuments', 'Zotero API key')" />
				<div class="submit">
					<NcButton :aria-label="t('richdocuments', 'Submit')" type="primary" @click="submit">
						{{ t('richdocuments', 'Submit') }}
					</NcButton>
				</div>
			</form>
		</div>
	</NcModal>
</template>

<script>
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcModal from '@nextcloud/vue/dist/Components/NcModal.js'
import NcTextField from '@nextcloud/vue/dist/Components/NcTextField.js'
import { showError } from '@nextcloud/dialogs'
import BookOpenPageVariantOutline from 'vue-material-design-icons/BookOpenPageVariantOutline.vue'
import { savePersonalSetting } from '../../services/api.js'
export default {
	name: 'ZoteroHint',
	components: {
		BookOpenPageVariantOutline,
		NcModal,
		NcButton,
		NcTextField,
	},
	props: {
		show: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['submit'],
	data() {
		return {
			apiKey: '',
		}
	},
	methods: {
		async submit() {
			try {
				await savePersonalSetting({
					zoteroAPIKeyInput: this.apiKey,
				})
			} catch (e) {
				console.error('Failed to set zotero api key', e)
				showError(t('richdocuments', 'Failed to set Zotero API key'))
			}
			this.$emit('submit')
			this.close()
		},
		close() {
			this.$emit('update:show', false)
		},
	},
}
</script>

<style lang="scss" scoped>
.zotero-hint {
	margin: 24px;

	form, .input-field {
		margin-top: 24px;
	}

	div.submit {
		margin-top: 12px;
		display: flex;
		justify-content: end;
	}
}
</style>
