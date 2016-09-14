<?php
/**
 * ownCloud - Richdocuments App
 *
 * @author Victor Dubiniuk
 * @copyright 2014 Victor Dubiniuk victor.dubiniuk@gmail.com
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 */

namespace OCA\Richdocuments\Controller;

class DocumentControllerTest extends \PHPUnit_Framework_TestCase {
	private $appName = 'richdocuments';
	private $request;
	private $l10n;
	private $settings;
	private $cache;
	private $logger;
	private $uid = 'jack_the_documents_tester';
	private $password = 'password';
	private $controller;

	public function setUp(){
		$this->request = $this->getMockBuilder('\OCP\IRequest')
			->disableOriginalConstructor()
			->getMock()
		;
		$this->settings = $this->getMockBuilder('\OCP\IConfig')
			->disableOriginalConstructor()
			->getMock()
		;
		$this->appConfig = $this->getMockBuilder('\OCA\Richdocuments\AppConfig')
			->disableOriginalConstructor()
			->getMock()
		;
		$this->l10n = $this->getMockBuilder('\OCP\IL10N')
			->disableOriginalConstructor()
			->getMock()
		;
		$this->cache = $this->getMockBuilder('\OCP\ICacheFactory')
			->disableOriginalConstructor()
			->getMock()
		;
		$this->logger = $this->getMockBuilder('\OCP\ILogger')
			->disableOriginalConstructor()
			->getMock()
		;
		$this->controller = new DocumentController(
			$this->appName,
			$this->request,
			$this->settings,
			$this->appConfig,
			$this->l10n,
			$this->uid,
			$this->cache,
			$this->logger
		);

		$userManager = \OC::$server->getUserManager();
		$userSession = \OC::$server->getUserSession();
		if (!$userManager->userExists($this->uid)){
			$userManager->createUser($this->uid, $this->password);
			\OC::$server->getUserFolder($this->uid);
		}
		$userSession->login($this->uid, $this->password);
		\OC_Util::setupFS();
	}

	/**
	 * @expectedException \OCP\Files\NotFoundException
	 */
	public function testRename(){
		$result = array(
			'status' => 'error',
			'message' => (string) $this->l10n->t('You don\'t have permission to rename this document')
		);
		$this->request->post = array(
			'fileId' => 500,
			'name' => 'newname.ext'
		);
		$response = $this->controller->rename(500);
	}
}
