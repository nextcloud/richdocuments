/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { getClient, getDavNameSpaces, getDavProperties, getRootPath, resultToNode } from '@nextcloud/files/dav'

/**
 * Build a DAV SEARCH request body that matches files of any of the given MIME types
 * across all subdirectories (depth: infinity).
 *
 * @param {string[]} mimes List of MIME type strings to search for
 * @return {string} XML string for the SEARCH request body
 */
function buildOfficeMimeSearch(mimes) {
	const conditions = mimes
		.map(mime => `\t\t\t\t<d:eq><d:prop><d:getcontenttype/></d:prop><d:literal>${mime}</d:literal></d:eq>`)
		.join('\n')

	return `<?xml version="1.0" encoding="UTF-8"?>
<d:searchrequest ${getDavNameSpaces()}>
	<d:basicsearch>
		<d:select>
			<d:prop>
				${getDavProperties()}
			</d:prop>
		</d:select>
		<d:from>
			<d:scope>
				<d:href>${getRootPath()}/</d:href>
				<d:depth>infinity</d:depth>
			</d:scope>
		</d:from>
		<d:where>
			<d:or>
${conditions}
			</d:or>
		</d:where>
	</d:basicsearch>
</d:searchrequest>`
}

/** @type {import('@nextcloud/files').Node[]|null} */
let cachedNodes = null

/**
 * Fetch all office files matching the given MIME types and cache the result.
 * Subsequent calls with the same set of MIMEs return the cached array.
 * Pass an empty array to invalidate and re-fetch.
 *
 * TODO: This DAV SEARCH is unpaginated (depth: infinity). For users with very large
 * file collections this can be slow and memory-intensive. A v2 should add LIMIT/OFFSET
 * or switch to the Files API search endpoint once it supports MIME filtering.
 *
 * @param {string[]} mimes MIME types to search for, derived from template creators
 * @return {Promise<import('@nextcloud/files').Node[]>}
 */
export async function getAllOfficeFiles(mimes) {
	if (cachedNodes) {
		return cachedNodes
	}

	const client = getClient()

	const response = await client.search('/', {
		details: true,
		data: buildOfficeMimeSearch(mimes),
	})

	cachedNodes = response.data.results
		.map(item => resultToNode(item))
		.filter(node => node.type === 'file')

	return cachedNodes
}

/**
 * Discard the cached file list so the next getAllOfficeFiles() call re-fetches.
 */
export function invalidateOfficeFilesCache() {
	cachedNodes = null
}

/**
 * Filter a list of file nodes to those whose MIME type is in the given set.
 *
 * @param {import('@nextcloud/files').Node[]} files
 * @param {string[]} mimes MIME types for the active category
 * @return {import('@nextcloud/files').Node[]}
 */
export function filterByMimes(files, mimes) {
	return files.filter(file => mimes.includes(file.mime))
}
