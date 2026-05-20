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
					:name="categoryName(creator)"
					:active="activeCreator === creator"
					@click="setCreator(creator)">
					<template #icon>
						<NcIconSvgWrapper :svg="creator.iconSvgInline" class="office-overview__nav-icon" />
					</template>
				</NcAppNavigationItem>
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
							:label="t('richdocuments', 'Search {category}', { category: categoryName(activeCreator) })"
							type="search" />
					</div>

					<TemplateSection v-if="!searchQuery && activeCreator"
						:creator="activeCreator"
						@select="onTemplateSelect" />

					<NcEmptyContent v-if="error"
						:name="error" />

					<section v-else class="office-overview__files" aria-labelledby="files-section-heading">
						<div role="status" class="sr-only">
							{{ t('richdocuments', '{count} {category} found', { count: files.length, category: categoryName(activeCreator) }) }}
						</div>

						<div class="office-overview__files-header">
							<h2 id="files-section-heading" class="office-overview__files-title">
								{{ t('richdocuments', 'Recent {category}', { category: categoryName(activeCreator) }) }}
							</h2>
							<NcButton :aria-label="viewMode === 'list' ? t('richdocuments', 'Switch to grid view') : t('richdocuments', 'Switch to list view')"
								variant="tertiary"
								@click="toggleViewMode">
								<template #icon>
									<ViewGrid v-if="viewMode === 'list'" :size="20" />
									<ViewList v-else :size="20" />
								</template>
							</NcButton>
						</div>

						<div class="office-overview__filters"
							role="group"
							:aria-label="t('richdocuments', 'Filter files')">
							<NcButton size="small"
								:variant="activeFilter === 'all' ? 'primary' : 'secondary'"
								:aria-pressed="activeFilter === 'all'"
								@click="activeFilter = 'all'">
								{{ t('richdocuments', 'All') }}
							</NcButton>
							<NcButton size="small"
								:variant="activeFilter === 'mine' ? 'primary' : 'secondary'"
								:aria-pressed="activeFilter === 'mine'"
								@click="activeFilter = 'mine'">
								{{ t('richdocuments', 'Mine') }}
							</NcButton>
							<NcButton size="small"
								:variant="activeFilter === 'shared' ? 'primary' : 'secondary'"
								:aria-pressed="activeFilter === 'shared'"
								@click="activeFilter = 'shared'">
								{{ t('richdocuments', 'Shared with me') }}
							</NcButton>
						</div>

						<NcEmptyContent v-if="files.length === 0"
							:name="t('richdocuments', 'No {category} found', { category: categoryName(activeCreator) })">
							<template #icon>
								<FileDocumentOutline />
							</template>
							<template v-if="activeFilter !== 'all'" #description>
								{{ t('richdocuments', 'Switch to All to see every file you have access to') }}
							</template>
						</NcEmptyContent>

						<div v-else-if="viewMode === 'grid'" class="office-overview__grid">
							<FileCard v-for="file in files"
								:key="file.id"
								@click="openFile(file)">
								<template #preview>
									<img v-if="previewEnabled && !failedPreviews[file.fileid]"
										:src="getPreviewUrl(file)"
										:alt="file.basename"
										loading="lazy"
										class="overview-file-preview"
										@error="failedPreviews = { ...failedPreviews, [file.fileid]: true }">
									<FileDocumentOutline v-else
										class="overview-file-icon"
										:size="48" />
								</template>

								<template #name>
									{{ file.basename }}
								</template>

								<template #subname>
									<NcDateTime :timestamp="file.mtime" />
								</template>
							</FileCard>
						</div>

						<div v-else class="office-overview__list">
							<NcListItem v-for="file in files"
								:key="file.id"
								:name="file.basename"
								:active="false"
								@click="openFile(file)">
								<template #indicator>
									<Star v-if="file.attributes.favorite === 1"
										:size="16"
										class="office-overview__favourite-icon" />
								</template>
								<template #subname>
									<NcDateTime :timestamp="file.mtime" />
								</template>
							</NcListItem>
						</div>

						<div v-if="hasMoreFiles" class="office-overview__more">
							<NcButton variant="tertiary" @click="openInFiles">
								{{ searchQuery ? t('richdocuments', 'Search all in Files') : t('richdocuments', 'Show all in Files') }}
								<template #icon>
									<OpenInNew :size="20" />
								</template>
							</NcButton>
						</div>
					</section>
				</template>

				<!-- Create from template dialog -->
				<NcDialog v-if="showCreateDialog"
					:name="pendingCreator ? pendingCreator.label : ''"
					:open="showCreateDialog"
					close-on-click-outside
					@update:open="showCreateDialog = false">
					<template #actions>
						<NcButton :disabled="creating || !newFileName.trim()" variant="primary" @click="doCreateFromTemplate">
							{{ t('richdocuments', 'Create') }}
						</NcButton>
					</template>
					<form class="office-overview__create-form" @submit.prevent="doCreateFromTemplate">
						<NcTextField ref="createInput"
							v-model="newFileName"
							:label="t('richdocuments', 'Filename')"
							:error="!!createError"
							:helper-text="createError"
							:disabled="creating" />
					</form>
				</NcDialog>
			</template>
		</NcAppContent>
	</NcContent>
</template>

<script>
import { getCurrentUser } from '@nextcloud/auth'
import { sortNodes } from '@nextcloud/files'
import { loadState } from '@nextcloud/initial-state'
import { generateUrl } from '@nextcloud/router'
import { NcAppContent, NcAppNavigation, NcAppNavigationItem, NcButton, NcContent, NcDateTime, NcDialog, NcEmptyContent, NcIconSvgWrapper, NcListItem, NcLoadingIcon, NcTextField } from '@nextcloud/vue'
import FileDocumentOutline from 'vue-material-design-icons/FileDocumentOutline.vue'
import OpenInNew from 'vue-material-design-icons/OpenInNew.vue'
import Star from 'vue-material-design-icons/Star.vue'
import ViewGrid from 'vue-material-design-icons/ViewGrid.vue'
import ViewList from 'vue-material-design-icons/ViewList.vue'
import FileCard from '../components/FileCard.vue'
import TemplateSection from '../components/TemplateSection.vue'
import { getAllOfficeFiles, filterByMimes, invalidateOfficeFilesCache } from '../services/officeFiles.js'
import { getTemplates, createFromTemplate } from '../services/templates.js'
import { setOverviewGridView } from '../services/config.js'

const MAX_RECENT_FILES = 50

export default {
	name: 'OfficeOverview',

	components: {
		FileCard,
		FileDocumentOutline,
		NcAppContent,
		NcAppNavigation,
		NcAppNavigationItem,
		NcButton,
		NcContent,
		NcDateTime,
		NcDialog,
		NcEmptyContent,
		NcIconSvgWrapper,
		NcListItem,
		NcLoadingIcon,
		NcTextField,
		OpenInNew,
		Star,
		TemplateSection,
		ViewGrid,
		ViewList,
	},

	data() {
		return {
			creators: [],
			activeCreator: null,
			allFiles: [],
			loading: false,
			error: null,
			currentUid: getCurrentUser()?.uid,
			previewEnabled: loadState('richdocuments', 'previewEnabled', false),
			viewMode: loadState('richdocuments', 'overview_config', {}).overview_grid_view ? 'grid' : 'list',
			activeFilter: 'mine',
			searchQuery: '',
			showCreateDialog: false,
			newFileName: '',
			pendingCreator: null,
			pendingTemplate: null,
			creating: false,
			failedPreviews: {},
			createError: '',
		}
	},

	computed: {
		mimeCategories() {
			return {
				'application/vnd.oasis.opendocument.text': t('richdocuments', 'Documents'),
				'application/vnd.oasis.opendocument.text-template': t('richdocuments', 'Documents'),
				'application/msword': t('richdocuments', 'Documents'),
				'application/vnd.openxmlformats-officedocument.wordprocessingml.document': t('richdocuments', 'Documents'),
				'application/vnd.oasis.opendocument.spreadsheet': t('richdocuments', 'Spreadsheets'),
				'application/vnd.oasis.opendocument.spreadsheet-template': t('richdocuments', 'Spreadsheets'),
				'application/vnd.ms-excel': t('richdocuments', 'Spreadsheets'),
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': t('richdocuments', 'Spreadsheets'),
				'application/vnd.oasis.opendocument.presentation': t('richdocuments', 'Presentations'),
				'application/vnd.oasis.opendocument.presentation-template': t('richdocuments', 'Presentations'),
				'application/vnd.ms-powerpoint': t('richdocuments', 'Presentations'),
				'application/vnd.openxmlformats-officedocument.presentationml.presentation': t('richdocuments', 'Presentations'),
				'application/vnd.oasis.opendocument.graphics': t('richdocuments', 'Diagrams'),
				'application/vnd.oasis.opendocument.graphics-template': t('richdocuments', 'Diagrams'),
			}
		},

		filteredFiles() {
			if (!this.activeCreator) {
				return []
			}
			const byCategory = filterByMimes(this.allFiles, this.activeCreator.mimetypes)

			let filtered = byCategory
			if (this.activeFilter === 'mine') {
				filtered = byCategory.filter(f =>
					f.owner === this.currentUid
					&& !['group', 'shared'].includes(f.attributes?.['nc:mount-type'])
				)
			} else if (this.activeFilter === 'shared') {
				filtered = byCategory.filter(f =>
					f.attributes?.['nc:mount-type'] === 'shared'
				)
			}

			if (this.searchQuery) {
				filtered = filtered.filter(f =>
					f.basename.toLowerCase().includes(this.searchQuery.toLowerCase())
				)
			}

			return sortNodes(filtered, {
				sortFavoritesFirst: true,
				sortingMode: 'mtime',
				sortingOrder: 'desc',
			})
		},

		files() {
			return this.filteredFiles.slice(0, MAX_RECENT_FILES)
		},

		hasMoreFiles() {
			return this.filteredFiles.length > MAX_RECENT_FILES
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
		categoryName(creator) {
			for (const mime of (creator.mimetypes ?? [])) {
				if (this.mimeCategories[mime]) return this.mimeCategories[mime]
			}
			return creator.label
		},

		setCreator(creator) {
			this.activeCreator = creator
		},

		toggleViewMode() {
			const mode = this.viewMode === 'list' ? 'grid' : 'list'
			this.viewMode = mode
			setOverviewGridView(mode === 'grid').catch(() => {})
		},

		getPreviewUrl(file) {
			const etag = (file.attributes?.etag || '').slice(0, 6)
			return generateUrl('/core/preview?fileId={fileid}&x={x}&y={y}&v={v}&a=1&mimeFallback=true', {
				fileid: file.fileid,
				x: 300,
				y: 300,
				v: etag,
			})
		},

		openFile(file) {
			if (window.OCA?.Viewer?.open) {
				window.OCA.Viewer.open({ path: file.path })
			} else {
				window.location.href = generateUrl('/f/{fileid}', { fileid: file.fileid })
			}
		},

		openInFiles() {
			if (this.searchQuery) {
				window.location.href = generateUrl('/apps/files/search') + '?query=' + encodeURIComponent(this.searchQuery)
			} else {
				window.location.href = generateUrl('/apps/files/recent')
			}
		},

		onTemplateSelect(creator, template) {
			this.pendingCreator = creator
			this.pendingTemplate = template
			this.newFileName = creator.label + creator.extension
			this.createError = ''
			this.showCreateDialog = true
			this.$nextTick(() => {
				const input = this.$refs.createInput?.$el?.querySelector('input')
				if (input) {
					input.focus()
					input.setSelectionRange(0, this.newFileName.length - creator.extension.length)
				}
			})
		},

		async doCreateFromTemplate() {
			if (!this.newFileName.trim() || this.creating) {
				return
			}
			this.creating = true
			this.createError = ''
			try {
				const filePath = '/' + this.newFileName.trim()
				const templatePath = this.pendingTemplate?.filename ?? ''
				const templateType = this.pendingTemplate ? 'user' : 'user_system'
				await createFromTemplate(filePath, templatePath, templateType)
				this.showCreateDialog = false
				const previousCreator = this.activeCreator
				invalidateOfficeFilesCache()
				await this.fetchAll(previousCreator)
			} catch (e) {
				this.createError = t('richdocuments', 'A file with that name already exists')
			} finally {
				this.creating = false
			}
		},

		async fetchAll(restoreCreator = null) {
			this.loading = true
			this.error = null

			try {
				this.creators = await getTemplates()
				const match = restoreCreator
					? this.creators.find(c => c.app === restoreCreator.app && c.extension === restoreCreator.extension)
					: null
				this.activeCreator = match ?? this.creators[0] ?? null

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
	margin: auto;
}

.office-overview__loading {
	margin: 32px auto;
}

.office-overview__search {
	display: flex;
	justify-content: center;
	padding: calc(var(--default-grid-baseline) * 4) calc(var(--default-grid-baseline) * 4) 0;

	> * {
		width: 100%;
		max-width: 400px;
	}
}

.office-overview__files-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: calc(var(--default-grid-baseline) * 4) calc(var(--default-grid-baseline) * 4) calc(var(--default-grid-baseline) * 2);
}

.office-overview__files-title {
	margin: 0;
	font-size: var(--default-font-size);
	font-weight: 600;
	color: var(--color-text-maxcontrast);
}

.office-overview__filters {
	display: flex;
	gap: calc(var(--default-grid-baseline) * 1);
	padding: 0 calc(var(--default-grid-baseline) * 4) calc(var(--default-grid-baseline) * 2);

	:deep(.button-vue) {
		--button-radius: var(--border-radius-pill, 100px);
	}
}

.office-overview__list {
	padding: 0 calc(var(--default-grid-baseline) * 2);
}

.office-overview__more {
	display: flex;
	justify-content: center;
	padding: calc(var(--default-grid-baseline) * 3) calc(var(--default-grid-baseline) * 4);
}

.office-overview__favourite-icon {
	color: var(--color-warning);
}

.office-overview__create-form {
	min-height: calc(2 * var(--default-clickable-area));
}

.office-overview__nav-icon {
	display: flex;
	width: 20px;
	height: 20px;

	:deep(svg) {
		width: 100%;
		height: 100%;
	}
}

.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}
</style>
