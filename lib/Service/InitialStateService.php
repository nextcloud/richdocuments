<?php
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\Richdocuments\Service;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\Db\Wopi;
use OCA\Richdocuments\TemplateManager;
use OCA\Theming\ImageManager;
use OCP\AppFramework\Services\IInitialState;
use OCP\Defaults;
use OCP\IConfig;
use OCP\IURLGenerator;

class InitialStateService {
	private bool $hasProvidedCapabilities = false;

	public function __construct(
		private IInitialState $initialState,
		private AppConfig $appConfig,
		private ImageManager $imageManager,
		private TemplateManager $templateManager,
		private CapabilitiesService $capabilitiesService,
		private IURLGenerator $urlGenerator,
		private Defaults $themingDefaults,
		private IConfig $config,
		private ?string $userId,
	) {
	}

	public function provideCapabilities(): void {
		if ($this->hasProvidedCapabilities) {
			return;
		}

		$this->initialState->provideInitialState('productName', $this->capabilitiesService->getProductName());
		$this->initialState->provideInitialState('hasDrawSupport', $this->capabilitiesService->hasDrawSupport());
		$this->initialState->provideInitialState('hasNextcloudBranding', $this->capabilitiesService->hasNextcloudBranding());
		$this->initialState->provideInitialState('instanceId', $this->config->getSystemValue('instanceid'));
		$this->initialState->provideInitialState('wopi_callback_url', $this->appConfig->getNextcloudUrl());

		$this->provideOptions();

		$this->hasProvidedCapabilities = true;
	}

	public function provideDocument(Wopi $wopi, array $params): void {
		$this->provideCapabilities();

		$this->initialState->provideInitialState('document', $this->prepareParams($params));

		$this->initialState->provideInitialState('wopi', $wopi);

		$this->provideOptions();
	}

	public function providePresentation(bool $startPresentation = false): void {
		$this->initialState->provideInitialState('startPresentation', $startPresentation);
	}

	public function provideAdminSettings(): void {
		$this->initialState->provideInitialState('adminSettings', [
			'templatesAvailable' => $this->capabilitiesService->hasTemplateSource(),
			'templates' => $this->templateManager->getSystemFormatted(),
		]);
	}

	public function prepareParams(array $params): array {
		$defaults = [
			'instanceId' => $this->config->getSystemValue('instanceid'),
			'canonical_webroot' => $this->config->getAppValue(Application::APPNAME, 'canonical_webroot', ''),
			'userId' => $this->userId,
			'token' => '',
			'token_ttl' => 0,
			'directEdit' => false,
			'directGuest' => false,
			'path' => '',
			'urlsrc' => '',
			'fileId' => '',
			'title' => '',
			'permissions' => '',
			'isPublicShare' => false,
		];

		return array_merge($defaults, $params);
	}

	private function provideOptions(): void {
		$this->initialState->provideInitialState('loggedInUser', $this->userId ?? false);

		$this->initialState->provideInitialState('theme', $this->config->getAppValue(Application::APPNAME, 'theme', 'nextcloud'));
		$this->initialState->provideInitialState('uiDefaults', [
			'UIMode' => $this->config->getAppValue(Application::APPNAME, 'uiDefaults-UIMode', 'notebookbar')
		]);

		$logoType = 'logoheader';
		$logoSet = $this->imageManager->hasImage($logoType);
		if (!$logoSet) {
			$logoType = 'logo';
			$logoSet = $this->imageManager->hasImage($logoType);
		}

		$logo = $logoSet ? $this->imageManager->getImageUrlAbsolute($logoType) : false;

		$this->initialState->provideInitialState('theming-customLogo', $logo);
		$this->initialState->provideInitialState('open_local_editor', $this->config->getAppValue(Application::APPNAME, 'open_local_editor', 'yes') === 'yes');
	}
}
