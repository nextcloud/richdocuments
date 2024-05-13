<?php
/**
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Settings;

use OCA\Richdocuments\Service\CapabilitiesService;
use OCA\Richdocuments\Service\InitialStateService;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\IConfig;
use OCP\Settings\ISettings;

class Personal implements ISettings {
	/** @var IConfig Config */
	private $config;

	/** @var CapabilitiesService */
	private $capabilitiesService;

	/** @var InitialStateService */
	private $initialState;

	/** @var string */
	private $userId;

	public function __construct(IConfig $config, CapabilitiesService $capabilitiesService, InitialStateService $initialStateService, $userId) {
		$this->config = $config;
		$this->capabilitiesService = $capabilitiesService;
		$this->initialState = $initialStateService;
		$this->userId = $userId;
	}

	/** @psalm-suppress InvalidNullableReturnType */
	public function getForm() {
		if (!$this->capabilitiesService->hasTemplateSource()) {
			/** @psalm-suppress NullableReturnStatement */
			return null;
		}

		$this->initialState->provideCapabilities();
		return new TemplateResponse(
			'richdocuments',
			'personal',
			[
				'templateFolder' => $this->config->getUserValue($this->userId, 'richdocuments', 'templateFolder', ''),
				'hasZoteroSupport' => $this->capabilitiesService->hasZoteroSupport(),
				'zoteroAPIKey' => $this->config->getUserValue($this->userId, 'richdocuments', 'zoteroAPIKey', '')
			],
			'blank'
		);
	}

	public function getSection() {
		if (!$this->capabilitiesService->hasTemplateSource()) {
			return null;
		}

		return 'richdocuments';
	}

	public function getPriority() {
		return 0;
	}
}
