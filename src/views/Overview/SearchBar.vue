<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="search-bar">
		<MagnifyIcon class="search-bar__icon" :size="20" />
		<input ref="input"
			class="search-bar__input"
			type="search"
			autocomplete="off"
			:placeholder="placeholder"
			:value="value"
			:aria-label="placeholder"
			@input="onInput($event.target.value)">
		<button v-if="value"
			type="button"
			class="search-bar__clear"
			:aria-label="t('richdocuments', 'Clear search')"
			@click="clear">
			<CloseIcon :size="18" />
		</button>
	</div>
</template>

<script>
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'

const DEBOUNCE_MS = 250

export default {
	name: 'SearchBar',
	components: { MagnifyIcon, CloseIcon },
	props: {
		value: { type: String, default: '' },
		placeholder: { type: String, default: '' },
	},
	data() {
		return { debounceTimer: null }
	},
	beforeDestroy() {
		if (this.debounceTimer) {
			clearTimeout(this.debounceTimer)
		}
	},
	methods: {
		onInput(next) {
			if (this.debounceTimer) {
				clearTimeout(this.debounceTimer)
			}
			this.debounceTimer = setTimeout(() => {
				this.$emit('input', next)
			}, DEBOUNCE_MS)
		},
		clear() {
			if (this.debounceTimer) {
				clearTimeout(this.debounceTimer)
			}
			this.$emit('input', '')
			this.$nextTick(() => {
				if (this.$refs.input) {
					this.$refs.input.value = ''
					this.$refs.input.focus()
				}
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.search-bar {
	position: sticky;
	top: 0;
	z-index: 5;
	background-color: var(--color-main-background);
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 8px 12px;
	border-radius: var(--border-radius-element, 999px);
	border: 1px solid var(--color-border);

	&:focus-within {
		border-color: var(--color-primary-element);
	}

	&__icon {
		color: var(--color-text-maxcontrast);
		flex: 0 0 auto;
	}
	&__input {
		flex: 1 1 auto;
		min-width: 0;
		border: 0;
		background: transparent;
		color: var(--color-main-text);
		font-size: 1em;
		padding: 4px 0;

		&:focus {
			outline: none;
		}
	}
	&__clear {
		all: unset;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		color: var(--color-text-maxcontrast);

		&:hover {
			background-color: var(--color-background-hover);
		}
	}
}
</style>
