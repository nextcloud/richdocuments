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

use Exception;
use OC\Files\Filesystem;
use OCA\Files_Sharing\SharedStorage;
use OCA\Richdocuments\Db\Direct;
use OCA\Richdocuments\Db\Wopi;
use OCA\Richdocuments\Db\WopiMapper;
use OCA\Richdocuments\Service\CapabilitiesService;
use OCA\Richdocuments\WOPI\Parser;
use OCP\Constants;
use OCP\Files\File;
use OCP\Files\IRootFolder;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager;
use OCP\Share\IShare;
use OCP\Util;
use Psr\Log\LoggerInterface;

class TokenManager {
	/** @var IRootFolder */
	private $rootFolder;
	/** @var IManager */
	private $shareManager;
	/** @var IURLGenerator */
	private $urlGenerator;
	/** @var Parser */
	private $wopiParser;
	/** @var ?string */
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
	/** @var LoggerInterface */
	private $logger;

	public function __construct(
		IRootFolder $rootFolder,
		IManager $shareManager,
		IURLGenerator $urlGenerator,
		Parser $wopiParser,
		CapabilitiesService $capabilitiesService,
		?string $UserId,
		WopiMapper $wopiMapper,
		IL10N $trans,
		Helper $helper,
		PermissionManager $permissionManager,
		LoggerInterface $logger
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
		$this->logger = $logger;
	}

	/**
	 * @throws Exception
	 */
	public function generateWopiToken(string $fileId, ?string $shareToken = null, ?string $editoruid = null, bool $direct = false): Wopi {
		[$fileId, , $version] = Helper::parseFileId($fileId);
		$owneruid = null;
		$hideDownload = false;

		// if the user is not logged-in do use the sharers storage
		if ($shareToken !== null) {
			/** @var File $file */
			$share = $this->shareManager->getShareByToken($shareToken);

			if (($share->getPermissions() & Constants::PERMISSION_READ) === 0) {
				throw new ShareNotFound();
			}

			$owneruid = $share->getShareOwner();
			$updatable = (bool)($share->getPermissions() & \OCP\Constants::PERMISSION_UPDATE);
			$updatable = $updatable && $this->permissionManager->userCanEdit($owneruid);
			$hideDownload = $share->getHideDownload();
			$userFolder = $this->rootFolder->getUserFolder($owneruid);
		} else {
			$editoruid = $this->userId ?? $editoruid;
			$userFolder = $this->rootFolder->getUserFolder($editoruid);

			$files = $userFolder->getById((int)$fileId);
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
		}

		/** @var File $file */
		$file = $userFolder->getFirstNodeById($fileId);

		// Check node readability (for storage wrapper overwrites like terms of services)
		if ($file === null || !$file->isReadable()) {
			throw new NotPermittedException();
		}

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
		return $this->wopiMapper->generateFileToken($fileId, $owneruid, $editoruid, $version, $updatable, $serverHost, $guestName, 0, $hideDownload, $direct, 0, $shareToken);
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

	public function generateWopiTokenForTemplate(
		File $templateFile,
		int $targetFileId,
		string $owneruid,
		bool $isGuest,
		bool $direct = false,
		?int $sharePermissions = null,
	): Wopi {
		$editoruid = $isGuest ? null : $owneruid;

		$rootFolder = $this->rootFolder->getUserFolder($owneruid);
		$targetFile = $rootFolder->getFirstNodeById($targetFileId);
		if (!$targetFile instanceof File) {
			throw new NotFoundException();
		}

		// Check node readability (for storage wrapper overwrites like terms of services)
		if (!$targetFile->isReadable()) {
			throw new NotPermittedException();
		}

		$updatable = $targetFile->isUpdateable();
		if (!is_null($sharePermissions)) {
			$shareUpdatable = (bool)($sharePermissions & \OCP\Constants::PERMISSION_UPDATE);
			$updatable = $updatable && $shareUpdatable;
		}

		$serverHost = $this->urlGenerator->getAbsoluteURL('/');

		if ($this->capabilitiesService->hasTemplateSource()) {
			return $this->wopiMapper->generateFileToken(
				$targetFile->getId(),
				$owneruid,
				$editoruid,
				0,
				$updatable,
				$serverHost,
				$isGuest ? '' : null,
				0,
				false,
				$direct,
				$templateFile->getId()
			);
		}

		// Legacy way of creating new documents from a template
		return $this->wopiMapper->generateFileToken(
			$templateFile->getId(),
			$owneruid,
			$editoruid,
			0,
			$updatable,
			$serverHost,
			$isGuest ? '' : null,
			$targetFile->getId(),
			false,
			$direct
		);
	}

	public function newInitiatorToken($sourceServer, ?Node $node = null, $shareToken = null, bool $direct = false, $userId = null): Wopi {
		if ($node !== null) {
			$wopi = $this->generateWopiToken((string)$node->getId(), $shareToken, $userId, $direct);
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

	public function prepareGuestName(?string $guestName = null) {
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
	 * @return void
	 * @throws Exceptions\ExpiredTokenException
	 * @throws Exceptions\UnknownTokenException
	 */
	public function updateGuestName(string $accessToken, string $guestName) {
		$wopi = $this->wopiMapper->getWopiForToken($accessToken);
		$wopi->setGuestDisplayname($this->prepareGuestName($guestName));
		$this->wopiMapper->update($wopi);
	}

	public function setShareToken(Wopi $wopi, ?string $shareToken): Wopi {
		$wopi->setShare($shareToken);
		return $this->wopiMapper->update($wopi);
	}

	public function setGuestName(Wopi $wopi, ?string $guestName = null): Wopi {
		if ($wopi->getTokenType() !== Wopi::TOKEN_TYPE_GUEST && $wopi->getTokenType() !== Wopi::TOKEN_TYPE_REMOTE_GUEST) {
			return $wopi;
		}

		$wopi->setGuestDisplayname($this->prepareGuestName($guestName));
		return $this->wopiMapper->update($wopi);
	}

	public function getUrlSrc(File $file): string {
		return $this->wopiParser->getUrlSrcValue($file->getMimeType());
	}
}
