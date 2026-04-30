<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="list-view">
		<header class="list-view__header">
			<div class="list-view__header-row">
				<h1 class="list-view__title">
					<slot name="icon" />
					<span>{{ title }}</span>
				</h1>
				<ViewToggle :value="viewMode" @input="onViewModeChange" />
			</div>
			<p v-if="subtitle" class="list-view__subtitle">
				{{ subtitle }}
			</p>
		</header>

		<TypeFilter v-if="typeOptions && typeOptions.length"
			:value="typeFilter"
			:options="typeOptions"
			:aria-controls="listAriaId"
			@input="onTypeFilterChange" />

		<SearchBar v-model="query" :placeholder="searchPlaceholder" />

		<div v-if="initialLoading" class="list-view__skeletons" aria-hidden="true">
			<div v-for="i in 8" :key="i" class="list-view__skeleton" />
		</div>

		<SubtleHint v-else-if="error && !items.length"
			:icon="errorIcon"
			:text="t('richdocuments', 'Could not load this list.')">
			<template #action>
				<NcButton type="tertiary" @click="reload">
					{{ t('richdocuments', 'Retry') }}
				</NcButton>
			</template>
		</SubtleHint>

		<!-- Filtered / searched and got nothing: stay subtle, the user can fix it. -->
		<SubtleHint v-else-if="!items.length && (query || typeFilter)"
			:icon="emptyIcon"
			:text="effectiveEmptyName" />

		<!-- Genuinely empty list: friendly illustration as the first impression. -->
		<EmptyIllustration v-else-if="!items.length"
			:kind="illustrationKind"
			:title="effectiveEmptyName"
			:description="emptyDescription">
			<template v-if="emptyAction" #action>
				<NcButton :type="emptyAction.type" @click="emptyAction.handler">
					<template v-if="emptyAction.icon" #icon>
						<component :is="emptyAction.icon" :size="18" />
					</template>
					{{ emptyAction.label }}
				</NcButton>
			</template>
		</EmptyIllustration>

		<div v-else
			:id="listAriaId"
			:class="['list-view__items', viewMode === 'grid' ? 'list-view__items--grid' : 'list-view__items--list']">
			<template v-if="dateGroups">
				<template v-for="group in groupedItems">
					<h2 :key="`title-${group.key}`" class="list-view__group-title">
						{{ group.title }}
						<span class="list-view__group-count">{{ group.items.length }}</span>
					</h2>
					<slot :items="group.items"
						:view-mode="viewMode"
						:on-favorite-changed="applyFavoriteChange" />
				</template>
			</template>
			<slot v-else
				:items="items"
				:view-mode="viewMode"
				:on-favorite-changed="applyFavoriteChange" />
			<div ref="sentinel" class="list-view__sentinel" />
			<div v-if="loadingMore" class="list-view__more">
				<NcLoadingIcon :size="24" />
			</div>
			<div v-else-if="error && items.length" class="list-view__more list-view__more--error">
				<NcButton type="tertiary" @click="loadMore">
					{{ t('richdocuments', 'Failed to load more — retry') }}
				</NcButton>
			</div>
		</div>
	</div>
</template>

<script>
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import { generateUrl } from '@nextcloud/router'
import AlertCircleOutlineIcon from 'vue-material-design-icons/AlertCircleOutline.vue'
import FileDocumentOutlineIcon from 'vue-material-design-icons/FileDocumentOutline.vue'
import FileDocumentPlusIcon from 'vue-material-design-icons/FileDocumentPlus.vue'
import FolderOpenIcon from 'vue-material-design-icons/FolderOpen.vue'
import MagnifyCloseIcon from 'vue-material-design-icons/MagnifyClose.vue'
import EmptyIllustration from './EmptyIllustration.vue'
import SearchBar from './SearchBar.vue'
import SubtleHint from './SubtleHint.vue'
import TypeFilter from './TypeFilter.vue'
import ViewToggle from './ViewToggle.vue'
import { fetchList } from './api.js'
import { groupItemsByDate } from './dateGrouping.js'

const VIEW_MODE_STORAGE_KEY = 'richdocuments.overview.viewMode'

/**
 * Read the persisted view mode from localStorage, falling back to 'list'.
 * @return {('list'|'grid')} stored view mode
 */
function loadViewMode() {
	try {
		const value = localStorage.getItem(VIEW_MODE_STORAGE_KEY)
		return value === 'grid' ? 'grid' : 'list'
	} catch {
		return 'list'
	}
}

/**
 * Persist the user's view-mode choice across sessions.
 * @param {string} mode 'list' or 'grid'
 */
function saveViewMode(mode) {
	try {
		localStorage.setItem(VIEW_MODE_STORAGE_KEY, mode)
	} catch {
		// localStorage may be disabled in private mode; non-fatal.
	}
}

let listAriaCounter = 0

export default {
	name: 'ListView',
	components: { NcButton, NcLoadingIcon, EmptyIllustration, SearchBar, SubtleHint, TypeFilter, ViewToggle },
	props: {
		kind: { type: String, required: true, validator: v => ['recent', 'shared', 'templates'].includes(v) },
		title: { type: String, required: true },
		subtitle: { type: String, default: '' },
		searchPlaceholder: { type: String, required: true },
		emptyName: { type: String, required: true },
		emptySearchName: { type: String, default: '' },
		typeOptions: { type: Array, default: () => [] },
		// When true, the list is split into date sections (Today,
		// Yesterday, …, Older). Disabled by default since it only makes
		// sense for date-sorted lists (Recent / Shared) — the templates
		// list is alphabetical.
		dateGroups: { type: Boolean, default: false },
	},
	data() {
		return {
			query: '',
			typeFilter: null,
			viewMode: loadViewMode(),
			items: [],
			nextOffset: null,
			initialLoading: true,
			loadingMore: false,
			error: false,
			abortController: null,
			observer: null,
			listAriaId: `overview-list-${++listAriaCounter}`,
		}
	},
	computed: {
		effectiveEmptyName() {
			if (this.query) {
				return this.emptySearchName
					|| t('richdocuments', 'No matches for "{query}"', { query: this.query })
			}
			if (this.typeFilter) {
				return t('richdocuments', 'No documents of this type in the selected window')
			}
			return this.emptyName
		},
		emptyIcon() {
			return this.query ? MagnifyCloseIcon : FileDocumentOutlineIcon
		},
		groupedItems() {
			const pinned = this.items.filter(it => it.favorite)
			const rest = this.items.filter(it => !it.favorite)
			const groups = groupItemsByDate(rest)
			if (pinned.length > 0) {
				groups.unshift({
					key: 'pinned',
					title: t('richdocuments', 'Pinned'),
					items: pinned,
				})
			}
			return groups
		},
		errorIcon() {
			return AlertCircleOutlineIcon
		},
		illustrationKind() {
			// Maps the list-kind onto an EmptyIllustration variant.
			// Templates list, when "create new document" is empty, gets the
			// templates illustration; everything else uses kind directly.
			return this.kind === 'templates' ? 'templates' : this.kind
		},
		emptyDescription() {
			// One-line nudge under the heading on the genuinely-empty
			// state. Filtered/searched empties don't show this at all.
			if (this.kind === 'recent') {
				return t('richdocuments', 'Documents you edit will show up here.')
			}
			if (this.kind === 'shared') {
				return t('richdocuments', 'Files others share with you will appear here.')
			}
			if (this.kind === 'templates') {
				return t('richdocuments', 'Save a document to your templates folder in Files to start.')
			}
			return ''
		},
		// Suggest a single, kind-appropriate next step when the list is
		// empty AND the user isn't filtering / searching (in which case
		// "clear search" is the natural next step and we keep the hint
		// quiet). Returns null to render no action button.
		emptyAction() {
			if (this.query || this.typeFilter) {
				return null
			}
			if (this.kind === 'recent' || this.kind === 'shared') {
				return {
					label: t('richdocuments', 'Create a new document'),
					type: 'primary',
					icon: FileDocumentPlusIcon,
					handler: () => this.$router.push({ name: 'templates' }),
				}
			}
			if (this.kind === 'templates') {
				return {
					label: t('richdocuments', 'Open Files'),
					type: 'secondary',
					icon: FolderOpenIcon,
					handler: () => {
						window.location.href = generateUrl('/apps/files')
					},
				}
			}
			return null
		},
	},
	watch: {
		query() {
			this.reload()
		},
	},
	mounted() {
		this.reload()
	},
	updated() {
		this.attachObserver()
	},
	beforeDestroy() {
		this.cancel()
		this.detachObserver()
	},
	methods: {
		cancel() {
			if (this.abortController) {
				this.abortController.abort()
				this.abortController = null
			}
		},
		async reload() {
			this.cancel()
			this.detachObserver()
			this.items = []
			this.nextOffset = 0
			this.error = false
			this.initialLoading = true
			await this.fetchPage(true)
		},
		async loadMore() {
			if (this.loadingMore || this.nextOffset === null) {
				return
			}
			await this.fetchPage(false)
		},
		async fetchPage(initial) {
			const offset = this.nextOffset ?? 0
			const requestedQuery = this.query || null
			const requestedType = this.typeFilter
			const controller = new AbortController()
			this.abortController = controller
			if (initial) {
				this.initialLoading = true
			} else {
				this.loadingMore = true
			}
			this.error = false
			try {
				const result = await fetchList(this.kind, {
					q: requestedQuery,
					type: requestedType,
					offset,
					signal: controller.signal,
				})
				// Guard against late results from a stale query/filter.
				if (this.abortController !== controller) {
					return
				}
				if (this.query !== (requestedQuery ?? '')) {
					return
				}
				if (this.typeFilter !== requestedType) {
					return
				}
				this.items = initial ? (result.items ?? []) : this.items.concat(result.items ?? [])
				this.nextOffset = result.nextOffset ?? null
			} catch (e) {
				if (e.name === 'CanceledError' || e.name === 'AbortError') {
					return
				}
				this.error = true
			} finally {
				if (initial) {
					this.initialLoading = false
				} else {
					this.loadingMore = false
				}
				// Rearm the IntersectionObserver — IO only fires on intersection
				// transitions, so if the sentinel is still in view we need to
				// disconnect + observe again to re-trigger the next page.
				this.$nextTick(() => this.rearmObserver())
			}
		},
		onTypeFilterChange(value) {
			if (value === this.typeFilter) {
				return
			}
			this.typeFilter = value
			this.reload()
		},
		onViewModeChange(mode) {
			if (mode !== 'list' && mode !== 'grid') {
				return
			}
			this.viewMode = mode
			saveViewMode(mode)
		},
		attachObserver() {
			if (this.observer || !this.$refs.sentinel) {
				return
			}
			this.observer = new IntersectionObserver(entries => {
				const entry = entries[0]
				if (entry && entry.isIntersecting) {
					this.loadMore()
				}
			}, { rootMargin: '300px' })
			this.observer.observe(this.$refs.sentinel)
		},
		rearmObserver() {
			if (!this.$refs.sentinel || this.nextOffset === null) {
				return
			}
			this.detachObserver()
			this.attachObserver()
		},
		detachObserver() {
			if (this.observer) {
				this.observer.disconnect()
				this.observer = null
			}
		},
		// Called by row/card components when the user toggles a favourite.
		// We mutate the in-memory items so the new pin instantly moves to
		// the "Pinned" group without a full reload.
		applyFavoriteChange({ fileid, favorite }) {
			const idx = this.items.findIndex(it => it.fileid === fileid)
			if (idx === -1) {
				return
			}
			this.$set(this.items, idx, { ...this.items[idx], favorite: !!favorite })
		},
	},
}
</script>

<style lang="scss" scoped>
.list-view {
	display: flex;
	flex-direction: column;
	gap: 16px;
	// Top padding matches --app-navigation-padding so the page heading is
	// vertically aligned with the "hide navigation" toggle button rendered
	// by NcAppNavigation. Bottom padding stays generous for scroll comfort.
	padding: var(--app-navigation-padding, 8px) clamp(16px, 4vw, 48px) 64px;
	max-width: 1200px;

	&__header {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	&__header-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		// Match the toggle button's clickable-area height so the heading
		// row and the toggle share the same baseline.
		min-height: var(--default-clickable-area, 44px);
	}
	&__title {
		display: flex;
		align-items: center;
		gap: 10px;
		margin: 0;
		font-size: 1.6em;
		font-weight: 600;
		line-height: 1.2;
	}
	&__subtitle {
		color: var(--color-text-maxcontrast);
		margin: 0;
	}

	&__items {
		min-height: 0;
	}
	&__items--list {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	&__items--grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 16px;
	}

	// The sentinel must always be the last child of the items container,
	// regardless of layout — for grid mode, span the whole row so it doesn't
	// fight the grid placement.
	&__sentinel {
		height: 1px;
		grid-column: 1 / -1;
	}

	&__group-title {
		// Span the full grid row so cards below flow under the heading.
		grid-column: 1 / -1;
		display: flex;
		align-items: center;
		gap: 10px;
		margin: 0;
		padding: 12px 0 6px;
		font-size: 0.95em;
		font-weight: 600;
		color: var(--color-text-maxcontrast);
		text-transform: uppercase;
		letter-spacing: 0.06em;

		// Stick the heading to the top of the scroll area while users
		// scroll through that group. A solid background + a soft
		// gradient fade hides the items scrolling under it.
		position: sticky;
		top: 0;
		z-index: 4;
		background: linear-gradient(
			to bottom,
			var(--color-main-background) 70%,
			transparent
		);
		// Slight tint so the sticky heading is distinguishable from rows.
		backdrop-filter: blur(2px);

		&:first-child {
			padding-top: 4px;
		}
	}
	&__group-count {
		font-size: 0.85em;
		font-weight: 500;
		color: var(--color-text-maxcontrast);
		background-color: var(--color-background-dark);
		padding: 1px 8px;
		border-radius: var(--border-radius-element, 999px);
		text-transform: none;
		letter-spacing: 0;
	}

	&__more {
		display: flex;
		justify-content: center;
		padding: 16px 0;
		grid-column: 1 / -1;
	}

	&__skeletons {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	&__skeleton {
		height: 64px;
		border-radius: var(--border-radius-large, 12px);
		background: linear-gradient(
			90deg,
			var(--color-background-dark) 0%,
			var(--color-background-hover) 50%,
			var(--color-background-dark) 100%
		);
		background-size: 200% 100%;
		animation: shimmer 1.4s ease-in-out infinite;
	}
}

@keyframes shimmer {
	from { background-position: 200% 0; }
	to   { background-position: -200% 0; }
}
</style>
