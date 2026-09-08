/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

const getNextcloudVersion = () => {
	return parseInt(OC.config.version.split('.')[0])
}

const splitPath = (path) => {
	const fileName = path.split('\\').pop().split('/').pop()
	const directory = path.slice(0, -fileName.length - 1)
	return [directory, fileName]
}

const getRandomId = (length = 5) => {
	return Math.random()
		.toString(36)
		.replace(/[^a-z]+/g, '')
		.slice(0, length || 5)

}

export {
	getNextcloudVersion,
	splitPath,
	getRandomId,
}

export { default as isDocument } from './isDocument.js'
export { default as isPdf } from './isPdf.js'
export { default as isDownloadHidden } from './isDownloadHidden.js'
