<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\SetupCheck;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Service\DiscoveryService;
use OCP\IL10N;
use OCP\SetupCheck\ISetupCheck;
use OCP\SetupCheck\SetupResult;

class ProofKeyCheck implements ISetupCheck {
	private const DOCS_URL = 'https://sdk.collaboraonline.com/docs/advanced_integration.html#wopi-proof';

	public function __construct(
		protected IL10N $l10n,
		protected AppConfig $appConfig,
		protected DiscoveryService $discoveryService,
	) {
	}

	#[\Override]
	public function getCategory(): string {
		return 'office';
	}

	#[\Override]
	public function getName(): string {
		return $this->l10n->t('Collabora WOPI proof keys');
	}

	#[\Override]
	public function run(): SetupResult {
		if ($this->appConfig->getCollaboraUrlInternal() === '' || $this->discoveryService->hasProofKey()) {
			return SetupResult::success();
		}

		return SetupResult::warning(
			$this->l10n->t('The Collabora server does not provide WOPI proof keys, so requests from it cannot be verified. Generate proof keys on the Collabora server.'),
			self::DOCS_URL,
		);
	}
}
