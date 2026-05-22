<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<section class="template-section"
		:style="sectionStyle"
		aria-labelledby="template-section-heading">
		<div class="template-section__header">
			<h2 id="template-section-heading" class="template-section__heading">
				{{ t('richdocuments', 'Create new') }}
			</h2>

			<div v-if="canScroll" class="template-section__nav">
				<NcButton variant="tertiary"
					:aria-label="t('richdocuments', 'Scroll left')"
					:disabled="!canScrollLeft"
					@click="scrollByStep(-1)">
					<template #icon>
						<ChevronLeft :size="20" />
					</template>
				</NcButton>
				<NcButton variant="tertiary"
					:aria-label="t('richdocuments', 'Scroll right')"
					:disabled="!canScrollRight"
					@click="scrollByStep(1)">
					<template #icon>
						<ChevronRight :size="20" />
					</template>
				</NcButton>
			</div>
		</div>

		<ul ref="list" class="template-section__list" @scroll="updateArrows">
			<li v-for="item in items"
				:key="item.blank ? 'blank' : item.fileid"
				class="template-section__item">
				<!-- Blank file card -->
				<button v-if="item.blank" class="template-card" @click="$emit('select', creator, null)">
					<span class="template-card__preview template-card__preview--blank" :style="previewStyle">
						<NcIconSvgWrapper :svg="creator.iconSvgInline" class="template-card__icon" />
					</span>
					<span class="template-card__name">{{ t('richdocuments', 'Blank') }}</span>
				</button>

				<!-- Template card -->
				<button v-else class="template-card" @click="$emit('select', creator, item)">
					<span class="template-card__preview" :style="previewStyle">
						<img v-if="item.hasPreview && !failedPreviews[item.fileid]"
							:src="templatePreviewUrl(item)"
							:alt="nameWithoutExt(item.basename)"
							loading="lazy"
							class="template-card__image"
							@error="failedPreviews = { ...failedPreviews, [item.fileid]: true }">
						<NcIconSvgWrapper v-else :svg="creator.iconSvgInline" class="template-card__icon" />
					</span>
					<span class="template-card__name">{{ nameWithoutExt(item.basename) }}</span>
				</button>
			</li>
		</ul>
	</section>
</template>

<script>
import { translate as t } from '@nextcloud/l10n'
import { generateUrl } from '@nextcloud/router'
import { NcButton, NcIconSvgWrapper } from '@nextcloud/vue'
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'

const THEME_PALETTES = {
	document: ['hsl(203 79% 78%)', 'hsl(203 79% 60%)', 'hsl(203 70% 42%)', 'hsl(203 65% 26%)'],
	spreadsheet: ['hsl(79 46% 70%)', 'hsl(79 46% 52%)', 'hsl(79 50% 38%)', 'hsl(79 55% 24%)'],
	presentation: ['hsl(23 83% 80%)', 'hsl(23 83% 66%)', 'hsl(23 75% 48%)', 'hsl(23 70% 32%)'],
	drawing: ['hsl(47 80% 62%)', 'hsl(47 80% 39%)', 'hsl(47 82% 28%)', 'hsl(47 85% 18%)'],
}

// Card width and inter-card gap (calc(baseline * 3), baseline = 4px), used to
// size the scroll step so a card of context stays visible after each jump.
const CARD_WIDTH = 160
const CARD_GAP = 12

export default {
	name: 'TemplateSection',

	components: {
		ChevronLeft,
		ChevronRight,
		NcButton,
		NcIconSvgWrapper,
	},

	props: {
		creator: {
			type: Object,
			required: true,
		},
	},

	emits: ['select'],

	data() {
		return {
			failedPreviews: {},
			canScrollLeft: false,
			canScrollRight: false,
			resizeObserver: null,
		}
	},

	computed: {
		themeType() {
			const mimes = (this.creator.mimetypes ?? []).join(' ')
			if (/presentation|powerpoint/.test(mimes)) return 'presentation'
			if (/spreadsheet|ms-excel/.test(mimes)) return 'spreadsheet'
			if (/graphics|drawing/.test(mimes)) return 'drawing'
			return 'document'
		},

		previewStyle() {
			return this.themeType === 'presentation'
				? { 'aspect-ratio': '16 / 9' }
				: {}
		},

		sectionStyle() {
			const [glow1, glow2, glow3, glow4] = THEME_PALETTES[this.themeType]
			return {
				'--tpl-glow-1': glow1,
				'--tpl-glow-2': glow2,
				'--tpl-glow-3': glow3,
				'--tpl-glow-4': glow4,
			}
		},

		// True when the row overflows in either direction — the scroll arrows
		// are only shown then.
		canScroll() {
			return this.canScrollLeft || this.canScrollRight
		},

		// Blank card sentinel followed by the creator's templates.
		items() {
			return [{ blank: true }, ...(this.creator.templates ?? [])]
		},
	},

	watch: {
		creator() {
			// New creator means a different template count — jump back to the start.
			this.$nextTick(() => {
				if (this.$refs.list) {
					this.$refs.list.scrollLeft = 0
				}
				this.updateArrows()
			})
		},
	},

	mounted() {
		// Overflow can appear or disappear as the row is resized.
		this.resizeObserver = new ResizeObserver(() => this.updateArrows())
		this.resizeObserver.observe(this.$refs.list)
		this.$nextTick(() => this.updateArrows())
	},

	beforeUnmount() {
		this.resizeObserver?.disconnect()
	},

	methods: {
		updateArrows() {
			const list = this.$refs.list
			if (!list) {
				return
			}
			const { scrollLeft, scrollWidth, clientWidth } = list
			this.canScrollLeft = scrollLeft > 0
			// 1px tolerance absorbs sub-pixel rounding at the far end.
			this.canScrollRight = scrollLeft + clientWidth < scrollWidth - 1
		},

		scrollByStep(direction) {
			const list = this.$refs.list
			if (!list) {
				return
			}
			// Scroll a viewport minus one card so a card of context carries over.
			const step = Math.max(CARD_WIDTH + CARD_GAP, list.clientWidth - (CARD_WIDTH + CARD_GAP))
			list.scrollBy({ left: direction * step, behavior: 'smooth' })
		},

		nameWithoutExt(basename) {
			const dot = basename.lastIndexOf('.')
			return dot > 0 ? basename.slice(0, dot) : basename
		},

		templatePreviewUrl(template) {
			if (template.previewUrl) {
				return template.previewUrl
			}
			return generateUrl('/core/preview?fileId={fileid}&x=256&y=256&a=1', { fileid: template.fileid })
		},
	},
}
</script>

<style scoped>
.template-section {
	padding: calc(var(--default-grid-baseline) * 4);
	margin: calc(var(--default-grid-baseline) * 4) calc(var(--default-grid-baseline) * 4) 0;
	background:
		radial-gradient(78% 82% at 14% 2%,
			color-mix(in srgb, var(--tpl-glow-1) 28%, transparent), transparent 66%),
		radial-gradient(72% 76% at 102% -2%,
			color-mix(in srgb, var(--tpl-glow-2) 24%, transparent), transparent 64%),
		radial-gradient(82% 88% at 20% 114%,
			color-mix(in srgb, var(--tpl-glow-3) 22%, transparent), transparent 68%),
		radial-gradient(88% 94% at 98% 104%,
			color-mix(in srgb, var(--tpl-glow-4) 26%, transparent), transparent 70%),
		color-mix(in srgb, var(--tpl-glow-2) 8%, var(--color-main-background));
	border-radius: var(--border-radius-large);
}

.template-section__header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: calc(var(--default-grid-baseline) * 2);
	margin-bottom: calc(var(--default-grid-baseline) * 2);
}

.template-section__heading {
	margin: 0 0 calc(var(--default-grid-baseline) * 2);
	font-size: var(--default-font-size);
	font-weight: 600;
	color: var(--color-text-maxcontrast);
}

.template-section__nav {
	display: flex;
	align-items: center;
	gap: calc(var(--default-grid-baseline) * 1);
}

.template-section__list {
	display: flex;
	gap: calc(var(--default-grid-baseline) * 3);
	overflow-x: auto;
	padding-bottom: calc(var(--default-grid-baseline) * 2);
	list-style: none;
	margin: 0;
	padding-inline-start: 0;
	/* The arrow buttons are the scroll affordance — hide the native scrollbar. */
	scrollbar-width: none;

	&::-webkit-scrollbar {
		display: none;
	}
}

.template-section__item {
	flex: 0 0 auto;
}

.template-card {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 160px;
	padding: 0;
	border: none;
	background: none;
	cursor: pointer;
	border-radius: var(--border-radius-large);

	&:hover .template-card__preview,
	&:focus-visible .template-card__preview {
		border-color: var(--color-primary-element);
	}
}

.template-card__preview {
	position: relative;
	width: 100%;
	aspect-ratio: 2 / 3;
	overflow: hidden;
	border: 2px solid var(--color-border);
	border-radius: var(--border-radius-large);
	background-color: var(--color-main-background);
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
}

.template-card__image {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.template-card__icon {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 48px;
	height: 48px;

	:deep(svg) {
		width: 100%;
		height: 100%;
	}
}

.template-card__name {
	margin-top: calc(var(--default-grid-baseline) * 1);
	font-size: var(--font-size-small, 12px);
	text-align: center;
	max-width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
