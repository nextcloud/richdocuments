/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

// Mirrors apps/files/src/services/Templates.js — uses NC core Files API, not richdocuments OCS.

import axios from '@nextcloud/axios'
import { generateOcsUrl } from '@nextcloud/router'

/**
 * Fetch all template creators registered with the NC Files API.
 * Returns an array of TemplateFileCreator objects, each with:
 *   app, label, extension, mimetypes[], templates[]
 *
 * @return {Promise<object[]>}
 */
export async function getTemplates() {
	const response = await axios.get(generateOcsUrl('apps/files/api/v1/templates'))
	return response.data.ocs.data
}

/**
 * Create a new file from a template via the NC Files API.
 *
 * @param {string} filePath Destination path for the new file
 * @param {string} templatePath Source template path
 * @param {string} templateType Template type e.g. 'user'
 * @return {Promise<object>}
 */
export async function createFromTemplate(filePath, templatePath, templateType) {
	const response = await axios.post(generateOcsUrl('apps/files/api/v1/templates/create'), {
		filePath,
		templatePath,
		templateType,
	})
	return response.data.ocs.data
}
