<?php
/**
 * SPDX-FileCopyrightText: 2016 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Settings;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Service\CapabilitiesService;
use OCA\Richdocuments\Service\DemoService;
use OCA\Richdocuments\Service\FontService;
use OCA\Richdocuments\Service\InitialStateService;
use OCA\Richdocuments\TemplateManager;
use OCA\Richdocuments\TokenManager;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\IConfig;
use OCP\Settings\ISettings;

class Admin implements ISettings {
	public function __construct(
		private IConfig $config,
		private AppConfig $appConfig,
		private TemplateManager $manager,
		private CapabilitiesService $capabilitiesService,
		private DemoService $demoService,
		private FontService $fontService,
		private InitialStateService $initialStateService,
		private TokenManager $tokenManager,
	) {
	}

	public function getForm(): TemplateResponse {
		$this->initialStateService->provideCapabilities();
		$this->initialStateService->provideAdminSettings();

		return new TemplateResponse(
			'richdocuments',
			'admin',
			[
				'settings' => [
					'wopi_url' => $this->appConfig->getCollaboraUrlInternal(),
					'public_wopi_url' => $this->appConfig->getCollaboraUrlPublic(),
					'wopi_callback_url' => $this->appConfig->getNextcloudUrl(),
					'wopi_allowlist' => $this->config->getAppValue('richdocuments', 'wopi_allowlist'),
					'edit_groups' => $this->config->getAppValue('richdocuments', 'edit_groups'),
					'use_groups' => $this->config->getAppValue('richdocuments', 'use_groups'),
					'doc_format' => $this->config->getAppValue('richdocuments', 'doc_format', 'ooxml'),
					'external_apps' => $this->config->getAppValue('richdocuments', 'external_apps'),
					'canonical_webroot' => $this->config->getAppValue('richdocuments', 'canonical_webroot'),
					'disable_certificate_verification' => $this->config->getAppValue('richdocuments', 'disable_certificate_verification', '') === 'yes',
					'settings' => $this->appConfig->getAppSettings(),
					'demo_servers' => $this->demoService->fetchDemoServers(),
					'web_server' => strtolower($_SERVER['SERVER_SOFTWARE']),
					'os_family' => PHP_VERSION_ID >= 70200 ? PHP_OS_FAMILY : PHP_OS,
					'platform' => php_uname('m'),
					'fonts' => $this->fontService->getFontFileNames(),
					'esignature_base_url' => $this->config->getAppValue('richdocuments', 'esignature_base_url'),
					'esignature_client_id' => $this->config->getAppValue('richdocuments', 'esignature_client_id'),
					'esignature_secret' => $this->config->getAppValue('richdocuments', 'esignature_secret'),
					'hasSettingIframeSupport' => $this->capabilitiesService->hasSettingIframeSupport(),
					'setting_iframe_url' => $this->tokenManager->getUrlSrcForMimeType('Settings'),
				],
			],
			'blank'
		);
	}

	public function getSection(): string {
		return 'richdocuments';
	}

	public function getPriority(): int {
		return 0;
	}
}
