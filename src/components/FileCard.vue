<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="file-card" @click="$emit('click', $event)">
		<div class="file-card__preview">
			<slot name="preview" />
		</div>
		<div class="file-card__content">
			<div class="file-card__name">
				<slot name="name" />
			</div>
			<div v-if="$slots.subname" class="file-card__subname">
				<slot name="subname" />
			</div>
		</div>
	</div>
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
	border: var(--border-width-input) solid var(--color-border);
	border-radius: var(--border-radius-element);
	padding: calc(var(--default-grid-baseline) * 3);
	cursor: pointer;
	box-sizing: border-box;
	transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.file-card:hover {
	background-color: var(--color-background-hover);
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	transform: translateY(-2px);
}

.file-card__preview {
	flex: 1;
	min-height: 0;
	display: flex;
	border-radius: var(--border-radius-element);
	overflow: hidden;
	margin-bottom: calc(var(--default-grid-baseline) * 3);
}

.file-card__content {
	flex-shrink: 0;
	overflow: hidden;
	text-align: center;
}

.file-card__name {
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
