<?php
/**
 * SPDX-FileCopyrightText: 2016 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Controller;

use Exception;
use OC\User\NoUserException;
use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Db\Wopi;
use OCA\Richdocuments\Service\FederationService;
use OCA\Richdocuments\Service\InitialStateService;
use OCA\Richdocuments\TemplateManager;
use OCA\Richdocuments\TokenManager;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\Attribute\PublicPage;
use OCP\AppFramework\Http\Attribute\UseSession;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\RedirectResponse;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\Constants;
use OCP\Encryption\IFile as EncryptionFilesHelper;
use OCP\Encryption\IManager as IEncryptionManager;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\IConfig;
use OCP\IRequest;
use OCP\ISession;
use OCP\IURLGenerator;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager;
use OCP\Share\IShare;
use Psr\Log\LoggerInterface;

class DocumentController extends Controller {
	use DocumentTrait;

	public const SESSION_FILE_TARGET = 'richdocuments_openfile_target';

	public function __construct(
		string $appName,
		IRequest $request,
		private IConfig $config,
		private AppConfig $appConfig,
		private IManager $shareManager,
		private TokenManager $tokenManager,
		private IRootFolder $rootFolder,
		private ISession $session,
		private ?string $userId,
		private LoggerInterface $logger,
		private TemplateManager $templateManager,
		private FederationService $federationService,
		private InitialStateService $initialState,
		private IURLGenerator $urlGenerator,
	) {
		parent::__construct($appName, $request);
	}

	/**
	 * Returns the access_token and urlsrc for WOPI access for given $fileId
	 * Requests is accepted only when a secret_token is provided set by admin in
	 * settings page
	 *
	 * @return array access_token, urlsrc
	 */
	#[PublicPage]
	#[NoCSRFRequired]
	public function extAppGetData(int $fileId): array {
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
					$file = $this->getFileForUser($fileId);
					$urlSrc = $this->tokenManager->getUrlSrc($file);
					$wopi = $this->tokenManager->generateWopiToken($this->getWopiFileId($file->getId()));
					return [
						'status' => 'success',
						'urlsrc' => $urlSrc,
						'token' => $wopi->getToken()
					];
				} catch (Exception $e) {
					$this->logger->error($e->getMessage(), ['exception' => $e]);
				}
			}
		}
		return [
			'status' => 'error',
			'message' => 'Permission denied'
		];
	}

	#[NoAdminRequired]
	#[UseSession]
	public function index($fileId, ?string $path = null): RedirectResponse|TemplateResponse {
		try {
			$file = $this->getFileForUser($fileId, $path);

			/**
			 * Open file on source instance if it is originating from a federated share
			 * The generated url will result in {@link remote()}
			 */
			$federatedUrl = $this->federationService->getRemoteRedirectURL($file);
			if ($federatedUrl !== null) {
				$response = new RedirectResponse($federatedUrl);
				$response->addHeader('X-Frame-Options', 'ALLOW');
				return $response;
			}

			$wopi = $this->getToken($file);

			$params = [
				'permissions' => $file->getPermissions(),
				'title' => $file->getName(),
				'fileId' => $this->getWopiFileId($file->getId()),
				'token' => $wopi->getToken(),
				'token_ttl' => $wopi->getExpiry(),
				'urlsrc' => $this->tokenManager->getUrlSrc($file),
				'path' => $file->getParent()->getRelativePath($file->getPath()),
			];

			$targetData = $this->session->get(self::SESSION_FILE_TARGET);
			if ($targetData) {
				$this->session->remove(self::SESSION_FILE_TARGET);
				if ($targetData['fileId'] === $file->getId()) {
					$params['target'] = $targetData['target'];
				}
			}

			$encryptionManager = \OCP\Server::get(IEncryptionManager::class);
			if ($encryptionManager->isEnabled()) {
				// Update the current file to be accessible with system public shared key
				$owner = $file->getOwner()->getUID();
				$absPath = '/' . $owner . '/' . $file->getInternalPath();
				$accessList = \OCP\Server::get(EncryptionFilesHelper::class)->getAccessList($absPath);
				$accessList['public'] = true;
				$encryptionManager->getEncryptionModule()->update($absPath, $owner, $accessList);
			}

			return $this->documentTemplateResponse($wopi, $params);
		} catch (Exception $e) {
			$this->logger->error($e->getMessage(), ['exception' => $e]);
			return $this->renderErrorPage('Failed to open the requested file.');
		}
	}

	/**
	 * Create a new file from a template
	 */
	#[NoAdminRequired]
	public function createFromTemplate(int $templateId, string $fileName, string $dir = '/'): TemplateResponse {
		if (!$this->templateManager->isTemplate($templateId)) {
			return new TemplateResponse('core', '403', [], 'guest');
		}

		$userFolder = $this->rootFolder->getUserFolder($this->userId);
		try {
			$folder = $userFolder->get($dir);
		} catch (NotFoundException) {
			return new TemplateResponse('core', '403', [], 'guest');
		}

		if (!$folder instanceof Folder) {
			return new TemplateResponse('core', '403', [], 'guest');
		}

		$file = $folder->newFile($fileName);

		$template = $this->templateManager->get($templateId);
		$urlSrc = $this->tokenManager->getUrlSrc($file);
		$isGuest = $this->userId === null;
		$wopi = $this->tokenManager->generateWopiTokenForTemplate($template, $file->getId(), $this->userId, $isGuest);

		$params = [
			'permissions' => $template->getPermissions(),
			'title' => $fileName,
			'fileId' => $this->getWopiFileId($file->getId()),
			'token' => $wopi->getToken(),
			'token_ttl' => $wopi->getExpiry(),
			'urlsrc' => $urlSrc,
			'path' => $userFolder->getRelativePath($file->getPath()),
		];

		return $this->documentTemplateResponse($wopi, $params);
	}

	#[PublicPage]
	#[NoCSRFRequired]
	public function publicPage(string $shareToken, ?string $fileName = null, ?int $fileId = null): TemplateResponse|RedirectResponse {
		try {
			$share = $this->shareManager->getShareByToken($shareToken);
			$file = $this->getFileForShare($share, $fileId, $fileName);
			$federatedUrl = $this->federationService->getRemoteRedirectURL($file, null, $share);
			if ($federatedUrl !== null) {
				$response = new RedirectResponse($federatedUrl);
				$response->addHeader('X-Frame-Options', 'ALLOW');
				return $response;
			}

			$params = [
				'permissions' => $share->getPermissions(),
				'title' => $file->getName(),
				'fileId' => $this->getWopiFileId($file->getId()),
				'path' => '/',
				'isPublicShare' => true,
			];

			$wopi = $this->getToken($file, $share);
			$params['token'] = $wopi->getToken();
			$params['token_ttl'] = $wopi->getExpiry();
			$params['urlsrc'] = $this->tokenManager->getUrlSrc($file);
			$params['hideCloseButton'] = $wopi->getHideDownload();

			return $this->documentTemplateResponse($wopi, $params);
		} catch (Exception $e) {
			$this->logger->error($e->getMessage(), ['exception' => $e]);
			return $this->renderErrorPage('Failed to open the requested file.');
		}
	}

	/**
	 * Open file on Source instance with token from Initiator instance
	 */
	#[PublicPage]
	#[NoCSRFRequired]
	public function remote(string $shareToken, string $remoteServer, string $remoteServerToken, ?string $filePath = null): TemplateResponse {
		try {
			$share = $this->shareManager->getShareByToken($shareToken);
			// not authenticated ?
			if ($share->getPassword()) {
				if (!$this->session->exists('public_link_authenticated')
					|| $this->session->get('public_link_authenticated') !== (string)$share->getId()
				) {
					throw new Exception('Invalid password');
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
				$urlSrc = $this->tokenManager->getUrlSrc($node);
				$wopi = $this->tokenManager->generateWopiToken($node->getId(), $shareToken, $this->userId);

				$remoteWopi = $this->federationService->getRemoteFileDetails($remoteServer, $remoteServerToken);
				if ($remoteWopi === null) {
					throw new Exception('Invalid remote file details for ' . $remoteServerToken);
				}
				$this->tokenManager->upgradeToRemoteToken($wopi, $remoteWopi, $shareToken, $remoteServer, $remoteServerToken);

				$permissions = $share->getPermissions();
				if (!$remoteWopi->getCanwrite()) {
					$permissions = $permissions & ~ Constants::PERMISSION_UPDATE;
				}

				$params = [
					'permissions' => $permissions,
					'title' => $node->getName(),
					'fileId' => $this->getWopiFileId($node->getId()),
					'token' => $wopi->getToken(),
					'token_ttl' => $wopi->getExpiry(),
					'urlsrc' => $urlSrc,
					'path' => '/',
					'userId' => $remoteWopi->getEditorUid() ? ($remoteWopi->getEditorUid() . '@' . $remoteServer) : null,
				];

				$response = $this->documentTemplateResponse($wopi, $params);
				$response->addHeader('X-Frame-Options', 'ALLOW');
				return $response;
			}
		} catch (ShareNotFound) {
			return new TemplateResponse('core', '404', [], 'guest');
		} catch (Exception $e) {
			$this->logger->error($e->getMessage(), ['exception' => $e]);
			return $this->renderErrorPage('Failed to open the requested file.');
		}

		return new TemplateResponse('core', '403', [], 'guest');
	}

	/**
	 * Open file on Source instance with token from Initiator instance
	 */
	#[PublicPage]
	#[NoCSRFRequired]
	public function remotePost(string $shareToken, string $remoteServer, string $remoteServerToken, ?string $filePath = null): TemplateResponse {
		return $this->remote($shareToken, $remoteServer, $remoteServerToken, $filePath);
	}


	private function renderErrorPage(string $message, int $status = Http::STATUS_INTERNAL_SERVER_ERROR): TemplateResponse {
		$params = [
			'errors' => [['error' => $message]]
		];
		$response = new TemplateResponse('core', 'error', $params, 'guest');
		$response->setStatus($status);
		return $response;
	}

	#[NoCSRFRequired]
	#[NoAdminRequired]
	#[UseSession]
	public function editOnline(?string $path = null, ?string $userId = null, ?string $target = null): RedirectResponse|TemplateResponse {
		if ($path === null) {
			return $this->renderErrorPage('No path provided');
		}

		if ($userId === null) {
			$userId = $this->userId;
		}

		if ($userId !== null && $userId !== $this->userId) {
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
		} catch (NotFoundException|NotPermittedException|NoUserException) {
		}

		return $this->renderErrorPage('File not found', Http::STATUS_NOT_FOUND);
	}

	#[NoCSRFRequired]
	#[NoAdminRequired]
	#[UseSession]
	public function editOnlineTarget(int $fileId, ?string $target = null): RedirectResponse|TemplateResponse {
		if (!$this->userId) {
			return $this->renderErrorPage('File not found', Http::STATUS_NOT_FOUND);
		}

		try {
			$file = $this->getFileForUser($fileId);

			if ($target !== null) {
				$this->session->set(self::SESSION_FILE_TARGET, [
					'fileId' => $file->getId(),
					'target' => $target,
				]);
			}
			$redirectUrl = $this->urlGenerator->getAbsoluteURL('/index.php/f/' . $file->getId());
			return new RedirectResponse($redirectUrl);
		} catch (NotFoundException|NotPermittedException|NoUserException) {
		}

		return $this->renderErrorPage('File not found', Http::STATUS_NOT_FOUND);
	}

	#[PublicPage]
	public function token(int $fileId, ?string $shareToken = null, ?string $path = null, ?string $guestName = null): DataResponse {
		try {
			$share = $shareToken ? $this->shareManager->getShareByToken($shareToken) : null;
			$file = $shareToken ? $this->getFileForShare($share, $fileId, $path) : $this->getFileForUser($fileId, $path);

			$federatedUrl = $this->federationService->getRemoteRedirectURL($file, null, $share);
			if ($federatedUrl) {
				return new DataResponse([
					'federatedUrl' => $federatedUrl,
				]);
			}

			$isGuest = $guestName || !$this->userId;
			$wopi = $this->getToken($file, $share, null, $isGuest);

			$this->tokenManager->setGuestName($wopi, $guestName);

			return new DataResponse(array_merge(
				[ 'urlSrc' => $this->tokenManager->getUrlSrc($file) ],
				$wopi->jsonSerialize(),
			));
		} catch (Exception $e) {
			$this->logger->error('Failed to generate token for file', [ 'exception' => $e ]);
			return new DataResponse('Failed to generate token', Http::STATUS_INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * Since collabora does not extend the session on interaction we need to manually trigger this while editing
	 */
	#[NoAdminRequired]
	public function heartbeat(): DataResponse {
		return new DataResponse();
	}

	/**
	 * @throws NotPermittedException
	 * @throws NotFoundException
	 * @throws NoUserException
	 */
	private function getFileForUser(int $fileId, ?string $path = null): File {
		$folder = $this->rootFolder->getUserFolder($this->userId);

		if ($path !== null) {
			$node = $folder->get($path);
		} else {
			$node = $folder->getFirstNodeById($fileId);
		}

		if ($node instanceof File) {
			return $node;
		}

		throw new NotFoundException();
	}

	/**
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 */
	private function getFileForShare(IShare $share, ?int $fileId, ?string $path = null): File {
		// not authenticated ?
		if ($share->getPassword()) {
			if (!$this->session->exists('public_link_authenticated')
				|| $this->session->get('public_link_authenticated') !== (string)$share->getId()
			) {
				throw new NotPermittedException('Invalid password');
			}
		}

		if (($share->getPermissions() & Constants::PERMISSION_READ) === 0) {
			throw new NotPermittedException();
		}

		$node = $share->getNode();
		if ($node instanceof File) {
			return $node;
		}

		if ($fileId === null && $path === null) {
			throw new NotFoundException();
		}

		if ($path !== null) {
			$node = $node->get($path);
		} else {
			$node = $node->getFirstNodeById($fileId);
		}

		if ($node instanceof File) {
			return $node;
		}

		throw new NotFoundException();
	}

	private function getToken(File $file, ?IShare $share = null, ?int $version = null, bool $isGuest = false): Wopi {
		// Pass through $version
		$templateFile = $this->templateManager->getTemplateSource($file->getId());
		if ($templateFile) {
			$owneruid = $share?->getShareOwner() ?? $file->getOwner()->getUID();

			$wopiToken = $this->tokenManager->generateWopiTokenForTemplate(
				$templateFile,
				$file->getId(),
				$owneruid,
				$isGuest,
				false,
				$share?->getPermissions(),
				$this->userId,
			);
			$this->tokenManager->setShareToken($wopiToken, $share?->getToken());
			return $wopiToken;
		}


		return $this->tokenManager->generateWopiToken($this->getWopiFileId($file->getId(), $version), $share?->getToken(), $this->userId);
	}

	private function getWopiFileId(int $fileId, ?int $version = null): string {
		return $fileId . '_' . $this->config->getSystemValue('instanceid') . ($version ? '_' . $version : '');
	}
}
