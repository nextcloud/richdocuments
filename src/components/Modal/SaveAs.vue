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
	<NcModal :name="t('richdocuments', 'Save as')">
		<div class="saveas-dialog">
			<h1>{{ name }}</h1>
			<p>{{ description }}</p>
			<NcTextField ref="nameInput"
				v-model="newFileName"
				:label-visible="true"
				:label="t('richdocuments', 'Path to save')"
				:placeholder="'/path/to/save'" />
			<div class="saveas-dialog--buttons">
				<NcButton type="secondary"
					@click="cancel">
					{{ t('richdocuments', 'Cancel') }}
				</NcButton>
				<NcButton type="primary"
					@click="close">
					{{ t('richdocuments', 'Save') }}
				</NcButton>
			</div>
		</div>
	</NcModal>
</template>

<script>
import { translate as t } from '@nextcloud/l10n'

import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcModal from '@nextcloud/vue/dist/Components/NcModal.js'
import NcTextField from '@nextcloud/vue/dist/Components/NcTextField.js'

export default {
	name: 'SaveAs',
	components: {
		NcModal,
		NcButton,
		NcTextField,
	},
	props: {
		name: {
			type: String,
			default: t('richdocuments', 'Save As'),
		},
		description: {
			type: String,
			default: '',
		},
		buttonText: {
			type: String,
			default: t('richdocuments', 'Save'),
		},
		path: {
			type: String,
			default: '',
		},
		format: {
			type: String,
			default: '',
		},
	},
	emits: ['close'],
	data() {
		return {
			selectedPath: '',
		}
	},
	computed: {
		newFileName: {
			get() {
				if (this.selectedPath !== '') {
					return this.selectedPath
				}
				const filename = this.path
				const extension = filename.split('.').pop()
				const filenameWithoutExtension = filename.substring(0, filename.length - extension.length - 1)
				return filenameWithoutExtension + '.' + (this.format !== '' ? this.format : extension)
			},
			set(value) {
				this.selectedPath = value
			},
		},
	},
	mounted() {
		// prepare filename for having a separate picker for the path (.split('/').pop())
		const filename = this.path
		const extension = filename.split('.').pop()
		const filenameWithoutExtension = filename.substring(0, filename.length - extension.length - 1)
		this.$nextTick(() => {
			const input = this.$refs.nameInput.$refs.inputField.$el.querySelector('input')
			input.setSelectionRange(0, filenameWithoutExtension.length)
			input.focus()
		})
	},
	methods: {
		t,
		close() {
			this.$emit('close', this.newFileName)
		},
		cancel() {
			this.$emit('close', null)
		},
	},
}
</script>
<style lang="scss" scoped>
.saveas-dialog {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 24px;

	h1 {
        font-size: 120%;
        font-weight: bold;
        margin-bottom: 12px;
    }

	p {
		margin-bottom: 12px;
	}

    &--buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-top: 24px;
    }
}
</style>
