<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div v-if="editors && editors.length"
		class="editor-badges"
		:title="title"
		:aria-label="title">
		<span class="editor-badges__pulse" aria-hidden="true" />
		<div class="editor-badges__avatars">
			<NcAvatar v-for="editor in shown"
				:key="editor.uid || editor.displayName"
				class="editor-badges__avatar"
				:user="editor.uid || undefined"
				:display-name="editor.displayName"
				:size="size"
				:disable-menu="true"
				:show-user-status="false" />
			<span v-if="overflow > 0"
				class="editor-badges__overflow"
				:style="{ width: `${size}px`, height: `${size}px`, fontSize: `${size * 0.4}px` }">
				+{{ overflow }}
			</span>
		</div>
	</div>
</template>

<script>
import NcAvatar from '@nextcloud/vue/dist/Components/NcAvatar.js'

const MAX_VISIBLE = 3

export default {
	name: 'EditorBadges',
	components: { NcAvatar },
	props: {
		editors: { type: Array, default: () => [] },
		size: { type: Number, default: 24 },
	},
	computed: {
		shown() {
			return (this.editors || []).slice(0, MAX_VISIBLE)
		},
		overflow() {
			return Math.max(0, (this.editors || []).length - MAX_VISIBLE)
		},
		title() {
			const names = (this.editors || []).map(e => e.displayName).filter(Boolean)
			if (names.length === 0) {
				return ''
			}
			if (names.length === 1) {
				return t('richdocuments', '{name} is editing this document', { name: names[0] })
			}
			return t('richdocuments', '{count} people are editing this document: {names}', {
				count: names.length,
				names: names.join(', '),
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.editor-badges {
	display: inline-flex;
	align-items: center;
	gap: 6px;

	&__pulse {
		display: inline-block;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: var(--color-success, #46ba61);
		box-shadow: 0 0 0 0 rgba(70, 186, 97, 0.6);
		animation: editor-pulse 1.6s ease-out infinite;
		flex: 0 0 auto;
	}

	&__avatars {
		display: inline-flex;
		align-items: center;
	}

	&__avatar {
		// Overlap avatars slightly for a stacked look.
		& + & {
			margin-left: -8px;
		}
		// White ring so overlapping avatars stay visually distinct.
		border: 2px solid var(--color-main-background);
		border-radius: 50%;
		background-color: var(--color-main-background);
	}

	&__overflow {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin-left: -8px;
		border-radius: 50%;
		background-color: var(--color-background-dark);
		color: var(--color-text-maxcontrast);
		border: 2px solid var(--color-main-background);
		font-weight: 500;
	}
}

@keyframes editor-pulse {
	0% { box-shadow: 0 0 0 0 rgba(70, 186, 97, 0.55); }
	70% { box-shadow: 0 0 0 6px rgba(70, 186, 97, 0); }
	100% { box-shadow: 0 0 0 0 rgba(70, 186, 97, 0); }
}
</style>
