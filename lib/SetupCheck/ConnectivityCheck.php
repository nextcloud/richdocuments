<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\SetupCheck;

use OCA\Richdocuments\Service\ConnectivityService;
use OCP\Http\Client\IClientService;
use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\SetupCheck\ISetupCheck;
use OCP\SetupCheck\SetupResult;
use Psr\Log\LoggerInterface;

class ConnectivityCheck implements ISetupCheck {

	public function __construct(
		protected IL10N $l10n,
		protected ConnectivityService $connectivityService,
		protected IURLGenerator $urlGenerator,
		protected IClientService $clientService,
		protected LoggerInterface $logger,
	) {
	}

	public function getCategory(): string {
		return 'office';
	}

	public function getName(): string {
		return $this->l10n->t('Collabora server connectivity check');
	}

	public function run(): SetupResult {
		try {
			$this->connectivityService->test();
		} catch (\Exception $e) {
			return SetupResult::error($this->l10n->t('Collabora is not configured properly:') . ' ' . $e->getMessage());
		}

		return SetupResult::success();
	}
}
