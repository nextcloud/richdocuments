<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

namespace OCA\Richdocuments\Service;

use OCP\IAppConfig;

class RemoteOptionsService {
	public const REMOTE_TIMEOUT_DEFAULT = 5;

	public static function getDefaultOptions(int $timeout = self::REMOTE_TIMEOUT_DEFAULT): array {
		$options = [
			'timeout' => $timeout,
			'nextcloud' => [
				'allow_local_address' => true,
			]
		];

		if (\OCP\Server::get(IAppConfig::class)->getValueString('richdocuments', 'disable_certificate_verification') === 'yes') {
			$options['verify'] = false;
		}

		return $options;
	}
}
