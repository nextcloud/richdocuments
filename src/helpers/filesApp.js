/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * @return {string}
 */
export const getCurrentDirectory = () => {
	if (OCA.Sharing?.PublicApp) {
		return OCA.Sharing.PublicApp.fileList.getCurrentDirectory()
	}

	return OCA.Files.App.currentFileList.getCurrentDirectory()
}
