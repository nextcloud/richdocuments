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
use Psr\Log\LoggerInterface;

class TemplateFieldService {
	public function __construct(
		private IClientService $clientService,
		private CapabilitiesService $capabilitiesService,
		private AppConfig $appConfig,
		private IRootFolder $rootFolder,
		private LoggerInterface $logger
	) {
	}

	/**
	 * @param Node|int $file
	 * @return array|string
	 */
	public function extractFields(Node|int $file) {
		if (!$this->capabilitiesService->hasFormFilling()) {
			return [];
		}

		if (is_int($file)) {
			$file = $this->rootFolder->getFirstNodeById($file);
		}

		$collaboraUrl = $this->appConfig->getCollaboraUrlInternal();
		$httpClient = $this->clientService->newClient();

		$form = RemoteOptionsService::getDefaultOptions();
		$form['query'] = ['limit' => 'content-control'];
		$form['multipart'] = [[
			'name' => 'data',
			'contents' => $file->getStorage()->fopen($file->getInternalPath(), 'r'),
			'headers' => ['Content-Type' => 'multipart/form-data'],
		]];

		try {
			$response = $httpClient->post(
				$collaboraUrl . "/cool/extract-document-structure",
				$form
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
			$this->logger->error($e->getMessage());
			return [];
		}
	}

	/**
	 * @param Node|int $file
	 * @param array $fields
	 * @return string|resource
	 */
	public function fillFields(Node|int $file, array $fields = []) {
		if (!$this->capabilitiesService->hasFormFilling()) {
			throw new \RuntimeException('Form filling not supported by the Collabora server');
		}

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

		$formTransform = [
			'name' => 'transform',
			'contents' => '{"Transforms": ' . json_encode($fields) . '}',
		];

		$formFormat = [
			'name' => 'format',
			'contents' => $file->getExtension(),
		];

		$form = RemoteOptionsService::getDefaultOptions();
		$form['multipart'] = [$formData, $formTransform, $formFormat];

		try {
			$response = $httpClient->post(
				$collaboraUrl . '/cool/transform-document-structure',
				$form
			);

			return $response->getBody();
		} catch (\Exception $e) {
			$this->logger->error($e->getMessage());
			throw $e;
		}
	}
}
