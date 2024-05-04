/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

let scrollLock = false
let intervalHandler

const isiOS = [
	'iPad Simulator',
	'iPhone Simulator',
	'iPod Simulator',
	'iPad',
	'iPhone',
	'iPod',
].includes(navigator.platform) || (navigator.userAgent.includes('Mac') && navigator.maxTouchPoints > 1)

// Workaround for Safari automatically scrolling the body when the hidden input is focussed
const handleScrollReset = () => {
	document.documentElement.scrollTop = 0
	document.scrollingElement.scrollTop = 0
}

// Workaround for Safari to resize the iframe to the proper height
// as 100vh is not the proper viewport height there
const handleResize = () => {
	const expectedHeight = window.visualViewport.height ?? document.documentElement.clientHeight
	const frame = document.getElementById('richdocumentsframe')
	if (frame) {
		frame.style.maxHeight = expectedHeight + 'px'
	}
	const viewer = document.querySelector('.office-viewer')
	if (viewer) {
		viewer.style.height = expectedHeight + 'px'
	}
}

const fixThemAll = () => {
	if (!isiOS) {
		return
	}
	if (!scrollLock) {
		return
	}
	handleScrollReset()
	handleResize()
}

const preventDefault = (e) => e.preventDefault()

export const enableScrollLock = () => {
	if (scrollLock || !isiOS) {
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
	if (!scrollLock || !isiOS) {
		return
	}

	scrollLock = false

	window?.visualViewport?.removeEventListener('resize', fixThemAll)
		|| window.removeEventListener('resize', fixThemAll)

	document.removeEventListener('touchstart', preventDefault, false)
	document.removeEventListener('touchmove', preventDefault, false)

	clearInterval(intervalHandler)
}
