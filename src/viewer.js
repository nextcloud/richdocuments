/**
 * SPDX-FileCopyrightText: 2013 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import './init-shared.js'
import '../css/filetypes.scss'

import Office from './view/Office.vue'
import { getCapabilities } from '@nextcloud/capabilities'

const supportedMimes = getCapabilities().richdocuments.mimetypes

if (OCA.Viewer) {
	OCA.Viewer.registerHandler({
		id: 'richdocuments',
		group: null,
		mimes: supportedMimes,
		component: Office,
		theme: 'light',
		canCompare: true,
	})
}

// TODO: Viewer.openWith introduced with https://github.com/nextcloud/viewer/pull/1273
//       This check can be replaced with `if(OCA.Viewer)` once NC 24 is EOL.
if (OCA.Viewer.openWith && OCA?.Files?.fileActions) {
	const supportedMimes = getCapabilities().richdocuments.mimetypesNoDefaultOpen
	const actionName = 'Edit with ' + getCapabilities().richdocuments.productName
	const actionDisplayNameEdit = t('richdocuments', 'Edit with {productName}', { productName: getCapabilities().richdocuments.productName }, undefined, { escape: false })
	const actionDisplayNameOpen = t('richdocuments', 'Open with {productName}', { productName: getCapabilities().richdocuments.productName }, undefined, { escape: false })

	for (const mime of supportedMimes) {
		const action = {
			name: actionName,
			mime,
			permissions: OC.PERMISSION_READ,
			iconClass: 'icon-richdocuments',
			displayName: mime === 'application/pdf' ? actionDisplayNameOpen : actionDisplayNameEdit,
			actionHandler: (fileName, context) => {
				OCA.Viewer.openWith('richdocuments', {
					path: context.fileInfoModel.getFullPath(),
				})
			},
		}

		OCA.Files.fileActions.registerAction(action)
	}
}
