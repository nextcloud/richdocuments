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
						<!-- eslint-disable-next-line vue/no-v-html -->
						<span class="office-overview__nav-icon" v-html="creator.iconSvgInline" />
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

					<NcEmptyContent v-else-if="files.length === 0"
						:name="t('richdocuments', 'No {category} found', { category: activeCreator.label })">
						<template #icon>
							<FileDocumentOutline />
						</template>
					</NcEmptyContent>

					<section v-else class="office-overview__files" aria-labelledby="files-section-heading">
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

						<div v-if="viewMode === 'grid'" class="office-overview__grid">
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
import { sortNodes } from '@nextcloud/files'
import { loadState } from '@nextcloud/initial-state'
import { generateUrl } from '@nextcloud/router'
import { NcAppContent, NcAppNavigation, NcAppNavigationItem, NcButton, NcContent, NcDateTime, NcDialog, NcEmptyContent, NcListItem, NcLoadingIcon, NcTextField } from '@nextcloud/vue'
import FileDocumentOutline from 'vue-material-design-icons/FileDocumentOutline.vue'
import Star from 'vue-material-design-icons/Star.vue'
import ViewGrid from 'vue-material-design-icons/ViewGrid.vue'
import ViewList from 'vue-material-design-icons/ViewList.vue'
import FileCard from '../components/FileCard.vue'
import TemplateSection from '../components/TemplateSection.vue'
import { getAllOfficeFiles, filterByMimes, invalidateOfficeFilesCache } from '../services/officeFiles.js'
import { getTemplates, createFromTemplate } from '../services/templates.js'
import { setOverviewGridView } from '../services/config.js'

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
		NcListItem,
		NcLoadingIcon,
		NcTextField,
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
			previewEnabled: loadState('richdocuments', 'previewEnabled', false),
			viewMode: loadState('richdocuments', 'config', {}).overview_grid_view ? 'grid' : 'list',
			searchQuery: '',
			showCreateDialog: false,
			newFileName: '',
			pendingCreator: null,
			pendingTemplate: null,
			creating: false,
			createError: '',
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
		categoryName(creator) {
			const base = creator.label.replace(/^new\s+/i, '').trim()
			const capitalized = base.charAt(0).toUpperCase() + base.slice(1)
			return capitalized.endsWith('s') ? capitalized : capitalized + 's'
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
			return generateUrl('/core/preview?fileId={fileid}&x={x}&y={y}&v={v}&a=1&mimeFallback=1', {
				fileid: file.fileid,
				x: 300,
				y: 300,
				v: etag,
			})
		},

		openFile(file) {
			if (window.OCA?.Viewer) {
				OCA.Viewer.open({ path: file.path })
			}
		},

		onTemplateSelect(creator, template) {
			this.pendingCreator = creator
			this.pendingTemplate = template
			this.newFileName = creator.label.replace(/^New\s+/i, '') + creator.extension
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

.office-overview__list {
	padding: 0 calc(var(--default-grid-baseline) * 2);
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
</style>
