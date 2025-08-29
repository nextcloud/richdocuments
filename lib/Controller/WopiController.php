<?php
/**
 * SPDX-FileCopyrightText: 2016 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Controller;

use OCA\Files_Versions\Versions\IVersionManager;
use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\Controller\Attribute\RestrictToWopiServer;
use OCA\Richdocuments\Db\Wopi;
use OCA\Richdocuments\Db\WopiMapper;
use OCA\Richdocuments\Events\DocumentOpenedEvent;
use OCA\Richdocuments\Exceptions\ExpiredTokenException;
use OCA\Richdocuments\Exceptions\UnknownTokenException;
use OCA\Richdocuments\Helper;
use OCA\Richdocuments\PermissionManager;
use OCA\Richdocuments\Service\CapabilitiesService;
use OCA\Richdocuments\Service\FederationService;
use OCA\Richdocuments\Service\SettingsService;
use OCA\Richdocuments\Service\UserScopeService;
use OCA\Richdocuments\TaskProcessingManager;
use OCA\Richdocuments\TemplateManager;
use OCA\Richdocuments\TokenManager;
use OCA\Richdocuments\WOPI\SettingsUrl;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\Attribute\PublicPage;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\StreamResponse;
use OCP\AppFramework\QueryException;
use OCP\Constants;
use OCP\Contacts\IManager as IContactsManager;
use OCP\Defaults;
use OCP\Encryption\IManager as IEncryptionManager;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\Federation\ICloudIdManager;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\GenericFileException;
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
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager as IShareManager;
use OCP\Share\IShare;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Psr\Log\LoggerInterface;

#[RestrictToWopiServer]
class WopiController extends Controller {
	// Signifies LOOL that document has been changed externally in this storage
	public const LOOL_STATUS_DOC_CHANGED = 1010;

	public const WOPI_AVATAR_SIZE = 64;

	public function __construct(
		$appName,
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
		private TaskProcessingManager $taskProcessingManager,
		private SettingsService $settingsService,
		private CapabilitiesService $capabilitiesService,
		private Helper $helper,
	) {
		parent::__construct($appName, $request);
	}

	/**
	 * Returns general info about a file.
	 */
	#[NoAdminRequired]
	#[NoCSRFRequired]
	#[PublicPage]
	#[FrontpageRoute(verb: 'GET', url: 'wopi/files/{fileId}')]
	public function checkFileInfo(string $fileId, string $access_token): JSONResponse {
		try {
			[$fileId, , $version] = Helper::parseFileId($fileId);

			$wopi = $this->wopiMapper->getWopiForToken($access_token);
			$file = $this->getFileForWopiToken($wopi);
			if (!($file instanceof File)) {
				throw new NotFoundException('No valid file found for ' . $fileId);
			}
		} catch (NotFoundException|UnknownTokenException $e) {
			$this->logger->debug($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		} catch (ExpiredTokenException $e) {
			$this->logger->debug($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_UNAUTHORIZED);
		} catch (\Exception $e) {
			$this->logger->error($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		$isPublic = empty($wopi->getEditorUid());
		$guestUserId = 'Guest-' . \OCP\Server::get(\OCP\Security\ISecureRandom::class)->generate(8);
		$user = $this->userManager->get($wopi->getEditorUid());
		$userDisplayName = $user !== null && !$isPublic ? $user->getDisplayName() : $wopi->getGuestDisplayname();
		$isVersion = $version !== '0';
		$isSmartPickerEnabled = (bool)$wopi->getCanwrite() && !$isPublic && !$wopi->getDirect();
		$isTaskProcessingEnabled = $isSmartPickerEnabled && $this->taskProcessingManager->isTaskProcessingEnabled();

		$share = $this->getShareForWopiToken($wopi, $file);
		$shouldUseSecureView = $this->permissionManager->shouldWatermark($file, $wopi->getEditorUid(), $share);

		// If the file is locked manually by a user we want to open it read only for all others
		$canWriteThroughLock = true;
		try {
			$locks = $this->lockManager->getLocks($wopi->getFileid());
			$canWriteThroughLock = count($locks) > 0 && $locks[0]->getType() === ILock::TYPE_USER && $locks[0]->getOwner() !== $wopi->getEditorUid() ? false : true;
		} catch (NoLockProviderException|PreConditionNotMetException) {
		}

		$userId = !$isPublic ? $wopi->getEditorUid() : $guestUserId;


		$response = [
			'BaseFileName' => $file->getName(),
			'Size' => $file->getSize(),
			'Version' => $version,
			'UserId' => $userId,
			'OwnerId' => $wopi->getOwnerUid(),
			'UserFriendlyName' => $userDisplayName,
			'UserExtraInfo' => [],
			'UserPrivateInfo' => [],
			'UserCanWrite' => $canWriteThroughLock && (bool)$wopi->getCanwrite(),
			'UserCanNotWriteRelative' => $isPublic || $this->encryptionManager->isEnabled() || $wopi->getHideDownload() || $wopi->isRemoteToken() || $shouldUseSecureView,
			'PostMessageOrigin' => $wopi->getServerHost(),
			'LastModifiedTime' => Helper::toISO8601($file->getMTime()),
			'SupportsRename' => !$isVersion && !$wopi->isRemoteToken(),
			'UserCanRename' => !$isPublic && !$isVersion && !$wopi->isRemoteToken(),
			'EnableInsertRemoteImage' => !$isPublic,
			'EnableInsertRemoteFile' => !$isPublic,
			'EnableShare' => $file->isShareable() && !$isVersion && !$isPublic,
			'HideUserList' => '',
			'EnableOwnerTermination' => $wopi->getCanwrite() && !$isPublic,
			'DisablePrint' => $wopi->getHideDownload() || $shouldUseSecureView,
			'DisableExport' => $wopi->getHideDownload() || $shouldUseSecureView,
			'DisableCopy' => $wopi->getHideDownload() || $shouldUseSecureView,
			'HideExportOption' => $wopi->getHideDownload() || $shouldUseSecureView,
			'HidePrintOption' => $wopi->getHideDownload() || $shouldUseSecureView,
			'DownloadAsPostMessage' => $wopi->getDirect(),
			'SupportsLocks' => $this->lockManager->isLockProviderAvailable(),
			'IsUserLocked' => $this->permissionManager->userIsFeatureLocked($wopi->getEditorUid()),
			'EnableRemoteLinkPicker' => $isSmartPickerEnabled,
			'EnableRemoteAIContent' => $isTaskProcessingEnabled,
			'HasContentRange' => true,
			'ServerPrivateInfo' => [],
		];

		if ($this->capabilitiesService->hasSettingIframeSupport()) {
			$token = $this->generateSettingToken($userId);
			if (!$isPublic) {
				$response['UserSettings'] = $this->generateSettings($token, 'userconfig', $userId);
			}
			$response['SharedSettings'] = $this->generateSettings($token, 'systemconfig');
		}

		$enableZotero = $this->config->getAppValue(Application::APPNAME, 'zoteroEnabled', 'yes') === 'yes';
		if (!$isPublic && $enableZotero) {
			$zoteroAPIKey = $this->config->getUserValue($wopi->getEditorUid(), 'richdocuments', 'zoteroAPIKey', '');
			$response['UserPrivateInfo']['ZoteroAPIKey'] = $zoteroAPIKey;
		}
		$enableDocumentSigning = $this->config->getAppValue(Application::APPNAME, 'documentSigningEnabled', 'yes') === 'yes';
		if (!$isPublic && $enableDocumentSigning) {
			$documentSigningCert = $this->config->getUserValue($wopi->getEditorUid(), 'richdocuments', 'documentSigningCert', '');
			$response['UserPrivateInfo']['SignatureCert'] = $documentSigningCert;
			$documentSigningKey = $this->config->getUserValue($wopi->getEditorUid(), 'richdocuments', 'documentSigningKey', '');
			$response['UserPrivateInfo']['SignatureKey'] = $documentSigningKey;
			$documentSigningCa = $this->config->getUserValue($wopi->getEditorUid(), 'richdocuments', 'documentSigningCa', '');
			$response['UserPrivateInfo']['SignatureCa'] = $documentSigningCa;

			$eSignatureBaseUrl = $this->config->getAppValue(Application::APPNAME, 'esignature_base_url');
			$eSignatureClientId = $this->config->getAppValue(Application::APPNAME, 'esignature_client_id');
			$eSignatureSecret = $this->config->getAppValue(Application::APPNAME, 'esignature_secret');
			if ($eSignatureBaseUrl === '' && $eSignatureClientId !== '' && $eSignatureSecret !== '') {
				// If the client ID & secret is set, then assume a production base URL.
				$eSignatureBaseUrl = 'https://id.eideasy.com';
			}
			if ($eSignatureBaseUrl !== '') {
				$response['ServerPrivateInfo']['ESignatureBaseUrl'] = $eSignatureBaseUrl;
			}
			if ($eSignatureClientId !== '') {
				$response['ServerPrivateInfo']['ESignatureClientId'] = $eSignatureClientId;
			}
			if ($eSignatureSecret !== '') {
				$response['ServerPrivateInfo']['ESignatureSecret'] = $eSignatureSecret;
			}
		}
		if ($wopi->hasTemplateId()) {
			$response['TemplateSource'] = $this->getWopiUrlForTemplate($wopi);
		}

		if ($shouldUseSecureView) {
			$email = $user !== null && !$isPublic ? $user->getEMailAddress() : '';
			$currentDateTime = new \DateTime(
				'now',
				new \DateTimeZone($this->config->getSystemValueString('default_timezone', 'UTC'))
			);
			$replacements = [
				'userId' => $wopi->getEditorUid(),
				'date' => $currentDateTime->format('Y-m-d H:i:s'),
				'themingName' => \OCP\Server::get(Defaults::class)->getName(),
				'userDisplayName' => $userDisplayName,
				'email' => $email,
			];
			$watermarkTemplate = $this->appConfig->getAppValue('watermark_text');
			$response['WatermarkText'] = preg_replace_callback('/{(.+?)}/', fn ($matches) => $replacements[$matches[1]], $watermarkTemplate);
		}

		$user = $this->userManager->get($wopi->getEditorUid());
		if ($user !== null) {
			$response['UserExtraInfo']['avatar'] = $this->urlGenerator->linkToRouteAbsolute('core.avatar.getAvatar', ['userId' => $wopi->getEditorUid(), 'size' => self::WOPI_AVATAR_SIZE]);
			if ($this->groupManager->isAdmin($wopi->getEditorUid())) {
				$response['UserExtraInfo']['is_admin'] = true; // DEPRECATED
				$response['IsAdminUser'] = true;
			} else {
				$response['UserExtraInfo']['is_admin'] = false; // DEPRECATED
				$response['IsAdminUser'] = false;
			}
		} else {
			$response['UserExtraInfo']['avatar'] = $this->urlGenerator->linkToRouteAbsolute('core.GuestAvatar.getAvatar', ['guestName' => urlencode($wopi->getGuestDisplayname()), 'size' => self::WOPI_AVATAR_SIZE]);
			$response['UserExtraInfo']['is_admin'] = false; // DEPRECATED
			$response['IsAdminUser'] = false;
		}

		if ($isPublic) {
			$response['UserExtraInfo']['is_guest'] = true; // DEPRECATED
			$response['IsAnonymousUser'] = true;
		} else {
			$response['IsAnonymousUser'] = false;
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


	private function setFederationFileInfo(Wopi $wopi, $response) {
		$response['UserId'] = 'Guest-' . \OCP\Server::get(\OCP\Security\ISecureRandom::class)->generate(8);

		if ($wopi->getTokenType() === Wopi::TOKEN_TYPE_REMOTE_USER) {
			$remoteUserId = $wopi->getGuestDisplayname();
			$cloudID = \OCP\Server::get(ICloudIdManager::class)->resolveCloudId($remoteUserId);
			$response['UserId'] = $cloudID->getDisplayId();
			$response['UserFriendlyName'] = $cloudID->getDisplayId();
			$response['UserExtraInfo']['avatar'] = $this->urlGenerator->linkToRouteAbsolute('core.avatar.getAvatar', ['userId' => explode('@', $remoteUserId)[0], 'size' => self::WOPI_AVATAR_SIZE]);
			$cleanCloudId = str_replace(['http://', 'https://'], '', $cloudID->getId());
			$addressBookEntries = \OCP\Server::get(IContactsManager::class)->search($cleanCloudId, ['CLOUD']);
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
			$response['UserExtraInfo']['avatar'] = $wopi->getRemoteServer() . '/index.php/avatar/' . $initiator->getEditorUid() . '/' . self::WOPI_AVATAR_SIZE;
		}

		return $response;
	}

	/**
	 * Given an access token and a fileId, returns the contents of the file.
	 */
	#[NoAdminRequired]
	#[NoCSRFRequired]
	#[PublicPage]
	#[FrontpageRoute(verb: 'GET', url: 'wopi/files/{fileId}/contents')]
	public function getFile(string $fileId, string $access_token): JSONResponse|StreamResponse|Http\Response {
		[$fileId, , $version] = Helper::parseFileId($fileId);

		try {
			$wopi = $this->wopiMapper->getWopiForToken($access_token);
		} catch (UnknownTokenException $e) {
			$this->logger->debug($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		} catch (ExpiredTokenException $e) {
			$this->logger->debug($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_UNAUTHORIZED);
		} catch (\Exception $e) {
			$this->logger->error($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		if ((int)$fileId !== $wopi->getFileid()) {
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		try {
			/** @var File $file */
			$file = $this->getFileForWopiToken($wopi);
			\OC_User::setIncognitoMode(true);
			if ($version !== '0') {
				$versionManager = \OCP\Server::get(IVersionManager::class);
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

					$filesize = $file->getSize();
					if ($this->request->getHeader('Range')) {
						preg_match('/bytes=(\d+)-(\d+)?/', $this->request->getHeader('Range'), $matches);

						$offset = intval($matches[1] ?? 0);
						$length = intval($matches[2] ?? 0) - $offset + 1;
						if ($length <= 0) {
							$length = $filesize - $offset;
						}

						$fp = $file->fopen('rb');
						$rangeStream = fopen('php://temp', 'w+b');
						stream_copy_to_stream($fp, $rangeStream, (int)$length, $offset);
						fclose($fp);

						fseek($rangeStream, 0);
						$response = new StreamResponse($rangeStream);
						$response->addHeader('Accept-Ranges', 'bytes');
						$response->addHeader('Content-Length', (string)$filesize);
						$response->setStatus(Http::STATUS_PARTIAL_CONTENT);
						$response->addHeader('Content-Range', 'bytes ' . $offset . '-' . ($offset + $length) . '/' . $filesize);
					} else {
						$response = new StreamResponse($file->fopen('rb'));
					}
				}
			}
			$response->addHeader('Content-Disposition', 'attachment');
			$response->addHeader('Content-Type', 'application/octet-stream');
			return $response;
		} catch (\Exception $e) {
			$this->logger->error('getFile failed: ' . $e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		} catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
			$this->logger->error('Version manager could not be found when trying to restore file. Versioning app disabled?: ' . $e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_BAD_REQUEST);
		}
	}

	#[NoAdminRequired]
	#[NoCSRFRequired]
	#[PublicPage]
	#[FrontpageRoute(verb: 'GET', url: 'wopi/settings')]
	public function getSettings(string $type, string $access_token): JSONResponse {
		if (empty($type)) {
			return new JSONResponse(['error' => 'Invalid type parameter'], Http::STATUS_BAD_REQUEST);
		}

		try {
			$wopi = $this->wopiMapper->getWopiForToken($access_token);
			if ($wopi->getTokenType() !== Wopi::TOKEN_TYPE_SETTING_AUTH && $wopi->getTokenType() !== Wopi::TOKEN_TYPE_USER) {
				return new JSONResponse(['error' => 'Invalid token type'], Http::STATUS_BAD_REQUEST);
			}

			$isPublic = empty($wopi->getEditorUid());
			$guestUserId = 'Guest-' . \OCP\Server::get(\OCP\Security\ISecureRandom::class)->generate(8);
			$userId = !$isPublic ? $wopi->getEditorUid() : $guestUserId;

			$userConfig = $this->settingsService->generateSettingsConfig($type, $userId);
			return new JSONResponse($userConfig, Http::STATUS_OK);
		} catch (UnknownTokenException|ExpiredTokenException $e) {
			$this->logger->debug($e->getMessage(), ['exception' => $e]);
			return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
		} catch (\Exception $e) {
			$this->logger->error($e->getMessage(), ['exception' => $e]);
			return new JSONResponse(['error' => 'Internal Server Error'], Http::STATUS_INTERNAL_SERVER_ERROR);
		}
	}

	#[NoAdminRequired]
	#[NoCSRFRequired]
	#[PublicPage]
	#[FrontpageRoute(verb: 'POST', url: 'wopi/settings/upload')]
	public function uploadSettingsFile(string $fileId, string $access_token): JSONResponse {
		try {
			$wopi = $this->wopiMapper->getWopiForToken($access_token);

			$userId = $wopi->getEditorUid();

			if (empty($userId)) {
				throw new \Exception('UserID is empty');
			}

			$content = fopen('php://input', 'rb');
			if (!$content) {
				throw new \Exception('Failed to read input stream.');
			}

			$fileContent = stream_get_contents($content);
			fclose($content);

			// Use the fileId as a file path URL (e.g., "/settings/systemconfig/wordbook/en_US%20(1).dic")
			$settingsUrl = new SettingsUrl($fileId);
			$result = $this->settingsService->uploadFile($settingsUrl, $fileContent, $userId);

			return new JSONResponse([
				'status' => 'success',
				'filename' => $settingsUrl->getFileName(),
				'details' => $result,
			], Http::STATUS_OK);

		} catch (UnknownTokenException $e) {
			$this->logger->debug($e->getMessage(), ['exception' => $e]);
			return new JSONResponse(['error' => 'Invalid token'], Http::STATUS_FORBIDDEN);
		} catch (\Exception $e) {
			$this->logger->error($e->getMessage(), ['exception' => $e]);
			return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_INTERNAL_SERVER_ERROR);
		}
	}

	#[NoAdminRequired]
	#[NoCSRFRequired]
	#[PublicPage]
	#[FrontpageRoute(verb: 'DELETE', url: 'wopi/settings')]
	public function deleteSettingsFile(string $fileId, string $access_token): JSONResponse {
		try {
			$wopi = $this->wopiMapper->getWopiForToken($access_token);
			if ($wopi->getTokenType() !== Wopi::TOKEN_TYPE_SETTING_AUTH) {
				return new JSONResponse(['error' => 'Invalid token type'], Http::STATUS_FORBIDDEN);
			}

			// Parse the dynamic file path from `fileId`, e.g. "/settings/systemconfig/wordbook/en_US (1).dic"
			$settingsUrl = new SettingsUrl($fileId);
			$type = $settingsUrl->getType();
			$category = $settingsUrl->getCategory();
			$fileName = $settingsUrl->getFileName();
			$userId = $wopi->getEditorUid();

			$this->settingsService->deleteSettingsFile($type, $category, $fileName, $userId);

			return new JSONResponse([
				'status' => 'success',
				'message' => "File '$fileName' deleted from '$category' of type '$type'."
			], Http::STATUS_OK);
		} catch (UnknownTokenException $e) {
			$this->logger->debug($e->getMessage(), ['exception' => $e]);
			return new JSONResponse(['error' => 'Invalid token'], Http::STATUS_FORBIDDEN);
		} catch (NotFoundException $e) {
			return new JSONResponse(['error' => 'File not found'], Http::STATUS_NOT_FOUND);
		} catch (NotPermittedException $e) {
			return new JSONResponse(['error' => 'Not permitted'], Http::STATUS_FORBIDDEN);
		} catch (\Exception $e) {
			$this->logger->error($e->getMessage(), ['exception' => $e]);
			return new JSONResponse(['error' => 'Internal Server Error'], Http::STATUS_INTERNAL_SERVER_ERROR);
		}
	}


	/**
	 * Given an access token and a fileId, replaces the files with the request body.
	 * Expects a valid token in access_token parameter.
	 */
	#[NoAdminRequired]
	#[NoCSRFRequired]
	#[PublicPage]
	#[FrontpageRoute(verb: 'POST', url: 'wopi/files/{fileId}/contents')]
	public function putFile(string $fileId, string $access_token): JSONResponse {
		[$fileId, , ] = Helper::parseFileId($fileId);
		$isPutRelative = ($this->request->getHeader('X-WOPI-Override') === 'PUT_RELATIVE');

		try {
			$wopi = $this->wopiMapper->getWopiForToken($access_token);
		} catch (UnknownTokenException $e) {
			$this->logger->debug($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		} catch (ExpiredTokenException $e) {
			$this->logger->debug($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_UNAUTHORIZED);
		} catch (\Exception $e) {
			$this->logger->error($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		if (!$wopi->getCanwrite()) {
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		if (!$this->encryptionManager->isEnabled() || $this->isMasterKeyEnabled()) {
			// Set the user to register the change under his name
			$this->userScopeService->setUserScope($wopi->getEditorUid());
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
				$file = $userFolder->getFirstNodeById($fileId);
				if ($file === null) {
					return new JSONResponse([], Http::STATUS_NOT_FOUND);
				}
				$suggested = $this->request->getHeader('X-WOPI-SuggestedTarget');
				$suggested = (string)mb_convert_encoding($suggested, 'utf-8', 'utf-7');

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

			$freespace = (int)$file->getStorage()->free_space($file->getInternalPath());
			$contentLength = (int)$this->request->getHeader('Content-Length');

			try {
				if ($freespace >= 0 && $contentLength > $freespace) {
					throw new \Exception('Not enough storage');
				}
				$this->wrappedFilesystemOperation($wopi, fn () => $file->putContent($content));
			} catch (LockedException $e) {
				$this->logger->error($e->getMessage(), ['exception' => $e]);
				return new JSONResponse(['message' => 'File locked'], Http::STATUS_INTERNAL_SERVER_ERROR);
			}

			if ($isPutRelative) {
				// generate a token for the new file (the user still has to be logged in)
				$wopi = $this->tokenManager->generateWopiToken((string)$file->getId(), null, $wopi->getEditorUid(), $wopi->getDirect());
				return new JSONResponse(['Name' => $file->getName(), 'Url' => $this->getWopiUrlForFile($wopi, $file)], Http::STATUS_OK);
			}
			if ($wopi->hasTemplateId()) {
				$wopi->setTemplateId(null);
				$this->wopiMapper->update($wopi);
			}
			return new JSONResponse(['LastModifiedTime' => Helper::toISO8601($file->getMTime())]);
		} catch (NotFoundException $e) {
			$this->logger->warning($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_NOT_FOUND);
		} catch (\Exception $e) {
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
	#[NoAdminRequired]
	#[NoCSRFRequired]
	#[PublicPage]
	#[FrontpageRoute(verb: 'POST', url: 'wopi/files/{fileId}')]
	public function postFile(string $fileId, string $access_token): JSONResponse {
		try {
			$wopiOverride = $this->request->getHeader('X-WOPI-Override');
			$wopiLock = $this->request->getHeader('X-WOPI-Lock');
			[$fileId, , ] = Helper::parseFileId($fileId);
			$wopi = $this->wopiMapper->getWopiForToken($access_token);
			if ((int)$fileId !== $wopi->getFileid()) {
				return new JSONResponse([], Http::STATUS_FORBIDDEN);
			}
		} catch (UnknownTokenException $e) {
			$this->logger->debug($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		} catch (ExpiredTokenException $e) {
			$this->logger->debug($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_UNAUTHORIZED);
		} catch (\Exception $e) {
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
		$isPublic = $editor === null && !$wopi->isRemoteToken();
		if ($isPublic) {
			$editor = $wopi->getOwnerUid();
		}

		try {
			// the new file needs to be installed in the current user dir
			$userFolder = $this->rootFolder->getUserFolder($editor);

			if ($isRenameFile) {
				// the new file needs to be installed in the current user dir
				$file = $this->getFileForWopiToken($wopi);

				$suggested = $this->request->getHeader('X-WOPI-RequestedName');
				$suggested = mb_convert_encoding($suggested, 'utf-8', 'utf-7') . '.' . $file->getExtension();

				$path = $this->normalizePath($suggested, dirname($file->getPath()));

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
				$this->lockManager->runInScope(new LockContext(
					$this->getFileForWopiToken($wopi),
					ILock::TYPE_APP,
					Application::APPNAME
				), function () use (&$file, $path): void {
					$file = $file->move($path);
				});
			} else {
				$file = $this->getFileForWopiToken($wopi);

				$suggested = $this->request->getHeader('X-WOPI-SuggestedTarget');
				$suggested = mb_convert_encoding($suggested, 'utf-8', 'utf-7');

				$parent = $isPublic ? dirname($file->getPath()) : $userFolder->getPath();
				$path = $this->normalizePath($suggested, $parent);

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
			$this->userScopeService->setUserScope($editor);
			$this->userScopeService->setFilesystemScope($editor);

			try {
				$this->wrappedFilesystemOperation($wopi, fn () => $file->putContent($content));
			} catch (LockedException) {
				return new JSONResponse(['message' => 'File locked'], Http::STATUS_INTERNAL_SERVER_ERROR);
			}

			// epub is exception (can be uploaded but not opened so don't try to get access token)
			if ($file->getMimeType() == 'application/epub+zip') {
				return new JSONResponse(['Name' => $file->getName()], Http::STATUS_OK);
			}

			// generate a token for the new file (the user still has to be
			// logged in)
			$wopi = $this->tokenManager->generateWopiToken((string)$file->getId(), $wopi->getShare(), $wopi->getEditorUid(), $wopi->getDirect());

			return new JSONResponse(['Name' => $file->getName(), 'Url' => $this->getWopiUrlForFile($wopi, $file)], Http::STATUS_OK);
		} catch (NotFoundException $e) {
			$this->logger->warning($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_NOT_FOUND);
		} catch (\Exception $e) {
			$this->logger->error($e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_INTERNAL_SERVER_ERROR);
		}
	}

	private function normalizePath(string $path, ?string $parent = null): string {
		$path = str_starts_with($path, '/') ? $path : '/' . $path;
		$parent = is_null($parent) ? '' : rtrim($parent, '/');

		return $parent . $path;
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
		} catch (\Exception) {
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
		} catch (NoLockProviderException|PreConditionNotMetException) {
			$locks = $this->lockManager->getLocks($wopi->getFileid());
			$canWriteThroughLock = count($locks) > 0 && $locks[0]->getType() === ILock::TYPE_USER && $locks[0]->getOwner() !== $wopi->getEditorUid() ? false : true;
			if ($canWriteThroughLock) {
				return new JSONResponse();
			}
			return new JSONResponse([], Http::STATUS_BAD_REQUEST);
		} catch (\Exception) {
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
		} catch (NoLockProviderException|PreConditionNotMetException) {
			return new JSONResponse([], Http::STATUS_BAD_REQUEST);
		} catch (OwnerLockedException) {
			return new JSONResponse([], Http::STATUS_LOCKED);
		} catch (\Exception) {
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
		} catch (NoLockProviderException) {
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
		if (!empty($wopi->getShare())) {
			$share = $this->shareManager->getShareByToken($wopi->getShare());
			$node = $share->getNode();

			if ($node instanceof File) {
				return $node;
			}

			return $node->getFirstNodeById($wopi->getFileid());
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
		usort($files, fn (Node $a, Node $b) => ($b->getPermissions() & Constants::PERMISSION_UPDATE) <=> ($a->getPermissions() & Constants::PERMISSION_UPDATE));

		return array_shift($files);
	}

	private function getShareForWopiToken(Wopi $wopi, File $file): ?IShare {
		try {
			$shareToken = $wopi->getShare();
			if ($shareToken) {
				return $this->shareManager->getShareByToken($shareToken);
			}
			return $this->helper->getShareFromNode($file);
		} catch (ShareNotFound) {
		}

		return null;
	}

	/**
	 * Endpoint to return the template file that is requested by collabora to create a new document
	 */
	#[NoAdminRequired]
	#[NoCSRFRequired]
	#[PublicPage]
	#[FrontpageRoute(verb: 'GET', url: 'wopi/template/{fileId}')]
	public function getTemplate(string $fileId, string $access_token): JSONResponse|StreamResponse {
		try {
			$wopi = $this->wopiMapper->getWopiForToken($access_token);
		} catch (UnknownTokenException $e) {
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		} catch (ExpiredTokenException $e) {
			return new JSONResponse([], Http::STATUS_UNAUTHORIZED);
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
			$this->logger->error('getTemplate failed: ' . $e->getMessage(), ['exception' => $e]);
			return new JSONResponse([], Http::STATUS_INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * Check if the encryption module uses a master key.
	 */
	private function isMasterKeyEnabled(): bool {
		try {
			$util = \OCP\Server::get(\OCA\Encryption\Util::class);
			return $util->isMasterKeyEnabled();
		} catch (QueryException) {
			// No encryption module enabled
			return false;
		}
	}

	private function getWopiUrlForFile(Wopi $wopi, File $file): string {
		$nextcloudUrl = $this->appConfig->getNextcloudUrl() ?: trim($this->urlGenerator->getAbsoluteURL(''), '/');
		return $nextcloudUrl . '/index.php/apps/richdocuments/wopi/files/' . $file->getId() . '_' . $this->config->getSystemValue('instanceid') . '?access_token=' . $wopi->getToken();
	}

	private function getWopiUrlForTemplate(Wopi $wopi): string {
		$nextcloudUrl = $this->appConfig->getNextcloudUrl() ?: trim($this->urlGenerator->getAbsoluteURL(''), '/');
		return $nextcloudUrl . '/index.php/apps/richdocuments/wopi/template/' . $wopi->getTemplateId() . '?access_token=' . $wopi->getToken();
	}

	private function generateSettingToken(string $userId): string {
		return $this->settingsService->generateIframeToken('user', $userId)['token'];
	}

	private function generateSettings(string $token, string $type, string $userId = ''): array {
		$nextcloudUrl = $this->appConfig->getNextcloudUrl() ?: trim($this->urlGenerator->getAbsoluteURL(''), '/');
		$uri = $nextcloudUrl . '/index.php/apps/richdocuments/wopi/settings' . '?type=' . $type . '&access_token=' . $token . '&fileId=' . '-1';
		$etag = $this->settingsService->getFolderEtag($type) . $this->settingsService->getPresentationFolderEtag($type, $userId);
		return [
			'uri' => $uri,
			'stamp' => $etag
		];
	}
}
