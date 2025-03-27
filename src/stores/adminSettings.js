/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineStore } from 'pinia'

export const useAdminSettingsStore = defineStore('adminSettings', {
	state: () => ({
		fonts: [],
	}),
})
