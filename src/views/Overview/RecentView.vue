<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<ListView kind="recent"
		:title="t('richdocuments', 'My recent documents')"
		:subtitle="t('richdocuments', 'Documents you own that have been edited in the last {days} days', { days })"
		:search-placeholder="t('richdocuments', 'Search by name or folder')"
		:empty-name="t('richdocuments', 'No documents edited in the last {days} days', { days })"
		:type-options="typeOptions"
		:date-groups="true">
		<template #icon>
			<ClockOutlineIcon :size="28" />
		</template>
		<template #default="{ items, viewMode, onFavoriteChanged }">
			<component :is="viewMode === 'grid' ? 'DocumentCard' : 'DocumentRow'"
				v-for="(item, i) in items"
				:key="item.fileid"
				:document="item"
				:style="{ '--enter-index': i }"
				@favorite-changed="onFavoriteChanged" />
		</template>
	</ListView>
</template>

<script>
import ListView from './ListView.vue'
import DocumentRow from './DocumentRow.vue'
import DocumentCard from './DocumentCard.vue'
import ClockOutlineIcon from 'vue-material-design-icons/ClockOutline.vue'
import { buildTypeOptions } from './TypeFilter.vue'

export default {
	name: 'RecentView',
	components: { ListView, DocumentRow, DocumentCard, ClockOutlineIcon },
	data() {
		return {
			days: 60,
			typeOptions: buildTypeOptions(),
		}
	},
}
</script>
