<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Service;

use OCA\Richdocuments\Db\Wopi;
use OCP\IRequest;
use OCP\Security\RateLimiting\ILimiter;
use OCP\Security\RateLimiting\IRateLimitExceededException;

class WopiRateLimitService {
	public function __construct(
		private ILimiter $limiter,
		private IRequest $request,
	) {
	}

	/**
	 * @throws IRateLimitExceededException
	 */
	public function registerRequest(Wopi $wopi, string $action): void {
		$this->limiter->registerAnonRequest(
			'richdocuments::wopi::' . $action . '::' . $wopi->getId(),
			10,
			120,
			$this->request->getRemoteAddress()
		);
	}
}
