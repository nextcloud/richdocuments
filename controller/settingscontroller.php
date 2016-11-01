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

use \OCP\AppFramework\Controller;
use \OCP\IRequest;
use \OCP\IL10N;
use \OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\TemplateResponse;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Filter;

class SettingsController extends Controller{

	private $userId;
	private $l10n;
	private $appConfig;

	public function __construct($appName, IRequest $request, IL10N $l10n, AppConfig $appConfig, $userId){
		parent::__construct($appName, $request);
		$this->userId = $userId;
		$this->l10n = $l10n;
		$this->appConfig = $appConfig;
	}

	/**
	 * @NoAdminRequired
	 */
	public function getSupportedMimes(){
		return array(
			'status' => 'success',
			'mimes' => Filter::getAll()
		);
	}

	/**
	 * @NoAdminRequired
	 */
	public function getSettings() {
		return array(
			'doc_format' => $this->appConfig->getAppValue('doc_format'),
			'wopi_url' => $this->appConfig->getAppValue('wopi_url'),
			'test_wopi_url' => $this->appConfig->getAppValue('test_wopi_url'),
			'test_server_groups' => $this->appConfig->getAppValue('test_server_groups')
		);
	}

	/**
	 * @NoCSRFRequired
	 */
	public function settingsIndex(){
		return new TemplateResponse(
			$this->appName,
			'settings',
			'blank'
		);
	}

	/**
	 * @NoCSRFRequired
	 */
	public function adminIndex(){
		return new TemplateResponse(
			$this->appName,
			'admin',
			[
				'wopi_url' => $this->appConfig->getAppValue('wopi_url'),
				'edit_groups' => $this->appConfig->getAppValue('edit_groups'),
				'doc_format' => $this->appConfig->getAppValue('doc_format'),
				'test_wopi_url' => $this->appConfig->getAppValue('test_wopi_url'),
				'test_server_groups' => $this->appConfig->getAppValue('test_server_groups')
			],
			'blank'
		);
	}

	public function setSettings($wopi_url, $edit_groups, $doc_format, $test_wopi_url, $test_server_groups){
		$message = $this->l10n->t('Saved');

		if (!is_null($wopi_url)){
			$this->appConfig->setAppValue('wopi_url', $wopi_url);

			$colon = strpos($wopi_url, ':', 0);
			if (\OC::$server->getRequest()->getServerProtocol() !== substr($wopi_url, 0, $colon)){
				$message = $this->l10n->t('Saved with error: Collabora Online should use the same protocol as the server installation.');
			}
		}

		if (!is_null($edit_groups)){
			$this->appConfig->setAppValue('edit_groups', $edit_groups);
		}

		if (!is_null($doc_format)){
			$this->appConfig->setAppValue('doc_format', $doc_format);
		}

		if (!is_null($test_wopi_url)){
			$this->appConfig->setAppValue('test_wopi_url', $test_wopi_url);
		}

		if (!is_null($test_server_groups)){
			$this->appConfig->setAppValue('test_server_groups', $test_server_groups);
		}

		$richMemCache = \OC::$server->getMemCacheFactory()->create('richdocuments');
		$richMemCache->clear('discovery.xml');

		$response = array(
			'status' => 'success',
			'data' => array('message' => (string) $message)
		);

		return $response;
	}
}
