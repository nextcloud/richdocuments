<?php
/**
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Settings;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Service\CapabilitiesService;
use OCA\Richdocuments\Service\InitialStateService;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\IConfig;
use OCP\Settings\ISettings;

class Personal implements ISettings {
	public function __construct(
		private IConfig $config,
		private AppConfig $appConfig,
		private CapabilitiesService $capabilitiesService,
		private InitialStateService $initialState,
		private ?string $userId,
	) {
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
				'hasDocumentSigningSupport' => $this->capabilitiesService->hasDocumentSigningSupport(),
				'documentSigningCert' => $this->config->getUserValue($this->userId, 'richdocuments', 'documentSigningCert', ''),
				'documentSigningKey' => $this->config->getUserValue($this->userId, 'richdocuments', 'documentSigningKey', ''),
				'documentSigningCa' => $this->config->getUserValue($this->userId, 'richdocuments', 'documentSigningCa', ''),
				'hasZoteroSupport' => $this->capabilitiesService->hasZoteroSupport(),
				'zoteroAPIKey' => $this->config->getUserValue($this->userId, 'richdocuments', 'zoteroAPIKey', ''),
				'publicWopiUrl' => $this->appConfig->getCollaboraUrlPublic(),
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
