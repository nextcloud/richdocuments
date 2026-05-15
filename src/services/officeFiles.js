/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { getClient, getDavNameSpaces, getDavProperties, getRootPath, resultToNode } from '@nextcloud/files/dav'

export const OFFICE_MIME_FILTERS = {
	documents: [
		'application/vnd.oasis.opendocument.text',
		'application/vnd.oasis.opendocument.text-template',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
		'application/msword',
	],
	presentations: [
		'application/vnd.oasis.opendocument.presentation',
		'application/vnd.oasis.opendocument.presentation-template',
		'application/vnd.openxmlformats-officedocument.presentationml.presentation',
		'application/vnd.openxmlformats-officedocument.presentationml.template',
		'application/vnd.ms-powerpoint',
	],
	spreadsheets: [
		'application/vnd.oasis.opendocument.spreadsheet',
		'application/vnd.oasis.opendocument.spreadsheet-template',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
		'application/vnd.ms-excel',
		'text/csv',
	],
	diagrams: [
		'application/vnd.oasis.opendocument.graphics',
		'application/vnd.oasis.opendocument.graphics-template',
		'application/vnd.visio',
		'application/vnd.ms-visio.drawing',
	],
}

const ALL_OFFICE_MIMES = Object.values(OFFICE_MIME_FILTERS).flat()

// Pre-computed at module load time — ALL_OFFICE_MIMES is static so this never changes.
const OFFICE_MIME_CONDITIONS = ALL_OFFICE_MIMES
	.map(mime => `\t\t\t\t<d:eq><d:prop><d:getcontenttype/></d:prop><d:literal>${mime}</d:literal></d:eq>`)
	.join('\n')

/**
 * Build a DAV SEARCH request body that matches files of any office MIME type
 * across all subdirectories (depth: infinity).
 *
 * @return {string} XML string for the SEARCH request body
 */
function getOfficeMimeSearch() {
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
${OFFICE_MIME_CONDITIONS}
			</d:or>
		</d:where>
	</d:basicsearch>
</d:searchrequest>`
}

/** @type {import('@nextcloud/files').Node[]|null} */
let cachedNodes = null

/**
 * Fetch all office files once and cache the result.
 * Subsequent calls return the cached array.
 * Uses DAV SEARCH to recursively find office files across all subdirectories.
 *
 * @return {Promise<import('@nextcloud/files').Node[]>}
 */
export async function getAllOfficeFiles() {
	if (cachedNodes) {
		return cachedNodes
	}

	const client = getClient()

	const response = await client.search('/', {
		details: true,
		data: getOfficeMimeSearch(),
	})

	cachedNodes = response.data.results
		.map(item => resultToNode(item))
		.filter(node => node.type === 'file')

	return cachedNodes
}

/**
 * Filter a list of file nodes by an office category.
 *
 * @param {import('@nextcloud/files').Node[]} files
 * @param {string} category - One of 'documents', 'presentations', 'spreadsheets', 'diagrams'
 * @return {import('@nextcloud/files').Node[]}
 */
export function filterByCategory(files, category) {
	const mimes = OFFICE_MIME_FILTERS[category]
	return files.filter(file => mimes.includes(file.mime))
}
