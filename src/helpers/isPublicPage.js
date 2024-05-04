/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
/**
 * Determines if the resource is a public share
 * @return {boolean}
 */
function isPublic() {
	/** @type HTMLInputElement */
	const publicElement = document.getElementById('isPublic')

	return Boolean(publicElement) && publicElement.value === '1'
}

export default isPublic
