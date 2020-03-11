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

namespace OCA\Wopi\Controller;

use OC\Files\View;
use OCA\Wopi\Db\Wopi;
use OCA\Wopi\AppConfig;
use OCA\Wopi\Db\WopiLock;
use OCA\Wopi\Db\WopiLockMapper;
use OCA\Wopi\Db\WopiMapper;
use OCA\Wopi\Hooks\WopiLockHooks;
use OCA\Wopi\Service\UserScopeService;
use OCA\Wopi\TemplateManager;
use OCA\Wopi\TokenManager;
use OCA\Wopi\Helper;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\FileDisplayResponse;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\Constants;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\GenericFileException;
use OCP\Files\InvalidPathException;
use OCP\Files\IRootFolder;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\IConfig;
use OCP\ILogger;
use OCP\IRequest;
use OCP\IURLGenerator;
use OCP\AppFramework\Http\StreamResponse;
use OCP\IUserManager;
use OCP\Lock\LockedException;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager;

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
	/** @var IUserManager */
	private $userManager;
	/** @var WopiMapper */
	private $wopiMapper;
	/** @var ILogger */
	private $logger;
	/** @var TemplateManager */
	private $templateManager;
	/** @var IManager */
	private $shareManager;
	/** @var UserScopeService */
	private $userScopeService;

	// Signifies LOOL that document has been changed externally in this storage
	const LOOL_STATUS_DOC_CHANGED = 1010;
	/**
	 * @var WopiLockMapper
	 */
	private $lockMapper;
	/**
	 * @var ITimeFactory
	 */
	private $timeFactory;
	/**
	 * @var WopiLockHooks
	 */
	private $lockHooks;

	/**
	 * @param string $appName
	 * @param IRequest $request
	 * @param IRootFolder $rootFolder
	 * @param IURLGenerator $urlGenerator
	 * @param IConfig $config
	 * @param AppConfig $appConfig
	 * @param TokenManager $tokenManager
	 * @param IUserManager $userManager
	 * @param WopiMapper $wopiMapper
	 * @param ILogger $logger
	 * @param TemplateManager $templateManager
	 * @param IManager $shareManager
	 * @param UserScopeService $userScopeService
	 * @param WopiLockMapper $lockMapper
	 * @param ITimeFactory $timeFactory
	 * @param WopiLockHooks $lockHooks
	 */
	public function __construct(
		$appName,
		IRequest $request,
		IRootFolder $rootFolder,
		IURLGenerator $urlGenerator,
		IConfig $config,
		AppConfig $appConfig,
		TokenManager $tokenManager,
		IUserManager $userManager,
		WopiMapper $wopiMapper,
		ILogger $logger,
		TemplateManager $templateManager,
		IManager $shareManager,
		UserScopeService $userScopeService,
		WopiLockMapper $lockMapper,
		ITimeFactory $timeFactory,
		WopiLockHooks $lockHooks
	) {
		parent::__construct($appName, $request);
		$this->rootFolder = $rootFolder;
		$this->urlGenerator = $urlGenerator;
		$this->config = $config;
		$this->appConfig = $appConfig;
		$this->tokenManager = $tokenManager;
		$this->userManager = $userManager;
		$this->wopiMapper = $wopiMapper;
		$this->logger = $logger;
		$this->templateManager = $templateManager;
		$this->shareManager = $shareManager;
		$this->userScopeService = $userScopeService;
		$this->lockMapper = $lockMapper;
		$this->timeFactory = $timeFactory;
		$this->lockHooks = $lockHooks;
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
			if (empty($wopi))
				return new JSONResponse([], Http::STATUS_FORBIDDEN);
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
			$this->logger->debug($e->getMessage(), ['app' => 'wopi', '']);
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		} catch (DoesNotExistException $e) {
			$this->logger->debug($e->getMessage(), ['app' => 'wopi', '']);
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		} catch (\Exception $e) {
			$this->logger->logException($e, ['app' => 'wopi']);
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		$isPublic = $wopi->getEditorUid() === null;
		$guestUserId = 'Guest-' . \OC::$server->getSecureRandom()->generate(8);
		$user = $this->userManager->get($wopi->getEditorUid());
		$userDisplayName = $user !== null && !$isPublic ? $user->getDisplayName() : $wopi->getGuestDisplayname();
		if ($version === '0')
			$version = (string)$file->getMTime();
		$response = [
			'BaseFileName' => $file->getName(),
			'Size' => $file->getSize(),
			'Version' => $version,
			'UserId' => !$isPublic ? $wopi->getEditorUid() : $guestUserId,
			'OwnerId' => $wopi->getOwnerUid(),
			'UserFriendlyName' => $userDisplayName,
			'UserExtraInfo' => [
			],
			'UserCanWrite' => $wopi->getCanwrite(),
			'UserCanNotWriteRelative' => \OC::$server->getEncryptionManager()->isEnabled() || $isPublic,
			'PostMessageOrigin' => $wopi->getServerHost(),
			'LastModifiedTime' => Helper::toISO8601($file->getMTime()),
			'SupportsRename' => true,
			'UserCanRename' => !$isPublic,
			'EnableInsertRemoteImage' => true,
			'EnableShare' => true,
			'HideUserList' => 'desktop',
			'DisablePrint' => $wopi->getHideDownload(),
			'DisableExport' => $wopi->getHideDownload(),
			'DisableCopy' => $wopi->getHideDownload(),
			'HideExportOption' => $wopi->getHideDownload(),
			'HidePrintOption' => $wopi->getHideDownload(),
			'DownloadAsPostMessage' => $wopi->getDirect(),
			'SupportsUpdate' => true,
			'SupportsLocks' => true,
		];

		if ($wopi->isTemplateToken()) {
			$userFolder = $this->rootFolder->getUserFolder($wopi->getOwnerUid());
			$file = $userFolder->getById($wopi->getTemplateDestination())[0];
			$response['TemplateSaveAs'] = $file->getName();
		}

		if ($this->shouldWatermark($isPublic, $wopi->getEditorUid(), $fileId, $wopi)) {
			$replacements = [
				'userId' => $wopi->getEditorUid(),
				'date' => (new \DateTime())->format('Y-m-d H:i:s'),
				'themingName' => \OC::$server->getThemingDefaults()->getName(),

			];
			$watermarkTemplate = $this->appConfig->getAppValue('watermark_text');
			$response['WatermarkText'] = preg_replace_callback('/{(.+?)}/', function ($matches) use ($replacements) {
				return $replacements[$matches[1]];
			}, $watermarkTemplate);
		}

		/**
		 * New approach for generating files from templates by creating an empty file
		 * and providing an URL which returns the actual templyte
		 */
		if ($wopi->hasTemplateId()) {
			$templateUrl = 'index.php/apps/wopi/wopi/template/' . $wopi->getTemplateId() . '?access_token=' . $wopi->getToken();
			$templateUrl = $this->urlGenerator->getAbsoluteURL($templateUrl);
			$response['TemplateSource'] = $templateUrl;
		}

		$user = $this->userManager->get($wopi->getEditorUid());
		if($user !== null && $user->getAvatarImage(32) !== null) {
			$response['UserExtraInfo']['avatar'] = $this->urlGenerator->linkToRouteAbsolute('core.avatar.getAvatar', ['userId' => $wopi->getEditorUid(), 'size' => 32]);
		}

		if ($wopi->getRemoteServer() !== '') {
			$response = $this->setFederationFileInfo($wopi, $response);
		}

		return new JSONResponse($response);
	}

	private function setFederationFileInfo($wopi, $response) {
		$remoteUserId = $wopi->getGuestDisplayname();
		$cloudID = \OC::$server->getCloudIdManager()->resolveCloudId($remoteUserId);
		$response['UserFriendlyName'] = $cloudID->getDisplayId();
		$response['UserExtraInfo']['avatar'] = $this->urlGenerator->linkToRouteAbsolute('core.avatar.getAvatar', ['userId' => explode('@', $remoteUserId)[0], 'size' => 32]);
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
		return $response;
	}

	private function shouldWatermark($isPublic, $userId, $fileId, Wopi $wopi) {
		if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_enabled', 'no') === 'no') {
			return false;
		}

		if ($isPublic) {
			if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_linkAll', 'no') === 'yes') {
				return true;
			}
			if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_linkRead', 'no') === 'yes' && !$wopi->getCanwrite()) {
				return true;
			}
			if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_linkSecure', 'no') === 'yes' && $wopi->getHideDownload()) {
				return true;
			}
			if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_linkTags', 'no') === 'yes') {
				$tags = $this->appConfig->getAppValueArray('watermark_linkTagsList');
				$fileTags = \OC::$server->getSystemTagObjectMapper()->getTagIdsForObjects([$fileId], 'files')[$fileId];
				foreach ($fileTags as $tagId) {
					if (in_array($tagId, $tags, true)) {
						return true;
					}
				}
			}
		} else {
			if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_shareAll', 'no') === 'yes') {
				$files = $this->rootFolder->getUserFolder($userId)->getById($fileId);
				if (count($files) !== 0 && $files[0]->getOwner()->getUID() !== $userId) {
					return true;
				}
			}
			if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_shareRead', 'no') === 'yes' && !$wopi->getCanwrite()) {
				return true;
			}
		}
		if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_allGroups', 'no') === 'yes') {
			$groups = $this->appConfig->getAppValueArray('watermark_allGroupsList');
			foreach ($groups as $group) {
				if (\OC::$server->getGroupManager()->isInGroup($userId, $group)) {
					return true;
				}
			}
		}
		if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_allTags', 'no') === 'yes') {
			$tags = $this->appConfig->getAppValueArray('watermark_allTagsList');
			$fileTags = \OC::$server->getSystemTagObjectMapper()->getTagIdsForObjects([$fileId], 'files')[$fileId];
			foreach ($fileTags as $tagId) {
				if (in_array($tagId, $tags, true)) {
					return true;
				}
			}
		}

		return false;
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

		if (empty($wopi) || (int)$fileId !== $wopi->getFileid()) {
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
			$userFolder = $this->rootFolder->getUserFolder($wopi->getOwnerUid());
			$file = $userFolder->getById($fileId)[0];
			\OC_User::setIncognitoMode(true);
			if ($version !== '0') {
				$view = new View('/' . $wopi->getOwnerUid() . '/files');
				$relPath = $view->getRelativePath($file->getPath());
				$versionPath = '/files_versions/' . $relPath . '.v' . $version;
				$view = new View('/' . $wopi->getOwnerUid());
				if ($view->file_exists($versionPath)){
					$response = new StreamResponse($view->fopen($versionPath, 'rb'));
				}
				else {
					return new JSONResponse([], Http::STATUS_NOT_FOUND);
				}
			}
			else
			{
				$response = new StreamResponse($file->fopen('rb'));
			}
			$response->addHeader('Content-Disposition', 'attachment');
			$response->addHeader('Content-Type', 'application/octet-stream');
			return $response;
		} catch (\Exception $e) {
			$this->logger->logException($e, ['level' => ILogger::ERROR,	'app' => 'wopi', 'message' => 'getFile failed']);
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}
	}

	/**
	 *
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @PublicPage
	 * @NoSameSiteCookieRequired
	 * @param $fileId
	 * @param $access_token
	 * @return DataResponse
	 * @throws InvalidPathException
	 * @throws NotFoundException
	 */
	public function lock($fileId, $access_token) {
		list($fileId, ,) = Helper::parseFileId($fileId);
		$token = $this->wopiMapper->getWopiForToken($access_token);
		if (empty($token))
			return new DataResponse([], Http::STATUS_UNAUTHORIZED);
		try {
			$file = $this->getFileForWopiToken($token);
		} catch (ShareNotFound $e){
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		} catch (NotFoundException $e){
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		}
		$lck = $this->request->getHeader('X-WOPI-Lock');
		$wover = $this->request->getHeader('X-WOPI-Override');
		if (strlen($lck) === 0 && $wover !== "GET_LOCK" && strpos($wover,"LOCK") !== false)
			return new DataResponse([], Http::STATUS_BAD_REQUEST);
		$result = new DataResponse([], Http::STATUS_NOT_IMPLEMENTED);
		switch ($wover)
		{
			case "LOCK":
				$oldLck = $this->request->getHeader('X-WOPI-OldLock');
				if (strlen($oldLck) > 0)
				{
					$fLock = $this->lockMapper->find($fileId);
					if (!empty($fLock))
					{
						if ($fLock->getValue() !== $oldLck)
						{
							$result->setStatus(Http::STATUS_CONFLICT);
							$result->addHeader('X-WOPI-Lock', $fLock->getValue());
							break;
						}
						$this->lockMapper->delete($fLock);
					}
					else
					{
						$result->setStatus(Http::STATUS_CONFLICT);
						$result->addHeader('X-WOPI-Lock', '');
						break;
					}
				}
				$fLock = $this->lockMapper->find($fileId);
				if (!empty($fLock))
				{
					if ($fLock->getValue() !== $lck)
					{
						$result->setStatus(Http::STATUS_CONFLICT);
						$result->addHeader('X-WOPI-Lock', $fLock->getValue());
						break;
					}
					$result->setStatus(Http::STATUS_OK);
					break;
				}
				else
				{
					$newLock = new WopiLock();
					$newLock->setId(Helper::getGuid());
					$newLock->setUserId($token->getEditorUid() ?? $token->getOwnerUid());
					$newLock->setValidBy($this->timeFactory->getTime() + (60*30));
					$newLock->setValue($lck);
					$newLock->setFileId($fileId);
					$newLock->setTokenId($token->getId());
					$this->lockMapper->insert($newLock);
					$result->setStatus(Http::STATUS_OK);
				}
				break;
			case "GET_LOCK":
				$fLock = $this->lockMapper->find($fileId);
				$result->setStatus(Http::STATUS_OK);
				$result->addHeader('X-WOPI-Lock', empty($fLock) ? '' : $fLock->getValue());
				break;
			case "REFRESH_LOCK":
				$fLock = $this->lockMapper->find($fileId);
				if (!empty($fLock))
				{
					if ($fLock->getValue() !== $lck)
					{
						$result->setStatus(Http::STATUS_CONFLICT);
						$result->addHeader('X-WOPI-Lock', $fLock->getValue());
						break;
					}
					$fLock->setValidBy($this->timeFactory->getTime() + 60*30);
					$this->lockMapper->update($fLock);
					$result->setStatus(Http::STATUS_OK);
					break;
				}
				else
				{
					$result->setStatus(Http::STATUS_CONFLICT);
					$result->addHeader('X-WOPI-Lock', '');
				}
				break;
			case "UNLOCK":
				$fLock = $this->lockMapper->find($fileId);
				if (!empty($fLock))
				{
					if ($fLock->getValue() !== $lck)
					{
						$result->setStatus(Http::STATUS_CONFLICT);
						$result->addHeader('X-WOPI-Lock', $fLock->getValue());
						break;
					}
					$this->lockMapper->delete($fLock);
					$result->setStatus(Http::STATUS_OK);
				}
				else
				{
					$result->setStatus(Http::STATUS_CONFLICT);
					$result->addHeader('X-WOPI-Lock', '');
				}
				break;
		}
		if ($result->getStatus() !== Http::STATUS_NOT_IMPLEMENTED)
			$result->addHeader('X-WOPI-ItemVersion', $file->getMTime());
		return $result;
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
	 */
	public function putFile($fileId,
							$access_token) {
		list($fileId, ,) = Helper::parseFileId($fileId);
		$override = $this->request->getHeader('X-WOPI-Override');
		$isPut = ($override === 'PUT');
		$result = new JSONResponse([], Http::STATUS_OK);

		$wopi = $this->wopiMapper->getWopiForToken($access_token);
		if (empty($wopi) || !$wopi->getCanwrite()) {
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}
		$file = $this->getFileForWopiToken($wopi);
		if (empty($file)) {
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		// Set the user to register the change under his name
		$this->userScopeService->setUserScope($wopi->getEditorUid());
		$this->userScopeService->setFilesystemScope($isPutRelative ? $wopi->getEditorUid() : $wopi->getUserForFileAccess());

		$lck = $this->request->getHeader('X-WOPI-Lock');
		$fLock = $this->lockMapper->find($fileId);
		if ($isPut) {
			if (!empty($fLock))
			{
				if ($fLock->getValue() !== $lck)
				{
					$result->setStatus(Http::STATUS_CONFLICT);
					$result->addHeader('X-WOPI-Lock', $fLock->getValue());
				}
			}
			else
			{
				if ($file->getSize() > 0)
				{
					$result->setStatus(Http::STATUS_CONFLICT);
					$result->addHeader('X-WOPI-Lock', '');
				}
			}

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
		else {
			$result->setStatus(Http::STATUS_NOT_IMPLEMENTED);
		}
		if ($result->getStatus() !== Http::STATUS_OK)
			return $result;
		try {
			$content = fopen('php://input', 'rb');

			$this->lockHooks->setLockBypass(true);
			try {
				$this->retryOperation(function () use ($file, $content){
					return $file->putContent($content);
				});
			} catch (LockedException $e) {
				$this->logger->logException($e);
				return new JSONResponse(['message' => 'File locked'], Http::STATUS_INTERNAL_SERVER_ERROR);
			}

			if ($wopi->hasTemplateId()) {
				$wopi->setTemplateId(null);
				$this->wopiMapper->update($wopi);
			}
			return new JSONResponse(['LastModifiedTime' => Helper::toISO8601($file->getMTime())]);
		} catch (\Exception $e) {
			$this->logger->logException($e, ['level' => ILogger::ERROR,	'app' => 'wopi', 'message' => 'getFile failed']);
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
	 * @return JSONResponse|DataResponse
	 */
	public function putRelativeFile($fileId,
					$access_token) {
		$wover = $this->request->getHeader('X-WOPI-Override');
		if (!($wover === 'PUT_RELATIVE' || $wover === 'RENAME_FILE'))
			return $this->lock($fileId, $access_token);
		list($fileId, ,) = Helper::parseFileId($fileId);
		$wopi = $this->wopiMapper->getWopiForToken($access_token);

		if (empty($wopi) || !$wopi->getCanwrite()) {
			return new JSONResponse([], Http::STATUS_UNAUTHORIZED);
		}

		$isRenameFile = ($wover === 'RENAME_FILE');

		// Unless the editor is empty (public link) we modify the files as the current editor
		$editor = $wopi->getEditorUid();
		if ($editor === null || $wopi->getRemoteServer() !== '') {
			$editor = $wopi->getOwnerUid();
		}

		try {
			// the new file needs to be installed in the current user dir
			$userFolder = $this->rootFolder->getUserFolder($editor);

			if ($wopi->isTemplateToken()) {
				$this->templateManager->setUserId($wopi->getOwnerUid());
				$file = $userFolder->getById($wopi->getTemplateDestination())[0];
			} else {
				$file = $this->getFileForWopiToken($wopi);
				if (empty($file)) {
					return new JSONResponse([], Http::STATUS_NOT_FOUND);
				}
				if ($isRenameFile) {
					$lck = $this->request->getHeader('X-WOPI-Lock');
					$fLock = $this->lockMapper->find($fileId);
					if ($fLock !== null && $lck !== $fLock->getValue())
					{
						$result = new JSONResponse([], Http::STATUS_CONFLICT);
						$result->addHeader('X-WOPI-Lock', $fLock->getValue());
						return $result;
					}
					$suggested = $this->request->getHeader('X-WOPI-RequestedName');

					$suggested = iconv('utf-7', 'utf-8', $suggested) . '.' . $file->getExtension();

					if (strpos($suggested, '.') === 0) {
						$path = dirname($file->getPath()) . '/New File' . $suggested;
					}
					else if (strpos($suggested, '/') !== 0) {
						$path = dirname($file->getPath()) . '/' . $suggested;
					}
					else {
						$path = $userFolder->getPath() . $suggested;
					}

					// create the folder first
					if (!$this->rootFolder->nodeExists(dirname($path))) {
						$this->rootFolder->newFolder(dirname($path));
					}

					// create a unique new file
					$path = $this->rootFolder->getNonExistingName($path);
					$file = $file->move($path);
					return new JSONResponse([], Http::STATUS_OK);
				} else {
					$suggested = $this->request->getHeader('X-WOPI-SuggestedTarget');
					$relative = $this->request->getHeader('X-WOPI-RelativeTarget');
					if (!empty($suggested) && !empty($relative)){
						return new JSONResponse([], Http::STATUS_NOT_IMPLEMENTED);
					}
					if (!empty($suggested)){
						$suggested = iconv('utf-7', 'utf-8', $suggested);

						if ($suggested[0] === '.') {
							$path = dirname($file->getPath()) . '/New File' . $suggested;
						} else if ($suggested[0] !== '/') {
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
						$file = $this->rootFolder->newFile($path);
					}
					if (!empty($relative)){
						$relative = iconv('utf-7', 'utf-8', $relative);

						if ($relative[0] === '.') {
							$path = dirname($file->getPath()) . '/New File' . $relative;
						} else if ($relative[0] !== '/') {
							$path = dirname($file->getPath()) . '/' . $relative;
						} else {
							$path = $userFolder->getPath() . $relative;
						}

						// create the folder first
						if (!$this->rootFolder->nodeExists(dirname($path))) {
							$this->rootFolder->newFolder(dirname($path));
						}
						if ($this->rootFolder->nodeExists($path)){
							if ($this->request->getHeader('X-WOPI-OverwriteRelativeTarget') === 'true')
								$file = $this->rootFolder->get($path);
							else{
								$result = new JSONResponse([], Http::STATUS_NOT_FOUND);
								$validRelative = iconv('utf-8', 'utf-7', $path = $this->rootFolder->getNonExistingName($path));
								$result->addHeader('X-WOPI-ValidRelativeTarget', $validRelative);
								return $result;
							}
						}
						else
							$file = $this->rootFolder->newFile($path);
					}
				}
			}

			$content = fopen('php://input', 'rb');
			// Set the user to register the change under his name
			$this->userScopeService->setUserScope($wopi->getEditorUid());
			$this->userScopeService->setFilesystemScope($wopi->getEditorUid());
			$this->lockHooks->setLockBypass(true);
			try {
				$this->retryOperation(function () use ($file, $content){
					return $file->putContent($content);
				});
			} catch (LockedException $e) {
				return new JSONResponse(['message' => 'File locked'], Http::STATUS_INTERNAL_SERVER_ERROR);
			}

			// generate a token for the new file (the user still has to be
			// logged in)
			list(, $wopiToken) = $this->tokenManager->getToken($file->getId(), null, $wopi->getEditorUid());

			$wopi = 'index.php/apps/wopi/wopi/files/' . $file->getId() . '_' . $this->config->getSystemValue('instanceid') . '?access_token=' . $wopiToken;
			$url = $this->urlGenerator->getAbsoluteURL($wopi);
			$editUrl = $this->urlGenerator->getAbsoluteURL('index.php/apps/wopi/edit/' . $file->getId() . '_' . $this->config->getSystemValue('instanceid'));
			return new JSONResponse([ 'Name' => $file->getName(), 'Url' => $url, 'HostEditUrl' => $editUrl, 'HostViewUrl' => $editUrl ], Http::STATUS_OK);
		} catch (\Exception $e) {
			$this->logger->logException($e, ['level' => ILogger::ERROR,	'app' => 'wopi', 'message' => 'putRelativeFile failed']);
			return new JSONResponse([], Http::STATUS_INTERNAL_SERVER_ERROR);
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
	 */
	private function getFileForWopiToken(Wopi $wopi) {
		$file = null;

		if ($wopi->getRemoteServer() !== '') {
			try{
				$share = $this->shareManager->getShareByToken($wopi->getEditorUid());
				$node = $share->getNode();
				if ($node instanceof Folder) {
					$file = $node->getById($wopi->getFileid())[0];
				} else {
					$file = $node;
				}
			} catch(ShareNotFound $e){

			} catch(NotFoundException $e){

			}
		} else {
			// Unless the editor is empty (public link) we modify the files as the current editor
			// TODO: add related share token to the wopi table so we can obtain the
			$userFolder = $this->rootFolder->getUserFolder($wopi->getUserForFileAccess());
			$files = $userFolder->getById($wopi->getFileid());
			if (isset($files[0]) && $files[0] instanceof File) {
				$file = $files[0];
			}
		}
		return $file;
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
		$wopi = $this->wopiMapper->getWopiForToken($access_token);

		if (empty($wopi) || (int)$fileId !== $wopi->getTemplateId()) {
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
			$this->logger->logException($e, ['level' => ILogger::ERROR,	'app' => 'wopi', 'message' => 'getTemplate failed']);
			return new JSONResponse([], Http::STATUS_INTERNAL_SERVER_ERROR);
		}
	}

}
