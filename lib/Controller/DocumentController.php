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

use OCA\Richdocuments\Service\FederationService;
use OCA\Richdocuments\Service\InitialStateService;
use OCA\Richdocuments\TemplateManager;
use OCA\Richdocuments\TokenManager;
use \OCP\AppFramework\Controller;
use OCP\AppFramework\Http\RedirectResponse;
use OCP\Constants;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use \OCP\IRequest;
use \OCP\IConfig;
use \OCP\IL10N;
use \OCP\ILogger;
use \OCP\AppFramework\Http\TemplateResponse;
use \OCA\Richdocuments\AppConfig;
use OCP\ISession;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager;

class DocumentController extends Controller {
	use DocumentTrait;

	/** @var string */
	private $uid;
	/** @var IConfig */
	private $config;
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
	/** @var TemplateManager */
	private $templateManager;
	/** @var FederationService */
	private $federationService;
	/** @var InitialStateService */
	private $initialState;

	public function __construct(
		$appName,
		IRequest $request,
		IConfig $config,
		AppConfig $appConfig,
		IManager $shareManager,
		TokenManager $tokenManager,
		IRootFolder $rootFolder,
		ISession $session,
		$UserId,
		ILogger $logger,
		TemplateManager $templateManager,
		FederationService $federationService,
		InitialStateService $initialState
	) {
		parent::__construct($appName, $request);
		$this->uid = $UserId;
		$this->config = $config;
		$this->appConfig = $appConfig;
		$this->shareManager = $shareManager;
		$this->tokenManager = $tokenManager;
		$this->rootFolder = $rootFolder;
		$this->session = $session;
		$this->logger = $logger;
		$this->templateManager = $templateManager;
		$this->federationService = $federationService;
		$this->initialState = $initialState;
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
	 * @return array access_token, urlsrc
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
				}
			}
		}
		return [
			'status' => 'error',
			'message' => 'Permission denied'
		];
	}

	/**
	 * @NoAdminRequired
	 *
	 * @param string $fileId
	 * @param string|null $path
	 * @return RedirectResponse|TemplateResponse
	 */
	public function index($fileId, $path = null) {
		try {
			$folder = $this->rootFolder->getUserFolder($this->uid);

			if ($path !== null) {
				$item = $folder->get($path);
			} else {
				$item = $folder->getById($fileId)[0];
			}

			if(!($item instanceof File)) {
				throw new \Exception();
			}

			/**
			 * Open file on source instance if it is originating from a federated share
			 * The generated url will result in {@link remote()}
			 */
			$federatedUrl = $this->federationService->getRemoteRedirectURL($item);
			if ($federatedUrl !== null) {
				$response = new RedirectResponse($federatedUrl);
				$response->addHeader('X-Frame-Options', 'ALLOW');
				return $response;
			}

			$templateFile = $this->templateManager->getTemplateSource($item->getId());
			if ($templateFile) {
				list($urlSrc, $wopi) = $this->tokenManager->getTokenForTemplate($templateFile, $this->uid, $item->getId());
				$token = $wopi->getToken();
			} else {
				list($urlSrc, $token, $wopi) = $this->tokenManager->getToken($item->getId());
			}

			$params = [
				'permissions' => $item->getPermissions(),
				'title' => $item->getName(),
				'fileId' => $item->getId() . '_' . $this->config->getSystemValue('instanceid'),
				'token' => $token,
				'urlsrc' => $urlSrc,
				'path' => $folder->getRelativePath($item->getPath()),
				'instanceId' => $this->config->getSystemValue('instanceid'),
				'canonical_webroot' => $this->appConfig->getAppValue('canonical_webroot'),
				'userId' => $this->uid
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

			$this->initialState->provideDocument($wopi);
			$response = new TemplateResponse('richdocuments', 'documents', $params, 'base');
			$this->applyPolicies($response);
			return $response;
		} catch (\Exception $e) {
			$this->logger->logException($e, ['app'=>'richdocuments']);
			return $this->renderErrorPage('Failed to open the requested file.');
		}
	}

	/**
	 * @NoAdminRequired
	 *
	 * Create a new file from a template
	 *
	 * @param int $templateId
	 * @param string $fileName
	 * @param string $dir
	 * @return TemplateResponse
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws \OCP\Files\InvalidPathException
	 */
	public function createFromTemplate($templateId, $fileName, $dir) {
		if (!$this->templateManager->isTemplate($templateId)) {
			return new TemplateResponse('core', '403', [], 'guest');
		}

		$userFolder = $this->rootFolder->getUserFolder($this->uid);
		try {
			$folder = $userFolder->get($dir);
		} catch (NotFoundException $e) {
			return new TemplateResponse('core', '403', [], 'guest');
		}

		if (!$folder instanceof Folder) {
			return new TemplateResponse('core', '403', [], 'guest');
		}

		$file = $folder->newFile($fileName);

		$template = $this->templateManager->get($templateId);
		list($urlSrc, $wopi) = $this->tokenManager->getTokenForTemplate($template, $this->uid, $file->getId());

		$wopiFileId = $wopi->getFileid() . '_' . $this->config->getSystemValue('instanceid');

		$params = [
			'permissions' => $template->getPermissions(),
			'title' => $fileName,
			'fileId' => $wopiFileId,
			'token' => $wopi->getToken(),
			'urlsrc' => $urlSrc,
			'path' => $userFolder->getRelativePath($file->getPath()),
			'instanceId' => $this->config->getSystemValue('instanceid'),
			'canonical_webroot' => $this->appConfig->getAppValue('canonical_webroot'),
			'userId' => $this->uid
		];

		$this->initialState->provideDocument($wopi);
		$response = new TemplateResponse('richdocuments', 'documents', $params, 'base');
		$this->applyPolicies($response);
		return $response;
	}

	/**
	 * @PublicPage
	 * @NoCSRFRequired
	 *
	 * @param string $shareToken
	 * @param string $fileName
	 * @return TemplateResponse|RedirectResponse
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

			if (($share->getPermissions() & Constants::PERMISSION_READ) === 0) {
				return new TemplateResponse('core', '403', [], 'guest');
			}

			$node = $share->getNode();
			if($node instanceof Folder) {
				$item = $node->getById($fileId)[0];
			} else {
				$item = $node;
			}
			$federatedUrl = $this->federationService->getRemoteRedirectURL($item, null, $share);
			if ($federatedUrl !== null) {
				$response = new RedirectResponse($federatedUrl);
				$response->addHeader('X-Frame-Options', 'ALLOW');
				return $response;
			}
			if ($item instanceof Node) {
				$params = [
					'permissions' => $share->getPermissions(),
					'title' => $item->getName(),
					'fileId' => $item->getId() . '_' . $this->config->getSystemValue('instanceid'),
					'path' => '/',
					'instanceId' => $this->config->getSystemValue('instanceid'),
					'canonical_webroot' => $this->appConfig->getAppValue('canonical_webroot'),
					'userId' => $this->uid,
				];

				$templateFile = $this->templateManager->getTemplateSource($item->getId());
				if ($templateFile) {
					list($urlSrc, $wopi) = $this->tokenManager->getTokenForTemplate($templateFile, $share->getShareOwner(), $item->getId());
				} else {
					list($urlSrc, $token, $wopi) = $this->tokenManager->getToken($item->getId(), $shareToken, $this->uid);
				}
				$params['token'] = $wopi->getToken();
				$params['urlsrc'] = $urlSrc;
				$params['hideCloseButton'] = $node instanceof File && $wopi->getHideDownload();

				$this->initialState->provideDocument($wopi);
				$response = new TemplateResponse('richdocuments', 'documents', $params, 'base');
				$this->applyPolicies($response);
				return $response;
			}
		} catch (\Exception $e) {
			$this->logger->logException($e, ['app'=>'richdocuments']);
			return $this->renderErrorPage('Failed to open the requested file.');
		}

		return new TemplateResponse('core', '403', [], 'guest');
	}

	/**
	 * Open file on Source instance with token from Initiator instance
	 *
	 * @PublicPage
	 * @NoCSRFRequired
	 *
	 * @param string $shareToken
	 * @param $remoteServer
	 * @param $remoteServerToken
	 * @param null $filePath
	 * @return TemplateResponse
	 */
	public function remote($shareToken, $remoteServer, $remoteServerToken, $filePath = null) {
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

			if (($share->getPermissions() & Constants::PERMISSION_READ) === 0) {
				return new TemplateResponse('core', '403', [], 'guest');
			}

			$node = $share->getNode();
			if ($filePath !== null) {
				$node = $node->get($filePath);
			}

			if ($node instanceof Node) {
				list($urlSrc, $token, $wopi) = $this->tokenManager->getToken($node->getId(), $shareToken, $this->uid);

				$remoteWopi = $this->federationService->getRemoteFileDetails($remoteServer, $remoteServerToken);
				if ($remoteWopi === null) {
					throw new \Exception('Invalid remote file details for ' . $remoteServerToken);
				}
				$this->tokenManager->upgradeToRemoteToken($wopi, $remoteWopi, $shareToken, $remoteServer, $remoteServerToken);

				$permissions = $share->getPermissions();
				if (!$remoteWopi->getCanwrite()) {
					$permissions = $permissions & ~ Constants::PERMISSION_UPDATE;
				}

				$params = [
					'permissions' => $permissions,
					'title' => $node->getName(),
					'fileId' => $node->getId() . '_' . $this->config->getSystemValue('instanceid'),
					'token' => $token,
					'urlsrc' => $urlSrc,
					'path' => '/',
					'instanceId' => $this->config->getSystemValue('instanceid'),
					'canonical_webroot' => $this->appConfig->getAppValue('canonical_webroot'),
					'userId' => $remoteWopi->getEditorUid() ? ($remoteWopi->getEditorUid() . '@' . $remoteServer) : null,
				];

				$this->initialState->provideDocument($wopi);
				$response = new TemplateResponse('richdocuments', 'documents', $params, 'base');
				$this->applyPolicies($response);
				return $response;
			}
		} catch (ShareNotFound $e) {
			return new TemplateResponse('core', '404', [], 'guest');
		} catch (\Exception $e) {
			$this->logger->logException($e, ['app'=>'richdocuments']);
			return $this->renderErrorPage('Failed to open the requested file.');
		}

		return new TemplateResponse('core', '403', [], 'guest');
	}

	private function renderErrorPage($message) {
		$params = [
			'errors' => [['error' => $message]]
		];
		return new TemplateResponse('core', 'error', $params, 'guest');
	}
}
