/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export {}

declare global {
	interface OC {
		appswebroots: {
			richdocumentscode?: string;
			richdocumentscode_arm64?: string;
		};
		isUserAdmin(): boolean;
	}

	const OC: OC
}
