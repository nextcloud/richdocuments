<?php
/**
 * @copyright Copyright (c) 2016 Lukas Reschke <lukas@statuscode.ch>
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

namespace OCA\Richdocuments;

use InvalidArgumentException;
use OC\Files\Filesystem;
use OCA\Files_Sharing\SharedStorage;
use OCA\Richdocuments\Db\Direct;
use OCA\Richdocuments\Db\WopiMapper;
use OCA\Richdocuments\Db\Wopi;
use OCA\Richdocuments\Service\CapabilitiesService;
use OCA\Richdocuments\WOPI\Parser;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Http\DataResponse;
use OCP\Constants;
use OCP\Files\File;
use OCP\Files\ForbiddenException;
use OCP\Files\IRootFolder;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\IURLGenerator;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager;
use OCP\IL10N;
use OCP\Share\IShare;
use OCP\Util;

class TokenManager {
	/** @var IRootFolder */
	private $rootFolder;
	/** @var IManager */
	private $shareManager;
	/** @var IURLGenerator */
	private $urlGenerator;
	/** @var Parser */
	private $wopiParser;
	/** @var string */
	private $userId;
	/** @var WopiMapper */
	private $wopiMapper;
	/** @var IL10N */
	private $trans;
	/** @var CapabilitiesService */
	private $capabilitiesService;
	/** @var Helper */
	private $helper;
	/** @var PermissionManager */
	private $permissionManager;

	public function __construct(
		IRootFolder $rootFolder,
		IManager $shareManager,
		IURLGenerator $urlGenerator,
		Parser $wopiParser,
		CapabilitiesService $capabilitiesService,
		$UserId,
		WopiMapper $wopiMapper,
		IL10N $trans,
		Helper $helper,
		PermissionManager $permissionManager
	) {
		$this->rootFolder = $rootFolder;
		$this->shareManager = $shareManager;
		$this->urlGenerator = $urlGenerator;
		$this->wopiParser = $wopiParser;
		$this->capabilitiesService = $capabilitiesService;
		$this->trans = $trans;
		$this->userId = $UserId;
		$this->wopiMapper = $wopiMapper;
		$this->helper = $helper;
		$this->permissionManager = $permissionManager;
	}

	/**
	 * @param string $fileId
	 * @param string $shareToken
	 * @param string $editoruid
	 * @return array
	 * @throws \Exception
	 */
	public function getToken($fileId, $shareToken = null, $editoruid = null, $direct = false) {
		list($fileId, , $version) = Helper::parseFileId($fileId);
		$owneruid = null;
		$hideDownload = false;
		// if the user is not logged-in do use the sharers storage
		if ($shareToken !== null) {
			/** @var File $file */
			$rootFolder = $this->rootFolder;
			$share = $this->shareManager->getShareByToken($shareToken);

			if (($share->getPermissions() & Constants::PERMISSION_READ) === 0) {
				throw new ShareNotFound();
			}

			$updatable = (bool)($share->getPermissions() & \OCP\Constants::PERMISSION_UPDATE);
			$hideDownload = $share->getHideDownload();
			$owneruid = $share->getShareOwner();
		} else if ($this->userId !== null) {
			try {
				$editoruid = $this->userId;
				$rootFolder = $this->rootFolder->getUserFolder($editoruid);

				$files = $rootFolder->getById((int)$fileId);
				$updatable = false;
				foreach ($files as $file) {
					if ($file->isUpdateable()) {
						$updatable = true;
						break;
					}
				}

				$updatable = $updatable && $this->permissionManager->userCanEdit($editoruid);

				// disable download if at least one shared access has it disabled
				foreach ($files as $file) {
					$storage = $file->getStorage();
					// using string as we have no guarantee that "files_sharing" app is loaded
					if ($storage->instanceOfStorage(SharedStorage::class)) {
						if (!method_exists(IShare::class, 'getAttributes')) {
							break;
						}
						/** @var SharedStorage $storage */
						$share = $storage->getShare();
						$attributes = $share->getAttributes();
						if ($attributes !== null && $attributes->getAttribute('permissions', 'download') === false) {
							$hideDownload = true;
							break;
						}
					}
				}
			} catch (\Exception $e) {
				throw $e;
			}
		} else {
			$rootFolder = $this->rootFolder;
			// no active user login while generating the token
			// this is required during WopiPutRelativeFile
			if (is_null($editoruid)) {
				\OC::$server->getLogger()->warning('Generating token for SaveAs without editoruid');
				$updatable = true;
			} else {
				// Make sure we use the user folder if available since fetching all files by id from the root might be expensive
				$rootFolder = $this->rootFolder->getUserFolder($editoruid);

				$updatable = false;
				$files = $rootFolder->getById($fileId);

				foreach ($files as $file) {
					if ($file->isUpdateable()) {
						$updatable = true;
						break;
					}
				}
			}

		}
		/** @var File $file */
		$file = $rootFolder->getById($fileId)[0];
		// If its a public share, use the owner from the share, otherwise check the file object
		if (is_null($owneruid)) {
			$owner = $file->getOwner();
			if (is_null($owner)) {
				// Editor UID instead of owner UID in case owner is null e.g. group folders
				$owneruid = $editoruid;
			} else {
				$owneruid = $owner->getUID();
			}
		}

		// Check node readability (for storage wrapper overwrites like terms of services)
		if (!$file->isReadable()) {
			throw new NotPermittedException();
		}

		// Safeguard that users without required group permissions cannot create a token
		if (!$this->permissionManager->isEnabledForUser($owneruid) && !$this->permissionManager->isEnabledForUser($editoruid)) {
			throw new NotPermittedException();
		}

		// force read operation to trigger possible audit logging
		\OC_Hook::emit(
			Filesystem::CLASSNAME,
			Filesystem::signal_read,
			[Filesystem::signal_param_path => $file->getPath()]
		);

		$serverHost = $this->urlGenerator->getAbsoluteURL('/');
		$guestName = $this->userId === null ? $this->prepareGuestName($this->helper->getGuestNameFromCookie()) : null;
		$wopi = $this->wopiMapper->generateFileToken($fileId, $owneruid, $editoruid, $version, $updatable, $serverHost, $guestName, 0, $hideDownload, $direct, 0, $shareToken);

		return [
			$this->wopiParser->getUrlSrc($file->getMimeType())['urlsrc'], // url src might not be found ehre
			$wopi->getToken(),
			$wopi
		];
	}

	/**
	 * This method is receiving the results from the TOKEN_TYPE_FEDERATION generated on the opener server
	 * that is created in {@link newInitiatorToken}
	 */
	public function upgradeToRemoteToken(Wopi $wopi, Wopi $remoteWopi, string $shareToken, string $remoteServer, string $remoteServerToken): Wopi {
		if ($remoteWopi->getTokenType() !== Wopi::TOKEN_TYPE_INITIATOR) {
			return $wopi;
		}

		$remoteTokenType = $remoteWopi->getEditorUid() !== null ? Wopi::TOKEN_TYPE_REMOTE_USER : Wopi::TOKEN_TYPE_REMOTE_GUEST;
		$wopi->setTokenType($remoteTokenType);
		$wopi->setGuestDisplayname(
			$remoteTokenType === Wopi::TOKEN_TYPE_REMOTE_USER ?
				$remoteWopi->getEditorUid() . '@' . $remoteServer :
				$remoteWopi->getGuestDisplayname()
		);
		$wopi->setShare($shareToken);
		$wopi->setCanwrite($wopi->getCanwrite() && $remoteWopi->getCanwrite());
		$wopi->setHideDownload($wopi->getHideDownload() || $remoteWopi->getHideDownload());
		$wopi->setRemoteServer($remoteServer);
		$wopi->setRemoteServerToken($remoteServerToken);
		$this->wopiMapper->update($wopi);
		return $wopi;
	}

	public function upgradeFromDirectInitiator(Direct $direct, Wopi $wopi) {
		$wopi->setTokenType(Wopi::TOKEN_TYPE_REMOTE_GUEST);
		$wopi->setEditorUid(null);
		$wopi->setRemoteServer($direct->getInitiatorHost());
		$wopi->setRemoteServerToken($direct->getInitiatorToken());
		$this->wopiMapper->update($wopi);
		return $wopi;
	}

	public function getTokenForTemplate(File $templateFile, $userId, $targetFileId, $direct = false) {
		$owneruid = $userId;
		$editoruid = $userId;
		$rootFolder = $this->rootFolder->getUserFolder($editoruid);
		/** @var File $targetFile */
		$targetFile = $rootFolder->getById($targetFileId);
		$targetFile = $targetFile[0] ?? null;
		if (!$targetFile) {
			throw new NotFoundException();
		}

		// Check node readability (for storage wrapper overwrites like terms of services)
		if (!$targetFile->isReadable()) {
			throw new NotPermittedException();
		}

		$updatable = $targetFile->isUpdateable() && $this->permissionManager->userCanEdit($editoruid);

		$serverHost = $this->urlGenerator->getAbsoluteURL('/');

		if ($this->capabilitiesService->hasTemplateSource()) {
			$wopi = $this->wopiMapper->generateFileToken($targetFile->getId(), $owneruid, $editoruid, 0, $updatable, $serverHost, null, 0, false, $direct, $templateFile->getId());
		} else {
			// Legacy way of creating new documents from a template
			$wopi = $this->wopiMapper->generateFileToken($templateFile->getId(), $owneruid, $editoruid, 0, $updatable, $serverHost, null, $targetFile->getId(), $direct);
		}

		return [
			$this->wopiParser->getUrlSrc($templateFile->getMimeType())['urlsrc'],
			$wopi
		];
	}

	public function newInitiatorToken($sourceServer, Node $node = null, $shareToken = null, bool $direct = false, $userId = null): Wopi {
		if ($node !== null) {
			list($urlSrc, $token, $wopi) = $this->getToken($node->getId(), $shareToken, $userId, $direct);
			$wopi->setServerHost($sourceServer);
			$wopi->setTokenType(Wopi::TOKEN_TYPE_INITIATOR);
			$this->wopiMapper->update($wopi);
			return $wopi;
		}

		return $this->wopiMapper->generateInitiatorToken($this->userId, $sourceServer);
	}

	public function extendWithInitiatorUserToken(Wopi $wopi, string $initiatorUserHost, string $initiatorUserToken): Wopi {
		$wopi->setRemoteServer($initiatorUserHost);
		$wopi->setRemoteServerToken($initiatorUserToken);
		$this->wopiMapper->update($wopi);
		return $wopi;
	}

	public function prepareGuestName(string $guestName = null) {
		if (empty($guestName)) {
			return $this->trans->t('Anonymous guest');
		}

		$guestName = $this->trans->t('%s (Guest)', Util::sanitizeHTML($guestName));
		$cut = 56;
		while (mb_strlen($guestName) >= 64) {
			$guestName = $this->trans->t('%s (Guest)', Util::sanitizeHTML(
				mb_substr($guestName, 0, $cut)
			));
			$cut -= 5;
		}

		return $guestName;
	}

	/**
	 * @param string $accessToken
	 * @param string $guestName
	 * @throws DoesNotExistException
	 */
	public function updateGuestName(string $accessToken, string $guestName) {
		$wopi = $this->wopiMapper->getWopiForToken($accessToken);
		$wopi->setGuestDisplayname($this->prepareGuestName($guestName));
		$this->wopiMapper->update($wopi);
	}

}
