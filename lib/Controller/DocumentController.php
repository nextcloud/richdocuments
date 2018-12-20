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

use OCA\Richdocuments\TokenManager;
use OCA\Richdocuments\WOPI\Parser;
use \OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\JSONResponse;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use \OCP\IRequest;
use \OCP\IConfig;
use \OCP\IL10N;
use \OCP\ILogger;
use \OCP\AppFramework\Http\ContentSecurityPolicy;
use \OCP\AppFramework\Http\TemplateResponse;
use \OCA\Richdocuments\AppConfig;
use \OCA\Richdocuments\Helper;
use OCP\ISession;
use OCP\Share\IManager;
use OC\Files\Type\TemplateManager;

class DocumentController extends Controller {
	/** @var string */
	private $uid;
	/** @var IL10N */
	private $l10n;
	/** @var IConfig */
	private $settings;
	/** @var AppConfig */
	private $appConfig;
	/** @var ILogger */
	private $logger;
	/** @var IManager */
	private $shareManager;
	/** @var TokenManager */
	private $tokenManager;
	/** @var ISession */
	private $session;
	/** @var IRootFolder */
	private $rootFolder;
	/** @var \OCA\Richdocuments\TemplateManager */
	private $templateManager;

	const ODT_TEMPLATE_PATH = '/assets/odttemplate.odt';


	/**
	 * @param string $appName
	 * @param IRequest $request
	 * @param IConfig $settings
	 * @param AppConfig $appConfig
	 * @param IL10N $l10n
	 * @param IManager $shareManager
	 * @param TokenManager $tokenManager
	 * @param IRootFolder $rootFolder
	 * @param ISession $session
	 * @param string $UserId
	 * @param ILogger $logger
	 */
	public function __construct($appName,
								IRequest $request,
								IConfig $settings,
								AppConfig $appConfig,
								IL10N $l10n,
								IManager $shareManager,
								TokenManager $tokenManager,
								IRootFolder $rootFolder,
								ISession $session,
								$UserId,
								ILogger $logger,
								\OCA\Richdocuments\TemplateManager $templateManager) {
		parent::__construct($appName, $request);
		$this->uid = $UserId;
		$this->l10n = $l10n;
		$this->settings = $settings;
		$this->appConfig = $appConfig;
		$this->shareManager = $shareManager;
		$this->tokenManager = $tokenManager;
		$this->rootFolder = $rootFolder;
		$this->session = $session;
		$this->logger = $logger;
		$this->templateManager = $templateManager;
	}

	/**
	 * @PublicPage
	 * @NoCSRFRequired
	 *
	 * Returns the access_token and urlsrc for WOPI access for given $fileId
	 * Requests is accepted only when a secret_token is provided set by admin in
	 * settings page
	 *
	 * @param string $fileId
	 * @return access_token, urlsrc
	 */
	public function extAppGetData($fileId) {
		$secretToken = $this->request->getParam('secret_token');
		$apps = array_filter(explode(',', $this->appConfig->getAppValue('external_apps')));
		foreach($apps as $app) {
			if ($app !== '' && $secretToken === $app) {
				$appName = explode(':', $app);
				$this->logger->debug('External app "{extApp}" authenticated; issuing access token for fileId {fileId}', [
					'app' => $this->appName,
					'extApp' => $appName[0],
					'fileId' => $fileId
				]);
				try {
					$folder = $this->rootFolder->getUserFolder($this->uid);
					$item = $folder->getById($fileId)[0];
					if(!($item instanceof Node)) {
						throw new \Exception();
					}
					list($urlSrc, $token) = $this->tokenManager->getToken($item->getId());
					return [
						'status' => 'success',
						'urlsrc' => $urlSrc,
						'token' => $token
					];
				} catch (\Exception $e) {
					$this->logger->logException($e, ['app'=>'richdocuments']);
					$params = [
						'remoteAddr' => $this->request->getRemoteAddress(),
						'requestID' => $this->request->getId(),
						'debugMode' => $this->settings->getSystemValue('debug'),
						'errorClass' => get_class($e),
						'errorCode' => $e->getCode(),
						'errorMsg' => $e->getMessage(),
						'file' => $e->getFile(),
						'line' => $e->getLine(),
						'trace' => $e->getTraceAsString()
					];
					return new TemplateResponse('core', 'exception', $params, 'guest');
				}
			}

			return [
				'status' => 'error',
				'message' => 'Permission denied'
			];
		}
	}

	/**
	 * Strips the path and query parameters from the URL.
	 *
	 * @param string $url
	 * @return string
	 */
	private function domainOnly($url) {
		$parsed_url = parse_url($url);
		$scheme = isset($parsed_url['scheme']) ? $parsed_url['scheme'] . '://' : '';
		$host   = isset($parsed_url['host']) ? $parsed_url['host'] : '';
		$port   = isset($parsed_url['port']) ? ':' . $parsed_url['port'] : '';
		return "$scheme$host$port";
	}

	/**
	 * @NoAdminRequired
	 *
	 * @param string $fileId
	 * @return TemplateResponse
	 */
	public function index($fileId) {
		try {
			$folder = $this->rootFolder->getUserFolder($this->uid);
			$item = $folder->getById($fileId)[0];
			if(!($item instanceof Node)) {
				throw new \Exception();
			}
			list($urlSrc, $token) = $this->tokenManager->getToken($item->getId());
			$params = [
				'permissions' => $item->getPermissions(),
				'title' => $item->getName(),
				'fileId' => $item->getId() . '_' . $this->settings->getSystemValue('instanceid'),
				'token' => $token,
				'urlsrc' => $urlSrc,
				'path' => $folder->getRelativePath($item->getPath()),
				'instanceId' => $this->settings->getSystemValue('instanceid'),
				'canonical_webroot' => $this->appConfig->getAppValue('canonical_webroot'),
			];

			$encryptionManager = \OC::$server->getEncryptionManager();
			if ($encryptionManager->isEnabled())
			{
				// Update the current file to be accessible with system public shared key
				$owner = $item->getOwner()->getUID();
				$absPath = '/' . $owner . '/' .  $item->getInternalPath();
				$accessList = \OC::$server->getEncryptionFilesHelper()->getAccessList($absPath);
				$accessList['public'] = true;
				$encryptionManager->getEncryptionModule()->update($absPath, $owner, $accessList);
			}

			$response = new TemplateResponse('richdocuments', 'documents', $params, 'empty');
			$policy = new ContentSecurityPolicy();
			$policy->addAllowedFrameDomain($this->domainOnly($this->appConfig->getAppValue('wopi_url')));
			$policy->allowInlineScript(true);
			$response->setContentSecurityPolicy($policy);
			return $response;
		} catch (\Exception $e) {
			$this->logger->logException($e, ['app'=>'richdocuments']);
			$params = [
				'remoteAddr' => $this->request->getRemoteAddress(),
				'requestID' => $this->request->getId(),
				'debugMode' => $this->settings->getSystemValue('debug'),
				'errorClass' => get_class($e),
				'errorCode' => $e->getCode(),
				'errorMsg' => $e->getMessage(),
				'file' => $e->getFile(),
				'line' => $e->getLine(),
				'trace' => $e->getTraceAsString()
			];
			return new TemplateResponse('core', 'exception', $params, 'guest');
		}

		return new TemplateResponse('core', '403', [], 'guest');
	}

	/**
	 * @NoAdminRequired
	 *
	 * @param int $templateId
	 * @param string $fileName
	 * @param string $dir
	 * @return TemplateResponse
	 */
	public function template($templateId, $fileName, $dir) {
		if (!$this->templateManager->isTemplate($templateId)) {
			return new TemplateResponse('core', '403', [], 'guest');
		}

		$userFolder = $this->rootFolder->getUserFolder($this->uid);
		try {
			$folder = $userFolder->get($dir);
		} catch (NotFoundException $e) {
			return new TemplateResponse('core', '403', [], 'guest');
		}

		if ((!$folder instanceof Folder)) {
			return new TemplateResponse('core', '403', [], 'guest');
		}

		$file = $folder->newFile($fileName);

		$template = $this->templateManager->get($templateId);
		list($urlSrc, $token) = $this->tokenManager->getTokenForTemplate($template, $this->uid, $file->getId());

		$params = [
			'permissions' => $template->getPermissions(),
			'title' => $template->getName(),
			'fileId' => $template->getId() . '_' . $this->settings->getSystemValue('instanceid'),
			'token' => $token,
			'urlsrc' => $urlSrc,
			'path' => $userFolder->getRelativePath($file->getPath()),
			'instanceId' => $this->settings->getSystemValue('instanceid'),
			'canonical_webroot' => $this->appConfig->getAppValue('canonical_webroot'),
		];

		$response = new TemplateResponse('richdocuments', 'documents', $params, 'empty');
		$policy = new ContentSecurityPolicy();
		$policy->addAllowedFrameDomain($this->domainOnly($this->appConfig->getAppValue('wopi_url')));
		$policy->allowInlineScript(true);
		$response->setContentSecurityPolicy($policy);
		return $response;
	}

	/**
	 * @PublicPage
	 *
	 * @param string $shareToken
	 * @param string $fileName
	 * @return TemplateResponse
	 * @throws \Exception
	 */
	public function publicPage($shareToken, $fileName, $fileId) {
		try {
			$share = $this->shareManager->getShareByToken($shareToken);
			// not authenticated ?
			if($share->getPassword()){
				if (!$this->session->exists('public_link_authenticated')
					|| $this->session->get('public_link_authenticated') !== (string)$share->getId()
				) {
					throw new \Exception('Invalid password');
				}
			}

			$node = $share->getNode();
			if($node instanceof Folder) {
				$item = $node->getById($fileId)[0];
			} else {
				$item = $node;
			}
			if ($item instanceof Node) {
				list($urlSrc, $token) = $this->tokenManager->getToken($item->getId(), $shareToken);
				$params = [
					'permissions' => $share->getPermissions(),
					'title' => $item->getName(),
					'fileId' => $item->getId() . '_' . $this->settings->getSystemValue('instanceid'),
					'token' => $token,
					'urlsrc' => $urlSrc,
					'path' => '/',
					'instanceId' => $this->settings->getSystemValue('instanceid'),
					'canonical_webroot' => $this->appConfig->getAppValue('canonical_webroot'),
				];

				$response = new TemplateResponse('richdocuments', 'documents', $params, 'empty');
				$policy = new ContentSecurityPolicy();
				$policy->addAllowedFrameDomain($this->domainOnly($this->appConfig->getAppValue('wopi_url')));
				$policy->allowInlineScript(true);
				$response->setContentSecurityPolicy($policy);
				return $response;
			}
		} catch (\Exception $e) {
			$this->logger->logException($e, ['app'=>'richdocuments']);
			$params = [
				'remoteAddr' => $this->request->getRemoteAddress(),
				'requestID' => $this->request->getId(),
				'debugMode' => $this->settings->getSystemValue('debug'),
				'errorClass' => get_class($e),
				'errorCode' => $e->getCode(),
				'errorMsg' => $e->getMessage(),
				'file' => $e->getFile(),
				'line' => $e->getLine(),
				'trace' => $e->getTraceAsString()
			];
			return new TemplateResponse('core', 'exception', $params, 'guest');
		}

		return new TemplateResponse('core', '403', [], 'guest');
	}

	/**
	 * @NoAdminRequired
	 *
	 * @param string $mimetype
	 * @param string $filename
	 * @param string $dir
	 * @return JSONResponse
	 */
	public function create($mimetype,
						   $filename,
						   $dir = '/'){

		$root = $this->rootFolder->getUserFolder($this->uid);
		try {
			/** @var Folder $folder */
			$folder = $root->get($dir);
		} catch (NotFoundException $e) {
			return new JSONResponse([
					'status' => 'error',
					'message' => $this->l10n->t('Can\'t create document')
			], Http::STATUS_BAD_REQUEST);
		}

		if (!($folder instanceof Folder)) {
			return new JSONResponse([
				'status' => 'error',
				'message' => $this->l10n->t('Can\'t create document')
			], Http::STATUS_BAD_REQUEST);
		}

		$basename = $this->l10n->t('New Document.odt');
		switch ($mimetype) {
			case 'application/vnd.oasis.opendocument.spreadsheet':
				$basename = $this->l10n->t('New Spreadsheet.ods');
				break;
			case 'application/vnd.oasis.opendocument.presentation':
				$basename = $this->l10n->t('New Presentation.odp');
				break;
			case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
				$basename = $this->l10n->t('New Document.docx');
				break;
			case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
				$basename = $this->l10n->t('New Spreadsheet.xlsx');
				break;
			case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
				$basename = $this->l10n->t('New Presentation.pptx');
				break;
			default:
				// to be safe
				$mimetype = 'application/vnd.oasis.opendocument.text';
				break;
		}

		if (!$filename){
			$filename = Helper::getNewFileName($folder, $basename);
		}

		if ($folder->nodeExists($filename)) {
			return new JSONResponse([
				'status' => 'error',
				'message' => $this->l10n->t('Document already exists')
			], Http::STATUS_BAD_REQUEST);
		}

		try {
			$file = $folder->newFile($filename);
		} catch (NotPermittedException $e) {
			return new JSONResponse([
				'status' => 'error',
				'message' => $this->l10n->t('Not allowed to create document')
			], Http::STATUS_BAD_REQUEST);
		}

		$content = '';
		if (class_exists(TemplateManager::class)){
			$manager = \OC_Helper::getFileTemplateManager();
			$content = $manager->getTemplate($mimetype);
		}

		if (!$content){
			$content = file_get_contents(dirname(dirname(__DIR__)) . self::ODT_TEMPLATE_PATH);
		}

		if ($content) {
			$file->putContent($content);

			return new JSONResponse([
				'status' => 'success',
				'data' => \OCA\Files\Helper::formatFileInfo($file->getFileInfo())
			]);
		}


		return new JSONResponse([
			'status' => 'error',
			'message' => $this->l10n->t('Can\'t create document')
		]);
	}
}
