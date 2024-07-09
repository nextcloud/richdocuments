<?php

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Service;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\TemplateManager;
use OCP\Files\Node;
use OCP\Http\Client\IClientService;

class TemplateFieldService {
	private IClientService $clientService;
	private AppConfig $appConfig;
	private TemplateManager $templateManager;

	public function __construct(
		IClientService $clientService,
		AppConfig $appConfig,
		TemplateManager $templateManager
	) {
		$this->clientService = $clientService;
		$this->appConfig = $appConfig;
		$this->templateManager = $templateManager;
	}

	public function extractFields(Node|int $file): ?array {
		if (is_int($file)) {
			$file = $this->templateManager->get($file);
		}

		$collaboraUrl = $this->appConfig->getCollaboraUrlInternal();
		$httpClient = $this->clientService->newClient();
		
		try {
			$response = $httpClient->get(
				$collaboraUrl . "/cool/extract-doc-structure",
				['query' => ['limit' => 'content-control']]
			);

			return [$response->getBody()];
		} catch (\Exception $e) {
			// handle exception
			return null;
		}
	}

	public function fillFields(Node|int $file, array $fieldValues): void {
		if (is_int($file)) {
			$file = $this->templateManager->get($file);
		}

		$collaboraUrl = $this->appConfig->getCollaboraUrlInternal();
		$httpClient = $this->clientService->newClient();

		try {
			$response = $httpClient->post(
				$collaboraUrl . "/cool/convert-to"
			);
		} catch(\Exception $e) {
			// handle exception
			throw $e;
		}
	}
}
