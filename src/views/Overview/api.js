/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import axios from '@nextcloud/axios'
import { generateOcsUrl } from '@nextcloud/router'

const HOME_LIMIT = 6
const PAGE_LIMIT = 25

const ocsUrl = path => generateOcsUrl('apps/richdocuments/api/v1/overview/' + path)

// Standard headers for OCS endpoints. `OCS-APIRequest: true` makes the
// request pass Nextcloud's CSRF check via the OCS-bypass branch in
// IRequest::passesCSRFCheck() — necessary for POSTs in particular.
const OCS_HEADERS = { 'OCS-APIRequest': 'true' }

const unwrap = response => response.data?.ocs?.data ?? { items: [], nextOffset: null }

/**
 * Fetch one page of the recent / shared / templates list.
 *
 * @param {('recent'|'shared'|'templates')} kind which list to fetch
 * @param {object} options request options
 * @param {string|null} [options.q] search query
 * @param {string|null} [options.type] mime-type filter group key
 * @param {number} [options.offset] pagination offset
 * @param {number} [options.limit] page size
 * @param {AbortSignal} [options.signal] cancellation signal
 * @return {Promise<{items: Array, nextOffset: ?number}>}
 */
export async function fetchList(kind, { q = null, type = null, offset = 0, limit = PAGE_LIMIT, signal } = {}) {
	const params = { offset, limit }
	if (q) {
		params.q = q
	}
	if (type) {
		params.type = type
	}
	const response = await axios.get(ocsUrl(kind), { params, signal, headers: OCS_HEADERS })
	return unwrap(response)
}

/**
 * Fetch the small "home" preview slice for a kind (no search, no offset).
 *
 * @param {('recent'|'shared'|'templates')} kind which list to fetch
 * @param {AbortSignal} [signal] cancellation signal
 * @return {Promise<{items: Array, nextOffset: ?number}>}
 */
export function fetchHome(kind, signal) {
	return fetchList(kind, { offset: 0, limit: HOME_LIMIT, signal })
}

/**
 * Create a new file from a template.
 *
 * @param {object} payload body
 * @param {number} payload.templateFileId template node id
 * @param {string} payload.filename desired filename (no extension)
 * @param {string} payload.folderPath user-relative target folder
 * @return {Promise<{fileid: number, name: string, path: string, openUrl: string}>}
 */
export async function createFromTemplate({ templateFileId, filename, folderPath }) {
	const response = await axios.post(ocsUrl('create-from-template'), {
		templateFileId,
		filename,
		folderPath,
	}, { headers: OCS_HEADERS })
	return response.data?.ocs?.data ?? null
}

/**
 * Toggle the favourite (pinned) flag for a file. The backend wires through
 * to Nextcloud's per-user favourites tagger so pins are also visible in
 * the Files app's "Favorites" view.
 *
 * @param {number} fileid file node id
 * @param {boolean} favorite desired flag
 * @return {Promise<{fileid: number, favorite: boolean}>}
 */
export async function setFavourite(fileid, favorite) {
	const response = await axios.post(ocsUrl('favourite'), { fileid, favorite }, { headers: OCS_HEADERS })
	return response.data?.ocs?.data ?? { fileid, favorite }
}

export const PAGE_SIZE = PAGE_LIMIT
export const HOME_SECTION_LIMIT = HOME_LIMIT
