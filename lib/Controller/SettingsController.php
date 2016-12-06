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
use OCP\AppFramework\Http\JSONResponse;
use \OCP\IRequest;
use \OCP\IL10N;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Filter;

class SettingsController extends Controller{
	/** @var IL10N */
	private $l10n;
	/** @var AppConfig */
	private $appConfig;

	/**
	 * @param string $appName
	 * @param IRequest $request
	 * @param IL10N $l10n
	 * @param AppConfig $appConfig
	 * @param string $userId
	 */
	public function __construct($appName,
								IRequest $request,
								IL10N $l10n,
								AppConfig $appConfig,
								$userId) {
		parent::__construct($appName, $request);
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
	 *
	 * @return JSONResponse
	 */
	public function getSettings() {
		return new JSONResponse([
			'doc_format' => $this->appConfig->getAppValue('doc_format'),
			'wopi_url' => $this->appConfig->getAppValue('wopi_url'),
		]);
	}

	/**
	 * @param string $wopi_url
	 * @param string $doc_format
	 * @return JSONResponse
	 */
	public function setSettings($wopi_url,
								$doc_format){
		$message = $this->l10n->t('Saved');

		if ($wopi_url !== null){
			$this->appConfig->setAppValue('wopi_url', $wopi_url);

			$colon = strpos($wopi_url, ':', 0);
			if (\OC::$server->getRequest()->getServerProtocol() !== substr($wopi_url, 0, $colon)){
				$message = $this->l10n->t('Saved with error: Collabora Online should use the same protocol as the server installation.');
			}
		}

		if ($doc_format !== null) {
			$this->appConfig->setAppValue('doc_format', $doc_format);
		}

		$richMemCache = \OC::$server->getMemCacheFactory()->create('richdocuments');
		$richMemCache->clear('discovery.xml');

		$response = array(
			'status' => 'success',
			'data' => array('message' => (string) $message)
		);

		return new JSONResponse($response);
	}
}
