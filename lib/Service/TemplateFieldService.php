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
use OCP\Files\Template\Field;

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

			$fields = [];

			foreach ($response->getBody()["DocStructure"] as $index => $attr) {
				// Trim the index string to get the number
				// e.g. ContentControls.ByIndex.0 would yield 0
				$index = end(explode(".", $index));

				$fields[] = [
					new Field(
						$index,
						$attr["content"],
						$attr["type"],
						$attr["id"],
						$attr["tag"]
					)
				];
			}

			return $fields;
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
