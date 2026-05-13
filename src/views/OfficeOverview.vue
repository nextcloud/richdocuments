<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<NcContent app-name="richdocuments">
		<NcAppNavigation>
			<template #list>
				<NcAppNavigationItem :name="t('richdocuments', 'Documents')"
					icon="icon-filetype-document"
					:active="currentView === 'documents'"
					@click="setView('documents')" />

				<NcAppNavigationItem :name="t('richdocuments', 'Presentations')"
					icon="icon-filetype-presentation"
					:active="currentView === 'presentations'"
					@click="setView('presentations')" />

				<NcAppNavigationItem :name="t('richdocuments', 'Spreadsheets')"
					icon="icon-filetype-spreadsheet"
					:active="currentView === 'spreadsheets'"
					@click="setView('spreadsheets')" />
			</template>
		</NcAppNavigation>

		<NcAppContent>
			<NcLoadingIcon v-if="loading" class="office-overview__loading" />
			<NcEmptyContent v-else-if="error"
				:name="error" />
			<NcEmptyContent v-else-if="files.length === 0"
				:name="emptyMessage">
				<template #icon>
					<FileDocumentOutline />
				</template>
			</NcEmptyContent>
			<div v-else class="office-overview__grid">
				<OfficeFileEntry v-for="file in files"
					:key="file.id"
					:source="file" />
			</div>
		</NcAppContent>
	</NcContent>
</template>

<script>
import NcAppContent from '@nextcloud/vue/dist/Components/NcAppContent.js'
import NcAppNavigation from '@nextcloud/vue/dist/Components/NcAppNavigation.js'
import NcAppNavigationItem from '@nextcloud/vue/dist/Components/NcAppNavigationItem.js'
import NcContent from '@nextcloud/vue/dist/Components/NcContent.js'
import NcEmptyContent from '@nextcloud/vue/dist/Components/NcEmptyContent.js'
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import FileDocumentOutline from 'vue-material-design-icons/FileDocumentOutline.vue'
import OfficeFileEntry from '../components/OfficeFileEntry.vue'
import { getAllOfficeFiles, filterByCategory } from '../services/officeFiles.js'

export default {
	name: 'OfficeOverview',

	components: {
		NcAppContent,
		NcAppNavigation,
		NcAppNavigationItem,
		NcContent,
		NcEmptyContent,
		NcLoadingIcon,
		FileDocumentOutline,
		OfficeFileEntry,
	},

	data() {
		return {
			currentView: 'documents',
			allFiles: [],
			loading: false,
			error: null,
		}
	},

	computed: {
		files() {
			return filterByCategory(this.allFiles, this.currentView)
		},

		emptyMessage() {
			const labels = {
				documents: t('richdocuments', 'No documents found'),
				presentations: t('richdocuments', 'No presentations found'),
				spreadsheets: t('richdocuments', 'No spreadsheets found'),
			}

			return labels[this.currentView]
		},
	},

	created() {
		this.fetchFiles()
	},

	methods: {
		setView(view) {
			this.currentView = view
		},

		async fetchFiles() {
			this.loading = true
			this.error = null

			try {
				this.allFiles = await getAllOfficeFiles()
			} catch (e) {
				this.error = t('richdocuments', 'Failed to load files')
				this.allFiles = []
			} finally {
				this.loading = false
			}
		},
	},
}
</script>

<style scoped>
.office-overview__grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
	gap: calc(var(--default-grid-baseline) * 3);
	padding: calc(var(--default-grid-baseline) * 4);
}

.office-overview__loading {
	margin: 32px auto;
}
</style>
