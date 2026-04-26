<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<button class="tpl-card"
		type="button"
		:style="typeStyles"
		:aria-label="t('richdocuments', 'Create new document from {template}', { template: template.name })"
		@click="$emit('select', template)"
		@mouseenter="onHoverEnter"
		@mouseleave="onHoverLeave"
		@focus="onHoverLeave"
		@blur="onHoverLeave">
		<div class="tpl-card__thumb">
			<img v-if="!thumbErrored"
				:src="template.thumbnailUrl"
				:alt="''"
				loading="lazy"
				@error="thumbErrored = true">
			<component :is="fallbackIcon" v-else :size="48" />
		</div>
		<div class="tpl-card__body">
			<div class="tpl-card__name">
				{{ template.name }}
			</div>
			<div class="tpl-card__ext">
				{{ extensionLabel }}
			</div>
		</div>
		<div class="tpl-card__overlay">
			<PlusIcon :size="32" />
		</div>
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
	name: 'TemplateCard',
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
.tpl-card {
	all: unset;
	cursor: pointer;
	position: relative;
	display: flex;
	flex-direction: column;
	border-radius: var(--border-radius-large, 12px);
	overflow: hidden;
	background-color: var(--color-main-background);
	border: 1px solid var(--color-border);
	color: var(--color-main-text);
	transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
	animation: tpl-card-enter 260ms ease-out backwards;
	animation-delay: calc(min(var(--enter-index, 0), 12) * 35ms);

	@media (prefers-reduced-motion: reduce) {
		animation: none;
	}

	&:hover, &:focus-visible {
		transform: translateY(-2px);
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
		border-color: var(--color-primary-element);
	}
	&:focus-visible {
		outline: 2px solid var(--color-primary-element);
		outline-offset: 2px;
	}

	&__thumb {
		aspect-ratio: 4 / 3;
		background-color: var(--type-bg, var(--color-background-dark));
		box-shadow: inset 0 0 0 3px var(--type-accent, var(--color-border));
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

	&__body {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 10px 12px 12px;
		min-width: 0;
	}
	&__name {
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	&__ext {
		font-size: 0.8em;
		color: var(--color-text-maxcontrast);
		letter-spacing: 0.04em;
	}

	&__overlay {
		position: absolute;
		top: 8px;
		right: 8px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: var(--type-accent, var(--color-primary-element));
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transform: scale(0.8);
		transition: opacity 0.15s ease, transform 0.15s ease;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	&:hover &__overlay,
	&:focus-visible &__overlay {
		opacity: 1;
		transform: scale(1);
	}
}

@keyframes tpl-card-enter {
	from {
		opacity: 0;
		transform: translateY(8px) scale(0.985);
	}
	to {
		opacity: 1;
		transform: translateY(0) scale(1);
	}
}
</style>
