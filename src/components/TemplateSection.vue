<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<section class="template-section">
		<h3 class="template-section__heading">
			{{ t('richdocuments', 'Create new') }}
		</h3>

		<ul class="template-section__list">
			<!-- Blank file card -->
			<li class="template-section__item">
				<button class="template-card" @click="$emit('select', creator, null)">
					<span class="template-card__preview template-card__preview--blank"
						:style="previewStyle">
						<!-- eslint-disable-next-line vue/no-v-html -->
						<span class="template-card__icon" v-html="creator.iconSvgInline" />
					</span>
					<span class="template-card__name">{{ t('richdocuments', 'Blank') }}</span>
				</button>
			</li>

			<!-- Template cards -->
			<li v-for="template in creator.templates"
				:key="template.fileid"
				class="template-section__item">
				<button class="template-card" @click="$emit('select', creator, template)">
					<span class="template-card__preview" :style="previewStyle">
						<img v-if="template.hasPreview"
							:src="template.previewUrl"
							:alt="nameWithoutExt(template.basename)"
							loading="lazy"
							class="template-card__image">
						<span v-else class="template-card__icon" v-html="creator.iconSvgInline" />
					</span>
					<span class="template-card__name">{{ nameWithoutExt(template.basename) }}</span>
				</button>
			</li>
		</ul>
	</section>
</template>

<script>
export default {
	name: 'TemplateSection',

	props: {
		creator: {
			type: Object,
			required: true,
		},
	},

	emits: ['select'],

	computed: {
		previewStyle() {
			if (!this.creator.ratio) {
				return {}
			}
			// ratio is width/height; convert to padding-bottom trick
			return { paddingBottom: `${(1 / this.creator.ratio) * 100}%` }
		},
	},

	methods: {
		nameWithoutExt(basename) {
			const dot = basename.lastIndexOf('.')
			return dot > 0 ? basename.slice(0, dot) : basename
		},
	},
}
</script>

<style scoped>
.template-section {
	padding: calc(var(--default-grid-baseline) * 4);
}

.template-section__heading {
	margin: 0 0 calc(var(--default-grid-baseline) * 2);
	font-size: var(--default-font-size);
	font-weight: 600;
}

.template-section__list {
	display: flex;
	gap: calc(var(--default-grid-baseline) * 3);
	overflow-x: auto;
	padding-bottom: calc(var(--default-grid-baseline) * 2);
	list-style: none;
	margin: 0;
	padding-left: 0;
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
	overflow: hidden;
	border: 2px solid var(--color-border);
	border-radius: var(--border-radius-large);
	background-color: var(--color-main-background);
	box-sizing: border-box;
}

.template-card__preview--blank {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 120px;
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
