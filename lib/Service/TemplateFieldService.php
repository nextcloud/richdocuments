<?php

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Service;

use OCA\Richdocuments\AppConfig;
use OCP\Files\Node;
use OCP\Http\Client\IClientService;
use OCP\Files\Template\Field;
use OCP\Files\Template\FieldType;

class TemplateFieldService {

	public function __construct(
		private IClientService $clientService,
		private AppConfig $appConfig,
		private PdfService $pdfService,
	) {
	}

	public function extractFields(Node $file): ?array {
		if ($file->getMimeType() === 'application/pdf') {
			return $this->pdfService->extractFields($file);
		}

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
		if ($file->getMimeType() === 'application/pdf') {
			$this->pdfService->fillFields($file, $fieldValues);
			return;
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
