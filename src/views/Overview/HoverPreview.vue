<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="hover-preview"
		:style="popoverStyle"
		role="presentation">
		<img v-if="!errored && src"
			:src="src"
			:alt="''"
			class="hover-preview__image"
			@error="$emit('error')">
		<component :is="fallbackIcon"
			v-else
			class="hover-preview__icon"
			:size="64" />
		<div class="hover-preview__label">
			{{ name }}
		</div>
	</div>
</template>

<script>
export default {
	name: 'HoverPreview',
	props: {
		popoverStyle: { type: Object, required: true },
		src: { type: String, default: '' },
		name: { type: String, default: '' },
		fallbackIcon: { type: [Object, Function], default: null },
		errored: { type: Boolean, default: false },
	},
}
</script>

<style lang="scss" scoped>
.hover-preview {
	position: fixed;
	width: 360px;
	height: 320px;
	border-radius: var(--border-radius-large, 12px);
	background-color: var(--color-main-background);
	border: 1px solid var(--color-border);
	box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0, 0, 0, 0.08);
	overflow: hidden;
	z-index: 200;
	display: flex;
	flex-direction: column;
	pointer-events: none;
	animation: hover-preview-fade 160ms ease-out;

	&__image {
		flex: 1 1 auto;
		width: 100%;
		min-height: 0;
		object-fit: contain;
		background-color: var(--color-background-dark);
	}
	&__icon {
		flex: 1 1 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 0;
		color: var(--color-text-maxcontrast);
	}
	&__label {
		flex: 0 0 auto;
		padding: 8px 12px;
		font-size: 0.85em;
		font-weight: 500;
		color: var(--color-main-text);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		border-top: 1px solid var(--color-border);
	}
}

// On narrow / touch viewports the floating preview is more annoying
// than useful, and finger-pointer hovers are unreliable.
@media (max-width: 860px) {
	.hover-preview {
		display: none;
	}
}

@keyframes hover-preview-fade {
	from { opacity: 0; transform: scale(0.96); }
	to { opacity: 1; transform: scale(1); }
}
</style>
