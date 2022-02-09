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
	<div class="settings-entry">
		<b>{{ label }}</b>
		<SettingsFont v-for="name in sortedFonts"
			:key="name"
			:name="name"
			@deleted="$emit('deleted', name)" />
	</div>
</template>

<script>
import SettingsFont from './SettingsFont'

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
		}
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
		}
	},
	methods: {
	},
}
</script>

<style scoped lang="scss">
	label {
		padding: 15px 0 15px 0;
	}
</style>
