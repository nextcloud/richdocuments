/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

let scrollLock = false
let intervalHandler

// Workaround for browsers automatically scrolling the body when the hidden input is focussed
const handleScrollReset = () => {
	document.documentElement.scrollTop = 0
	document.scrollingElement.scrollTop = 0
}

// Workaround for mobile browsers to resize the iframe to the visual viewport height
// as visual viewport area - which includes OSK, say - is not propagated to iframes
// see https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport
const handleResize = () => {
	const expectedHeight = window.visualViewport.height ?? document.documentElement.clientHeight
	const frames = document.getElementsByClassName('office-viewer__iframe')
	for (const frame of frames) {
		frame.style.maxHeight = expectedHeight + 'px'
	}
	const viewer = document.querySelector('.office-viewer')
	if (viewer) {
		viewer.style.height = expectedHeight + 'px'
	}
}

const fixThemAll = () => {
	if (!scrollLock) {
		return
	}

	handleScrollReset()
	handleResize()
}

const preventDefault = (e) => e.preventDefault()

export const enableScrollLock = () => {
	if (scrollLock) {
		return
	}

	scrollLock = true

	window?.visualViewport?.addEventListener('resize', fixThemAll)
		|| window.addEventListener('resize', fixThemAll)

	document.addEventListener('touchstart', preventDefault, false)
	document.addEventListener('touchmove', preventDefault, false)

	intervalHandler = setInterval(fixThemAll, 200)
}

export const disableScrollLock = () => {
	if (!scrollLock) {
		return
	}

	scrollLock = false

	window?.visualViewport?.removeEventListener('resize', fixThemAll)
		|| window.removeEventListener('resize', fixThemAll)

	document.removeEventListener('touchstart', preventDefault, false)
	document.removeEventListener('touchmove', preventDefault, false)

	clearInterval(intervalHandler)
}
