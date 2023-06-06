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

use \OCA\Richdocuments\AppConfig;
use \OCP\AppFramework\Controller;
use \OCP\AppFramework\Http\TemplateResponse;
use \OCP\IConfig;
use \OCP\ILogger;
use \OCP\IRequest;
use OC\User\NoUserException;
use OCA\Richdocuments\Service\FederationService;
use OCA\Richdocuments\Service\InitialStateService;
use OCA\Richdocuments\TemplateManager;
use OCA\Richdocuments\TokenManager;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\RedirectResponse;
use OCP\Constants;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\ISession;
use OCP\IURLGenerator;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager;

class DocumentController extends Controller {
	use DocumentTrait;

	public const SESSION_FILE_TARGET = 'richdocuments_openfile_target';

	/** @var ?string */
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
	private IURLGenerator $urlGenerator;

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
		InitialStateService $initialState,
		IURLGenerator $urlGenerator
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
		$this->urlGenerator = $urlGenerator;
	}

	/**
	 * @PublicPage
	 * @NoCSRFRequired
	 *
	 * Returns the access_token and urlsrc for WOPI access for given $fileId
	 * Requests is accepted only when a secret_token is provided set by admin in
	 * settings page
	 *
	 * @return array access_token, urlsrc
	 */
	public function extAppGetData(int $fileId) {
		$secretToken = $this->request->getParam('secret_token');
		$apps = array_filter(explode(',', $this->appConfig->getAppValue('external_apps')));
		foreach ($apps as $app) {
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
					if (!($item instanceof Node)) {
						throw new \Exception();
					}
					list($urlSrc, $token) = $this->tokenManager->getToken($item->getId());
					return [
						'status' => 'success',
						'urlsrc' => $urlSrc,
						'token' => $token
					];
				} catch (\Exception $e) {
					$this->logger->logException($e, ['app' => 'richdocuments']);
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
	 * @UseSession
	 *
	 * @param string $fileId
	 * @param string|null $path
	 * @return RedirectResponse|TemplateResponse
	 */
	public function index($fileId, ?string $path = null) {
		try {
			$folder = $this->rootFolder->getUserFolder($this->uid);

			if ($path !== null) {
				$item = $folder->get($path);
			} else {
				$item = $folder->getById($fileId)[0];
			}

			if (!($item instanceof File)) {
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
				'token_ttl' => $wopi->getExpiry(),
				'urlsrc' => $urlSrc,
				'path' => $folder->getRelativePath($item->getPath()),
			];

			$targetData = $this->session->get(self::SESSION_FILE_TARGET);
			if ($targetData) {
				$this->session->remove(self::SESSION_FILE_TARGET);
				if ($targetData['fileId'] === $item->getId()) {
					$params['target'] = $targetData['target'];
				}
			}

			$encryptionManager = \OC::$server->getEncryptionManager();
			if ($encryptionManager->isEnabled()) {
				// Update the current file to be accessible with system public shared key
				$owner = $item->getOwner()->getUID();
				$absPath = '/' . $owner . '/' .  $item->getInternalPath();
				$accessList = \OC::$server->getEncryptionFilesHelper()->getAccessList($absPath);
				$accessList['public'] = true;
				$encryptionManager->getEncryptionModule()->update($absPath, $owner, $accessList);
			}

			return $this->documentTemplateResponse($wopi, $params);
		} catch (\Exception $e) {
			$this->logger->logException($e, ['app' => 'richdocuments']);
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
			'token_ttl' => $wopi->getExpiry(),
			'urlsrc' => $urlSrc,
			'path' => $userFolder->getRelativePath($file->getPath()),
		];

		return $this->documentTemplateResponse($wopi, $params);
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
			if ($share->getPassword()) {
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
			if ($node instanceof Folder) {
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
					'isPublicShare' => true,
				];

				$templateFile = $this->templateManager->getTemplateSource($item->getId());
				if ($templateFile) {
					list($urlSrc, $wopi) = $this->tokenManager->getTokenForTemplate($templateFile, $share->getShareOwner(), $item->getId());
				} else {
					list($urlSrc, $token, $wopi) = $this->tokenManager->getToken($item->getId(), $shareToken, $this->uid);
				}
				$params['token'] = $wopi->getToken();
				$params['token_ttl'] = $wopi->getExpiry();
				$params['urlsrc'] = $urlSrc;
				$params['hideCloseButton'] = $node instanceof File && $wopi->getHideDownload();

				return $this->documentTemplateResponse($wopi, $params);
			}
		} catch (\Exception $e) {
			$this->logger->logException($e, ['app' => 'richdocuments']);
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
			if ($share->getPassword()) {
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
					'token_ttl' => $wopi->getExpiry(),
					'urlsrc' => $urlSrc,
					'path' => '/',
					'userId' => $remoteWopi->getEditorUid() ? ($remoteWopi->getEditorUid() . '@' . $remoteServer) : null,
				];

				return $this->documentTemplateResponse($wopi, $params);
			}
		} catch (ShareNotFound $e) {
			return new TemplateResponse('core', '404', [], 'guest');
		} catch (\Exception $e) {
			$this->logger->logException($e, ['app' => 'richdocuments']);
			return $this->renderErrorPage('Failed to open the requested file.');
		}

		return new TemplateResponse('core', '403', [], 'guest');
	}

	private function renderErrorPage(string $message, $status = Http::STATUS_INTERNAL_SERVER_ERROR) {
		$params = [
			'errors' => [['error' => $message]]
		];
		$response = new TemplateResponse('core', 'error', $params, 'guest');
		$response->setStatus($status);
		return $response;
	}

	/**
	 * @NoCSRFRequired
	 * @NoAdminRequired
	 * @UseSession
	 */
	public function editOnline(string $path = null, ?string $userId = null, ?string $target = null) {
		if ($path === null) {
			return $this->renderErrorPage('No path provided');
		}

		if ($userId === null) {
			$userId = $this->uid;
		}

		if ($userId !== null && $userId !== $this->uid) {
			return $this->renderErrorPage('You are trying to open a file from another user account than the one you are currently logged in with.');
		}

		if ($userId === null) {
			$params = [];
			$params['redirect_url'] = $this->request->getRequestUri();
			$params['user'] = $userId;
			$url = $this->urlGenerator->linkToRoute('core.login.showLoginForm', $params);
			return new RedirectResponse($url);
		}

		try {
			$userFolder = $this->rootFolder->getUserFolder($userId);
			$file = $userFolder->get($path);
			if ($target !== null) {
				$this->session->set(self::SESSION_FILE_TARGET, [
					'fileId' => $file->getId(),
					'target' => $target,
				]);
			}
			$redirectUrl = $this->urlGenerator->getAbsoluteURL('/index.php/f/' . $file->getId());
			return new RedirectResponse($redirectUrl);
		} catch (NotFoundException $e) {
		} catch (NotPermittedException $e) {
		} catch (NoUserException $e) {
		}

		return $this->renderErrorPage('File not found', Http::STATUS_NOT_FOUND);
	}

	/**
	 * @NoCSRFRequired
	 * @NoAdminRequired
	 * @UseSession
	 */
	public function editOnlineTarget(int $fileId, ?string $target = null) {
		if (!$this->uid) {
			return $this->renderErrorPage('File not found', Http::STATUS_NOT_FOUND);
		}

		try {
			$userFolder = $this->rootFolder->getUserFolder($this->uid);
			$files = $userFolder->getById($fileId);
			$file = array_shift($files);
			if (!$file) {
				return $this->renderErrorPage('File not found', Http::STATUS_NOT_FOUND);
			}

			if ($target !== null) {
				$this->session->set(self::SESSION_FILE_TARGET, [
					'fileId' => $file->getId(),
					'target' => $target,
				]);
			}
			$redirectUrl = $this->urlGenerator->getAbsoluteURL('/index.php/f/' . $file->getId());
			return new RedirectResponse($redirectUrl);
		} catch (NotFoundException $e) {
		} catch (NotPermittedException $e) {
		} catch (NoUserException $e) {
		}

		return $this->renderErrorPage('File not found', Http::STATUS_NOT_FOUND);
	}
}
