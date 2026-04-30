<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="home">
		<header class="home__header">
			<h1 class="home__title">
				<ViewDashboardOutlineIcon :size="32" />
				<span>{{ t('richdocuments', 'Office overview') }}</span>
			</h1>
			<p class="home__subtitle">
				{{ t('richdocuments', 'Recent documents and templates from the last {days} days', { days }) }}
			</p>
		</header>

		<HomeSection :title="t('richdocuments', 'My recent documents')"
			:see-all="{ name: 'recent' }"
			:loading="recent.loading"
			:error="recent.error"
			:empty-name="t('richdocuments', 'No documents edited in the last {days} days', { days })"
			@retry="loadRecent">
			<template #icon>
				<ClockOutlineIcon :size="24" />
			</template>
			<DocumentRow v-for="(item, i) in recent.items"
				:key="`recent-${item.fileid}`"
				:document="item"
				:style="{ '--enter-index': i }" />
		</HomeSection>

		<HomeSection :title="t('richdocuments', 'Shared with me')"
			:see-all="{ name: 'shared' }"
			:loading="shared.loading"
			:error="shared.error"
			:empty-name="t('richdocuments', 'No shared documents edited in the last {days} days', { days })"
			@retry="loadShared">
			<template #icon>
				<AccountMultipleIcon :size="24" />
			</template>
			<DocumentRow v-for="(item, i) in shared.items"
				:key="`shared-${item.fileid}`"
				:document="item"
				:show-owner="true"
				:style="{ '--enter-index': i }" />
		</HomeSection>

		<HomeSection :title="t('richdocuments', 'Create new document')"
			:see-all="{ name: 'templates' }"
			:loading="templates.loading"
			:error="templates.error"
			:empty-name="t('richdocuments', 'You haven\'t created any templates yet.')"
			@retry="loadTemplates">
			<template #icon>
				<FileDocumentPlusIcon :size="24" />
			</template>
			<TemplateRow v-for="(item, i) in templates.items"
				:key="`tpl-${item.fileid}`"
				:template="item"
				:style="{ '--enter-index': i }"
				@select="onTemplateSelect" />
		</HomeSection>

		<CreateFromTemplateModal v-if="selectedTemplate"
			:template="selectedTemplate"
			@close="selectedTemplate = null" />
	</div>
</template>

<script>
import HomeSection from './HomeSection.vue'
import DocumentRow from './DocumentRow.vue'
import TemplateRow from './TemplateRow.vue'
import CreateFromTemplateModal from './CreateFromTemplateModal.vue'
import { fetchHome } from './api.js'
import ClockOutlineIcon from 'vue-material-design-icons/ClockOutline.vue'
import AccountMultipleIcon from 'vue-material-design-icons/AccountMultiple.vue'
import FileDocumentPlusIcon from 'vue-material-design-icons/FileDocumentPlus.vue'
import ViewDashboardOutlineIcon from 'vue-material-design-icons/ViewDashboardOutline.vue'

const RECENT_WINDOW_DAYS = 60

/**
 * Reactive shape for a Home section state.
 * @return {{loading: boolean, error: boolean, items: Array}} initial state
 */
function emptySection() {
	return { loading: true, error: false, items: [] }
}

export default {
	name: 'HomeView',
	components: {
		HomeSection,
		DocumentRow,
		TemplateRow,
		CreateFromTemplateModal,
		ClockOutlineIcon,
		AccountMultipleIcon,
		FileDocumentPlusIcon,
		ViewDashboardOutlineIcon,
	},
	data() {
		return {
			recent: emptySection(),
			shared: emptySection(),
			templates: emptySection(),
			selectedTemplate: null,
			days: RECENT_WINDOW_DAYS,
			abortControllers: [],
		}
	},
	mounted() {
		this.loadRecent()
		this.loadShared()
		this.loadTemplates()
	},
	beforeDestroy() {
		this.abortControllers.forEach(c => c.abort())
	},
	methods: {
		async loadSection(kind, target) {
			target.loading = true
			target.error = false
			const controller = new AbortController()
			this.abortControllers.push(controller)
			try {
				const result = await fetchHome(kind, controller.signal)
				target.items = result.items ?? []
			} catch (e) {
				if (e.name !== 'CanceledError' && e.name !== 'AbortError') {
					target.error = true
				}
			} finally {
				target.loading = false
			}
		},
		loadRecent() {
			this.loadSection('recent', this.recent)
		},
		loadShared() {
			this.loadSection('shared', this.shared)
		},
		loadTemplates() {
			this.loadSection('templates', this.templates)
		},
		onTemplateSelect(template) {
			this.selectedTemplate = template
		},
	},
}
</script>

<style lang="scss" scoped>
.home {
	display: flex;
	flex-direction: column;
	gap: 32px;
	// Top padding matches --app-navigation-padding so the page heading is
	// vertically aligned with the "hide navigation" toggle button rendered
	// by NcAppNavigation.
	padding: var(--app-navigation-padding, 8px) clamp(16px, 4vw, 48px) 64px;
	max-width: 1200px;

	&__header {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	&__title {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 1.6em;
		font-weight: 600;
		margin: 0;
		line-height: 1.2;
		// Match the toggle button's clickable-area height so the heading
		// shares its vertical baseline.
		min-height: var(--default-clickable-area, 44px);
	}
	&__subtitle {
		color: var(--color-text-maxcontrast);
		margin: 0;
	}
}
</style>
