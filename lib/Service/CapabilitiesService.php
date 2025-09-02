<?php
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Service;

use OCA\Richdocuments\AppInfo\Application;
use OCP\App\IAppManager;
use OCP\Files\AppData\IAppDataFactory;
use OCP\Http\Client\IClient;
use OCP\Http\Client\IClientService;
use OCP\IAppConfig;
use OCP\ICacheFactory;
use OCP\IConfig;
use OCP\IL10N;
use Psr\Log\LoggerInterface;

class CapabilitiesService extends CachedRequestService {

	private ?array $capabilities = null;

	public function __construct(
		private IClientService $clientService,
		private ICacheFactory $cacheFactory,
		private IAppDataFactory $appDataFactory,
		private IAppConfig $appConfig,
		private LoggerInterface $logger,
		private IConfig $config,
		private IAppManager $appManager,
		private IL10N $l10n,
	) {
		parent::__construct(
			$this->clientService,
			$this->cacheFactory,
			$this->appDataFactory,
			$this->appConfig,
			$this->logger,
			'capabilities',
		);
	}

	public function getCapabilities() {
		if (!$this->capabilities) {
			$this->capabilities = $this->getParsedCapabilities();
		}

		if (!is_array($this->capabilities)) {
			return [];
		}

		return $this->capabilities;
	}

	public function getProductVersion(): ?string {
		return $this->getCapabilities()['productVersion'] ?? null;
	}

	public function getProductHash(): ?string {
		return $this->getCapabilities()['productVersionHash'] ?? null;
	}

	public function getServerProductName(): ?string {
		return $this->getCapabilities()['productName'] ?? null;
	}

	public function hasNextcloudBranding(): bool {
		return $this->isVersionAtLeast('21.11');
	}

	public function hasDrawSupport(): bool {
		return $this->isVersionAtLeast('6.4.7');
	}

	public function hasTemplateSource(): bool {
		return $this->getCapabilities()['hasTemplateSource'] ?? false;
	}

	public function hasZoteroSupport(): bool {
		return $this->getCapabilities()['hasZoteroSupport'] ?? false;
	}

	public function hasSettingIframeSupport(): bool {
		return $this->getCapabilities()['hasSettingIframeSupport'] ?? false;
	}

	public function hasWASMSupport(): bool {
		return $this->getCapabilities()['hasWASMSupport'] ?? false;
	}

	public function hasDocumentSigningSupport(): bool {
		return $this->getCapabilities()['hasDocumentSigningSupport'] ?? false;
	}

	public function hasFormFilling(): bool {
		return $this->isVersionAtLeast('24.04.5.2');
	}

	private function isVersionAtLeast(string $version): bool {
		$productVersion = $this->getCapabilities()['productVersion'] ?? '0.0.0.0';
		return version_compare($productVersion, $version, '>=');
	}

	public function getProductName(): string {
		$theme = $this->config->getAppValue(Application::APPNAME, 'theme', 'nextcloud');

		if (isset($this->capabilitites['productName']) && $theme !== 'nextcloud') {
			return $this->capabilitites['productName'];
		}

		return $this->l10n->t('Nextcloud Office');
	}

	public function hasOtherOOXMLApps(): bool {
		if ($this->appManager->isEnabledForUser('officeonline')) {
			return true;
		}

		if ($this->appManager->isEnabledForUser('onlyoffice')) {
			return true;
		}

		return false;
	}

	public function getCapabilitiesEndpoint(): ?string {
		$remoteHost = $this->config->getAppValue('richdocuments', 'wopi_url');
		if ($remoteHost === '') {
			return null;
		}
		return rtrim($remoteHost, '/') . '/hosting/capabilities';
	}

	protected function sendRequest(IClient $client): string {
		$response = $client->get($this->getCapabilitiesEndpoint(), $this->getDefaultRequestOptions());
		return (string)$response->getBody();
	}

	private function getParsedCapabilities() {
		$response = $this->get();
		if (!$response) {
			return [];
		}
		return json_decode($response, true);
	}
}
