<template>
	<NcSettingsSection :name="t('richdocuments', 'Custom Fonts')"
		:description="description">
		<NcListItem v-for="font in fonts" :key="font" one-line>
			<template #name>
				{{ font }}
			</template>
			<template #subname>
				<img :src="getFontPreview(font)"
					:alt="t('richdocuments', 'No font overview')">
			</template>
		</NcListItem>
	</NcSettingsSection>
</template>

<script lang="js">
import { NcSettingsSection, NcListItem } from '@nextcloud/vue'
import { translate as t } from '@nextcloud/l10n'
import { generateUrl } from '@nextcloud/router'

export default {
	name: 'CustomFonts',

	components: {
		NcSettingsSection,
		NcListItem,
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
	},
}
</script>
