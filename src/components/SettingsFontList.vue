<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="settings-entry font-list-settings">
		<b>{{ label }}</b>
		<SettingsFont v-for="name in sortedFonts"
			:key="name"
			:name="name"
			@deleted="$emit('deleted', name)" />
	</div>
</template>

<script>
import SettingsFont from './SettingsFont.vue'

export default {
	name: 'SettingsFontList',
	components: {
		SettingsFont,
	},
	props: {
		label: {
			type: String,
			required: true,
		},
		fonts: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
		}
	},
	computed: {
		sortedFonts() {
			return this.fonts.slice().sort((a, b) => {
				const la = a.toLowerCase()
				const lb = b.toLowerCase()
				return la > lb
					? 1
					: la < lb
						? -1
						: 0
			})
		},
	},
	methods: {
	},
}
</script>

<style scoped lang="scss">
label {
	padding: 15px 0 15px 0;
}

.font-list-settings {
	margin-bottom: 16px
}
</style>
