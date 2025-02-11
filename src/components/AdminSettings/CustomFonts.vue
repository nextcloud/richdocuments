<template>
	<NcSettingsSection :name="t('richdocuments', 'Custom Fonts')"
		:description="description">
		<NcListItem v-for="font in fonts"
			:key="font"
			one-line
			force-display-actions>
			<template #name>
				{{ font }}
			</template>

			<template #subname>
				<img :src="getFontPreview(font)"
					:alt="t('richdocuments', 'No font overview')">
			</template>

			<template #extra-actions>
				<NcButton @click="deleteFont(font)">
					<template #icon>
						<TrashCan :size="20" />
					</template>
				</NcButton>
			</template>
		</NcListItem>
	</NcSettingsSection>
</template>

<script lang="js">
import { NcSettingsSection, NcListItem, NcButton } from '@nextcloud/vue'
import { translate as t } from '@nextcloud/l10n'
import { generateUrl } from '@nextcloud/router'
import { showError } from '@nextcloud/dialogs'
import axios from '@nextcloud/axios'
import TrashCan from 'vue-material-design-icons/TrashCan.vue'

export default {
	name: 'CustomFonts',

	components: {
		NcSettingsSection,
		NcListItem,
		NcButton,
		TrashCan,
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
.list-item__wrapper {
	max-width: var(--sidebar-max-width);
}
</style>
