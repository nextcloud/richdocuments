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
use \OCP\IConfig;
use \OCP\IL10N;
use \OCP\AppFramework\Http\JSONResponse;

use OCA\Documents\Converter;
use OCA\Documents\Config;
use OCA\Documents\Helper;

class SettingsController extends Controller{
	
	private $uid;
	private $settings;
	private $l10n;
	
	public function __construct($appName, IRequest $request, IConfig $settings, IL10N $l10n, $uid){
		parent::__construct($appName, $request);
		$this->uid = $uid;
		$this->settings = $settings;
		$this->l10n = $l10n;
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
			$this->settings->setUserValue($this->uid, $this->appName, 'save_path', $savePath);
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
			$this->settings->setAppValue($this->appName, 'unstable', $unstable);
		}
		return array('status' => 'success');
	}
	
	public function setConverter($converter, $url){
		if (!is_null($converter)){
			$this->settings->setAppValue($this->appName, 'converter', $converter);
		}
	
		if (!is_null($url)){
			$this->settings->setAppValue($this->appName, 'converter_url', $url);
		}
		
		$response = array(
			'status' => 'success',
			'data' => array('message' => (string) $this->l10n->t('Saved'))
		);
		
		if ($this->settings->getAppValue($this->appName, 'converter', 'local') != 'local'){
			if (!Converter::checkConnection()){
				Helper::warnLog('Bad response from Format Filter Server');
					$response = array(
						'status' => 'error',
						'data'=>
						array('message' => (string) $this->l10n->t('Format filter server is down or misconfigured') )
					);
			}
		} else {
			try {
				if (!Config::testConversion()){
					Helper::warnLog('Conversion failed. Raw output:' . $result);
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
