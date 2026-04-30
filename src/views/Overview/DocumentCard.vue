<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<a class="doc-card"
		:href="openUrl"
		:style="typeStyles"
		:title="document.name"
		:aria-label="document.name"
		@mouseenter="onHoverEnter"
		@mouseleave="onHoverLeave"
		@focus="onHoverLeave"
		@blur="onHoverLeave">
		<div class="doc-card__thumb">
			<img v-if="!thumbErrored"
				:src="thumbnailLargeUrl"
				:alt="''"
				loading="lazy"
				@error="thumbErrored = true">
			<component :is="fallbackIcon"
				v-else
				class="doc-card__thumb-icon"
				:size="48" />
			<EditorBadges v-if="hasEditors"
				class="doc-card__editors"
				:editors="document.currentEditors"
				:size="22" />
			<span v-if="extensionLabel" class="doc-card__type-badge">
				{{ extensionLabel }}
			</span>
			<button class="doc-card__star"
				type="button"
				:class="{ 'doc-card__star--on': isFavorite }"
				:aria-label="isFavorite
					? t('richdocuments', 'Unpin from overview')
					: t('richdocuments', 'Pin to overview')"
				:title="isFavorite
					? t('richdocuments', 'Unpin from overview')
					: t('richdocuments', 'Pin to overview')"
				@click.prevent.stop="toggleFavorite">
				<StarIcon v-if="isFavorite" :size="18" />
				<StarOutlineIcon v-else :size="18" />
			</button>
		</div>
		<div class="doc-card__body">
			<div class="doc-card__name">
				{{ document.name }}
			</div>
			<div class="doc-card__meta">
				<NcDateTime :timestamp="mtimeMs" :ignore-seconds="true" />
				<span v-if="showOwner && ownerLabel" class="doc-card__owner">
					· {{ ownerLabel }}
				</span>
			</div>
		</div>

	</a>
</template>

<script>
import NcDateTime from '@nextcloud/vue/dist/Components/NcDateTime.js'
import EditorBadges from './EditorBadges.vue'
import hoverPreviewMixin from './hoverPreviewMixin.js'
import { typeStyle } from './typeStyles.js'
import { setFavourite } from './api.js'
import { getDocumentUrlForFile } from '../../helpers/url.js'
import StarIcon from 'vue-material-design-icons/Star.vue'
import StarOutlineIcon from 'vue-material-design-icons/StarOutline.vue'
import FileWordIcon from 'vue-material-design-icons/FileWord.vue'
import FileExcelIcon from 'vue-material-design-icons/FileExcel.vue'
import FilePresentationBoxIcon from 'vue-material-design-icons/FilePresentationBox.vue'
import FilePdfBoxIcon from 'vue-material-design-icons/FilePdfBox.vue'
import FileDocumentOutlineIcon from 'vue-material-design-icons/FileDocumentOutline.vue'

const ICON_BY_MIME = {
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document': FileWordIcon,
	'application/vnd.oasis.opendocument.text': FileWordIcon,
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': FileExcelIcon,
	'application/vnd.oasis.opendocument.spreadsheet': FileExcelIcon,
	'application/vnd.openxmlformats-officedocument.presentationml.presentation': FilePresentationBoxIcon,
	'application/vnd.oasis.opendocument.presentation': FilePresentationBoxIcon,
	'application/pdf': FilePdfBoxIcon,
}

export default {
	name: 'DocumentCard',
	components: { NcDateTime, EditorBadges, StarIcon, StarOutlineIcon },
	mixins: [hoverPreviewMixin],
	props: {
		document: { type: Object, required: true },
		showOwner: { type: Boolean, default: false },
	},
	data() {
		return {
			thumbErrored: false,
			localFavorite: !!this.document.favorite,
			favoriteBusy: false,
		}
	},
	computed: {
		mtimeMs() {
			return (this.document.mtime ?? 0) * 1000
		},
		fallbackIcon() {
			return ICON_BY_MIME[this.document.mimetype] ?? FileDocumentOutlineIcon
		},
		hasEditors() {
			return Array.isArray(this.document.currentEditors) && this.document.currentEditors.length > 0
		},
		typeStyles() {
			return typeStyle(this.document.mimetype)
		},
		// Build the open URL with the CSRF requesttoken — the backend's
		// document.index controller requires it on plain navigation.
		openUrl() {
			return getDocumentUrlForFile(this.document.folder ?? '/', this.document.fileid)
		},
		extensionLabel() {
			const m = /\.([^.]+)$/.exec(this.document.name || '')
			return m ? m[1].toUpperCase() : ''
		},
		isFavorite() {
			return this.localFavorite
		},
		// Use a larger preview for the card surface — the URL is generated
		// server-side; we adjust the x/y query params to ask for a bigger one.
		thumbnailLargeUrl() {
			if (!this.document.thumbnailUrl) {
				return ''
			}
			return this.document.thumbnailUrl
				.replace(/([?&])x=\d+/, '$1x=256')
				.replace(/([?&])y=\d+/, '$1y=256')
		},
		// Even larger thumbnail used by the hover-preview popover.
		largePreviewUrl() {
			if (!this.document.thumbnailUrl) {
				return ''
			}
			return this.document.thumbnailUrl
				.replace(/([?&])x=\d+/, '$1x=480')
				.replace(/([?&])y=\d+/, '$1y=480')
		},
		ownerLabel() {
			const source = this.document.shareSource
			const display = this.document.modifiedBy?.displayName
				?? source?.displayName
				?? ''
			if (source && source.remoteServer) {
				return t('richdocuments', '{name} ({server})', {
					name: display,
					server: source.remoteServer,
				})
			}
			return display
		},
	},
	watch: {
		'document.favorite'(value) {
			this.localFavorite = !!value
		},
	},
	methods: {
		async toggleFavorite() {
			if (this.favoriteBusy) {
				return
			}
			const next = !this.localFavorite
			this.localFavorite = next
			this.favoriteBusy = true
			try {
				await setFavourite(this.document.fileid, next)
				this.$emit('favorite-changed', { fileid: this.document.fileid, favorite: next })
			} catch (e) {
				this.localFavorite = !next
			} finally {
				this.favoriteBusy = false
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.doc-card {
	display: flex;
	flex-direction: column;
	border-radius: var(--border-radius-large, 12px);
	overflow: hidden;
	background-color: var(--color-main-background);
	border: 1px solid var(--color-border);
	color: var(--color-main-text);
	text-decoration: none;
	transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
	animation: doc-card-enter 260ms ease-out backwards;
	animation-delay: calc(min(var(--enter-index, 0), 12) * 35ms);

	@media (prefers-reduced-motion: reduce) {
		animation: none;
	}

	&:hover, &:focus-visible {
		transform: translateY(-2px);
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
		border-color: var(--color-primary-element);
		text-decoration: none;
	}
	&:focus-visible {
		outline: 2px solid var(--color-primary-element);
		outline-offset: 2px;
	}
	// Reveal the star on hover unless it's already pinned.
	&:hover &__star,
	&:focus-within &__star {
		opacity: 1;
	}

	&__thumb {
		position: relative;
		aspect-ratio: 4 / 3;
		background-color: var(--type-bg, var(--color-background-dark));
		// 3px type-accent border carries the colour cue at the card level.
		// Use box-shadow inset (instead of border) so the thumbnail keeps
		// flush corners with the card's outer border-radius and the tint
		// fill stays edge-to-edge.
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

	&__star {
		all: unset;
		cursor: pointer;
		position: absolute;
		top: 8px;
		left: 8px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.85);
		backdrop-filter: blur(2px);
		color: var(--color-text-maxcontrast);
		opacity: 0;
		transition: opacity 0.15s ease, transform 0.15s ease, color 0.15s ease;

		&:hover {
			transform: scale(1.06);
		}
		&:focus-visible {
			outline: 2px solid var(--color-primary-element);
			outline-offset: 2px;
			opacity: 1;
		}
		&--on {
			opacity: 1;
			color: #f5b400;
		}
	}

	&__type-badge {
		position: absolute;
		top: 8px;
		right: 8px;
		padding: 2px 8px;
		border-radius: var(--border-radius-element, 999px);
		background-color: var(--type-accent, var(--color-background-dark));
		color: #fff;
		font-size: 0.72em;
		font-weight: 600;
		letter-spacing: 0.04em;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);
	}

	&__editors {
		position: absolute;
		left: 8px;
		bottom: 8px;
		padding: 3px 8px 3px 6px;
		border-radius: var(--border-radius-element, 999px);
		background-color: var(--color-main-background);
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
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
	&__meta {
		font-size: 0.85em;
		color: var(--color-text-maxcontrast);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	&__owner {
		margin-left: 4px;
	}
}

@keyframes doc-card-enter {
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
