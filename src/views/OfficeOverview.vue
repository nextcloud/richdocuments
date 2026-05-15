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

				<NcAppNavigationItem :name="t('richdocuments', 'Diagrams')"
					icon="icon-filetype-draw"
					:active="currentView === 'diagrams'"
					@click="setView('diagrams')" />
			</template>
		</NcAppNavigation>

		<NcAppContent>
			<NcLoadingIcon v-if="loading" class="office-overview__loading" />

			<template v-else>
				<div v-if="!error" class="office-overview__search">
					<NcTextField v-model="searchQuery"
						:label="searchLabel"
						type="search" />
				</div>

				<NcEmptyContent v-if="error"
					:name="error" />

				<NcEmptyContent v-else-if="files.length === 0"
					:name="emptyMessage">
					<template #icon>
						<FileDocumentOutline />
					</template>
				</NcEmptyContent>

				<div v-else class="office-overview__grid">
					<FileCard v-for="file in files"
						:key="file.id"
						@click="openFile(file)">
						<template #preview>
							<img v-if="previewEnabled"
								:src="getPreviewUrl(file)"
								:alt="file.basename"
								class="overview-file-preview">
							<span v-else
								:class="['icon-filetype-' + fileTypeClass, 'overview-file-icon']" />
						</template>

						<template #name>
							{{ file.basename }}
						</template>

						<template #subname>
							<NcDateTime :timestamp="file.mtime" />
						</template>
					</FileCard>
				</div>
			</template>
		</NcAppContent>
	</NcContent>
</template>

<script>
import { loadState } from '@nextcloud/initial-state'
import { generateUrl } from '@nextcloud/router'
import NcAppContent from '@nextcloud/vue/dist/Components/NcAppContent.js'
import NcAppNavigation from '@nextcloud/vue/dist/Components/NcAppNavigation.js'
import NcAppNavigationItem from '@nextcloud/vue/dist/Components/NcAppNavigationItem.js'
import NcContent from '@nextcloud/vue/dist/Components/NcContent.js'
import NcDateTime from '@nextcloud/vue/dist/Components/NcDateTime.js'
import NcEmptyContent from '@nextcloud/vue/dist/Components/NcEmptyContent.js'
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import NcTextField from '@nextcloud/vue/dist/Components/NcTextField.js'
import FileDocumentOutline from 'vue-material-design-icons/FileDocumentOutline.vue'
import FileCard from '../components/FileCard.vue'
import { getAllOfficeFiles, filterByCategory } from '../services/officeFiles.js'

export default {
	name: 'OfficeOverview',

	components: {
		FileCard,
		NcAppContent,
		NcAppNavigation,
		NcAppNavigationItem,
		NcContent,
		NcDateTime,
		NcEmptyContent,
		NcLoadingIcon,
		NcTextField,
		FileDocumentOutline,
	},

	data() {
		return {
			currentView: 'documents',
			allFiles: [],
			loading: false,
			error: null,
			previewEnabled: loadState('richdocuments', 'previewEnabled', false),
			searchQuery: '',
		}
	},

	computed: {
		files() {
			const byCategory = filterByCategory(this.allFiles, this.currentView)
			if (!this.searchQuery) {
				return byCategory
			}
			const q = this.searchQuery.toLowerCase()
			return byCategory.filter(f => f.basename.toLowerCase().includes(q))
		},

		emptyMessage() {
			const labels = {
				documents: t('richdocuments', 'No documents found'),
				presentations: t('richdocuments', 'No presentations found'),
				spreadsheets: t('richdocuments', 'No spreadsheets found'),
				diagrams: t('richdocuments', 'No diagrams found'),
			}

			return labels[this.currentView]
		},

		fileTypeClass() {
			const map = {
				documents: 'document',
				presentations: 'presentation',
				spreadsheets: 'spreadsheet',
				diagrams: 'draw',
			}

			return map[this.currentView]
		},

		searchLabel() {
			const labels = {
				documents: t('richdocuments', 'Search documents'),
				presentations: t('richdocuments', 'Search presentations'),
				spreadsheets: t('richdocuments', 'Search spreadsheets'),
				diagrams: t('richdocuments', 'Search diagrams'),
			}

			return labels[this.currentView]
		},
	},

	watch: {
		currentView() {
			this.searchQuery = ''
		},
	},

	created() {
		this.fetchFiles()
	},

	methods: {
		setView(view) {
			this.currentView = view
		},

		getPreviewUrl(file) {
			return generateUrl('/core/preview?fileId={fileid}&x={x}&y={y}', {
				fileid: file.fileid,
				x: 300,
				y: 300,
			})
		},

		openFile(file) {
			if (window.OCA?.Viewer) {
				OCA.Viewer.open({ path: file.path })
			}
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

.overview-file-preview {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.overview-file-icon {
	display: block;
	width: 48px;
	height: 48px;
	margin: auto;
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
}

.office-overview__loading {
	margin: 32px auto;
}

.office-overview__search {
	padding: calc(var(--default-grid-baseline) * 4) calc(var(--default-grid-baseline) * 4) 0;
	max-width: 400px;
	margin: 0 auto;
}
</style>
