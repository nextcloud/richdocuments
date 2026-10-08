/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { generateUrl, getRootUrl } from '@nextcloud/router'
import { getSharingToken } from '@nextcloud/sharing/public'
import Config from './../services/config.tsx'

/**
 *
 * @param name
 */
function getSearchParam(name) {
	const results = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.href)
	if (results === null) {
		return null
	}
	return decodeURI(results[1]) || ''
}

/**
 *
 */
function getCallbackBaseUrl() {
	const callbackUrl = Config.get('wopi_callback_url')
	return callbackUrl || window.location.protocol + '//' + window.location.host + getRootUrl()
}

/**
 *
 * @param fileId
 */
function getWopiSrc(fileId) {
	// WOPISrc - URL that Collabora will use to access Nextcloud
	// index.php is forced here to avoid different wopi srcs for the same document
	const wopiurl = getCallbackBaseUrl() + '/index.php/apps/richdocuments/wopi/files/' + fileId
	console.debug('[getWopiUrl] ' + wopiurl)
	return wopiurl
}

/**
 *
 * @param root0
 * @param root0.fileId
 * @param root0.readOnly
 * @param root0.closeButton
 * @param root0.revisionHistory
 * @param root0.target
 * @param root0.startPresentation
 */
function getWopiUrl({ fileId, readOnly, closeButton, revisionHistory, target = undefined, startPresentation = false }) {
	// Only set the revision history parameter if the versions app is enabled
	revisionHistory = revisionHistory && OC.appswebroots?.files_versions

	// urlsrc - the URL from discovery xml that we access for the particular
	// document; we add various parameters to that.
	// The discovery is available at
	//   https://<loolwsd-server>:9980/hosting/discovery
	return Config.get('urlsrc')
		+ 'WOPISrc=' + encodeURIComponent(getWopiSrc(fileId))
		+ '&lang=' + Config.get('bcp47Language')
		+ (closeButton ? '&closebutton=1' : '')
		+ (revisionHistory ? '&revisionhistory=1' : '')
		+ (readOnly ? '&permission=readonly' : '')
		+ (target ? '&target=' + encodeURIComponent(target) : '')
		+ (startPresentation ? '&startPresentation=1' : '')
}

/**
 *
 * @param templateId
 * @param fileName
 * @param fileDir
 * @param fillWithTemplate
 */
function getDocumentUrlFromTemplate(templateId, fileName, fileDir, fillWithTemplate) {
	return generateUrl(
		'apps/richdocuments/indexTemplate?templateId={templateId}&fileName={fileName}&dir={dir}&requesttoken={requesttoken}',
		{
			templateId,
			fileName,
			dir: fileDir,
			requesttoken: OC.requestToken,
		},
	)
}

/**
 *
 * @param fileName
 * @param fileId
 */
function getDocumentUrlForPublicFile(fileName, fileId) {
	return generateUrl(
		'apps/richdocuments/public?shareToken={shareToken}&fileName={fileName}&requesttoken={requesttoken}&fileId={fileId}',
		{
			shareToken: getSharingToken(),
			fileName,
			fileId,
			requesttoken: OC.requestToken,
		},
	)
}

/**
 *
 * @param fileDir
 * @param fileId
 */
function getDocumentUrlForFile(fileDir, fileId) {
	return generateUrl(
		'apps/richdocuments/index?fileId={fileId}&requesttoken={requesttoken}',
		{
			fileId,
			dir: fileDir,
			requesttoken: OC.requestToken,
		},
	)
}

/**
 *
 */
export function getConfigFileUrl() {
	return generateUrl('apps/richdocuments/wopi/settings', null, { baseURL: getCallbackBaseUrl() })
}

/**
 *
 */
function getNextcloudUrl() {
	return window.location.host
}

export {
	getCallbackBaseUrl,
	getDocumentUrlForFile,
	getDocumentUrlForPublicFile,
	getDocumentUrlFromTemplate,
	getNextcloudUrl,
	getSearchParam,
	getWopiUrl,
}
