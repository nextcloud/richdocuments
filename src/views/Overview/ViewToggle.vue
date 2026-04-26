<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="view-toggle" role="group" :aria-label="t('richdocuments', 'Switch view')">
		<button type="button"
			class="view-toggle__button"
			:class="{ 'view-toggle__button--active': value === 'list' }"
			:aria-pressed="value === 'list'"
			:title="t('richdocuments', 'List view')"
			@click="$emit('input', 'list')">
			<ViewListIcon :size="20" />
		</button>
		<button type="button"
			class="view-toggle__button"
			:class="{ 'view-toggle__button--active': value === 'grid' }"
			:aria-pressed="value === 'grid'"
			:title="t('richdocuments', 'Grid view')"
			@click="$emit('input', 'grid')">
			<ViewGridIcon :size="20" />
		</button>
	</div>
</template>

<script>
import ViewListIcon from 'vue-material-design-icons/ViewList.vue'
import ViewGridIcon from 'vue-material-design-icons/ViewGrid.vue'

export default {
	name: 'ViewToggle',
	components: { ViewListIcon, ViewGridIcon },
	props: {
		value: {
			type: String,
			default: 'list',
			validator: v => ['list', 'grid'].includes(v),
		},
	},
}
</script>

<style lang="scss" scoped>
.view-toggle {
	display: inline-flex;
	border-radius: var(--border-radius-element, 999px);
	background-color: var(--color-background-dark);
	padding: 2px;
	gap: 2px;

	&__button {
		all: unset;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 32px;
		border-radius: var(--border-radius-element, 999px);
		color: var(--color-text-maxcontrast);
		transition: background-color 0.12s ease, color 0.12s ease;

		&:hover {
			color: var(--color-main-text);
		}
		&:focus-visible {
			outline: 2px solid var(--color-primary-element);
			outline-offset: 0;
		}

		&--active {
			background-color: var(--color-main-background);
			color: var(--color-primary-element);
			box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
		}
	}
}
</style>
