/*
 * @copyright Copyright (c) 2021 Julius Härtl <jus@bitgrid.net>
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

import { getCapabilities } from '@nextcloud/capabilities'
import axios from '@nextcloud/axios'

export const isCollaboraConfigured = () => {
	const collaboraCapabilities = getCapabilities()?.richdocuments?.collabora
	return isBuiltinCodeServerUsed() || collaboraCapabilities.length !== 0
}

export const isBuiltinCodeServerUsed = () => {
	const richdocumentsCapabilities = getCapabilities()?.richdocuments
	return richdocumentsCapabilities?.config?.wopi_url?.indexOf('proxy.php') !== -1
}

let proxyStatusCheckRetry = 0
export const checkProxyStatus = async(_resolve, _reject) => {

	const wopiUrl = getCapabilities()?.richdocuments?.config?.wopi_url
	if (!wopiUrl) {
		throw Error(t('richdocuments', 'Collabora is not configured'))
	}

	if (wopiUrl.indexOf('proxy.php') === -1) {
		return true
	}

	const url = wopiUrl.substr(0, wopiUrl.indexOf('proxy.php') + 'proxy.php'.length)
	const proxyStatusUrl = url + '?status'

	const checkProxyStatusCallback = async(resolve, reject) => {
		const result = await axios.get(proxyStatusUrl)
		if (!result || !result.status) {
			reject('Failed to contact status endpoint')
		}

		if (result.status === 'OK') {
			return resolve(true)
		}
		if (result.status === 'error') {
			return reject(t('richdocuments', 'Built-in CODE server failed to start'))
		}

		if (proxyStatusCheckRetry < 3 && (result.status === 'starting' || result.status === 'stopped' || result.status === 'restarting')) {
			setTimeout(() => {
				proxyStatusCheckRetry++
				checkProxyStatus(resolve, reject)
			})
		} else {
			reject('Maximum retries reached')
		}

	}

	if (_reject && _resolve) {
		return checkProxyStatusCallback(_reject, _resolve)
	} else {
		return new Promise(checkProxyStatusCallback)
	}
}
