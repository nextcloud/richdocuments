<?php

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Service;

use OCA\Richdocuments\AppConfig;
use OCP\Files\IRootFolder;
use OCP\Files\Node;
use OCP\Files\Template\Field;
use OCP\Http\Client\IClientService;

class TemplateFieldService {
	private IClientService $clientService;
	private AppConfig $appConfig;
	private IRootFolder $rootFolder;

	public function __construct(
		IClientService $clientService,
		AppConfig $appConfig,
		IRootFolder $rootFolder
	) {
		$this->clientService = $clientService;
		$this->appConfig = $appConfig;
		$this->rootFolder = $rootFolder;
	}

	public function extractFields(Node|int $file): ?array {
		if (is_int($file)) {
			$file = $this->rootFolder->getFirstNodeById($file);
		}

		$collaboraUrl = $this->appConfig->getCollaboraUrlInternal();
		$httpClient = $this->clientService->newClient();

		$formData = [
			'name' => 'data',
			'contents' => $file->fopen('r'),
			'headers' => ['Content-Type' => 'multipart/form-data'],
		];
		
		try {
			$response = $httpClient->post(
				$collaboraUrl . "/cool/extract-document-structure",
				[
					'query' => ['limit' => 'content-control'],
					'multipart' => [$formData],
				]
			);

			$documentStructure = json_decode($response->getBody(), true)['DocStructure'];
			$fields = [];

			foreach ($documentStructure as $index => $attr) {
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

			return array_merge([], ...$fields);
		} catch (\Exception $e) {
			// handle exception
			var_dump($e->getMessage());
			return null;
		}
	}

	public function fillFields(Node|int $file, array $fieldValues): void {
		if (is_int($file)) {
			$file = $this->rootFolder->getFirstNodeById($file);
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
