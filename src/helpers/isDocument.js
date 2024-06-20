/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { getCapabilities } from './../services/capabilities.ts'

/** @type Array.<String> */
const mimetypes = getCapabilities().mimetypes

/**
 * Determines if the mimetype of the resource is supported by richdocuments
 * @return {boolean}
 */
function isDocument() {
	/** @type HTMLInputElement */
	const mimetypeElement = document.getElementById('mimetype')

	return Boolean(mimetypeElement) && mimetypes.includes(mimetypeElement.value)
}

export default isDocument
