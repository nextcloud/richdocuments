<?php

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Service;

use OCA\Richdocuments\AppConfig;
use OCP\Files\Node;
use OCP\Http\Client\IClientService;

class TemplateFieldService {
	private IClientService $clientService;
	private AppConfig $appConfig;

	public function __construct(
		IClientService $clientService,
		AppConfig $appConfig
	) {
		$this->clientService = $clientService;
		$this->appConfig = $appConfig;
	}

	public function extractFields(Node $file): ?array {
		// TODO: Won't work until Collabora's endpoint is ready
		$collaboraUrl = $this->appConfig->getCollaboraUrlInternal();
		$httpClient = $this->clientService->newClient();
		
		try {
			$response = $httpClient->get(
				$collaboraUrl . "/cool/extract-doc-structure",
				['query' => ['limit' => 'content-control']]
			);

			return [$response->getBody()];
		} catch (\Exception $e) {
			return null;
		}
	}

	public function fillFields(Node $file, array $fieldValues): void {
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
