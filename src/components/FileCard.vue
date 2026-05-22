<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<button type="button" class="file-card" @click="$emit('click', $event)">
		<div class="file-card__preview">
			<slot name="preview" />
		</div>
		<div class="file-card__content">
			<span v-if="$slots.icon" class="file-card__icon">
				<slot name="icon" />
			</span>
			<div class="file-card__text">
				<div class="file-card__name">
					<slot name="name" />
				</div>
				<div v-if="$slots.subname" class="file-card__subname">
					<slot name="subname" />
				</div>
			</div>
		</div>
	</button>
</template>

<script>
export default {
	name: 'FileCard',
}
</script>

<style scoped>
.file-card {
	display: flex;
	flex-direction: column;
	width: 100%;
	aspect-ratio: 2 / 3;
	/* !important overrides the legacy global button border styles. */
	border: 2px solid var(--color-border) !important;
	border-radius: var(--border-radius-element);
	padding: calc(var(--default-grid-baseline) * 2);
	cursor: pointer;
	box-sizing: border-box;
	background: none;
	text-align: start;
	transition: border-color var(--animation-quick) ease;
}

.file-card:focus-visible {
	border-color: var(--color-primary-element) !important;
}

.file-card__preview {
	flex: 1;
	min-height: 0;
	display: flex;
	border-radius: 4px;
	overflow: hidden;
	margin-bottom: calc(var(--default-grid-baseline) * 1);
}

.file-card__content {
	flex-shrink: 0;
	display: flex;
	align-items: center;
	overflow: hidden;
}

.file-card__icon {
	display: flex;
	flex-shrink: 0;
}

.file-card__text {
	min-width: 0;
}

.file-card__name {
	color: var(--color-main-text);
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.file-card__subname {
	font-size: 0.85em;
	color: var(--color-text-maxcontrast);
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
