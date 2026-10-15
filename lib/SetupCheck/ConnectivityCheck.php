<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\SetupCheck;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Service\ConnectivityService;
use OCP\IL10N;
use OCP\SetupCheck\ISetupCheck;
use OCP\SetupCheck\SetupResult;

class ConnectivityCheck implements ISetupCheck {

	public function __construct(
		protected IL10N $l10n,
		protected AppConfig $appConfig,
		protected ConnectivityService $connectivityService,
	) {
	}

	#[\Override]
	public function getCategory(): string {
		return 'office';
	}

	#[\Override]
	public function getName(): string {
		return $this->l10n->t('Collabora server connectivity check');
	}

	#[\Override]
	public function run(): SetupResult {
		if ($this->appConfig->getCollaboraUrlInternal() === '') {
			return SetupResult::success();
		}

		try {
			$this->connectivityService->test();
		} catch (\Throwable $e) {
			return SetupResult::error($this->l10n->t('Collabora is not configured properly:') . ' ' . $e->getMessage());
		}

		return SetupResult::success();
	}
}
