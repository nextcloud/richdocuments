<?php

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Controller;

use OCA\Richdocuments\Service\TemplateFieldService;
use OCA\Richdocuments\TemplateManager;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCSController;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\IRequest;

class TemplateFieldController extends OCSController {
	private TemplateFieldService $templateFieldService;
	private TemplateManager $templateManager;

	/**
	 * Template fields controller
	 *
	 * @param string $appName,
	 * @param IRequest $request,
	 * @param TemplateFieldService $templateFieldService
	 * @param TemplateManager $templateManager
	 */
	public function __construct(
		string $appName,
		IRequest $request,
		TemplateFieldService $templateFieldService,
		TemplateManager $templateManager
	) {
		parent::__construct($appName, $request);

		$this->templateFieldService = $templateFieldService;
		$this->templateManager = $templateManager;
	}

	/**
	 * @param int $fileId
	 * @return DataResponse
	 */
	#[NoAdminRequired]
	public function extractFields(int $fileId): DataResponse {
		try {
			$template = $this->templateManager->get($fileId);
			$fields = $this->templateFieldService->extractFields($template);

			return new DataResponse($fields, Http::STATUS_OK);
		} catch (NotFoundException $e) {
			return new DataResponse([$e->getMessage()], Http::STATUS_NOT_FOUND);
		}
	}

	/**
	 * @param int $fileId
	 * @param array $fieldValues
	 * @return DataResponse
	 */
	#[NoAdminRequired]
	public function fillFields(int $fileId, array $fieldValues = []): DataResponse {
		$template = $this->templateManager->get($fileId);
		$this->templateFieldService->fillFields($template, $fieldValues);
		
		return new DataResponse(['values' => $fieldValues], Http::STATUS_OK);
	}
}
