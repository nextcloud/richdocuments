<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="subtle-hint" role="status">
		<component :is="icon" v-if="icon" :size="18" />
		<span class="subtle-hint__text">{{ text }}</span>
		<slot name="action" />
	</div>
</template>

<script>
export default {
	name: 'SubtleHint',
	props: {
		text: { type: String, required: true },
		icon: { type: [Object, Function], default: null },
	},
}
</script>

<style lang="scss" scoped>
.subtle-hint {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	color: var(--color-text-maxcontrast);
	font-size: 0.9em;
	padding: 8px 4px;

	&__text {
		min-width: 0;
	}
}
</style>
