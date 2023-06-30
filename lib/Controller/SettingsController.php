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
use OCA\Richdocuments\Service\DemoService;
use OCA\Richdocuments\Service\FontService;
use OCA\Richdocuments\UploadException;
use OCA\Richdocuments\WOPI\DiscoveryManager;
use OCA\Richdocuments\WOPI\Parser;
use \OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataDisplayResponse;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\NotFoundResponse;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\Files\SimpleFS\ISimpleFile;
use OCP\ILogger;
use \OCP\IRequest;
use \OCP\IL10N;
use OCA\Richdocuments\AppConfig;
use OCP\IConfig;
use OCP\PreConditionNotMetException;
use OCP\Util;

class SettingsController extends Controller {
	// TODO adapt overview generation if we add more font mimetypes
	public const FONT_MIME_TYPES = [
		'font/ttf',
		'application/font-sfnt',
		'font/sfnt',
		'font/opentype',
		'application/vnd.oasis.opendocument.formula-template',
		'application/vnd.ms-opentype',
	];

	/** @var IL10N */
	private $l10n;
	/** @var AppConfig */
	private $appConfig;
	/** @var IConfig */
	private $config;
	/** @var DiscoveryManager  */
	private $discoveryManager;
	/** @var Parser */
	private $wopiParser;
	/** @var string */
	private $userId;
	/** @var CapabilitiesService */
	private $capabilitiesService;
	/** @var DemoService */
	private $demoService;
	/** @var ILogger */
	private $logger;
	/**
	 * @var FontService
	 */
	private $fontService;

	public function __construct($appName,
		IRequest $request,
		IL10N $l10n,
		AppConfig $appConfig,
		IConfig $config,
		DiscoveryManager $discoveryManager,
		Parser $wopiParser,
		CapabilitiesService $capabilitiesService,
		DemoService $demoService,
		FontService $fontService,
		ILogger $logger,
		$userId
	) {
		parent::__construct($appName, $request);
		$this->l10n = $l10n;
		$this->appConfig = $appConfig;
		$this->config = $config;
		$this->discoveryManager = $discoveryManager;
		$this->wopiParser = $wopiParser;
		$this->capabilitiesService = $capabilitiesService;
		$this->demoService = $demoService;
		$this->logger = $logger;
		$this->userId = $userId;
		$this->fontService = $fontService;
		$this->request = $request;
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
			$this->logger->logException($e, ['app' => 'richdocuments']);
			return new DataResponse([
				'status' => $e->getCode(),
				'message' => 'Could not fetch discovery details'
			], Http::STATUS_INTERNAL_SERVER_ERROR);
		}

		return new DataResponse();
	}

	public function demoServers() {
		$demoServers = $this->demoService->fetchDemoServers(true);
		if (count($demoServers) > 0) {
			return new DataResponse($demoServers);
		}
		return new NotFoundResponse([]);
	}

	/**
	 * @NoAdminRequired
	 *
	 * @return JSONResponse
	 */
	public function getSettings() {
		return new JSONResponse([
			'wopi_url' => $this->appConfig->getAppValue('wopi_url'),
			'wopi_allowlist' => $this->appConfig->getAppValue('wopi_allowlist'),
			'public_wopi_url' => $this->appConfig->getAppValue('public_wopi_url'),
			'disable_certificate_verification' => $this->appConfig->getAppValue('disable_certificate_verification') === 'yes',
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
		$wopi_allowlist,
		$disable_certificate_verification,
		$edit_groups,
		$use_groups,
		$doc_format,
		$external_apps,
		$canonical_webroot) {
		$message = $this->l10n->t('Saved');

		if ($wopi_url !== null) {
			$this->appConfig->setAppValue('wopi_url', $wopi_url);
		}

		if ($wopi_allowlist !== null) {
			$this->appConfig->setAppValue('wopi_allowlist', $wopi_allowlist);
		}

		if ($disable_certificate_verification !== null) {
			$this->appConfig->setAppValue(
				'disable_certificate_verification',
				$disable_certificate_verification === true ? 'yes' : ''
			);
		}

		if ($edit_groups !== null) {
			$this->appConfig->setAppValue('edit_groups', $edit_groups);
		}

		if ($use_groups !== null) {
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

		$this->discoveryManager->refetch();
		$this->capabilitiesService->clear();
		try {
			$capaUrlSrc = $this->wopiParser->getUrlSrc('Capabilities');
			if (is_array($capaUrlSrc) && $capaUrlSrc['action'] === 'getinfo') {
				$public_wopi_url = str_replace('/hosting/capabilities', '', $capaUrlSrc['urlsrc']);
				if ($public_wopi_url !== null) {
					$this->appConfig->setAppValue('public_wopi_url', $public_wopi_url);
					$colon = strpos($public_wopi_url, ':', 0);
					if ($this->request->getServerProtocol() !== substr($public_wopi_url, 0, $colon)) {
						$message = $this->l10n->t('Saved with error: Collabora Online should expose the same protocol as the server installation. Please check the ssl.enable and ssl.termination settings of your Collabora Online server.');
					}
				}
			}
		} catch (\Exception $e) {
			if ($wopi_url !== null) {
				return new JSONResponse([
					'status' => 'error',
					'data' => ['message' => 'Failed to connect to the remote server']
				], 500);
			}
		}

		$this->capabilitiesService->clear();
		$this->capabilitiesService->refetch();
		if ($this->capabilitiesService->getCapabilities() === []) {
			return new JSONResponse([
				'status' => 'error',
				'data' => ['message' => 'Failed to connect to the remote server', 'hint' => 'missing_capabilities']
			], 500);
		}

		$response = [
			'status' => 'success',
			'data' => ['message' => $message]
		];

		return new JSONResponse($response);
	}

	public function updateWatermarkSettings($settings = []) {
		$supportedOptions = [
			'watermark_text',
			'watermark_enabled',
			'watermark_shareAll',
			'watermark_shareRead',
			'watermark_shareDisabledDownload',
			'watermark_linkSecure',
			'watermark_linkRead',
			'watermark_linkAll',
			'watermark_linkTags',
			'watermark_linkTagsList',
			'watermark_allGroups',
			'watermark_allGroupsList',
			'watermark_allTags',
			'watermark_allTagsList',
		];
		$message = $this->l10n->t('Saved');

		$watermarkSettings = $settings['watermark'];
		foreach ($watermarkSettings as $key => $value) {
			$fullKey = 'watermark_' . $key;
			if (in_array($fullKey, $supportedOptions) !== true) {
				return new JSONResponse([
					'status' => 'error',
					'data' => ['message' => $this->l10n->t('Invalid config key') . ' ' . $fullKey]
				], Http::STATUS_BAD_REQUEST);
			}
			$parsedValue = $value;
			if (is_bool($value)) {
				$parsedValue = $value ? 'yes' : 'no';
			}
			$appSettingsType = array_key_exists($fullKey, AppConfig::APP_SETTING_TYPES) ? AppConfig::APP_SETTING_TYPES[$fullKey] : 'string';
			if ($appSettingsType === 'array') {
				$parsedValue = implode(',', $value);
			}
			$this->appConfig->setAppValue($fullKey, $parsedValue);
		}

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
	public function setPersonalSettings($templateFolder,
		$zoteroAPIKeyInput) {
		$message = $this->l10n->t('Saved');
		$status = 'success';

		if ($templateFolder !== null) {
			try {
				$this->config->setUserValue($this->userId, 'richdocuments', 'templateFolder', $templateFolder);
			} catch (PreConditionNotMetException $e) {
				$message = $this->l10n->t('Error when saving');
				$status = 'error';
			}
		}
		if ($zoteroAPIKeyInput !== null) {
			try {
				$this->config->setUserValue($this->userId, 'richdocuments', 'zoteroAPIKey', $zoteroAPIKeyInput);
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

	/**
	 * @NoAdminRequired
	 * @PublicPage
	 * @NoCSRFRequired
	 *
	 * @return JSONResponse|DataResponse
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function getFontNames() {
		$fileNames = $this->fontService->getFontFileNames();
		$etag = md5(implode('/', $fileNames));
		$ifNoneMatchHeader = $this->request->getHeader('If-None-Match');
		if ($ifNoneMatchHeader && $ifNoneMatchHeader === $etag) {
			return new DataResponse([], HTTP::STATUS_NOT_MODIFIED);
		}
		$response = new JSONResponse($fileNames);
		$response->addHeader('Etag', $etag);
		return $response;
	}

	/**
	 * @NoAdminRequired
	 * @PublicPage
	 * @NoCSRFRequired
	 *
	 * @return JSONResponse|DataResponse
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function getJsonFontList() {
		$files = $this->fontService->getFontFiles();
		$etags = array_map(
			static function (ISimpleFile $f) {
				return $f->getETag();
			},
			$files
		);
		$etag = md5(implode(',', $etags));
		$ifNoneMatchHeader = $this->request->getHeader('If-None-Match');
		if ($ifNoneMatchHeader && $ifNoneMatchHeader === $etag) {
			return new DataResponse([], HTTP::STATUS_NOT_MODIFIED);
		}

		$fontList = $this->fontService->getFontList($files);
		$response = new JSONResponse($fontList);
		$response->addHeader('Etag', $etag);
		return $response;
	}

	/**
	 * @NoAdminRequired
	 * @PublicPage
	 * @NoCSRFRequired
	 *
	 * @param string $name
	 * @return DataDisplayResponse|DataResponse
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function getFontFile(string $name) {
		try {
			$fontFile = $this->fontService->getFontFile($name);
			$etag = $fontFile->getETag();
			$ifNoneMatchHeader = $this->request->getHeader('If-None-Match');
			if ($ifNoneMatchHeader && $ifNoneMatchHeader === $etag) {
				return new DataResponse([], HTTP::STATUS_NOT_MODIFIED);
			}

			return new DataDisplayResponse(
				$fontFile->getContent(),
				Http::STATUS_OK,
				['Content-Type' => $fontFile->getMimeType(), 'Etag' => $etag]
			);
		} catch (NotFoundException $e) {
			return new DataDisplayResponse('', Http::STATUS_NOT_FOUND);
		}
	}

	/**
	 * @NoAdminRequired
	 * @PublicPage
	 * @NoCSRFRequired
	 *
	 * @param string $name
	 * @return DataDisplayResponse
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function getFontFileOverview(string $name): DataDisplayResponse {
		try {
			$fontFileOverviewContent = $this->fontService->getFontFileOverview($name);
			return new DataDisplayResponse(
				$fontFileOverviewContent,
				Http::STATUS_OK,
				['Content-Type' => 'image/png']
			);
		} catch (NotFoundException $e) {
			return new DataDisplayResponse('', Http::STATUS_NOT_FOUND);
		}
	}

	/**
	 * @param string $name
	 * @return DataResponse
	 * @throws NotFoundException
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function deleteFontFile(string $name): DataResponse {
		$this->fontService->deleteFontFile($name);
		return new DataResponse();
	}

	/**
	 * @return JSONResponse
	 */
	public function uploadFontFile(): JSONResponse {
		try {
			$file = $this->getUploadedFile('fontfile');
			if (isset($file['tmp_name'], $file['name'], $file['type'])) {
				$fileType = $file['type'];
				if (function_exists('mime_content_type')) {
					$fileType = @mime_content_type($file['tmp_name']);
				}
				if (!$fileType) {
					$fileType = $file['type'];
				}
				if (!in_array($fileType, self::FONT_MIME_TYPES, true)) {
					return new JSONResponse(['error' => 'Font type not supported: ' . $fileType], Http::STATUS_BAD_REQUEST);
				}
				$newFileResource = fopen($file['tmp_name'], 'rb');
				if ($newFileResource === false) {
					throw new UploadException('Could not read file');
				}
				$newFileName = $file['name'];
				$uploadResult = $this->fontService->uploadFontFile($newFileName, $newFileResource);
				return new JSONResponse($uploadResult);
			}
			return new JSONResponse(['error' => 'No uploaded file'], Http::STATUS_BAD_REQUEST);
		} catch (UploadException | NotPermittedException $e) {
			$this->logger->error('Upload error', ['exception' => $e]);
			return new JSONResponse(['error' => 'Upload error'], Http::STATUS_BAD_REQUEST);
		}
	}

	/**
	 * @param string $key
	 * @return array
	 * @throws UploadException
	 */
	private function getUploadedFile(string $key): array {
		$file = $this->request->getUploadedFile($key);
		$error = null;
		$phpFileUploadErrors = [
			UPLOAD_ERR_OK => $this->l10n->t('The file was uploaded'),
			UPLOAD_ERR_INI_SIZE => $this->l10n->t('The uploaded file exceeds the upload_max_filesize directive in php.ini'),
			UPLOAD_ERR_FORM_SIZE => $this->l10n->t('The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form'),
			UPLOAD_ERR_PARTIAL => $this->l10n->t('The file was only partially uploaded'),
			UPLOAD_ERR_NO_FILE => $this->l10n->t('No file was uploaded'),
			UPLOAD_ERR_NO_TMP_DIR => $this->l10n->t('Missing a temporary folder'),
			UPLOAD_ERR_CANT_WRITE => $this->l10n->t('Could not write file to disk'),
			UPLOAD_ERR_EXTENSION => $this->l10n->t('A PHP extension stopped the file upload'),
		];

		if (empty($file)) {
			throw new UploadException($this->l10n->t('No file uploaded or file size exceeds maximum of %s', [Util::humanFileSize(Util::uploadLimit())]));
		}
		if (!empty($file) && array_key_exists('error', $file) && $file['error'] !== UPLOAD_ERR_OK) {
			throw new UploadException($phpFileUploadErrors[$file['error']]);
		}
		return $file;
	}
}
