<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div>
		<ListView kind="templates"
			:title="t('richdocuments', 'Create new document')"
			:subtitle="t('richdocuments', 'Pick one of your personal templates to start a new document')"
			:search-placeholder="t('richdocuments', 'Search templates')"
			:empty-name="t('richdocuments', 'You haven\'t created any templates yet.')"
			:type-options="typeOptions">
			<template #icon>
				<FileDocumentPlusIcon :size="28" />
			</template>
			<template #default="{ items, viewMode }">
				<component :is="viewMode === 'grid' ? 'TemplateCard' : 'TemplateRow'"
					v-for="(item, i) in items"
					:key="item.fileid"
					:template="item"
					:style="{ '--enter-index': i }"
					@select="onSelect" />
			</template>
		</ListView>
		<CreateFromTemplateModal v-if="selected"
			:template="selected"
			@close="selected = null" />
	</div>
</template>

<script>
import ListView from './ListView.vue'
import TemplateRow from './TemplateRow.vue'
import TemplateCard from './TemplateCard.vue'
import CreateFromTemplateModal from './CreateFromTemplateModal.vue'
import FileDocumentPlusIcon from 'vue-material-design-icons/FileDocumentPlus.vue'
import { buildTypeOptions } from './TypeFilter.vue'

export default {
	name: 'TemplatesView',
	components: { ListView, TemplateRow, TemplateCard, CreateFromTemplateModal, FileDocumentPlusIcon },
	data() {
		return {
			selected: null,
			// Templates can never be PDF, so omit that pill on this view.
			typeOptions: buildTypeOptions().filter(o => o.key !== 'pdfs'),
		}
	},
	methods: {
		onSelect(template) {
			this.selected = template
		},
	},
}
</script>
