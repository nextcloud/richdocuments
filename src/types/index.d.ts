/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export {}

declare global {
    interface Window {
		oc_isadmin: boolean;
        _oc_appswebroots: {
            richdocumentscode: string|undefined;
            richdocumentscode_arm64: string|undefined;
        }
	}
}
