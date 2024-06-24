<?php

namespace OCA\Richdocuments\Controller;

use OCA\Richdocuments\Service\TemplateFieldService;
use OCA\Richdocuments\TemplateManager;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCSController;
use OCP\Files\Node;
use OCP\IRequest;

// TODO: Probably move this into TemplatesController.php at some point
class TemplateFieldController extends OCSController {

	private TemplateFieldService $templateFieldService;
	private TemplateManager $templateManager;

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
	public function extractFields(int $fileId): DataResponse {
		try {
			$template = $this->templateManager->get($fileId);
			return new DataResponse(['something' => $template], Http::STATUS_OK);
		} catch (NotFoundException $e) {
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		}
	}

	public function fillFields(Node $file, array $fieldValues): void {
	}
}
