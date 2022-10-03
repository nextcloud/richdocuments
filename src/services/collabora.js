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
import axios from '@nextcloud/axios'
import { getCapabilities } from '@nextcloud/capabilities'

export const LOADING_ERROR = {
	COLLABORA_UNCONFIGURED: 1,
	PROXY_FAILED: 2,
}

export const isCollaboraConfigured = () => {
	const collaboraCapabilities = getCapabilities()?.richdocuments?.collabora
	return isBuiltinCodeServerUsed() || collaboraCapabilities.length !== 0
}

export const isBuiltinCodeServerUsed = () => {
	const richdocumentsCapabilities = getCapabilities()?.richdocuments
	return richdocumentsCapabilities?.config?.wopi_url?.indexOf('proxy.php') !== -1
}

export const checkCollaboraConfiguration = async () => {
	const wopiUrl = getCapabilities()?.richdocuments?.config?.wopi_url
	if (!wopiUrl) {
		throw Error(LOADING_ERROR.COLLABORA_UNCONFIGURED)
	}
}

let proxyStatusCheckRetry = 0
export const checkProxyStatus = async (_resolve, _reject) => {
	const wopiUrl = getCapabilities()?.richdocuments?.config?.wopi_url
	if (wopiUrl.indexOf('proxy.php') === -1) {
		return true
	}

	const url = wopiUrl.slice(0, wopiUrl.indexOf('proxy.php') + 'proxy.php'.length)
	const proxyStatusUrl = url + '?status'

	const checkProxyStatusCallback = async (resolve, reject) => {
		const result = await axios.get(proxyStatusUrl)
		if (!result || !result?.data?.status) {
			reject('Failed to contact status endpoint')
		}

		if (result.data.status === 'OK') {
			return resolve(true)
		}
		if (result.data.status === 'error') {
			return reject(t('richdocuments', 'Built-in CODE server failed to start'))
		}

		if (proxyStatusCheckRetry < 3 && (result.data.status === 'starting' || result.data.status === 'stopped' || result.data.status === 'restarting')) {
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
