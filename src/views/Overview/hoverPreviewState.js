/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import Vue from 'vue'

const PREVIEW_WIDTH = 360
const PREVIEW_HEIGHT = 320
const VIEWPORT_MARGIN = 12

/**
 * Singleton reactive state for the hover-preview popover.
 *
 * The popover lives once at the SPA root (OverviewApp) so it escapes any
 * `transform` / `overflow:hidden` ancestor — grid cards have both, which
 * would otherwise clip a popover rendered inside them.
 *
 * @type {{open: boolean, style: object, src: string, name: string, fallbackIcon: ?(object|Function), errored: boolean}} reactive popover state
 */
export const hoverPreviewState = Vue.observable({
	open: false,
	style: {},
	src: '',
	name: '',
	fallbackIcon: null,
	errored: false,
})

/**
 * Show the popover anchored to the given target element. No-ops on
 * `prefers-reduced-motion` so users who opt out of motion don't see
 * surprise popovers.
 *
 * @param {HTMLElement} target hovered element
 * @param {object} payload preview content
 * @param {string} [payload.src] thumbnail URL
 * @param {string} [payload.name] file or template name
 * @param {?(object|Function)} [payload.fallbackIcon] icon component for missing previews
 */
export function openHoverPreview(target, { src = '', name = '', fallbackIcon = null } = {}) {
	if (typeof window === 'undefined' || !target) {
		return
	}
	if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
		return
	}

	const rect = target.getBoundingClientRect()

	let left = rect.left
	const maxLeft = window.innerWidth - PREVIEW_WIDTH - VIEWPORT_MARGIN
	left = Math.max(VIEWPORT_MARGIN, Math.min(left, maxLeft))

	let top = rect.bottom + VIEWPORT_MARGIN
	if (top + PREVIEW_HEIGHT > window.innerHeight - VIEWPORT_MARGIN) {
		const above = rect.top - PREVIEW_HEIGHT - VIEWPORT_MARGIN
		if (above >= VIEWPORT_MARGIN) {
			top = above
		} else {
			top = Math.max(VIEWPORT_MARGIN, window.innerHeight - PREVIEW_HEIGHT - VIEWPORT_MARGIN)
		}
	}

	hoverPreviewState.style = {
		left: `${Math.round(left)}px`,
		top: `${Math.round(top)}px`,
	}
	hoverPreviewState.src = src
	hoverPreviewState.name = name
	hoverPreviewState.fallbackIcon = fallbackIcon
	hoverPreviewState.errored = false
	hoverPreviewState.open = true
}

/**
 * Hide the popover. Safe to call repeatedly.
 */
export function closeHoverPreview() {
	hoverPreviewState.open = false
	hoverPreviewState.errored = false
}

/**
 * Mark the current preview as errored so the consumer renders a fallback
 * icon rather than a broken image.
 */
export function markHoverPreviewError() {
	hoverPreviewState.errored = true
}
