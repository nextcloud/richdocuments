/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
/**
 * Determines if the resource is downloadable
 * @return {boolean}
 */
function isDownloadHidden() {
	/** @type HTMLInputElement */
	const downloadHiddenElement = document.getElementById('hideDownload')

	return Boolean(downloadHiddenElement) && downloadHiddenElement.value === 'true'
}

export default isDownloadHidden
