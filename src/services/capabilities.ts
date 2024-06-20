/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { getCapabilities as getInitialCapabilities } from '@nextcloud/capabilities'

interface OfficeCapabilities {
	version: string;
	mimetypes: string[];
	config: {
		wopi_url: string;
	}
}
interface AllCapabilities {
	richdocuments: OfficeCapabilities;
}

const initialCapabilities: AllCapabilities = <AllCapabilities>getInitialCapabilities()

class CapabilitiesService {

	private capabilities: OfficeCapabilities = (initialCapabilities as AllCapabilities).richdocuments

	getCapabilities(): OfficeCapabilities|null {
		return this.capabilities
	}

	setCapabilities(capabilities: OfficeCapabilities) {
		this.capabilities = capabilities
	}

	updateCapability(key: string, value: string) {
		this.capabilities[key] = value
	}

}

const capabilitiesService = new CapabilitiesService()

const getCapabilities = (): OfficeCapabilities => {
	return capabilitiesService.getCapabilities()
}

export { getCapabilities, capabilitiesService }
