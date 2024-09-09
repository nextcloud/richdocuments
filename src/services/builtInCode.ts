/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { generateUrl } from '@nextcloud/router'
import { getCapabilities, capabilitiesService } from './capabilities'
import axios from '@nextcloud/axios'
import { showError } from '@nextcloud/dialogs'

const wopiUrl = getCapabilities()?.config?.wopi_url
const isConfigured = wopiUrl !== ''
const appWebRoots = window._oc_appswebroots
const isCodeInstalled = appWebRoots?.richdocumentscode !== undefined || appWebRoots?.richdocumentscode_arm64 !== undefined
const shouldAutoSetupCode = !isConfigured && isCodeInstalled

const autoSetupBuiltInCodeServerIfNeeded = async () => {
	if (!isCodeInstalled || !shouldAutoSetupCode || !window.oc_isadmin) {
		return
	}

	const result = await axios.get(generateUrl('apps/richdocuments/autosetup'))
	if (result?.data?.capabilities) {
		capabilitiesService.setCapabilities(result?.data?.capabilities)
	} else {
		showError('Could not autoconfigure built-in CODE server, click to open the admin settings for further details: ' + result?.data?.message, {
			onClick: () => {
				window.location.href = generateUrl('settings/admin/richdocuments')
			},
		})
	}
}

export {
	autoSetupBuiltInCodeServerIfNeeded,
}
