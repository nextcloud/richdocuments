/*
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import { getRootUrl } from '@nextcloud/router'
import { languageToBCP47 } from './index'
import Config from './../services/config'

const getSearchParam = (name) => {
	var results = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.href)
	if (results === null) {
		return null
	}
	return decodeURI(results[1]) || 0
}

const getWopiUrl = ({ fileId, title, readOnly, closeButton, revisionHistory }) => {
	// WOPISrc - URL that loolwsd will access (ie. pointing to ownCloud)
	// index.php is forced here to avoid different wopi srcs for the same document
	const wopiurl = window.location.protocol + '//' + window.location.host + getRootUrl() + '/index.php/apps/richdocuments/wopi/files/' + fileId
	console.debug('[getWopiUrl] ' + wopiurl)
	const wopisrc = encodeURIComponent(wopiurl)

	// urlsrc - the URL from discovery xml that we access for the particular
	// document; we add various parameters to that.
	// The discovery is available at
	//   https://<loolwsd-server>:9980/hosting/discovery
	return Config.get('urlsrc')
		+ 'WOPISrc=' + wopisrc
		+ '&title=' + encodeURIComponent(title)
		+ '&lang=' + languageToBCP47()
		+ (closeButton ? '&closebutton=1' : '')
		+ (revisionHistory ? '&revisionhistory=1' : '')
		+ (readOnly ? '&permission=readonly' : '')
}

const getDocumentUrlFromTemplate = (templateId, fileName, fileDir, fillWithTemplate) => {
	return OC.generateUrl(
		'apps/richdocuments/indexTemplate?templateId={templateId}&fileName={fileName}&dir={dir}&requesttoken={requesttoken}',
		{
			templateId: templateId,
			fileName: fileName,
			dir: fileDir,
			requesttoken: OC.requestToken
		}
	)
}

const getDocumentUrlForPublicFile = (fileName, fileId) => {
	return OC.generateUrl(
		'apps/richdocuments/public?shareToken={shareToken}&fileName={fileName}&requesttoken={requesttoken}&fileId={fileId}',
		{
			shareToken: document.getElementById('sharingToken').value,
			fileName: fileName,
			fileId: fileId,
			requesttoken: OC.requestToken
		}
	)
}

const getDocumentUrlForFile = (fileDir, fileId) => {
	return OC.generateUrl(
		'apps/richdocuments/index?fileId={fileId}&requesttoken={requesttoken}',
		{
			fileId: fileId,
			dir: fileDir,
			requesttoken: OC.requestToken
		})
}

export {
	getSearchParam,
	getWopiUrl,

	getDocumentUrlFromTemplate,
	getDocumentUrlForPublicFile,
	getDocumentUrlForFile
}
