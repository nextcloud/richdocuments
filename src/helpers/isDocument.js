/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { getCapabilities } from '@nextcloud/capabilities'

/** @type Array.<String> */
const mimetypes = getCapabilities().richdocuments.mimetypes

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
