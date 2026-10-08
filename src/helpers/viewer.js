/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { getClient, getDefaultPropfind, getRootPath, resultToNode } from '@nextcloud/files/dav'
import { getViewer } from '@nextcloud/viewer'

/**
 * @param {import('@nextcloud/files').IFile} node The file to open
 * @param {string} [handlerId] Force a specific viewer handler
 */
export function openNode(node, handlerId) {
	return getViewer().open([node], node, undefined, handlerId)
}

/**
 * @param {string} path Path relative to the current dav root (user files or public share)
 * @param {string} [handlerId] Force a specific viewer handler
 */
export async function openPath(path, handlerId) {
	const { data } = await getClient().stat(getRootPath() + path, {
		details: true,
		data: getDefaultPropfind(),
	})
	return openNode(resultToNode(data), handlerId)
}
