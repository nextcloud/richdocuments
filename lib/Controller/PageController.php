<?php
namespace OCA\Wopi\Controller;

use OCP\AppFramework\Http\RedirectResponse;
use OCP\IRequest;
use OCP\AppFramework\Controller;
use OCP\IURLGenerator;

class PageController extends Controller {

	private $userId;
	/** @var IURLGenerator */
	private $urlGenerator;


	public function __construct($AppName, IRequest $request, $UserId, IURLGenerator $urlGenerator){
		parent::__construct($AppName, $request);
		$this->userId = $UserId;
		$this->urlGenerator=$urlGenerator;
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 */
	public function editor($id) {
		return new RedirectResponse($this->urlGenerator->getAbsoluteURL('/'));
	}
}
