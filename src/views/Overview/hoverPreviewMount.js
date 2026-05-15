/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import Vue from 'vue'
import HoverPreview from './HoverPreview.vue'
import { hoverPreviewState, markHoverPreviewError } from './hoverPreviewState.js'

let mounted = false

/**
 * Mount a singleton hover-preview popover directly under <body>.
 *
 * Mounting outside the SPA's NcContent root sidesteps two browser
 * behaviours that would otherwise hide the popover inside grid cards:
 *   - NcContent has `overflow: hidden`, which clips fixed-position
 *     descendants in some engines.
 *   - Cards have `transform` on hover, which makes them the containing
 *     block for any fixed-position descendants AND clips them via
 *     `overflow: hidden`.
 *
 * The popover reads from the shared `hoverPreviewState` so any row or
 * card across the app can drive it from anywhere in the tree.
 */
export function mountHoverPreview() {
	if (mounted || typeof document === 'undefined') {
		return
	}
	mounted = true

	const el = document.createElement('div')
	el.setAttribute('data-richdocuments-hover-preview', '')
	document.body.appendChild(el)

	/* eslint-disable-next-line no-new */
	new Vue({
		render(h) {
			if (!hoverPreviewState.open) {
				// Render nothing while hidden — Vue still tracks the
				// `open` read so the next mutation re-runs render().
				return h()
			}
			return h(HoverPreview, {
				props: {
					popoverStyle: hoverPreviewState.style,
					src: hoverPreviewState.src,
					name: hoverPreviewState.name,
					fallbackIcon: hoverPreviewState.fallbackIcon,
					errored: hoverPreviewState.errored,
				},
				on: {
					error: markHoverPreviewError,
				},
			})
		},
	}).$mount(el)
}
