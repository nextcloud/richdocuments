<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

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
	private bool $hasProvidedOptions = false;

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

	/**
	 * Provides the initial state for a document editing session.
	 *
	 * @param Wopi $wopi The WOPI session object containing access token and file metadata
	 * @param array $params Document parameters that override defaults. Required parameters:
	 *                      - urlsrc: WOPI source URL (will fail without it)
	 *                      - fileId: The file identifier (backend cannot locate file without it)
	 *                      - token: Access token for authentication (will fail without it)
	 *
	 *                      Parameters with safe fallbacks (possibly degraded functionality if omitted):
	 *                      - title: Document title/filename (default: '' - cosmetic only)
	 *                      - path: File path relative to user folder (default: '' - affects context)
	 *                      - permissions: File permissions bitmask (default: '' - read-only mode)
	 *                      - token_ttl: Token time-to-live in seconds (default: 0)
	 *
	 *                      Optional parameters:
	 *                      - isPublicShare: Whether accessed via public share (default: false)
	 *                      - directEdit: Whether in direct edit mode (default: false)
	 *                      - directGuest: Whether direct guest access (default: false)
	 *                      - hideCloseButton: Whether to hide close button
	 *                      - target: Optional bookmark/section target
	 *                      - userId: User identifier (may include remote server for federation)
	 * @return void
	 * @throws \InvalidArgumentException if critical parameters are missing
	 */	
	public function provideDocument(Wopi $wopi, array $params): void {
		$this->provideCapabilities();

		// These keys are critical; the frontend will fail to load or authenticate properly if missing or empty.
		if (!isset($params['urlsrc']) || $params['urlsrc'] === '') {
			throw new \InvalidArgumentException('urlsrc is required for editor initialization');
		}
		if (!isset($params['fileId']) || $params['fileId'] === '') {
			throw new \InvalidArgumentException('fileId is required to identify the document');
		}
		if (!isset($params['token']) || $params['token'] === '') {
			throw new \InvalidArgumentException('token is required for authentication');
		}

		// merge provided parameters with default parameters
		$this->initialState->provideInitialState('document', $this->prepareParams($params));

		$this->initialState->provideInitialState('wopi', $wopi);
		// Options may have been set already, but ensure anyway.
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

	/**
	 * Parameters for a document editing session.
	 * Merges defaults with supplied params.
	 * Does not validate parameters; any validation should happen at the call site.
	 */
	public function prepareParams(array $params): array {
		$defaults = [
			'instanceId' => $this->config->getSystemValue('instanceid'),
			'canonical_webroot' => $this->config->getAppValue(Application::APPNAME, 'canonical_webroot', ''),
			'userId' => $this->userId, // @todo: confirm this is reasonable for all circumstances
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

	/**
	 * Frontend options.
	 */
	private function provideOptions(): void {
		if ($this->hasProvidedOptions) {
			return;
		}

		$this->initialState->provideInitialState('loggedInUser', $this->userId ?? false);
		$this->setThemeOptions();
		$this->setLogoOptions();
		$this->initialState->provideInitialState('open_local_editor', $this->config->getAppValue(Application::APPNAME, 'open_local_editor', 'yes') === 'yes');

		$this->hasProvidedOptions = true;
	}

	private function setThemeOptions(): void {
		$this->initialState->provideInitialState(
			'theme',
			$this->config->getAppValue(Application::APPNAME, 'theme', 'nextcloud')
		);
		$this->initialState->provideInitialState(
			'uiDefaults',
			['UIMode' => $this->config->getAppValue(Application::APPNAME, 'uiDefaults-UIMode', 'notebookbar')]
		);
	}

	private function setLogoOptions(): void {
		$logoType = false;
		if ($this->imageManager->hasImage('logoheader')) { // prefer custom header logo
			$logoType = 'logoheader';
		} elseif ($this->imageManager->hasImage('logo')) {
			$logoType = 'logo';
		}
		$logoUrl = $logoType ? $this->imageManager->getImageUrlAbsolute($logoType) : false;
		$this->initialState->provideInitialState('theming-customLogo', $logoUrl);
	}
}
