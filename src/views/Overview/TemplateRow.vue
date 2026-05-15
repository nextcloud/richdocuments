<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<button class="tpl-row"
		type="button"
		:style="typeStyles"
		@click="$emit('select', template)"
		@mouseenter="onHoverEnter"
		@mouseleave="onHoverLeave"
		@focus="onHoverLeave"
		@blur="onHoverLeave">
		<div class="tpl-row__thumb">
			<img v-if="!thumbErrored"
				:src="template.thumbnailUrl"
				:alt="''"
				loading="lazy"
				@error="thumbErrored = true">
			<component :is="fallbackIcon" v-else :size="40" />
		</div>
		<div class="tpl-row__main">
			<div class="tpl-row__name">
				{{ template.name }}
			</div>
			<div class="tpl-row__ext">
				{{ extensionLabel }}
			</div>
		</div>
		<PlusIcon class="tpl-row__add" :size="20" />
	</button>
</template>

<script>
import FileWordIcon from 'vue-material-design-icons/FileWord.vue'
import FileExcelIcon from 'vue-material-design-icons/FileExcel.vue'
import FilePresentationBoxIcon from 'vue-material-design-icons/FilePresentationBox.vue'
import FileDocumentOutlineIcon from 'vue-material-design-icons/FileDocumentOutline.vue'
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import hoverPreviewMixin from './hoverPreviewMixin.js'
import { typeStyle } from './typeStyles.js'

const ICON_BY_MIME = {
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document': FileWordIcon,
	'application/vnd.openxmlformats-officedocument.wordprocessingml.template': FileWordIcon,
	'application/vnd.oasis.opendocument.text': FileWordIcon,
	'application/vnd.oasis.opendocument.text-template': FileWordIcon,
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': FileExcelIcon,
	'application/vnd.openxmlformats-officedocument.spreadsheetml.template': FileExcelIcon,
	'application/vnd.oasis.opendocument.spreadsheet': FileExcelIcon,
	'application/vnd.oasis.opendocument.spreadsheet-template': FileExcelIcon,
	'application/vnd.openxmlformats-officedocument.presentationml.presentation': FilePresentationBoxIcon,
	'application/vnd.openxmlformats-officedocument.presentationml.template': FilePresentationBoxIcon,
	'application/vnd.oasis.opendocument.presentation': FilePresentationBoxIcon,
	'application/vnd.oasis.opendocument.presentation-template': FilePresentationBoxIcon,
}

export default {
	name: 'TemplateRow',
	components: { PlusIcon },
	mixins: [hoverPreviewMixin],
	props: {
		template: { type: Object, required: true },
	},
	data() {
		return { thumbErrored: false }
	},
	computed: {
		fallbackIcon() {
			return ICON_BY_MIME[this.template.mimetype] ?? FileDocumentOutlineIcon
		},
		extensionLabel() {
			return (this.template.extension || '').toUpperCase()
		},
		typeStyles() {
			return typeStyle(this.template.mimetype)
		},
		largePreviewUrl() {
			if (!this.template.thumbnailUrl) {
				return ''
			}
			return this.template.thumbnailUrl
				.replace(/([?&])x=\d+/, '$1x=480')
				.replace(/([?&])y=\d+/, '$1y=480')
		},
	},
}
</script>

<style lang="scss" scoped>
.tpl-row {
	all: unset;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 16px;
	padding: 10px 12px;
	border-radius: var(--border-radius-large, 12px);
	color: var(--color-main-text);
	transition: background-color 0.12s ease;
	animation: tpl-row-enter 240ms ease-out backwards;
	animation-delay: calc(min(var(--enter-index, 0), 12) * 30ms);

	@media (prefers-reduced-motion: reduce) {
		animation: none;
	}

	&:hover, &:focus-visible {
		background-color: var(--color-background-hover);
	}
	&:focus-visible {
		outline: 2px solid var(--color-primary-element);
		outline-offset: -2px;
	}

	&__thumb {
		flex: 0 0 auto;
		width: 56px;
		height: 56px;
		border-radius: var(--border-radius, 8px);
		background-color: var(--type-bg, var(--color-background-dark));
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		color: var(--type-accent, var(--color-text-maxcontrast));

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
		}
	}

	&__main {
		flex: 1 1 auto;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	&__name {
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	&__ext {
		font-size: 0.85em;
		color: var(--color-text-maxcontrast);
		letter-spacing: 0.04em;
	}

	&__add {
		flex: 0 0 auto;
		color: var(--type-accent, var(--color-primary-element));
		opacity: 0;
		transition: opacity 0.12s ease;
	}
	&:hover &__add,
	&:focus-visible &__add {
		opacity: 1;
	}
}

@keyframes tpl-row-enter {
	from {
		opacity: 0;
		transform: translateY(6px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
