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

const PROXY_STARTING_STATES = new Set(['starting', 'stopped', 'restarting'])
const PROXY_POLL_INTERVAL_MS = 1500
const PROXY_POLL_TIMEOUT_MS = 30000

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

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

export const checkProxyStatus = async () => {
	const wopiUrl = getCapabilities()?.config?.wopi_url
	if (wopiUrl.indexOf('proxy.php') === -1) {
		return true
	}

	const url = wopiUrl.slice(0, wopiUrl.indexOf('proxy.php') + 'proxy.php'.length)
	const proxyStatusUrl = url + '?status'
	const deadline = Date.now() + PROXY_POLL_TIMEOUT_MS

	while (Date.now() < deadline) {
		let result
		try {
			result = await axios.get(proxyStatusUrl)
		} catch (e) {
			await sleep(PROXY_POLL_INTERVAL_MS)
			continue
		}

		const status = result?.data?.status
		if (!status) {
			await sleep(PROXY_POLL_INTERVAL_MS)
			continue
		}

		if (status === 'OK') {
			return true
		}

		if (status === 'error') {
			throw Error(LOADING_ERROR.PROXY_FAILED)
		}

		if (PROXY_STARTING_STATES.has(status)) {
			await sleep(PROXY_POLL_INTERVAL_MS)
			continue
		}

		await sleep(PROXY_POLL_INTERVAL_MS)
	}

	throw Error(t('richdocuments', 'Starting the built-in CODE server is taking longer than expected'))
}
