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
	 * @NoCSRFRequired
	 */
	public function personalIndex(){
		return new TemplateResponse(
			$this->appName,
			'personal',
			[ 'save_path' => $this->appConfig->getUserValue($this->userId, 'save_path') ],
			'blank'
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
			],
			'blank'
		);
	}

	/**
	 * @NoAdminRequired
	 */
	public function savePersonal($savePath){
		if (is_null($savePath)){
			$savePath = '/';
		}
		$status = true;
		if (\OC\Files\Filesystem::file_exists($savePath) === false ){
			$status = \OC\Files\Filesystem::mkdir($savePath);
		}

		if ($status){
			$this->appConfig->setUserValue($this->userId, 'save_path', $savePath);
			$response = array(
				'status' => 'success',
				'data' => array('message'=> $this->l10n->t('Directory saved successfully.'))
			);
		} else {
				$response = array(
					'status' => 'error',
					'data' => array(
							'message'=> $this->l10n->t('An error occurred while changing directory.')
					)
				);
		}
		return $response;
	}

	public function setSettings($wopi_url){
		if (!is_null($wopi_url)){
			$this->appConfig->setAppValue('wopi_url', $wopi_url);
		}

		$richMemCache = \OC::$server->getMemCacheFactory()->create('richdocuments');
		$richMemCache->clear('discovery.xml');

		$response = array(
			'status' => 'success',
			'data' => array('message' => (string) $this->l10n->t('Saved'))
		);

		return $response;
	}
}
