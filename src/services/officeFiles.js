/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { getClient, getDefaultPropfind, getRootPath, resultToNode } from '@nextcloud/files/dav'

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

/** @type {import('@nextcloud/files').Node[]|null} */
let cachedNodes = null

/**
 * Fetch all office files once and cache the result.
 * Subsequent calls return the cached array.
 *
 * @return {Promise<import('@nextcloud/files').Node[]>}
 */
export async function getAllOfficeFiles() {
	if (cachedNodes) {
		return cachedNodes
	}

	const client = getClient()
	const propfindPayload = getDefaultPropfind()

	const response = await client.getDirectoryContents(getRootPath(), {
		details: true,
		data: propfindPayload,
	})

	cachedNodes = response.data
		.map(item => resultToNode(item))
		.filter(node => node.type === 'file' && ALL_OFFICE_MIMES.includes(node.mime))

	return cachedNodes
}

/**
 * Filter a list of file nodes by an office category.
 *
 * @param {import('@nextcloud/files').Node[]} files
 * @param {string} category - One of 'documents', 'presentations', 'spreadsheets'
 * @return {import('@nextcloud/files').Node[]}
 */
export function filterByCategory(files, category) {
	const mimes = OFFICE_MIME_FILTERS[category]
	return files.filter(file => mimes.includes(file.mime))
}
