/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Determines if the resource is a PDF document
 * @return {boolean}
 */
function isPdf() {
	/** @type HTMLInputElement */
	const mimetypeElement = document.getElementById('mimetype')

	return Boolean(mimetypeElement) && (mimetypeElement.value === 'application/pdf')
}

export default isPdf
