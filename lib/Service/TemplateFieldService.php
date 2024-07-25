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
use OCP\Files\Template\FieldType;
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

	/**
	 * @param Node|int $file
	 * @return array|string
	 */
	public function extractFields(Node|int $file) {
		if (is_int($file)) {
			$file = $this->rootFolder->getFirstNodeById($file);
		}

		$collaboraUrl = $this->appConfig->getCollaboraUrlInternal();
		$httpClient = $this->clientService->newClient();

		$formData = [
			'name' => 'data',
			'contents' => $file->getStorage()->fopen($file->getInternalPath(), 'r'),
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
				$fieldType = FieldType::tryFrom($attr['type']) ?? null;
				if ($fieldType === null) {
					continue;
				}

				$fields[] = [
					new Field(
						$index,
						$attr["content"],
						$fieldType,
						$attr["alias"],
						$attr["id"],
						$attr["tag"]
					)
				];
			}

			return array_merge([], ...$fields);
		} catch (\Exception $e) {
			// handle exception
			return $e->getMessage();
		}
	}

	/**
	 * @param Node|int $file
	 * @param array $fields
	 * @return string|resource
	 */
	public function fillFields(Node|int $file, array $fields = []) {
		if (is_int($file)) {
			$file = $this->rootFolder->getFirstNodeById($file);
		}

		$collaboraUrl = $this->appConfig->getCollaboraUrlInternal();
		$httpClient = $this->clientService->newClient();

		$formData = [
			'name' => 'data',
			'contents' => $file->getStorage()->fopen($file->getInternalPath(), 'r'),
			'headers' => ['Content-Type' => 'multipart/form-data'],
		];

		$formContents = [
			'name' => 'transform',
			'contents' => '{"Transforms": ' . json_encode($fields) . '}',
		];

		$formFormat = [
			'name' => 'format',
			'contents' => $file->getExtension(),
		];

		try {
			$response = $httpClient->post(
				$collaboraUrl . '/cool/transform-document-structure',
				[
					'multipart' => [$formData, $formFormat, $formContents]
				]
			);

			return $response->getBody();
		} catch (\Exception $e) {
			return $e->getMessage();
		}
	}
}
