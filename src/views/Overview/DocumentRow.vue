<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<a class="doc-row"
		:href="openUrl"
		:style="typeStyles"
		:title="document.name"
		@mouseenter="onHoverEnter"
		@mouseleave="onHoverLeave"
		@focus="onHoverLeave"
		@blur="onHoverLeave">
		<div class="doc-row__thumb">
			<img v-if="!thumbErrored"
				:src="document.thumbnailUrl"
				:alt="''"
				loading="lazy"
				@error="onThumbError">
			<component :is="fallbackIcon"
				v-else
				class="doc-row__thumb-icon"
				:size="32" />
		</div>

		<div class="doc-row__main">
			<div class="doc-row__name">
				{{ document.name }}
			</div>
			<div class="doc-row__path">
				<FolderOutlineIcon class="doc-row__path-icon" :size="14" />
				<span class="doc-row__folder">{{ folderLabel }}</span>
			</div>
		</div>

		<div class="doc-row__col doc-row__col--owner">
			<NcAvatar v-if="ownerUid"
				:user="ownerUid"
				:display-name="ownerDisplay"
				:size="28"
				:disable-menu="true"
				:show-user-status="false" />
			<div class="doc-row__owner-text">
				<div class="doc-row__owner-name">{{ ownerLabel }}</div>
				<div v-if="ownerSubline" class="doc-row__owner-sub">{{ ownerSubline }}</div>
			</div>
		</div>

		<div class="doc-row__col doc-row__col--date">
			<NcDateTime class="doc-row__date" :timestamp="mtimeMs" :ignore-seconds="true" />
		</div>

		<div class="doc-row__col doc-row__col--size">
			{{ sizeLabel }}
		</div>

		<button class="doc-row__star"
			type="button"
			:class="{ 'doc-row__star--on': isFavorite }"
			:aria-label="isFavorite
				? t('richdocuments', 'Unpin from overview')
				: t('richdocuments', 'Pin to overview')"
			:title="isFavorite
				? t('richdocuments', 'Unpin from overview')
				: t('richdocuments', 'Pin to overview')"
			@click.prevent.stop="toggleFavorite">
			<StarIcon v-if="isFavorite" :size="20" />
			<StarOutlineIcon v-else :size="20" />
		</button>

		<div class="doc-row__col doc-row__col--editors">
			<EditorBadges v-if="hasEditors" :editors="document.currentEditors" :size="22" />
		</div>

	</a>
</template>

<script>
import NcAvatar from '@nextcloud/vue/dist/Components/NcAvatar.js'
import NcDateTime from '@nextcloud/vue/dist/Components/NcDateTime.js'
import { formatFileSize } from '@nextcloud/files'
import EditorBadges from './EditorBadges.vue'
import hoverPreviewMixin from './hoverPreviewMixin.js'
import { typeStyle } from './typeStyles.js'
import { getDocumentUrlForFile } from '../../helpers/url.js'
import FileWordIcon from 'vue-material-design-icons/FileWord.vue'
import FileExcelIcon from 'vue-material-design-icons/FileExcel.vue'
import FilePresentationBoxIcon from 'vue-material-design-icons/FilePresentationBox.vue'
import FilePdfBoxIcon from 'vue-material-design-icons/FilePdfBox.vue'
import FileDocumentOutlineIcon from 'vue-material-design-icons/FileDocumentOutline.vue'
import FolderOutlineIcon from 'vue-material-design-icons/FolderOutline.vue'
import StarIcon from 'vue-material-design-icons/Star.vue'
import StarOutlineIcon from 'vue-material-design-icons/StarOutline.vue'
import { setFavourite } from './api.js'

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
	name: 'DocumentRow',
	components: { NcAvatar, NcDateTime, EditorBadges, FolderOutlineIcon, StarIcon, StarOutlineIcon },
	mixins: [hoverPreviewMixin],
	props: {
		document: {
			type: Object,
			required: true,
		},
		showOwner: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			thumbErrored: false,
			// Local favourite flag mirrors document.favorite so toggling
			// updates instantly without a round-trip / list refresh.
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
		// The backend's openUrl lacks the CSRF requesttoken, which the
		// document.index controller requires on plain navigation. Build
		// the URL via the existing helper so it includes the token.
		openUrl() {
			return getDocumentUrlForFile(this.document.folder ?? '/', this.document.fileid)
		},
		ownerUid() {
			return this.document.modifiedBy?.uid ?? this.document.shareSource?.uid ?? null
		},
		ownerDisplay() {
			return this.document.modifiedBy?.displayName ?? this.document.shareSource?.displayName ?? ''
		},
		// Primary owner label visible on the row.
		ownerLabel() {
			return this.ownerDisplay || t('richdocuments', 'Unknown')
		},
		// Secondary line under the owner — used for federated source.
		ownerSubline() {
			const source = this.document.shareSource
			if (source && source.remoteServer) {
				return source.remoteServer
			}
			return ''
		},
		folderLabel() {
			const folder = this.document.folder
			if (!folder || folder === '/' || folder === '') {
				return t('richdocuments', 'Home')
			}
			return folder
		},
		sizeLabel() {
			const size = this.document.size
			if (typeof size !== 'number' || size < 0) {
				return ''
			}
			return formatFileSize(size, true)
		},
		largePreviewUrl() {
			if (!this.document.thumbnailUrl) {
				return ''
			}
			// Bump x/y so we get a sharp preview popover; the server-side URL
			// already includes 64x64 — replace with 320x320.
			return this.document.thumbnailUrl
				.replace(/([?&])x=\d+/, '$1x=480')
				.replace(/([?&])y=\d+/, '$1y=480')
		},
		isFavorite() {
			return this.localFavorite
		},
	},
	watch: {
		'document.favorite'(value) {
			this.localFavorite = !!value
		},
	},
	methods: {
		onThumbError() {
			this.thumbErrored = true
		},
		async toggleFavorite() {
			if (this.favoriteBusy) {
				return
			}
			const next = !this.localFavorite
			// Optimistic flip; revert on failure.
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
.doc-row {
	display: grid;
	// Columns: thumb · name+path · owner · date · size · star · editors
	grid-template-columns: auto minmax(0, 1fr) minmax(0, 200px) 130px 80px auto auto;
	align-items: center;
	gap: 16px;
	padding: 10px 12px;
	border-radius: var(--border-radius-large, 12px);
	color: var(--color-main-text);
	text-decoration: none;
	transition: background-color 0.12s ease;
	animation: doc-row-enter 240ms ease-out backwards;
	animation-delay: calc(min(var(--enter-index, 0), 12) * 30ms);

	@media (prefers-reduced-motion: reduce) {
		animation: none;
	}

	&:hover, &:focus-visible {
		background-color: var(--color-background-hover);
		text-decoration: none;
	}
	&:focus-visible {
		outline: 2px solid var(--color-primary-element);
		outline-offset: -2px;
	}

	&__thumb {
		flex: 0 0 auto;
		width: 48px;
		height: 48px;
		border-radius: var(--border-radius, 8px);
		background-color: var(--type-bg, var(--color-background-dark));
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
		}
	}
	&__thumb-icon {
		color: var(--type-accent, var(--color-text-maxcontrast));
	}

	&__main {
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 3px;
	}
	&__name {
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	&__path {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 0.82em;
		color: var(--color-text-maxcontrast);
		min-width: 0;
	}
	&__path-icon {
		flex: 0 0 auto;
		opacity: 0.7;
	}
	&__folder {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&__col {
		min-width: 0;
		display: flex;
		align-items: center;

		&--owner {
			gap: 10px;
		}
		&--date {
			color: var(--color-text-maxcontrast);
			font-size: 0.88em;
			white-space: nowrap;
		}
		&--size {
			color: var(--color-text-maxcontrast);
			font-size: 0.88em;
			justify-content: flex-end;
			white-space: nowrap;
			font-variant-numeric: tabular-nums;
		}
		&--editors {
			justify-content: flex-end;
			min-width: 24px;
		}
	}

	&__owner-text {
		display: flex;
		flex-direction: column;
		min-width: 0;
		line-height: 1.25;
	}
	&__owner-name {
		font-size: 0.9em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	&__owner-sub {
		font-size: 0.75em;
		color: var(--color-text-maxcontrast);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&__star {
		all: unset;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		color: var(--color-text-maxcontrast);
		opacity: 0;
		transition: opacity 0.12s ease, background-color 0.12s ease, color 0.12s ease, transform 0.15s ease;

		&:hover {
			background-color: var(--color-background-hover);
			transform: scale(1.06);
		}
		&:focus-visible {
			outline: 2px solid var(--color-primary-element);
			outline-offset: 0;
			opacity: 1;
		}
		&--on {
			opacity: 1;
			color: #f5b400;
		}
	}
	// Reveal the star (when not active) on row hover/focus so it doesn't
	// add visual noise to every row at rest.
	&:hover &__star,
	&:focus-within &__star {
		opacity: 1;
	}
}

// Progressive simplification: drop columns as the viewport narrows so the
// row stays readable without horizontal scroll.
@media (max-width: 1100px) {
	.doc-row {
		grid-template-columns: auto minmax(0, 1fr) minmax(0, 180px) 110px auto auto;
	}
	.doc-row__col--size {
		display: none;
	}
}
@media (max-width: 860px) {
	.doc-row {
		grid-template-columns: auto minmax(0, 1fr) auto auto auto;
	}
	.doc-row__col--owner {
		// Avatar-only when space is tight.
		max-width: 28px;
	}
	.doc-row__owner-text {
		display: none;
	}
}
@media (max-width: 600px) {
	.doc-row {
		grid-template-columns: auto minmax(0, 1fr) auto auto;
	}
	.doc-row__col--date {
		display: none;
	}
}

@keyframes doc-row-enter {
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
