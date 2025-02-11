<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcSettingsSection :name="t('richdocuments', 'Custom Fonts')"
		:description="description">
		<input ref="newFontInput"
			type="file"
			class="hidden-visually"
			accept=".ttf, .otf"
			data-cy="newFontInput"
			@change="selectFile">

		<table>
			<caption>
				{{ t('richdocuments', 'Available fonts') }}
				<NcButton size="small"
					style="display: inline-block; vertical-align: middle; margin: 4px;"
					:aria-label="t('richdocuments', 'Upload a valid font file')"
					@click="openFileDialog">
					<template #icon>
						<Upload :size="20" />
					</template>
					{{ t('richdocuments', 'Upload font file') }}
				</NcButton>
			</caption>

			<tbody>
				<tr v-for="font in fonts"
					:key="font">
					<td class="font-settings__name">
						{{ font }}
					</td>
					<td class="font-settings__image">
						<img :src="getFontPreview(font)"
							:alt="t('richdocuments', 'No font overview')">
					</td>
					<td>
						<NcButton type="error"
							:aria-label="t('richdocuments', 'Delete {fontName}', { fontName: font })"
							@click="deleteFont(font)">
							<template #icon>
								<TrashCanIcon :size="20" />
							</template>
						</NcButton>
					</td>
				</tr>
			</tbody>
		</table>
	</NcSettingsSection>
</template>

<script lang="js">
import { NcSettingsSection, NcButton } from '@nextcloud/vue'
import { translate as t } from '@nextcloud/l10n'
import { generateUrl } from '@nextcloud/router'
import { showError } from '@nextcloud/dialogs'
import { mapState } from 'pinia'
import { useAdminSettingsStore } from '../../stores/adminSettings'
import axios from '@nextcloud/axios'
import Upload from 'vue-material-design-icons/Upload.vue'
import TrashCanIcon from 'vue-material-design-icons/TrashCan.vue'

const fontMimes = [
	'font/ttf',
	'font/otf',
	'application/font-sfnt',
	'font/opentype',
	'application/vnd.oasis.opendocument.formula-template',
]

export default {
	name: 'CustomFonts',

	components: {
		NcSettingsSection,
		NcButton,
		Upload,
		TrashCanIcon,
	},

	data() {
		return {}
	},

	computed: {
		...mapState(useAdminSettingsStore, ['fonts']),
		description() {
			return t('richdocuments', `
				This setting allows the uploading of custom fonts which can be used in office files.
			`)
		},
	},

	methods: {
		openFileDialog() {
			this.$refs.newFontInput?.click()
		},
		getFontPreview(font) {
			return generateUrl(`/apps/richdocuments/settings/fonts/${font}/overview`)
		},
		async selectFile() {
			const selectedFile = this.$refs.newFontInput?.files[0]

			if (!fontMimes.includes(selectedFile.type)) {
				showError(t('richdocuments', 'Invalid font file selected'))
				return
			}

			if (this.fonts.includes(selectedFile.name)) {
				showError(t('richdocuments', 'Font {name} already exists', { name: selectedFile.name }))
				return
			}

			try {
				await this.uploadFont(selectedFile)
				this.fonts.push(selectedFile.name)
			} catch (err) {
				showError(err?.response?.data?.error)
			}
		},
		async uploadFont(fontFile) {
			const url = generateUrl('/apps/richdocuments/settings/fonts')
			const formData = new FormData()

			formData.append('fontfile', fontFile)

			await axios.post(url, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
		},
		async deleteFont(font) {
			try {
				await axios.delete(generateUrl(`/apps/richdocuments/settings/fonts/${font}`))

				const index = this.fonts.indexOf(font)
				if (index !== -1) {
					this.fonts.splice(index, 1)
				}
			} catch (err) {
				console.error(err)
				showError(err?.response?.data?.error)
			}
		},
	},
}
</script>

<style lang="css" scoped>
table {
	margin: calc(var(--default-grid-baseline) * 2) 0;
	max-width: calc(var(--sidebar-max-width) * 1.2);

	& caption {
		font-weight: bold;
	}

	& tr {
		& td {
			padding: 5px;

			& button {
				visibility: hidden;
			}
		}
	}

	& tr:hover {
		& td {
			& button {
				visibility: visible;
			}
		}
	}
}

td {
	padding: 5px;
}

.font-settings__name {
	max-width: 250px;
	overflow: hidden;
	text-overflow: ellipsis;
}

.font-settings__image {
	color: var(--color-text-maxcontrast);

	& img {
		vertical-align: middle;
		filter: var(--primary-invert-if-bright);
	}
}
</style>
