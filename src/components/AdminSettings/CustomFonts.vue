<template>
	<NcSettingsSection :name="t('richdocuments', 'Custom Fonts')"
		:description="description">
		<table>
			<caption>
				{{ t('richdocuments', 'Available fonts') }}
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
				</tr>
			</tbody>
		</table>

		<NcButton>
			<template #icon>
				<Upload :size="20" />
			</template>
			{{ t('richdocuments', 'Upload font file') }}
		</NcButton>
	</NcSettingsSection>
</template>

<script lang="js">
import { NcSettingsSection, NcButton } from '@nextcloud/vue'
import { translate as t } from '@nextcloud/l10n'
import { generateUrl } from '@nextcloud/router'
import { showError } from '@nextcloud/dialogs'
import axios from '@nextcloud/axios'
import Upload from 'vue-material-design-icons/Upload.vue'

export default {
	name: 'CustomFonts',

	components: {
		NcSettingsSection,
		NcButton,
		Upload,
	},

	props: {
		fonts: {
			type: Array,
			require: true,
			default: () => [],
		},
	},

	data() {
		return {}
	},

	computed: {
		description() {
			return t('richdocuments', `
				This setting allows the uploading of custom fonts which can be used in office files.
			`)
		},
	},

	methods: {
		getFontPreview(font) {
			return generateUrl(`/apps/richdocuments/settings/fonts/${font}/overview`)
		},
		async deleteFont(font) {
			try {
				await axios.delete(generateUrl(`/apps/richdocuments/settings/fonts/${font}`))
				this.$emit('delete', font)
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
	vertical-align: baseline;
	color: var(--color-text-maxcontrast);
}
</style>
