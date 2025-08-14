<?php
/**
 * SPDX-FileCopyrightText: 2016 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments;

use Exception;
use OCA\Richdocuments\Db\Direct;
use OCA\Richdocuments\Db\Wopi;
use OCA\Richdocuments\Db\WopiMapper;
use OCA\Richdocuments\WOPI\Parser;
use OCP\Constants;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\Files\Events\Node\BeforeNodeReadEvent;
use OCP\Files\File;
use OCP\Files\IRootFolder;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager;
use OCP\Util;
use Psr\Log\LoggerInterface;

class TokenManager {
	public function __construct(
		private IRootFolder $rootFolder,
		private IManager $shareManager,
		private IURLGenerator $urlGenerator,
		private Parser $wopiParser,
		private ?string $userId,
		private WopiMapper $wopiMapper,
		private IL10N $trans,
		private Helper $helper,
		private PermissionManager $permissionManager,
		private IEventDispatcher $eventDispatcher,
		private LoggerInterface $logger,
	) {
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
				$share = $this->helper->getShareFromNode($file);
				$attributes = $share?->getAttributes();
				if ($attributes !== null
					&& $attributes->getAttribute('permissions', 'download') === false
				) {
					$hideDownload = true;
					break;
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

		// Safeguard that users without required group permissions cannot create a token
		if (!$this->permissionManager->isEnabledForUser($owneruid) && !$this->permissionManager->isEnabledForUser($editoruid)) {
			throw new NotPermittedException();
		}

		// force read operation to trigger possible audit logging
		$this->eventDispatcher->dispatchTyped(new BeforeNodeReadEvent($file));

		$serverHost = $this->urlGenerator->getAbsoluteURL('/');
		$guestName = $editoruid === null ? $this->prepareGuestName($this->helper->getGuestNameFromCookie()) : null;
		return $this->wopiMapper->generateFileToken($fileId, $owneruid, $editoruid, $version, $updatable, $serverHost, $guestName, $hideDownload, $direct, 0, $shareToken);
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
		?string $editoruid = null,
	): Wopi {
		if (empty($editoruid)) {
			$editoruid = $isGuest ? null : $owneruid;
		}

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

		$updatable = $updatable && $this->permissionManager->userCanEdit($owneruid);

		$serverHost = $this->urlGenerator->getAbsoluteURL('/');

		return $this->wopiMapper->generateFileToken(
			$targetFile->getId(),
			$owneruid,
			$editoruid,
			0,
			$updatable,
			$serverHost,
			$isGuest ? '' : null,
			false,
			$direct,
			$templateFile->getId()
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

	public function getUrlSrcForMimeType(string $type): ?string {
		try {
			return $this->wopiParser->getUrlSrcValue($type);
		} catch (\Throwable $e) {
			return null;
		}
	}

}
