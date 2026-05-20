<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<NcContent app-name="richdocuments">
		<NcAppNavigation>
			<template #list>
				<NcAppNavigationItem v-for="creator in creators"
					:key="creator.app + '-' + creator.extension"
					:name="creator.label"
					:active="activeCreator === creator"
					@click="setCreator(creator)" />
			</template>
		</NcAppNavigation>

		<NcAppContent>
			<NcLoadingIcon v-if="loading" class="office-overview__loading" />

			<template v-else>
				<NcEmptyContent v-if="creators.length === 0"
					:name="t('richdocuments', 'No office suite installed')">
					<template #icon>
						<FileDocumentOutline />
					</template>
				</NcEmptyContent>

				<template v-else>
					<div class="office-overview__search">
						<NcTextField v-model="searchQuery"
							:label="t('richdocuments', 'Search {category}', { category: activeCreator.label })"
							type="search" />
					</div>

					<NcEmptyContent v-if="error"
						:name="error" />

					<NcEmptyContent v-else-if="files.length === 0"
						:name="t('richdocuments', 'No {category} found', { category: activeCreator.label })">
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
									loading="lazy"
									class="overview-file-preview">
								<span v-else
									class="overview-file-icon" />
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
			</template>
		</NcAppContent>
	</NcContent>
</template>

<script>
import { sortNodes } from '@nextcloud/files'
import { loadState } from '@nextcloud/initial-state'
import { generateUrl } from '@nextcloud/router'
import { NcAppContent, NcAppNavigation, NcAppNavigationItem, NcContent, NcDateTime, NcEmptyContent, NcLoadingIcon, NcTextField } from '@nextcloud/vue'
import FileDocumentOutline from 'vue-material-design-icons/FileDocumentOutline.vue'
import FileCard from '../components/FileCard.vue'
import { getAllOfficeFiles, filterByMimes } from '../services/officeFiles.js'
import { getTemplates } from '../services/templates.js'

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
			creators: [],
			activeCreator: null,
			allFiles: [],
			loading: false,
			error: null,
			previewEnabled: loadState('richdocuments', 'previewEnabled', false),
			searchQuery: '',
		}
	},

	computed: {
		files() {
			if (!this.activeCreator) {
				return []
			}
			const byCategory = filterByMimes(this.allFiles, this.activeCreator.mimetypes)
			const filtered = this.searchQuery
				? byCategory.filter(f => f.basename.toLowerCase().includes(this.searchQuery.toLowerCase()))
				: byCategory
			return sortNodes(filtered, {
				sortFavoritesFirst: true,
				sortingMode: 'mtime',
				sortingOrder: 'asc',
			})
		},
	},

	watch: {
		activeCreator() {
			this.searchQuery = ''
		},
	},

	created() {
		this.fetchAll()
	},

	methods: {
		setCreator(creator) {
			this.activeCreator = creator
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

		async fetchAll() {
			this.loading = true
			this.error = null

			try {
				this.creators = await getTemplates()
				this.activeCreator = this.creators[0] ?? null

				if (this.creators.length > 0) {
					const allMimes = this.creators.flatMap(c => c.mimetypes)
					this.allFiles = await getAllOfficeFiles(allMimes)
				}
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
