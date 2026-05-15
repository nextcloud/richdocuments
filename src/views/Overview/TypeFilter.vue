<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="type-filter" role="tablist" :aria-label="t('richdocuments', 'Filter by file type')">
		<button v-for="option in options"
			:key="option.value || 'all'"
			type="button"
			role="tab"
			class="type-filter__pill"
			:class="{ 'type-filter__pill--active': isActive(option.value) }"
			:aria-selected="isActive(option.value)"
			:aria-controls="ariaControls"
			@click="$emit('input', option.value)">
			<component :is="option.icon" v-if="option.icon" :size="16" />
			<span>{{ option.label }}</span>
		</button>
	</div>
</template>

<script>
import { translate as t } from '@nextcloud/l10n'
import FileMultipleIcon from 'vue-material-design-icons/FileMultiple.vue'
import FileWordIcon from 'vue-material-design-icons/FileWord.vue'
import FileExcelIcon from 'vue-material-design-icons/FileExcel.vue'
import FilePresentationBoxIcon from 'vue-material-design-icons/FilePresentationBox.vue'
import FilePdfBoxIcon from 'vue-material-design-icons/FilePdfBox.vue'

/**
 * Build the canonical type-filter option list. Consumers can drop entries
 * (e.g. omit "PDFs" on the templates view).
 *
 * @return {Array<{value: ?string, label: string, icon: object, key: string}>} fresh option list
 */
export function buildTypeOptions() {
	return [
		{ value: null, label: t('richdocuments', 'All'), icon: FileMultipleIcon, key: 'all' },
		{ value: 'documents', label: t('richdocuments', 'Documents'), icon: FileWordIcon, key: 'documents' },
		{ value: 'spreadsheets', label: t('richdocuments', 'Spreadsheets'), icon: FileExcelIcon, key: 'spreadsheets' },
		{ value: 'presentations', label: t('richdocuments', 'Presentations'), icon: FilePresentationBoxIcon, key: 'presentations' },
		{ value: 'pdfs', label: t('richdocuments', 'PDFs'), icon: FilePdfBoxIcon, key: 'pdfs' },
	]
}

export default {
	name: 'TypeFilter',
	props: {
		value: { type: String, default: null },
		options: {
			type: Array,
			required: true,
			validator: arr => arr.every(o => 'value' in o && 'label' in o),
		},
		ariaControls: { type: String, default: undefined },
	},
	methods: {
		isActive(optionValue) {
			return (this.value || null) === (optionValue || null)
		},
	},
}
</script>

<style lang="scss" scoped>
.type-filter {
	display: flex;
	gap: 8px;
	overflow-x: auto;
	scrollbar-width: thin;
	padding: 2px 0;

	&::-webkit-scrollbar {
		height: 4px;
	}
	&::-webkit-scrollbar-thumb {
		background: var(--color-border-dark);
		border-radius: 2px;
	}

	&__pill {
		all: unset;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 6px 14px;
		border-radius: var(--border-radius-element, 999px);
		background-color: var(--color-background-dark);
		color: var(--color-main-text);
		font-size: 0.9em;
		font-weight: 500;
		white-space: nowrap;
		transition: background-color 0.12s ease, color 0.12s ease;

		&:hover {
			background-color: var(--color-background-hover);
		}
		&:focus-visible {
			outline: 2px solid var(--color-primary-element);
			outline-offset: 2px;
		}

		&--active {
			background-color: var(--color-primary-element);
			color: var(--color-primary-element-text);

			&:hover {
				background-color: var(--color-primary-element-hover);
			}
		}
	}
}
</style>
