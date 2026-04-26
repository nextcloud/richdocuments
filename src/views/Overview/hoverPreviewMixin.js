/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { openHoverPreview, closeHoverPreview } from './hoverPreviewState.js'

const HOVER_DELAY_MS = 400

/**
 * Mixin that wires `mouseenter` / `mouseleave` (and focus / blur) handlers
 * on a row or card to the singleton hover-preview popover.
 *
 * Components mixing this in must expose:
 *   - `largePreviewUrl` (computed): high-res thumbnail URL
 *   - `fallbackIcon` (computed): icon component for missing previews
 *
 * The component name is derived from `this.document.name` or
 * `this.template.name`, whichever is present.
 */
export default {
	data() {
		return { hoverTimer: null }
	},
	beforeDestroy() {
		this.cancelHoverPreview()
		closeHoverPreview()
	},
	methods: {
		onHoverEnter(event) {
			this.cancelHoverPreview()
			const target = event.currentTarget
			this.hoverTimer = window.setTimeout(() => {
				openHoverPreview(target, {
					src: this.largePreviewUrl,
					name: this.document?.name ?? this.template?.name ?? '',
					fallbackIcon: this.fallbackIcon,
				})
			}, HOVER_DELAY_MS)
		},
		onHoverLeave() {
			this.cancelHoverPreview()
			closeHoverPreview()
		},
		cancelHoverPreview() {
			if (this.hoverTimer) {
				clearTimeout(this.hoverTimer)
				this.hoverTimer = null
			}
		},
	},
}
