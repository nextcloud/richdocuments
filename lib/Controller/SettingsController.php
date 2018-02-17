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

use OCA\Richdocuments\WOPI\DiscoveryManager;
use \OCP\AppFramework\Controller;
use OCP\AppFramework\Http\JSONResponse;
use OCP\Files\IAppData;
use \OCP\IRequest;
use \OCP\IL10N;
use OCA\Richdocuments\AppConfig;

class SettingsController extends Controller{
	/** @var IL10N */
	private $l10n;
	/** @var AppConfig */
	private $appConfig;
	/** @var DiscoveryManager  */
	private $discoveryManager;

	/**
	 * @param string $appName
	 * @param IRequest $request
	 * @param IL10N $l10n
	 * @param AppConfig $appConfig
	 * @param DiscoveryManager $discoveryManager
	 */
	public function __construct($appName,
								IRequest $request,
								IL10N $l10n,
								AppConfig $appConfig,
								DiscoveryManager $discoveryManager) {
		parent::__construct($appName, $request);
		$this->l10n = $l10n;
		$this->appConfig = $appConfig;
		$this->discoveryManager = $discoveryManager;
	}

	/**
	 * @NoAdminRequired
	 *
	 * @return JSONResponse
	 */
	public function getSettings() {
		return new JSONResponse([
			'wopi_url' => $this->appConfig->getAppValue('wopi_url'),
			'edit_groups' => $this->appConfig->getAppValue('edit_groups'),
			'use_groups' => $this->appConfig->getAppValue('use_groups'),
			'doc_format' => $this->appConfig->getAppValue('doc_format'),
		]);
	}

	/**
	 * @param string $wopi_url
	 * @param string $edit_groups
	 * @param string $use_groups
	 * @param string $doc_format
	 * @param string $external_apps
	 * @param string $canonical_webroot
	 * @return JSONResponse
	 */
	public function setSettings($wopi_url,
	                            $edit_groups,
	                            $use_groups,
	                            $doc_format,
	                            $external_apps,
	                            $canonical_webroot) {
		$message = $this->l10n->t('Saved');

		if ($wopi_url !== null){
			$this->appConfig->setAppValue('wopi_url', $wopi_url);

			$colon = strpos($wopi_url, ':', 0);
			if ($this->request->getServerProtocol() !== substr($wopi_url, 0, $colon)){
				$message = $this->l10n->t('Saved with error: Collabora Online should use the same protocol as the server installation.');
			}
		}

		if ($edit_groups !== null){
			$this->appConfig->setAppValue('edit_groups', $edit_groups);
		}

		if ($use_groups !== null){
			$this->appConfig->setAppValue('use_groups', $use_groups);
		}

		if ($doc_format !== null) {
			$this->appConfig->setAppValue('doc_format', $doc_format);
		}

		if ($external_apps !== null) {
			$this->appConfig->setAppValue('external_apps', $external_apps);
		}

		if ($canonical_webroot !== null) {
			$this->appConfig->setAppValue('canonical_webroot', $canonical_webroot);
		}

		$this->discoveryManager->refretch();

		$response = [
			'status' => 'success',
			'data' => array('message' => (string) $message)
		];

		return new JSONResponse($response);
	}
}
