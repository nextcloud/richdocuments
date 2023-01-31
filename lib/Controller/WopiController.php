<?php
/**
 * @copyright Copyright (c) 2016-2017 Lukas Reschke <lukas@statuscode.ch>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Richdocuments\Controller;

use OCA\Files_Versions\Versions\IVersionManager;
use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\Db\Wopi;
use OCA\Richdocuments\Db\WopiMapper;
use OCA\Richdocuments\Events\DocumentOpenedEvent;
use OCA\Richdocuments\Helper;
use OCA\Richdocuments\PermissionManager;
use OCA\Richdocuments\Service\FederationService;
use OCA\Richdocuments\Service\UserScopeService;
use OCA\Richdocuments\TemplateManager;
use OCA\Richdocuments\TokenManager;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\StreamResponse;
use OCP\AppFramework\QueryException;
use OCP\Constants;
use OCP\Encryption\IManager as IEncryptionManager;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\GenericFileException;
use OCP\Files\InvalidPathException;
use OCP\Files\IRootFolder;
use OCP\Files\Lock\ILock;
use OCP\Files\Lock\ILockManager;
use OCP\Files\Lock\LockContext;
use OCP\Files\Lock\NoLockProviderException;
use OCP\Files\Lock\OwnerLockedException;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\IConfig;
use OCP\IGroupManager;
use OCP\ILogger;
use OCP\IRequest;
use OCP\IURLGenerator;
use OCP\IUserManager;
use OCP\Lock\LockedException;
use OCP\PreConditionNotMetException;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager as IShareManager;
use OCP\Share\IShare;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class WopiController extends Controller {
	/** @var IRootFolder */
	private $rootFolder;
	/** @var IURLGenerator */
	private $urlGenerator;
	/** @var IConfig */
	private $config;
	/** @var AppConfig */
	private $appConfig;
	/** @var TokenManager */
	private $tokenManager;
	/** @var PermissionManager */
	private $permissionManager;
	/** @var IUserManager */
	private $userManager;
	/** @var WopiMapper */
	private $wopiMapper;
	/** @var ILogger */
	private $logger;
	/** @var TemplateManager */
	private $templateManager;
	/** @var IShareManager */
	private $shareManager;
	/** @var UserScopeService */
	private $userScopeService;
	/** @var FederationService */
	private $federationService;
	/** @var IEncryptionManager */
	private $encryptionManager;
	/** @var IGroupManager */
	private $groupManager;
	private ILockManager $lockManager;
	private IEventDispatcher $eventDispatcher;

	// Signifies LOOL that document has been changed externally in this storage
	const LOOL_STATUS_DOC_CHANGED = 1010;

	const WOPI_AVATAR_SIZE = 32;

	public function __construct(
		$appName,
		IRequest $request,
		IRootFolder $rootFolder,
		IURLGenerator $urlGenerator,
		IConfig $config,
		AppConfig $appConfig,
		TokenManager $tokenManager,
		PermissionManager $permissionManager,
		IUserManager $userManager,
		WopiMapper $wopiMapper,
		ILogger $logger,
		TemplateManager $templateManager,
		IShareManager $shareManager,
		UserScopeService $userScopeService,
		FederationService $federationService,
		IEncryptionManager $encryptionManager,
		IGroupManager $groupManager,
		ILockManager $lockManager,
		IEventDispatcher $eventDispatcher
	) {
		parent::__construct($appName, $request);
		$this->rootFolder = $rootFolder;
		$this->urlGenerator = $urlGenerator;
		$this->config = $config;
		$this->appConfig = $appConfig;
		$this->tokenManager = $tokenManager;
		$this->permissionManager = $permissionManager;
		$this->userManager = $userManager;
		$this->wopiMapper = $wopiMapper;
		$this->logger = $logger;
		$this->templateManager = $templateManager;
		$this->shareManager = $shareManager;
		$this->userScopeService = $userScopeService;
		$this->federationService = $federationService;
		$this->encryptionManager = $encryptionManager;
		$this->groupManager = $groupManager;
		$this->lockManager = $lockManager;
		$this->eventDispatcher = $eventDispatcher;
	}

	/**
	 * Returns general info about a file.
	 *
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @PublicPage
	 *
	 * @param string $fileId
	 * @param string $access_token
	 * @return JSONResponse
	 * @throws InvalidPathException
	 * @throws NotFoundException
	 */
	public function checkFileInfo($fileId, $access_token) {
		try {

			list($fileId, , $version) = Helper::parseFileId($fileId);

			$wopi = $this->wopiMapper->getWopiForToken($access_token);
			if ($wopi->isTemplateToken()) {
				$this->templateManager->setUserId($wopi->getOwnerUid());
				$file = $this->templateManager->get($wopi->getFileid());
			} else {
				$file = $this->getFileForWopiToken($wopi);
			}
			if(!($file instanceof File)) {
				throw new NotFoundException('No valid file found for ' . $fileId);
			}
		} catch (NotFoundException $e) {
			$this->logger->debug($e->getMessage(), ['app' => 'richdocuments']);
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		} catch (DoesNotExistException $e) {
			$this->logger->debug($e->getMessage(), ['app' => 'richdocuments']);
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		} catch (\Exception $e) {
			$this->logger->logException($e, ['app' => 'richdocuments']);
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		$isPublic = empty($wopi->getEditorUid());
		$guestUserId = 'Guest-' . \OC::$server->getSecureRandom()->generate(8);
		$user = $this->userManager->get($wopi->getEditorUid());
		$userDisplayName = $user !== null && !$isPublic ? $user->getDisplayName() : $wopi->getGuestDisplayname();
		$isVersion = $version !== '0';
		$response = [
			'BaseFileName' => $file->getName(),
			'Size' => $file->getSize(),
			'Version' => $version,
			'UserId' => !$isPublic ? $wopi->getEditorUid() : $guestUserId,
			'OwnerId' => $wopi->getOwnerUid(),
			'UserFriendlyName' => $userDisplayName,
			'UserExtraInfo' => [],
			'UserCanWrite' => (bool)$wopi->getCanwrite(),
			'UserCanNotWriteRelative' => $this->encryptionManager->isEnabled() || $isPublic || $wopi->getHideDownload(),
			'PostMessageOrigin' => $wopi->getServerHost(),
			'LastModifiedTime' => Helper::toISO8601($file->getMTime()),
			'SupportsRename' => !$isVersion,
			'UserCanRename' => !$isPublic && !$isVersion,
			'EnableInsertRemoteImage' => !$isPublic,
			'EnableShare' => $file->isShareable() && !$isVersion && !$isPublic,
			'HideUserList' => '',
			'DisablePrint' => $wopi->getHideDownload(),
			'DisableExport' => $wopi->getHideDownload(),
			'DisableCopy' => $wopi->getHideDownload(),
			'HideExportOption' => $wopi->getHideDownload(),
			'HidePrintOption' => $wopi->getHideDownload(),
			'DownloadAsPostMessage' => $wopi->getDirect(),
			'SupportsLocks' => $this->lockManager->isLockProviderAvailable(),
			'IsUserLocked' => $this->permissionManager->userIsFeatureLocked($wopi->getEditorUid()),
		];

		if ($wopi->hasTemplateId()) {
			$templateUrl = 'index.php/apps/richdocuments/wopi/template/' . $wopi->getTemplateId() . '?access_token=' . $wopi->getToken();
			$templateUrl = $this->urlGenerator->getAbsoluteURL($templateUrl);
			$response['TemplateSource'] = $templateUrl;
		} elseif ($wopi->isTemplateToken()) {
			// FIXME: Remove backward compatibility layer once TemplateSource is available in all supported Collabora versions
			$userFolder = $this->rootFolder->getUserFolder($wopi->getOwnerUid());
			$file = $userFolder->getById($wopi->getTemplateDestination())[0];
			$response['TemplateSaveAs'] = $file->getName();
		}

		$share = $this->getShareForWopiToken($wopi);
		if ($this->permissionManager->shouldWatermark($file, $wopi->getEditorUid(), $share)) {
			$email = $user !== null && !$isPublic ? $user->getEMailAddress() : "";
			$replacements = [
				'userId' => $wopi->getEditorUid(),
				'date' => (new \DateTime())->format('Y-m-d H:i:s'),
				'themingName' => \OC::$server->getThemingDefaults()->getName(),
				'userDisplayName' => $userDisplayName,
				'email' => $email,
			];
			$watermarkTemplate = $this->appConfig->getAppValue('watermark_text');
			$response['WatermarkText'] = preg_replace_callback('/{(.+?)}/', function ($matches) use ($replacements) {
				return $replacements[$matches[1]];
			}, $watermarkTemplate);
		}

		$user = $this->userManager->get($wopi->getEditorUid());
		if($user !== null) {
			$response['UserExtraInfo']['avatar'] = $this->urlGenerator->linkToRouteAbsolute('core.avatar.getAvatar', ['userId' => $wopi->getEditorUid(), 'size' => self::WOPI_AVATAR_SIZE]);
			if ($this->groupManager->isAdmin($wopi->getEditorUid())) {
			   $response['UserExtraInfo']['is_admin'] = true;
			}
		} else {
			$response['UserExtraInfo']['avatar'] = $this->urlGenerator->linkToRouteAbsolute('core.GuestAvatar.getAvatar', ['guestName' => urlencode($wopi->getGuestDisplayname()), 'size' => self::WOPI_AVATAR_SIZE]);
		}

		if ($isPublic) {
			$response['UserExtraInfo']['is_guest'] = true;
		}

		if ($wopi->isRemoteToken()) {
			$response = $this->setFederationFileInfo($wopi, $response);
		}

		$response = array_merge($response, $this->appConfig->getWopiOverride());

		$this->eventDispatcher->dispatchTyped(new DocumentOpenedEvent(
			$user ? $user->getUID() : null,
			$file
		));

		return new JSONResponse($response);
	}


	private function setFederationFileInfo(Wopi $wopi, $response) {
		$response['UserId'] = 'Guest-' . \OC::$server->getSecureRandom()->generate(8);

		if ($wopi->getTokenType() === Wopi::TOKEN_TYPE_REMOTE_USER) {
			$remoteUserId = $wopi->getGuestDisplayname();
			$cloudID = \OC::$server->getCloudIdManager()->resolveCloudId($remoteUserId);
			$response['UserId'] = $cloudID->getDisplayId();
			$response['UserFriendlyName'] = $cloudID->getDisplayId();
			$response['UserExtraInfo']['avatar'] = $this->urlGenerator->linkToRouteAbsolute('core.avatar.getAvatar', ['userId' => explode('@', $remoteUserId)[0], 'size' => self::WOPI_AVATAR_SIZE]);
			$cleanCloudId = str_replace(['http://', 'https://'], '', $cloudID->getId());
			$addressBookEntries = \OC::$server->getContactsManager()->search($cleanCloudId, ['CLOUD']);
			foreach ($addressBookEntries as $entry) {
				if (isset($entry['CLOUD'])) {
					foreach ($entry['CLOUD'] as $cloudID) {
						if ($cloudID === $cleanCloudId) {
							$response['UserFriendlyName'] = $entry['FN'];
							break;
						}
					}
				}
			}
		}

		$initiator = $this->federationService->getRemoteFileDetails($wopi->getRemoteServer(), $wopi->getRemoteServerToken());
		if ($initiator === null) {
			return $response;
		}

		$response['UserFriendlyName'] = $this->tokenManager->prepareGuestName($initiator->getGuestDisplayname());
		if ($initiator->hasTemplateId()) {
			$templateUrl = $wopi->getRemoteServer() . '/index.php/apps/richdocuments/wopi/template/' . $initiator->getTemplateId() . '?access_token=' . $initiator->getToken();
			$response['TemplateSource'] = $templateUrl;
		}
		if ($wopi->getTokenType() === Wopi::TOKEN_TYPE_REMOTE_USER || ($wopi->getTokenType() === Wopi::TOKEN_TYPE_REMOTE_GUEST && $initiator->getEditorUid())) {
			$response['UserExtraInfo']['avatar'] = $wopi->getRemoteServer() . '/index.php/avatar/' . $initiator->getEditorUid() . '/'. self::WOPI_AVATAR_SIZE;
		}

		return $response;
	}

	/**
	 * Given an access token and a fileId, returns the contents of the file.
	 * Expects a valid token in access_token parameter.
	 *
	 * @PublicPage
	 * @NoCSRFRequired
	 *
	 * @param string $fileId
	 * @param string $access_token
	 * @return Http\Response
	 * @throws DoesNotExistException
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 */
	public function getFile($fileId,
							$access_token) {
		list($fileId, , $version) = Helper::parseFileId($fileId);

		$wopi = $this->wopiMapper->getWopiForToken($access_token);

		if ((int)$fileId !== $wopi->getFileid()) {
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		// Template is just returned as there is no version logic
		if ($wopi->isTemplateToken()) {
			$this->templateManager->setUserId($wopi->getOwnerUid());
			$file = $this->templateManager->get($wopi->getFileid());
			$response = new StreamResponse($file->fopen('rb'));
			$response->addHeader('Content-Disposition', 'attachment');
			$response->addHeader('Content-Type', 'application/octet-stream');
			return $response;
		}

		try {
			/** @var File $file */
			$file = $this->getFileForWopiToken($wopi);
			\OC_User::setIncognitoMode(true);
			if ($version !== '0') {
				$userFolder = $this->rootFolder->getUserFolder($wopi->getOwnerUid());
				$versionManager = \OC::$server->get(IVersionManager::class);
				$info = $versionManager->getVersionFile($userFolder->getOwner(), $file, $version);
				if ($info->getSize() === 0) {
					$response = new Http\Response();
				} else {
					$response = new StreamResponse($info->fopen('rb'));
				}
			}
			else {
				if ($file->getSize() === 0) {
					$response = new Http\Response();
				} else {
					$response = new StreamResponse($file->fopen('rb'));
				}
			}
			$response->addHeader('Content-Disposition', 'attachment');
			$response->addHeader('Content-Type', 'application/octet-stream');
			return $response;
		} catch (\Exception $e) {
			$this->logger->logException($e, ['level' => ILogger::ERROR,	'app' => 'richdocuments', 'message' => 'getFile failed']);
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		} catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
			$this->logger->logException($e, ['level' => ILogger::ERROR,	'app' => 'richdocuments', 'message' => 'Version manager could not be found when trying to restore file. Versioning app disabled?']);
			return new JSONResponse([], Http::STATUS_BAD_REQUEST);
		}
	}

	/**
	 * Given an access token and a fileId, replaces the files with the request body.
	 * Expects a valid token in access_token parameter.
	 *
	 * @PublicPage
	 * @NoCSRFRequired
	 *
	 * @param string $fileId
	 * @param string $access_token
	 * @return JSONResponse
	 * @throws DoesNotExistException
	 */
	public function putFile($fileId,
							$access_token) {
		list($fileId, ,) = Helper::parseFileId($fileId);
		$isPutRelative = ($this->request->getHeader('X-WOPI-Override') === 'PUT_RELATIVE');

		$wopi = $this->wopiMapper->getWopiForToken($access_token);
		if (!$wopi->getCanwrite()) {
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		if (!$this->encryptionManager->isEnabled() || $this->isMasterKeyEnabled()) {
			// Set the user to register the change under his name
			$this->userScopeService->setUserScope($wopi->getUserForFileAccess());
			$this->userScopeService->setFilesystemScope($isPutRelative ? $wopi->getEditorUid() : $wopi->getUserForFileAccess());
		} else {
			// Per-user encryption is enabled so that collabora isn't able to store the file by using the
			// user's private key. Because of that we have to use the incognito mode for writing the file.
			\OC_User::setIncognitoMode(true);
		}

		try {
			if ($isPutRelative) {
				// the new file needs to be installed in the current user dir
				$userFolder = $this->rootFolder->getUserFolder($wopi->getEditorUid());
				$file = $userFolder->getById($fileId);
				if (count($file) === 0) {
					return new JSONResponse([], Http::STATUS_NOT_FOUND);
				}
				$file = $file[0];
				$suggested = $this->request->getHeader('X-WOPI-SuggestedTarget');
				$suggested = mb_convert_encoding($suggested, 'utf-8', 'utf-7');

				if ($suggested[0] === '.') {
					$path = dirname($file->getPath()) . '/New File' . $suggested;
				}
				else if ($suggested[0] !== '/') {
					$path = dirname($file->getPath()) . '/' . $suggested;
				}
				else {
					$path = $userFolder->getPath() . $suggested;
				}

				if ($path === '') {
					return new JSONResponse([
						'status' => 'error',
						'message' => 'Cannot create the file'
					]);
				}

				// create the folder first
				if (!$this->rootFolder->nodeExists(dirname($path))) {
					$this->rootFolder->newFolder(dirname($path));
				}

				// create a unique new file
				$path = $this->rootFolder->getNonExistingName($path);
				$this->rootFolder->newFile($path);
				$file = $this->rootFolder->get($path);
			} else {
				$file = $this->getFileForWopiToken($wopi);
				$wopiHeaderTime = $this->request->getHeader('X-LOOL-WOPI-Timestamp');

				if (!empty($wopiHeaderTime) && $wopiHeaderTime !== Helper::toISO8601($file->getMTime() ?? 0)) {
					$this->logger->debug('Document timestamp mismatch ! WOPI client says mtime {headerTime} but storage says {storageTime}', [
						'headerTime' => $wopiHeaderTime,
						'storageTime' => Helper::toISO8601($file->getMTime() ?? 0)
					]);
					// Tell WOPI client about this conflict.
					return new JSONResponse(['LOOLStatusCode' => self::LOOL_STATUS_DOC_CHANGED], Http::STATUS_CONFLICT);
				}
			}

			$content = fopen('php://input', 'rb');

			try {
				$this->wrappedFilesystemOperation($wopi, function () use ($file, $content){
					return $file->putContent($content);
				});
			} catch (LockedException $e) {
				$this->logger->logException($e);
				return new JSONResponse(['message' => 'File locked'], Http::STATUS_INTERNAL_SERVER_ERROR);
			}

			if ($isPutRelative) {
				// generate a token for the new file (the user still has to be logged in)
				list(, $wopiToken) = $this->tokenManager->getToken((string)$file->getId(), null, $wopi->getEditorUid(), $wopi->getDirect());

				$wopi = 'index.php/apps/richdocuments/wopi/files/' . $file->getId() . '_' . $this->config->getSystemValue('instanceid') . '?access_token=' . $wopiToken;
				$url = $this->urlGenerator->getAbsoluteURL($wopi);

				return new JSONResponse([ 'Name' => $file->getName(), 'Url' => $url ], Http::STATUS_OK);
			}
			if ($wopi->hasTemplateId()) {
				$wopi->setTemplateId(null);
				$this->wopiMapper->update($wopi);
			}
			return new JSONResponse(['LastModifiedTime' => Helper::toISO8601($file->getMTime())]);
		} catch (NotFoundException $e) {
			$this->logger->logException($e, ['level' => ILogger::INFO,	'app' => 'richdocuments', 'message' => 'File not found']);
			return new JSONResponse([], Http::STATUS_NOT_FOUND);
		} catch (\Exception $e) {
			$this->logger->logException($e, ['level' => ILogger::ERROR,	'app' => 'richdocuments', 'message' => 'getFile failed']);
			return new JSONResponse([], Http::STATUS_INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * Given an access token and a fileId, replaces the files with the request body.
	 * Expects a valid token in access_token parameter.
	 * Just actually routes to the PutFile, the implementation of PutFile
	 * handles both saving and saving as.* Given an access token and a fileId, replaces the files with the request body.
	 *
	 * FIXME Cleanup this code as is a lot of shared logic between putFile and putRelativeFile
	 *
	 * @PublicPage
	 * @NoCSRFRequired
	 *
	 * @param string $fileId
	 * @param string $access_token
	 * @return JSONResponse
	 * @throws DoesNotExistException
	 */
	public function postFile(string $fileId, string $access_token): JSONResponse {
		try {
			$wopiOverride = $this->request->getHeader('X-WOPI-Override');
			$wopiLock = $this->request->getHeader('X-WOPI-Lock');
			list($fileId, ,) = Helper::parseFileId($fileId);
			$wopi = $this->wopiMapper->getWopiForToken($access_token);
			if ((int) $fileId !== $wopi->getFileid()) {
				return new JSONResponse([], Http::STATUS_FORBIDDEN);
			}
		} catch (DoesNotExistException $e) {
			$this->logger->debug($e->getMessage(), ['app' => 'richdocuments']);
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		} catch (\Exception $e) {
			$this->logger->logException($e, ['app' => 'richdocuments']);
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		switch ($wopiOverride) {
			case 'LOCK':
				return $this->lock($wopi, $wopiLock);
			case 'UNLOCK':
				return $this->unlock($wopi, $wopiLock);
			case 'REFRESH_LOCK':
				return $this->refreshLock($wopi, $wopiLock);
			case 'GET_LOCK':
				return $this->getLock($wopi, $wopiLock);
			case 'RENAME_FILE':
				break; //FIXME: Move to function
			default:
				break; //FIXME: Move to function and add error for unsupported method
		}


		$isRenameFile = ($this->request->getHeader('X-WOPI-Override') === 'RENAME_FILE');

		if (!$wopi->getCanwrite()) {
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		// Unless the editor is empty (public link) we modify the files as the current editor
		$editor = $wopi->getEditorUid();
		if ($editor === null && !$wopi->isRemoteToken()) {
			$editor = $wopi->getOwnerUid();
		}

		try {
			// the new file needs to be installed in the current user dir
			$userFolder = $this->rootFolder->getUserFolder($editor);

			if ($wopi->isTemplateToken()) {
				$this->templateManager->setUserId($wopi->getOwnerUid());
				$file = $userFolder->getById($wopi->getTemplateDestination())[0];
			} else if ($isRenameFile) {
				// the new file needs to be installed in the current user dir
				$file = $this->getFileForWopiToken($wopi);

				$suggested = $this->request->getHeader('X-WOPI-RequestedName');

				$suggested = mb_convert_encoding($suggested, 'utf-8', 'utf-7') . '.' . $file->getExtension();

				if (strpos($suggested, '.') === 0) {
					$path = dirname($file->getPath()) . '/New File' . $suggested;
				}
				else if (strpos($suggested, '/') !== 0) {
					$path = dirname($file->getPath()) . '/' . $suggested;
				}
				else {
					$path = $userFolder->getPath() . $suggested;
				}

				if ($path === '') {
					return new JSONResponse([
						'status' => 'error',
						'message' => 'Cannot rename the file'
					]);
				}

				// create the folder first
				if (!$this->rootFolder->nodeExists(dirname($path))) {
					$this->rootFolder->newFolder(dirname($path));
				}

				// create a unique new file
				$path = $this->rootFolder->getNonExistingName($path);
				$file = $file->move($path);
			} else {
				$file = $this->getFileForWopiToken($wopi);

				$suggested = $this->request->getHeader('X-WOPI-SuggestedTarget');
				$suggested = mb_convert_encoding($suggested, 'utf-8', 'utf-7');

				if ($suggested[0] === '.') {
					$path = dirname($file->getPath()) . '/New File' . $suggested;
				} else if ($suggested[0] !== '/') {
					$path = dirname($file->getPath()) . '/' . $suggested;
				} else {
					$path = $userFolder->getPath() . $suggested;
				}

				if ($path === '') {
					return new JSONResponse([
						'status' => 'error',
						'message' => 'Cannot create the file'
					]);
				}

				// create the folder first
				if (!$this->rootFolder->nodeExists(dirname($path))) {
					$this->rootFolder->newFolder(dirname($path));
				}

				// create a unique new file
				$path = $this->rootFolder->getNonExistingName($path);
				$file = $this->rootFolder->newFile($path);
			}

			$content = fopen('php://input', 'rb');
			// Set the user to register the change under his name
			$this->userScopeService->setUserScope($wopi->getEditorUid());
			$this->userScopeService->setFilesystemScope($wopi->getEditorUid());

			try {
				$this->wrappedFilesystemOperation($wopi, function () use ($file, $content){
					return $file->putContent($content);
				});
			} catch (LockedException $e) {
				return new JSONResponse(['message' => 'File locked'], Http::STATUS_INTERNAL_SERVER_ERROR);
			}

			// epub is exception (can be uploaded but not opened so don't try to get access token)
			if ($file->getMimeType() == 'application/epub+zip') {
				return new JSONResponse([ 'Name' => $file->getName() ], Http::STATUS_OK);
			}

			// generate a token for the new file (the user still has to be
			// logged in)
			list(, $wopiToken) = $this->tokenManager->getToken((string)$file->getId(), null, $wopi->getEditorUid(), $wopi->getDirect());

			$wopi = 'index.php/apps/richdocuments/wopi/files/' . $file->getId() . '_' . $this->config->getSystemValue('instanceid') . '?access_token=' . $wopiToken;
			$url = $this->urlGenerator->getAbsoluteURL($wopi);

			return new JSONResponse([ 'Name' => $file->getName(), 'Url' => $url ], Http::STATUS_OK);
		} catch (NotFoundException $e) {
			$this->logger->logException($e, ['level' => ILogger::INFO,	'app' => 'richdocuments', 'message' => 'File not found']);
			return new JSONResponse([], Http::STATUS_NOT_FOUND);
		} catch (\Exception $e) {
			$this->logger->logException($e, ['level' => ILogger::ERROR,	'app' => 'richdocuments', 'message' => 'putRelativeFile failed']);
			return new JSONResponse([], Http::STATUS_INTERNAL_SERVER_ERROR);
		}
	}

	private function lock(Wopi $wopi, string $lock): JSONResponse {
		try {
			$lock = $this->lockManager->lock(new LockContext(
				$this->getFileForWopiToken($wopi),
				ILock::TYPE_APP,
				Application::APPNAME
			));
			return new JSONResponse();
		} catch (NoLockProviderException|PreConditionNotMetException $e) {
			return new JSONResponse([], Http::STATUS_BAD_REQUEST);
		} catch (OwnerLockedException $e) {
			return new JSONResponse([], Http::STATUS_LOCKED);
		} catch (\Exception $e) {
			return new JSONResponse([], Http::STATUS_INTERNAL_SERVER_ERROR);
		}
	}
	private function unlock(Wopi $wopi, string $lock): JSONResponse {
		try {
			$this->lockManager->unlock(new LockContext(
				$this->getFileForWopiToken($wopi),
				ILock::TYPE_APP,
				Application::APPNAME
			));
			return new JSONResponse();
		} catch (NoLockProviderException|PreConditionNotMetException $e) {
			return new JSONResponse([], Http::STATUS_BAD_REQUEST);
		} catch (\Exception $e) {
			return new JSONResponse([], Http::STATUS_INTERNAL_SERVER_ERROR);
		}
	}

	private function refreshLock(Wopi $wopi, string $lock): JSONResponse {
		try {
			$lock = $this->lockManager->lock(new LockContext(
				$this->getFileForWopiToken($wopi),
				ILock::TYPE_APP,
				Application::APPNAME
			));
			return new JSONResponse();
		} catch (NoLockProviderException|PreConditionNotMetException $e) {
			return new JSONResponse([], Http::STATUS_BAD_REQUEST);
		} catch (OwnerLockedException $e) {
			return new JSONResponse([], Http::STATUS_LOCKED);
		} catch (\Exception $e) {
			return new JSONResponse([], Http::STATUS_INTERNAL_SERVER_ERROR);
		}
	}

	private function getLock(Wopi $wopi, string $lock): JSONResponse {
		$locks = $this->lockManager->getLocks($wopi->getFileid());
		return new JSONResponse();
	}

	/**
	 * @throws NotFoundException
	 * @throws GenericFileException
	 * @throws LockedException
	 * @throws ShareNotFound
	 */
	protected function wrappedFilesystemOperation(Wopi $wopi, callable $filesystemOperation): void {
		$retryOperation = function () use ($filesystemOperation) {
			$this->retryOperation($filesystemOperation);
		};
		try {
			$this->lockManager->runInScope(new LockContext(
				$this->getFileForWopiToken($wopi),
				ILock::TYPE_APP,
				Application::APPNAME
			), $retryOperation);
		} catch (NoLockProviderException $e) {
			$retryOperation();
		}
	}

	/**
	 * Retry operation if a LockedException occurred
	 * Other exceptions will still be thrown
	 * @param callable $operation
	 * @throws LockedException
	 * @throws GenericFileException
	 */
	private function retryOperation(callable $operation) {
		for ($i = 0; $i < 5; $i++) {
			try {
				if ($operation() !== false) {
					return;
				}
			} catch (LockedException $e) {
				if ($i === 4) {
					throw $e;
				}
				usleep(500000);
			}
		}
		throw new GenericFileException('Operation failed after multiple retries');
	}

	/**
	 * @param Wopi $wopi
	 * @return File|Folder|Node|null
	 * @throws NotFoundException
	 * @throws ShareNotFound
	 */
	private function getFileForWopiToken(Wopi $wopi) {
		$this->userScopeService->setUserScope($wopi->getEditorUid());
		if (!empty($wopi->getShare())) {
			$share = $this->shareManager->getShareByToken($wopi->getShare());
			$node = $share->getNode();

			if ($node instanceof File) {
				return $node;
			}

			$nodes = $node->getById($wopi->getFileid());
			return array_shift($nodes);
		}

		// Group folders requires an active user to be set in order to apply the proper acl permissions as for anonymous requests it requires share permissions for read access
		// https://github.com/nextcloud/groupfolders/blob/e281b1e4514cf7ef4fb2513fb8d8e433b1727eb6/lib/Mount/MountProvider.php#L169
		$this->userScopeService->setUserScope($wopi->getEditorUid());
		// Unless the editor is empty (public link) we modify the files as the current editor
		// TODO: add related share token to the wopi table so we can obtain the
		$userFolder = $this->rootFolder->getUserFolder($wopi->getUserForFileAccess());
		$files = $userFolder->getById($wopi->getFileid());

		if (count($files) === 0) {
			throw new NotFoundException('No valid file found for wopi token');
		}

		// Workaround to always open files with edit permissions if multiple occurrences of
		// the same file id are in the user home, ideally we should also track the path of the file when opening
		usort($files, function (Node $a, Node $b) {
			return ($b->getPermissions() & Constants::PERMISSION_UPDATE) <=> ($a->getPermissions() & Constants::PERMISSION_UPDATE);
		});

		return array_shift($files);
	}

	private function getShareForWopiToken(Wopi $wopi): ?IShare {
		try {
			return $wopi->getShare() ? $this->shareManager->getShareByToken($wopi->getShare()) : null;
		} catch (ShareNotFound $e) {
		}

		return null;
	}

	/**
	 * Endpoint to return the template file that is requested by collabora to create a new document
	 *
	 * @PublicPage
	 * @NoCSRFRequired
	 *
	 * @param $fileId
	 * @param $access_token
	 * @return JSONResponse|StreamResponse
	 */
	public function getTemplate($fileId, $access_token) {
		try {
			$wopi = $this->wopiMapper->getPathForToken($access_token);
		} catch (DoesNotExistException $e) {
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		if ((int)$fileId !== $wopi->getTemplateId()) {
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		try {
			$this->templateManager->setUserId($wopi->getOwnerUid());
			$file = $this->templateManager->get($wopi->getTemplateId());
			$response = new StreamResponse($file->fopen('rb'));
			$response->addHeader('Content-Disposition', 'attachment');
			$response->addHeader('Content-Type', 'application/octet-stream');
			return $response;
		} catch (\Exception $e) {
			$this->logger->logException($e, ['level' => ILogger::ERROR,	'app' => 'richdocuments', 'message' => 'getTemplate failed']);
			return new JSONResponse([], Http::STATUS_INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * Check if the encryption module uses a master key.
	 */
	private function isMasterKeyEnabled(): bool {
		try {
			$util = \OC::$server->query(\OCA\Encryption\Util::class);
			return $util->isMasterKeyEnabled();
		} catch (QueryException $e) {
			// No encryption module enabled
			return false;
		}
	}
}
