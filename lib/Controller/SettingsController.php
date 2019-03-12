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

use OCA\Richdocuments\Service\CapabilitiesService;
use OCA\Richdocuments\WOPI\DiscoveryManager;
use \OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\JSONResponse;
use \OCP\IRequest;
use \OCP\IL10N;
use OCA\Richdocuments\AppConfig;
use OCP\IConfig;
use OCP\PreConditionNotMetException;

class SettingsController extends Controller{
	/** @var IL10N */
	private $l10n;
	/** @var AppConfig */
	private $appConfig;
	/** @var IConfig */
	private $config;
	/** @var DiscoveryManager  */
	private $discoveryManager;
	/** @var string */
	private $userId;
	/** @var CapabilitiesService */
	private $capabilitiesService;

	/**
	 * @param string $appName
	 * @param IRequest $request
	 * @param IL10N $l10n
	 * @param AppConfig $appConfig
	 * @param IConfig $config
	 * @param DiscoveryManager $discoveryManager
	 * @param string $userId
	 */
	public function __construct($appName,
								IRequest $request,
								IL10N $l10n,
								AppConfig $appConfig,
								IConfig $config,
								DiscoveryManager $discoveryManager,
								$userId,
								CapabilitiesService $capabilitiesService) {
		parent::__construct($appName, $request);
		$this->l10n = $l10n;
		$this->appConfig = $appConfig;
		$this->config = $config;
		$this->discoveryManager = $discoveryManager;
		$this->userId = $userId;
		$this->capabilitiesService = $capabilitiesService;
	}

	/**
	 * @PublicPage
	 * @NoCSRFRequired
	 * @throws \Exception
	 */
	public function checkSettings() {
		try {
			$response = $this->discoveryManager->fetchFromRemote();
		} catch (\Exception $e) {
			return new DataResponse([
				'status' => $e->getCode(),
				'message' => $e->getMessage()
			], $e->getCode());
		}

		return new DataResponse();
	}

	/**
	 * @NoAdminRequired
	 *
	 * @return JSONResponse
	 */
	public function getSettings() {
		return new JSONResponse([
			'wopi_url' => $this->appConfig->getAppValue('wopi_url'),
			'disable_certificate_verification' => $this->appConfig->getAppValue('disable_certificate_verification'),
			'edit_groups' => $this->appConfig->getAppValue('edit_groups'),
			'use_groups' => $this->appConfig->getAppValue('use_groups'),
			'doc_format' => $this->appConfig->getAppValue('doc_format'),
		]);
	}

	/**
	 * @param string $wopi_url
	 * @param string $disable_certificate_verification
	 * @param string $edit_groups
	 * @param string $use_groups
	 * @param string $doc_format
	 * @param string $external_apps
	 * @param string $canonical_webroot
	 * @return JSONResponse
	 */
	public function setSettings($wopi_url,
	                            $disable_certificate_verification,
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

		if ($disable_certificate_verification !== null) {
			$this->appConfig->setAppValue(
				'disable_certificate_verification',
				$disable_certificate_verification === 'true' ? 'yes' : ''
			);
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

		$this->capabilitiesService->clear();
		$this->capabilitiesService->refretch();

		$response = [
			'status' => 'success',
			'data' => ['message' => $message]
		];

		return new JSONResponse($response);
	}

	/**
	 * @NoAdminRequired
	 *
	 * @param $key
	 * @param $value
	 * @return JSONResponse
	 */
	public function setPersonalSettings($templateFolder) {
		$message = $this->l10n->t('Saved');
		$status = 'success';

		if ($templateFolder !== null){
			try {
				$this->config->setUserValue($this->userId, 'richdocuments', 'templateFolder', $templateFolder);
			} catch (PreConditionNotMetException $e) {
				$message = $this->l10n->t('Error when saving');
				$status = 'error';
			}
		}

		$response = [
			'status' => $status,
			'data' => ['message' => $message]
		];

		return new JSONResponse($response);

	}
}
