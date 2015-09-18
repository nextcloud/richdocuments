<?php
/**
 * ownCloud - Documents App
 *
 * @author Victor Dubiniuk
 * @copyright 2014 Victor Dubiniuk victor.dubiniuk@gmail.com
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 */

namespace OCA\Documents\Controller;

use \OCP\AppFramework\Controller;
use \OCP\IRequest;
use \OCP\IL10N;
use \OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\TemplateResponse;

use OCA\Documents\AppConfig;
use OCA\Documents\Converter;
use OCA\Documents\Filter;

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
			[ 'unstable' => $this->appConfig->getAppValue('unstable') ],
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
				'converter' => $this->appConfig->getAppValue('converter'),
				'converter_url' => $this->appConfig->getAppValue('converter_url'),
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
	
	public function setUnstable($unstable){
		if (!is_null($unstable)){
			$this->appConfig->setAppValue('unstable', $unstable);
		}
		return array('status' => 'success');
	}
	
	public function setConverter($converter, $url){
		if (!is_null($converter)){
			$this->appConfig->setAppValue('converter', $converter);
		}
	
		if (!is_null($url)){
			$this->appConfig->setAppValue('converter_url', $url);
		}
		
		$response = array(
			'status' => 'success',
			'data' => array('message' => (string) $this->l10n->t('Saved'))
		);
		
		$currentConverter = $this->appConfig->getAppValue('converter');
		if ($currentConverter == 'external'){
			if (!Converter::checkConnection()){
				\OC::$server->getLogger()->warning(
					'Bad response from Format Filter Server', 
					['app' => $this->appName]
				);
					$response = array(
						'status' => 'error',
						'data'=>
						array('message' => (string) $this->l10n->t('Format filter server is down or misconfigured') )
					);
			}
		} elseif ($currentConverter === 'local') {
			try {
				if (!Converter::testConversion()){
					$response = array( 
						'status' => 'error',
						'data'=>
						array('message' => (string) $this->l10n->t('Conversion failed. Check log for details.') )
					);
				}
			} catch (\Exception $e){
				$response = array(
					'status' => 'error',
					'data'=> array('message' => $e->getMessage())
				);
			}
		}
		
		return $response;
	}
}
