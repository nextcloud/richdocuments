<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<section class="section">
		<header class="section__header">
			<h2 class="section__title">
				<slot name="icon" />
				<span>{{ title }}</span>
			</h2>
			<router-link v-if="seeAll" :to="seeAll" class="section__see-all">
				{{ t('richdocuments', 'See all') }}
				<ChevronRightIcon :size="16" />
			</router-link>
		</header>

		<div v-if="loading" class="section__skeletons" aria-hidden="true">
			<div v-for="i in 4" :key="i" class="section__skeleton" />
		</div>

		<SubtleHint v-else-if="error"
			:icon="errorIcon"
			:text="t('richdocuments', 'Could not load this section.')">
			<template #action>
				<NcButton type="tertiary" @click="$emit('retry')">
					{{ t('richdocuments', 'Retry') }}
				</NcButton>
			</template>
		</SubtleHint>

		<SubtleHint v-else-if="!hasItems"
			:icon="emptyIconComponent"
			:text="emptyName" />

		<div v-else class="section__list">
			<slot />
		</div>
	</section>
</template>

<script>
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue'
import AlertCircleOutlineIcon from 'vue-material-design-icons/AlertCircleOutline.vue'
import FileDocumentOutlineIcon from 'vue-material-design-icons/FileDocumentOutline.vue'
import SubtleHint from './SubtleHint.vue'

export default {
	name: 'HomeSection',
	components: { NcButton, ChevronRightIcon, SubtleHint },
	props: {
		title: { type: String, required: true },
		seeAll: { type: [Object, String], default: null },
		loading: { type: Boolean, default: false },
		error: { type: Boolean, default: false },
		emptyName: { type: String, required: true },
	},
	computed: {
		hasItems() {
			return !!(this.$slots.default && this.$slots.default.length > 0)
		},
		errorIcon() {
			return AlertCircleOutlineIcon
		},
		emptyIconComponent() {
			return FileDocumentOutlineIcon
		},
	},
}
</script>

<style lang="scss" scoped>
.section {
	display: flex;
	flex-direction: column;
	gap: 12px;

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
	}
	&__title {
		display: flex;
		align-items: center;
		gap: 10px;
		margin: 0;
		font-size: 1.1em;
		font-weight: 600;
	}
	&__see-all {
		display: inline-flex;
		align-items: center;
		gap: 2px;
		color: var(--color-primary-element);
		font-size: 0.9em;
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}

	&__list {
		display: flex;
		flex-direction: column;
		gap: 4px;
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
