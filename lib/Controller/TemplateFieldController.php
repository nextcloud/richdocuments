<?php

namespace OCA\Richdocuments\Controller;

use OCP\AppFramework\OCSController;
use OCP\IRequest;

class TemplateFieldController extends OCSController {
	public function __construct(
		string $appName,
		IRequest $request
	) {
		parent::__construct($appName, $request);
	}
}
