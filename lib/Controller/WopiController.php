<?php

declare(strict_types=1);
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

use Exception;
use OC\User\NoUserException;
use OCA\Encryption\Util as EncryptionUtil;
use OCA\Files_Versions\Versions\IVersionManager;
use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\Db\Wopi;
use OCA\Richdocuments\Db\WopiMapper;
use OCA\Richdocuments\Events\DocumentOpenedEvent;
use OCA\Richdocuments\Exceptions\ExpiredTokenException;
use OCA\Richdocuments\Exceptions\UnknownTokenException;
use OCA\Richdocuments\Helper;
use OCA\Richdocuments\PermissionManager;
use OCA\Richdocuments\Service\FederationService;
use OCA\Richdocuments\Service\UserScopeService;
use OCA\Richdocuments\Service\WatermarkService;
use OCA\Richdocuments\TemplateManager;
use OCA\Richdocuments\TokenManager;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\Attribute\PublicPage;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\StreamResponse;
use OCP\Constants;
use OCP\Encryption\IManager as IEncryptionManager;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\Files\File;
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
use OCP\IRequest;
use OCP\IURLGenerator;
use OCP\IUserManager;
use OCP\Lock\LockedException;
use OCP\PreConditionNotMetException;
use OCP\Security\ISecureRandom;
use OCP\Server;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager as IShareManager;
use OCP\Share\IShare;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Psr\Log\LoggerInterface;
use RuntimeException;

class WopiController extends Controller {
	// Signifies LOOL that document has been changed externally in this storage
	public const LOOL_STATUS_DOC_CHANGED = 1010;

	public const WOPI_AVATAR_SIZE = 64;

	public function __construct(
		string $appName,
		IRequest $request,
		private IRootFolder $rootFolder,
		private IURLGenerator $urlGenerator,
		private IConfig $config,
		private AppConfig $appConfig,
		private TokenManager $tokenManager,
		private PermissionManager $permissionManager,
		private IUserManager $userManager,
		private WopiMapper $wopiMapper,
		private LoggerInterface $logger,
		private TemplateManager $templateManager,
		private IShareManager $shareManager,
		private UserScopeService $userScopeService,
		private FederationService $federationService,
		private IEncryptionManager $encryptionManager,
		private IGroupManager $groupManager,
		private ILockManager $lockManager,
		private IEventDispatcher $eventDispatcher,
		private WatermarkService $watermarkService
	) {
		parent::__construct($appName, $request);
	}

	/**
	 * WOPI CheckFileInfo
	 *
	 * The CheckFileInfo operation returns information about a file, a user's permissions on that file,
	 * and general information about the capabilities that the WOPI host has on the file.
	 */
	#[NoCSRFRequired]
	#[PublicPage]
	public function checkFileInfo(string $fileId, string $access_token): JSONResponse {
		try {
			list($fileId, , $version) = Helper::parseFileId($fileId);

			$wopi = $this->wopiMapper->getWopiForToken($access_token);
			if ($wopi->isTemplateToken()) {
				$this->templateManager->setUserId($wopi->getOwnerUid());
				$file = $this->templateManager->get($wopi->getFileid());
			} else {
				$file = $this->getFileForWopiToken($wopi);
			}
			if (!($file instanceof File)) {
				throw new NotFoundException('No valid file found for ' . $fileId);
			}
		} catch (NotFoundException $e) {
			$this->logger->debug($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		} catch (UnknownTokenException $e) {
			$this->logger->debug($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		} catch (ExpiredTokenException $e) {
			$this->logger->debug($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_UNAUTHORIZED);
		} catch (Exception $e) {
			$this->logger->error($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		$isPublic = empty($wopi->getEditorUid());
		$guestUserId = 'Guest-' . Server::get(ISecureRandom::class)->generate(8);
		$user = $this->userManager->get($wopi->getEditorUid());
		$userDisplayName = $user !== null && !$isPublic ? $user->getDisplayName() : $wopi->getGuestDisplayname();
		$isVersion = $version !== '0';

		// If the file is locked manually by a user we want to open it read only for all others
		$canWriteThroughLock = true;
		try {
			$locks = $this->lockManager->getLocks($wopi->getFileid());
			$canWriteThroughLock = count($locks) > 0 && $locks[0]->getType() === ILock::TYPE_USER && $locks[0]->getOwner() !== $wopi->getEditorUid() ? false : true;
		} catch (NoLockProviderException|PreConditionNotMetException) {
		}

		$response = [
			'BaseFileName' => $file->getName(),
			'Size' => $file->getSize(),
			'Version' => $version,
			'UserId' => !empty($wopi->getEditorUid()) ? $wopi->getEditorUid() : $guestUserId,
			'OwnerId' => $wopi->getOwnerUid(),
			'UserFriendlyName' => $userDisplayName,
			'UserExtraInfo' => [],
			'UserPrivateInfo' => [],
			'UserCanWrite' => $canWriteThroughLock && (bool)$wopi->getCanwrite(),
			'UserCanNotWriteRelative' => $isPublic || $this->encryptionManager->isEnabled() || $wopi->getHideDownload(),
			'PostMessageOrigin' => $wopi->getServerHost(),
			'LastModifiedTime' => Helper::toISO8601($file->getMTime()),
			'SupportsRename' => !$isVersion,
			'UserCanRename' => !$wopi->isGuest() && !$isVersion,
			'EnableInsertRemoteImage' => !$isPublic,
			'EnableShare' => $file->isShareable() && !$isVersion && !$isPublic,
			'DownloadAsPostMessage' => $wopi->getDirect(),
			'SupportsLocks' => $this->lockManager->isLockProviderAvailable(),
			'IsUserLocked' => $this->permissionManager->userIsFeatureLocked($wopi->getEditorUid()),
			'EnableRemoteLinkPicker' => (bool)$wopi->getCanwrite() && !$isPublic && !$wopi->getDirect(),
			'HideUserList' => '',
		];
		$response = array_merge(
			$response,
			// TODO: Once PHP is >= 8.1 we can use array unpacking with string-keyed arrays
			$this->templateManager->getWopiParams($wopi),
			$this->watermarkService->getWopiParams($wopi),
			$this->checkFileInfoUserExtraInfo($wopi),
			$this->checkFileInfoHideDownload($wopi),
		);

		$enableZotero = $this->config->getAppValue(Application::APPNAME, 'zoteroEnabled', 'yes') === 'yes';
		if (!$isPublic && $enableZotero) {
			$zoteroAPIKey = $this->config->getUserValue($wopi->getEditorUid(), 'richdocuments', 'zoteroAPIKey', '');
			$response['UserPrivateInfo']['ZoteroAPIKey'] = $zoteroAPIKey;
		}
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

		$user = $this->userManager->get($wopi->getEditorUid());
		if ($user !== null) {
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
			$user?->getUID(),
			$file
		));

		return new JSONResponse($response);
	}

	private function checkFileInfoUserExtraInfo(Wopi $wopi): array {
		$editorUid = $wopi->getEditorUid();
		$user = $editorUid !== null ? $this->userManager->get($editorUid) : null;

		if($user === null || $editorUid === null) {
			return [
				'UserExtraInfo' => [
					'avatar' => $this->urlGenerator->linkToRouteAbsolute('core.GuestAvatar.getAvatar', ['guestName' => urlencode($wopi->getGuestDisplayname()), 'size' => self::WOPI_AVATAR_SIZE])
				]
			];
		}

		return [
			'UserExtraInfo' => [
				'avatar' => $this->urlGenerator->linkToRouteAbsolute('core.avatar.getAvatar', ['userId' => $editorUid, 'size' => self::WOPI_AVATAR_SIZE]),
				'is_admin' => $this->groupManager->isAdmin($editorUid),
			]
		];
	}

	private function setFederationFileInfo(Wopi $wopi, array $response): array {
		if (!$wopi->isRemoteToken()) {
			return $response;
		}
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

	private function checkFileInfoHideDownload(Wopi $wopi): array {
		return [
			'DisablePrint' => $wopi->getHideDownload(),
			'DisableExport' => $wopi->getHideDownload(),
			'DisableCopy' => $wopi->getHideDownload(),
			'HideExportOption' => $wopi->getHideDownload(),
			'HidePrintOption' => $wopi->getHideDownload(),
		];
	}

	/**
	 * WOPI GetFile
	 * The GetFile operation retrieves a file from a host.
	 */
	#[PublicPage]
	#[NoCSRFRequired]
	public function getFile(string $fileId, string $access_token): JSONResponse|Http\Response {
		list($fileId, , $version) = Helper::parseFileId($fileId);

		try {
			$wopi = $this->wopiMapper->getWopiForToken($access_token);
		} catch (UnknownTokenException $e) {
			$this->logger->debug($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		} catch (ExpiredTokenException $e) {
			$this->logger->debug($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_UNAUTHORIZED);
		} catch (Exception $e) {
			$this->logger->error($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		if ((int)$fileId !== $wopi->getFileid()) {
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		// Template is just returned as there is no version logic
		if ($wopi->isTemplateToken()) {
			$this->templateManager->setUserId($wopi->getOwnerUid());
			$file = $this->templateManager->get($wopi->getFileid());
			$handler = $file->fopen('rb');
			if (!$handler) {
				$this->logger->error('getFile failed to retrurn template file');
				return new JSONResponse([], Http::STATUS_FORBIDDEN);
			}
			$response = new StreamResponse($handler);
			$response->addHeader('Content-Disposition', 'attachment');
			$response->addHeader('Content-Type', 'application/octet-stream');
			return $response;
		}

		try {
			/** @var File $file */
			$file = $this->getFileForWopiToken($wopi);
			\OC_User::setIncognitoMode(true);
			if ($version !== '0') {
				$versionManager = \OC::$server->get(IVersionManager::class);
				$info = $versionManager->getVersionFile($this->userManager->get($wopi->getUserForFileAccess()), $file, $version);
				if ($info->getSize() === 0) {
					$response = new Http\Response();
				} else {
					$response = new StreamResponse($info->fopen('rb'));
				}
			} else {
				if ($file->getSize() === 0) {
					$response = new Http\Response();
				} else {
					$response = new StreamResponse($file->fopen('rb'));
				}
			}
			$response->addHeader('Content-Disposition', 'attachment');
			$response->addHeader('Content-Type', 'application/octet-stream');
			return $response;
		} catch (Exception $e) {
			$this->logger->error('getFile failed: ' . $e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		} catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
			$this->logger->error('Version manager could not be found when trying to restore file. Versioning app disabled?: ' . $e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_BAD_REQUEST);
		}
	}

	/**
	 * WOPI PutFile
	 * The PutFile operation updates a file’s binary contents.
	 */
	#[PublicPage]
	#[NoCSRFRequired]
	public function putFile(string $fileId, string $access_token): JSONResponse {
		list($fileId, , ) = Helper::parseFileId($fileId);
		$isPutRelative = ($this->request->getHeader('X-WOPI-Override') === 'PUT_RELATIVE');

		try {
			$wopi = $this->wopiMapper->getWopiForToken($access_token);
		} catch (UnknownTokenException $e) {
			$this->logger->debug($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		} catch (ExpiredTokenException $e) {
			$this->logger->debug($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_UNAUTHORIZED);
		} catch (Exception $e) {
			$this->logger->error($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

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
				} elseif ($suggested[0] !== '/') {
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
				$this->rootFolder->newFile($path);
				$file = $this->rootFolder->get($path);
			} else {
				$file = $this->getFileForWopiToken($wopi);
				$wopiHeaderTime = $this->request->getHeader('X-LOOL-WOPI-Timestamp');

				if (!empty($wopiHeaderTime) && $wopiHeaderTime !== Helper::toISO8601($file->getMTime())) {
					$this->logger->debug('Document timestamp mismatch ! WOPI client says mtime {headerTime} but storage says {storageTime}', [
						'headerTime' => $wopiHeaderTime,
						'storageTime' => Helper::toISO8601($file->getMTime())
					]);
					// Tell WOPI client about this conflict.
					return new JSONResponse(['LOOLStatusCode' => self::LOOL_STATUS_DOC_CHANGED], Http::STATUS_CONFLICT);
				}
			}

			if (!$file instanceof File) {
				throw new Exception('Unexpected node type');
			}

			$content = fopen('php://input', 'rb');

			try {
				$this->wrappedFilesystemOperation($wopi, function () use ($file, $content): void {
					$file->putContent($content);
				});
			} catch (LockedException $e) {
				$this->logger->error($e->getMessage(), ['exception' => $e]);
				return new JSONResponse(['message' => 'File locked'], Http::STATUS_INTERNAL_SERVER_ERROR);
			}

			if ($isPutRelative) {
				// generate a token for the new file (the user still has to be logged in)
				$wopi = $this->tokenManager->generateWopiToken((string)$file->getId(), null, $wopi->getEditorUid(), $wopi->getDirect());

				$wopiUrl = 'index.php/apps/richdocuments/wopi/files/' . $file->getId() . '_' . $this->config->getSystemValue('instanceid') . '?access_token=' . $wopi->getToken();
				$wopiUrl = $this->urlGenerator->getAbsoluteURL($wopiUrl);

				return new JSONResponse([ 'Name' => $file->getName(), 'Url' => $wopiUrl ], Http::STATUS_OK);
			}
			if ($wopi->hasTemplateId()) {
				$wopi->setTemplateId(null);
				$this->wopiMapper->update($wopi);
			}
			return new JSONResponse(['LastModifiedTime' => Helper::toISO8601($file->getMTime())]);
		} catch (NotFoundException $e) {
			$this->logger->warning($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_NOT_FOUND);
		} catch (Exception $e) {
			$this->logger->error($e->getMessage(), ['exception' => $e]);
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
	 */
	#[PublicPage]
	#[NoCSRFRequired]
	public function postFile(string $fileId, string $access_token): JSONResponse {
		try {
			$wopiOverride = $this->request->getHeader('X-WOPI-Override');
			$wopiLock = $this->request->getHeader('X-WOPI-Lock');
			list($fileId, , ) = Helper::parseFileId($fileId);
			$wopi = $this->wopiMapper->getWopiForToken($access_token);
			if ((int) $fileId !== $wopi->getFileid()) {
				return new JSONResponse([], Http::STATUS_FORBIDDEN);
			}
		} catch (UnknownTokenException $e) {
			$this->logger->debug($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		} catch (ExpiredTokenException $e) {
			$this->logger->debug($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_UNAUTHORIZED);
		} catch (Exception $e) {
			$this->logger->error($e->getMessage(), ['exception' => $e]);
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
			} elseif ($isRenameFile) {
				// the new file needs to be installed in the current user dir
				$file = $this->getFileForWopiToken($wopi);

				$suggested = $this->request->getHeader('X-WOPI-RequestedName');

				$suggested = mb_convert_encoding($suggested, 'utf-8', 'utf-7') . '.' . $file->getExtension();

				if (strpos($suggested, '.') === 0) {
					$path = dirname($file->getPath()) . '/New File' . $suggested;
				} elseif (strpos($suggested, '/') !== 0) {
					$path = dirname($file->getPath()) . '/' . $suggested;
				} else {
					$path = $userFolder->getPath() . $suggested;
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
				} elseif ($suggested[0] !== '/') {
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

			if (!$file instanceof File) {
				throw new Exception('Unexpected node type');
			}

			$content = fopen('php://input', 'rb');
			// Set the user to register the change under his name
			$this->userScopeService->setUserScope($wopi->getEditorUid());
			$this->userScopeService->setFilesystemScope($wopi->getEditorUid());

			try {
				$this->wrappedFilesystemOperation($wopi, function () use ($file, $content): void {
					$file->putContent($content);
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
			$wopi = $this->tokenManager->generateWopiToken((string)$file->getId(), null, $wopi->getEditorUid(), $wopi->getDirect());

			$wopiUrl = 'index.php/apps/richdocuments/wopi/files/' . $file->getId() . '_' . $this->config->getSystemValue('instanceid') . '?access_token=' . $wopi->getToken();
			$wopiUrl = $this->urlGenerator->getAbsoluteURL($wopiUrl);

			return new JSONResponse([ 'Name' => $file->getName(), 'Url' => $wopiUrl ], Http::STATUS_OK);
		} catch (NotFoundException $e) {
			$this->logger->warning($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_NOT_FOUND);
		} catch (Exception $e) {
			$this->logger->error($e->getMessage(), ['exception' => $e]);
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
		} catch (NoLockProviderException|PreConditionNotMetException) {
			return new JSONResponse([], Http::STATUS_BAD_REQUEST);
		} catch (OwnerLockedException $e) {
			// If a file is manually locked by a user we want to all this user to still perform a WOPI lock and write
			if ($e->getLock()->getType() === ILock::TYPE_USER && $e->getLock()->getOwner() === $wopi->getEditorUid()) {
				return new JSONResponse();
			}

			return new JSONResponse([], Http::STATUS_LOCKED);
		} catch (Exception $e) {
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
			$locks = $this->lockManager->getLocks($wopi->getFileid());
			$canWriteThroughLock = count($locks) > 0 && $locks[0]->getType() === ILock::TYPE_USER && $locks[0]->getOwner() !== $wopi->getEditorUid() ? false : true;
			if ($canWriteThroughLock) {
				return new JSONResponse();
			}
			return new JSONResponse([], Http::STATUS_BAD_REQUEST);
		} catch (Exception $e) {
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
		} catch (Exception $e) {
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
		$retryOperation = function () use ($filesystemOperation): void {
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
	private function retryOperation(callable $operation): void {
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
	 * @throws NotFoundException
	 * @throws ShareNotFound
	 * @throws InvalidPathException
	 * @throws NotPermittedException
	 * @throws NoUserException
	 */
	private function getFileForWopiToken(Wopi $wopi): File {
		if (!empty($wopi->getShare())) {
			$share = $this->shareManager->getShareByToken($wopi->getShare());
			$node = $share->getNode();

			if ($node instanceof File) {
				return $node;
			}

			$nodes = $node->getById($wopi->getFileid());

			$file = array_shift($nodes);
			if (!$file instanceof File) {
				throw new NotFoundException('Unexpected node type');
			}
			return $file;
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

		$file = array_shift($files);
		if (!$file instanceof File) {
			throw new NotFoundException('Unexpected node type');
		}
		return $file;
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
	 */
	#[PublicPage]
	#[NoCSRFRequired]
	public function getTemplate(string $fileId, string $access_token): JSONResponse|StreamResponse {
		try {
			$wopi = $this->wopiMapper->getWopiForToken($access_token);

			if ((int)$fileId !== $wopi->getTemplateId()) {
				return new JSONResponse([], Http::STATUS_FORBIDDEN);
			}

			$this->templateManager->setUserId($wopi->getOwnerUid());
			$file = $this->templateManager->get($wopi->getTemplateId());
			$handler = $file->fopen('rb');
			if (!$handler) {
				throw new RuntimeException('getTemplate failed to return template file');
			}
			$response = new StreamResponse($handler);
			$response->addHeader('Content-Disposition', 'attachment');
			$response->addHeader('Content-Type', 'application/octet-stream');
			return $response;
		} catch (UnknownTokenException $e) {
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		} catch (ExpiredTokenException $e) {
			return new JSONResponse([], Http::STATUS_UNAUTHORIZED);
		} catch (Exception $e) {
			$this->logger->error('getTemplate failed: ' . $e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * Check if the encryption module uses a master key.
	 */
	private function isMasterKeyEnabled(): bool {
		try {
			$util = Server::get(EncryptionUtil::class);
			return $util->isMasterKeyEnabled();
		} catch (NotFoundExceptionInterface|ContainerExceptionInterface) {
			// No encryption module enabled
			return false;
		}
	}
}
