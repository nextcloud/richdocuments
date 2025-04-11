/*
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { loadState } from '@nextcloud/initial-state'

class ConfigService {

	private values: {[name: string]: any}

	constructor() {
		this.values = {
			wopi_callback_url: loadState('richdocuments', 'wopi_callback_url', ''),
			...loadState('richdocuments', 'document', {}),
		}
	}

	update(key: string, value: any) {
		this.values[key] = value
	}

	get(key: string): any {
		return this.values[key]
	}

}

const Config = new ConfigService()

export default Config
