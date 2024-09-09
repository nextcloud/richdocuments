/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import axios from '@nextcloud/axios'
import { getCapabilities } from './../services/capabilities.ts'

export const LOADING_ERROR = {
	COLLABORA_UNCONFIGURED: 1,
	PROXY_FAILED: 2,
}

export const isCollaboraConfigured = () => {
	const collaboraCapabilities = getCapabilities()?.collabora
	return isBuiltinCodeServerUsed() || collaboraCapabilities.length !== 0
}

export const isBuiltinCodeServerUsed = () => {
	return getCapabilities()?.config?.wopi_url?.indexOf('proxy.php') !== -1
}

export const checkCollaboraConfiguration = async () => {
	const wopiUrl = getCapabilities()?.config?.wopi_url
	if (!wopiUrl) {
		throw Error(LOADING_ERROR.COLLABORA_UNCONFIGURED)
	}
}

let proxyStatusCheckRetry = 0
export const checkProxyStatus = async (_resolve, _reject) => {
	const wopiUrl = getCapabilities()?.config?.wopi_url
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
