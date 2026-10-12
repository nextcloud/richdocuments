<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\SetupCheck;

use OCA\Richdocuments\Service\CapabilitiesService;
use OCP\Http\Client\IClientService;
use OCP\ICacheFactory;
use OCP\IConfig;
use OCP\IL10N;
use OCP\SetupCheck\ISetupCheck;
use OCP\SetupCheck\SetupResult;
use Psr\Log\LoggerInterface;

class CollaboraUpdate implements ISetupCheck {
	private const CACHE_TTL = 6 * 3600;

	public function __construct(
		protected IL10N $l10n,
		protected CapabilitiesService $capabilitiesService,
		protected IConfig $config,
		protected IClientService $clientService,
		protected ICacheFactory $cacheFactory,
		protected LoggerInterface $logger,
	) {
	}

	#[\Override]
	public function getCategory(): string {
		return 'office';
	}

	#[\Override]
	public function getName(): string {
		return $this->l10n->t('Collabora server version check');
	}

	#[\Override]
	public function run(): SetupResult {
		$installedVersion = $this->capabilitiesService->getProductVersion();
		if ($installedVersion === null || !$this->config->getSystemValueBool('has_internet_connection', true)) {
			return SetupResult::success();
		}

		$url = match (true) {
			$this->capabilitiesService->isCode() => 'https://rating.collaboraonline.com/UpdateCheck',
			$this->capabilitiesService->isEnterprise() => 'https://rating.collaboraonline.com/UpdateCheck?product=cool',
			default => null,
		};
		if ($url === null) {
			return SetupResult::success();
		}

		$cache = $this->cacheFactory->createDistributed('richdocuments');
		$cacheKey = 'latest_version_' . md5($url);
		$latestVersion = $cache->get($cacheKey);
		if ($latestVersion === null) {
			try {
				$response = $this->clientService->newClient()->get($url, ['timeout' => 5]);
				$latestVersion = (string)(json_decode((string)$response->getBody(), true)['coolwsd_version'] ?? '');
			} catch (\Exception $e) {
				$this->logger->info('Failed to fetch latest Collabora version', ['exception' => $e]);
				return SetupResult::info($this->l10n->t('Could not check for Collabora server updates'));
			}
			$cache->set($cacheKey, $latestVersion, self::CACHE_TTL);
		}

		if ($latestVersion !== '' && version_compare($latestVersion, $installedVersion, '>')) {
			return SetupResult::warning($this->l10n->t('Collabora server version is out of date. Currently using %s, new version is available: %s', [$installedVersion, $latestVersion]));
		}

		return SetupResult::success();
	}
}
