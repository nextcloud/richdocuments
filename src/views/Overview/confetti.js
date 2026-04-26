/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Tiny dependency-free confetti burst rendered into a fixed-position layer
 * appended to <body>. Auto-cleans after the animation finishes.
 *
 * Honours `prefers-reduced-motion`: when the user has reduced motion
 * enabled, returns immediately without rendering anything.
 *
 * @param {object} [options] burst options
 * @param {number} [options.count] number of particles
 * @param {number} [options.duration] total animation duration in ms
 * @param {Array<string>} [options.colors] particle colours
 * @param {{x: number, y: number}} [options.origin] viewport-relative origin in pixels
 */
export function fireConfetti({
	count = 80,
	duration = 900,
	colors = ['#46ba61', '#2c73d2', '#d24726', '#f5b400', '#9b59b6', '#1abc9c'],
	origin,
} = {}) {
	if (typeof window === 'undefined' || typeof document === 'undefined') {
		return
	}
	const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
	if (reduce) {
		return
	}

	const ox = origin?.x ?? window.innerWidth / 2
	const oy = origin?.y ?? window.innerHeight / 2

	const layer = document.createElement('div')
	layer.setAttribute('aria-hidden', 'true')
	layer.style.cssText = [
		'position:fixed',
		'inset:0',
		'pointer-events:none',
		'overflow:hidden',
		'z-index:99999',
	].join(';')
	document.body.appendChild(layer)

	for (let i = 0; i < count; i++) {
		const piece = document.createElement('span')
		const angle = Math.random() * Math.PI * 2
		const speed = 120 + Math.random() * 220
		const dx = Math.cos(angle) * speed
		const dy = Math.sin(angle) * speed - 80 // slight upward bias
		const rotation = (Math.random() * 720 - 360).toFixed(0)
		const color = colors[i % colors.length]
		const size = 6 + Math.random() * 6
		const lifetime = duration * (0.7 + Math.random() * 0.3)
		piece.style.cssText = [
			'position:absolute',
			`left:${ox}px`,
			`top:${oy}px`,
			`width:${size}px`,
			`height:${size * 0.6}px`,
			`background:${color}`,
			'border-radius:1px',
			`transform:translate(-50%, -50%) rotate(${(Math.random() * 360).toFixed(0)}deg)`,
			'will-change:transform, opacity',
			`animation:confetti-piece ${lifetime}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
			`--dx:${dx.toFixed(0)}px`,
			`--dy:${dy.toFixed(0)}px`,
			`--rot:${rotation}deg`,
		].join(';')
		layer.appendChild(piece)
	}

	// Inject the keyframes once.
	if (!document.getElementById('overview-confetti-keyframes')) {
		const style = document.createElement('style')
		style.id = 'overview-confetti-keyframes'
		style.textContent = `
			@keyframes confetti-piece {
				0% {
					opacity: 1;
					transform: translate(-50%, -50%) rotate(0deg);
				}
				100% {
					opacity: 0;
					transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) rotate(var(--rot));
				}
			}
		`
		document.head.appendChild(style)
	}

	// Clean up the layer once the longest animation finishes.
	window.setTimeout(() => layer.remove(), duration + 200)
}
