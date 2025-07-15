<?php
/**
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments;

use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\Service\FederationService;
use OCP\App\IAppManager;
use OCP\AppFramework\Services\IAppConfig;
use OCP\GlobalScale\IConfig as GlobalScaleConfig;
use OCP\IConfig;

class AppConfig {
	// URL that Nextcloud will use to connect to Collabora
	public const WOPI_URL = 'wopi_url';
	// URL that the browser will use to connect to Collabora (inherited from the discovery endpoint of Collabora,
	// either wopi_url or what is configured as server_name)
	public const PUBLIC_WOPI_URL = 'public_wopi_url';
	// URL that should be used by Collabora to connect back to Nextcloud (defaults to the users browser host)
	public const WOPI_CALLBACK_URL = 'wopi_callback_url';

	public const FEDERATION_USE_TRUSTED_DOMAINS = 'federation_use_trusted_domains';

	public const SYSTEM_GS_TRUSTED_HOSTS = 'gs.trustedHosts';

	public const READ_ONLY_FEATURE_LOCK = 'read_only_feature_lock';

	// Load additional mime types (like images) on public share links when hide download is enabled
	// Default: 'no', set to 'yes' to enable
	public const USE_SECURE_VIEW_ADDITIONAL_MIMES = 'use_secure_view_additional_mimes';

	private array $defaults = [
		'wopi_url' => '',
		'timeout' => 15,
		'watermark_text' => '{userId}',
		'watermark_allGroupsList' => [],
		'watermark_allTagsList' => [],
		'watermark_linkTagsList' => [],
		'token_ttl' => 36000, // 10 hours
		'doc_format' => 'ooxml',
	];

	public const WATERMARK_APP_NAMESPACE = 'files';

	public const APP_SETTING_TYPES = [
		'watermark_allGroupsList' => 'array',
		'watermark_allTagsList' => 'array',
		'watermark_linkTagsList' => 'array'
	];

	private const INTEGER_LIST_KEYS = [
		'watermark_allTagsList' => true,
		'watermark_linkTagsList' => true,
	];

	public function __construct(
		private IConfig $config,
		private IAppConfig $appConfig,
		private IAppManager $appManager,
		private GlobalScaleConfig $globalScaleConfig,
	) {
	}

	public function getAppNamespace($key) {
		if (str_starts_with($key, 'watermark_')) {
			return self::WATERMARK_APP_NAMESPACE;
		}
		return Application::APPNAME;
	}

	/**
	 * Get a value by key
	 * @param string $key
	 * @param string|null $defaultValue The fallback value if no configuration and global fallback was found.
	 * @return string
	 */
	public function getAppValue($key, $defaultValue = null) {
		if (array_key_exists($key, $this->defaults)) {
			$defaultValue = $this->defaults[$key];
		}
		return $this->config->getAppValue($this->getAppNamespace($key), $key, $defaultValue);
	}

	/**
	 * @param $key
	 * @return list<string>|string
	 */
	public function getAppValueArray($key) {
		$value = $this->config->getAppValue($this->getAppNamespace($key), $key, []);
		if (array_key_exists($key, self::APP_SETTING_TYPES) && self::APP_SETTING_TYPES[$key] === 'array') {
			$value = $value !== '' ? explode(',', $value) : [];
		}
		return $value;
	}

	/**
	 * Set a value by key
	 * @param string $key
	 * @param string $value
	 * @return void
	 */
	public function setAppValue($key, $value) {
		$this->config->setAppValue($this->getAppNamespace($key), $key, $value);
	}

	/**
	 * Get all app settings
	 * @return array
	 */
	public function getAppSettings() {
		$result = [];
		$keys = $this->config->getAppKeys(Application::APPNAME);
		foreach ($keys as $key) {
			$value = $this->getAppValueArray($key);
			$value = $value === 'yes' ? true : $value;
			$result[$key] = $value === 'no' ? false : $value;
		}

		$keys = $this->config->getAppKeys(self::WATERMARK_APP_NAMESPACE);
		foreach ($keys as $key) {
			if (str_starts_with($key, 'watermark_')) {
				$value = $this->getAppValueArray($key);
				$value = $value === 'yes' ? true : $value;
				$result[$key] = $value === 'no' ? false : $value;
			}
			if (!empty(self::INTEGER_LIST_KEYS[$key])) {
				$result[$key] = array_map('intval', $result[$key] ?? []);
			}
		}

		return $result;
	}

	/**
	 * Returns a list of trusted domains from the gs.trustedHosts config
	 */
	public function getGlobalScaleTrustedHosts(): array {
		return $this->config->getSystemValue(self::SYSTEM_GS_TRUSTED_HOSTS, []);
	}

	/**
	 * Returns if federation trusted domains should be always allowed for federated editing
	 */
	public function isTrustedDomainAllowedForFederation(): bool {
		return $this->config->getAppValue(Application::APPNAME, self::FEDERATION_USE_TRUSTED_DOMAINS, 'no') === 'yes';
	}

	public function getCollaboraUrlPublic(): string {
		return rtrim($this->config->getAppValue(Application::APPNAME, self::PUBLIC_WOPI_URL, $this->getCollaboraUrlInternal()), '/');
	}

	public function getCollaboraUrlInternal(): string {
		return rtrim($this->config->getAppValue(Application::APPNAME, self::WOPI_URL, ''), '/');
	}

	public function getNextcloudUrl(): string {
		return rtrim($this->config->getAppValue(Application::APPNAME, self::WOPI_CALLBACK_URL, ''), '/');
	}

	public function getDisableCertificateValidation(): bool {
		return $this->config->getAppValue(Application::APPNAME, 'disable_certificate_verification', 'no') === 'yes';
	}

	public function getUseGroups(): ?array {
		$groups = $this->config->getAppValue(Application::APPNAME, 'use_groups', '');
		if ($groups === '') {
			return null;
		}

		return $this->splitGroups($groups);
	}

	public function getEditGroups(): ?array {
		$groups = $this->config->getAppValue(Application::APPNAME, 'edit_groups', '');
		if ($groups === '') {
			return null;
		}

		return $this->splitGroups($groups);
	}

	public function isReadOnlyFeatureLocked(): bool {
		return $this->config->getAppValue(Application::APPNAME, self::READ_ONLY_FEATURE_LOCK, 'no') === 'yes';
	}

	private function splitGroups(string $groupString): array {
		return explode('|', $groupString);
	}

	/**
	 * Allow to override values from the WOPI checkFileInfo response through app config
	 */
	public function getWopiOverride(): array {
		$wopiOverride = $this->config->getAppValue(Application::APPNAME, 'wopi_override', '');
		if ($wopiOverride !== '') {
			$wopiOverride = json_decode($wopiOverride, true);
			return $wopiOverride ?: [];
		}
		return [];
	}

	public function useSecureViewAdditionalMimes(): bool {
		return $this->config->getAppValue(Application::APPNAME, self::USE_SECURE_VIEW_ADDITIONAL_MIMES, 'no') === 'yes';
	}

	public function getMimeTypes(): array {
		return array_merge(
			Capabilities::MIMETYPES,
			Capabilities::MIMETYPES_MSOFFICE,
			Capabilities::MIMETYPES_OPTIONAL,
		);
	}

	public function getDomainList(): array {
		$urls = array_merge(
			[ $this->domainOnly($this->getCollaboraUrlPublic()) ],
			$this->getFederationDomains(),
			$this->getGSDomains()
		);

		return array_map(fn ($url) => idn_to_ascii($url), array_filter($urls));
	}

	private function getFederationDomains(): array {
		if (!$this->appManager->isEnabledForUser('federation')) {
			return [];
		}

		$federationService = \OCP\Server::get(FederationService::class);
		$trustedNextcloudDomains = array_filter(array_map(fn ($server) => $federationService->isTrustedRemote($server) ? $server : null, $federationService->getTrustedServers()));

		$trustedCollaboraDomains = array_filter(array_map(function ($server) use ($federationService) {
			try {
				return $federationService->getRemoteCollaboraURL($server);
			} catch (\Exception) {
				// If there is no remote collabora server we can just skip that
				return null;
			}
		}, $trustedNextcloudDomains));

		return array_map(fn ($url) => $this->domainOnly($url), array_merge($trustedNextcloudDomains, $trustedCollaboraDomains));
	}

	public function isPreviewGenerationEnabled(): bool {
		return $this->appConfig->getAppValueBool('preview_generation', true);
	}

	private function getGSDomains(): array {
		if (!$this->globalScaleConfig->isGlobalScaleEnabled()) {
			return [];
		}

		return $this->getGlobalScaleTrustedHosts();
	}

	/**
	 * Strips the path and query parameters from the URL.
	 */
	public function domainOnly(string $url): string {
		$parsedUrl = parse_url($url);
		$scheme = isset($parsedUrl['scheme']) ? $parsedUrl['scheme'] . '://' : '';
		$host = $parsedUrl['host'] ?? '';
		$port = isset($parsedUrl['port']) ? ':' . $parsedUrl['port'] : '';
		return "$scheme$host$port";
	}
}
