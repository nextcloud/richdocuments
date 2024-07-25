<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

namespace OCA\Richdocuments\Service;

class RemoteOptionsService {
	public const REMOTE_TIMEOUT_DEFAULT = 5;

	public static function getDefaultOptions(int $timeout = self::REMOTE_TIMEOUT_DEFAULT): array {
		return [
			'timeout' => $timeout,
			'nextcloud' => [
				'allow_local_address' => true,
			]
		];
	}

}
