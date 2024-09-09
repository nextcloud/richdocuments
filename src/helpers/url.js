/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { getRootUrl, generateUrl } from '@nextcloud/router'
import { languageToBCP47 } from './index.js'
import Config from './../services/config.tsx'

const getSearchParam = (name) => {
	const results = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.href)
	if (results === null) {
		return null
	}
	return decodeURI(results[1]) || ''
}

const getCallbackBaseUrl = () => {
	const callbackUrl = Config.get('wopi_callback_url')
	return callbackUrl || window.location.protocol + '//' + window.location.host + getRootUrl()
}

const getWopiSrc = (fileId) => {
	// WOPISrc - URL that Collabora will use to access Nextcloud
	// index.php is forced here to avoid different wopi srcs for the same document
	const wopiurl = getCallbackBaseUrl() + '/index.php/apps/richdocuments/wopi/files/' + fileId
	console.debug('[getWopiUrl] ' + wopiurl)
	return wopiurl
}

const getWopiUrl = ({ fileId, title, readOnly, closeButton, revisionHistory, target = undefined }) => {
	// Only set the revision history parameter if the versions app is enabled
	revisionHistory = revisionHistory && window?.oc_appswebroots?.files_versions

	// urlsrc - the URL from discovery xml that we access for the particular
	// document; we add various parameters to that.
	// The discovery is available at
	//   https://<loolwsd-server>:9980/hosting/discovery
	return Config.get('urlsrc')
		+ 'WOPISrc=' + encodeURIComponent(getWopiSrc(fileId))
		+ '&title=' + encodeURIComponent(title)
		+ '&lang=' + languageToBCP47()
		+ (closeButton ? '&closebutton=1' : '')
		+ (revisionHistory ? '&revisionhistory=1' : '')
		+ (readOnly ? '&permission=readonly' : '')
		+ (target ? '&target=' + encodeURIComponent(target) : '')
}

const getDocumentUrlFromTemplate = (templateId, fileName, fileDir, fillWithTemplate) => {
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

const getDocumentUrlForPublicFile = (fileName, fileId) => {
	return generateUrl(
		'apps/richdocuments/public?shareToken={shareToken}&fileName={fileName}&requesttoken={requesttoken}&fileId={fileId}',
		{
			shareToken: document.getElementById('sharingToken').value,
			fileName,
			fileId,
			requesttoken: OC.requestToken,
		},
	)
}

const getDocumentUrlForFile = (fileDir, fileId) => {
	return generateUrl(
		'apps/richdocuments/index?fileId={fileId}&requesttoken={requesttoken}',
		{
			fileId,
			dir: fileDir,
			requesttoken: OC.requestToken,
		})
}

const getNextcloudUrl = () => {
	return window.location.host
}

export {
	getSearchParam,
	getWopiUrl,
	getCallbackBaseUrl,

	getDocumentUrlFromTemplate,
	getDocumentUrlForPublicFile,
	getDocumentUrlForFile,
	getNextcloudUrl,
}
