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
			$fields = $this->templateFieldService->extractFields($fileId);

			return new DataResponse($fields, Http::STATUS_OK);
		} catch (\Exception $e) {
			return new DataResponse(["Unable to extract fields from given file"], Http::STATUS_INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * @param int $fileId
	 * @param array $fields
	 * @return DataResponse
	 */
	#[NoAdminRequired]
	public function fillFields(int $fileId, array $fields, ?string $destination = null): DataResponse {
		try {
			$this->templateFieldService->fillFields($fileId, $fields, $destination);

			return new DataResponse([], Http::STATUS_OK);
		} catch (\Exception $e) {
			return new DataResponse(["Unable to fill fields into the given file"], Http::STATUS_INTERNAL_SERVER_ERROR);
		}
	}
}
