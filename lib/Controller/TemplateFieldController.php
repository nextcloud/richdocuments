<?php

namespace OCA\Richdocuments\Controller;

use OCP\AppFramework\Http;
use OCP\AppFramework\OCSController;
use OCP\AppFramework\Http\DataResponse;
use OCP\Files\Node;
use OCP\IRequest;

class TemplateFieldController extends OCSController {
	public function __construct(
		string $appName,
		IRequest $request
	) {
		parent::__construct($appName, $request);
	}

    public function extractFields(): DataResponse {
        $this->buildResponse()
        return new DataResponse(['something' => 'hello!'], Http::STATUS_OK);
    }

    public function fillFields(Node $file, array $fieldValues): void {}
}
