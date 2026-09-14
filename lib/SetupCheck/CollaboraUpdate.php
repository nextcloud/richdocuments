<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\SetupCheck;

use OCA\Richdocuments\Service\CapabilitiesService;
use OCP\Http\Client\IClientService;
use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\SetupCheck\ISetupCheck;
use OCP\SetupCheck\SetupResult;
use Psr\Log\LoggerInterface;

class CollaboraUpdate implements ISetupCheck {

	public function __construct(
		protected IL10N $l10n,
		protected CapabilitiesService $capabilitiesService,
		protected IURLGenerator $urlGenerator,
		protected IClientService $clientService,
		protected LoggerInterface $logger,
	) {
	}

	public function getCategory(): string {
		return 'office';
	}

	public function getName(): string {
		return $this->l10n->t('Collabora server version check');
	}

	public function run(): SetupResult {
		$client = $this->clientService->newClient();

		$url = null;
		if ($this->capabilitiesService->isCode()) {
			$url = 'https://rating.collaboraonline.com/UpdateCheck';
		}

		if ($this->capabilitiesService->isEnterprise()) {
			$url = 'https://rating.collaboraonline.com/UpdateCheck?product=cool';
		}

		if ($url === null) {
			return SetupResult::success();
		}

		// FIXME internet conection check config

		$response = $client->get($url, ['timeout' => 5]);
		$response = json_decode($response->getBody(), true);
		$latestVersion = $response['coolwsd_version'] ?? null;

		$installedVersion = $this->capabilitiesService->getProductVersion();

		if ($latestVersion !== null && version_compare($latestVersion, $installedVersion, '>')) {
			return SetupResult::warning($this->l10n->t('Collabora server version is out of date. Currently using %s, new version is available: %s', [$installedVersion, $latestVersion]));
		}

		return SetupResult::success();
	}
}
