/*
 * @copyright Copyright (c) 2022 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
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
