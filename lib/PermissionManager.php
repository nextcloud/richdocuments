<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments;

use OCP\Constants;
use OCP\Files\Cache\ICacheEntry;
use OCP\Files\Node;
use OCP\IConfig;
use OCP\IGroupManager;
use OCP\IUserManager;
use OCP\IUserSession;
use OCP\Share\IAttributes;
use OCP\Share\IShare;
use OCP\SystemTag\ISystemTagObjectMapper;

class PermissionManager {
	public function __construct(
		private AppConfig $appConfig,
		private IConfig $config,
		private IGroupManager $groupManager,
		private IUserManager $userManager,
		private IUserSession $userSession,
		private ISystemTagObjectMapper $systemTagObjectMapper,
	) {
	}

	private function userMatchesGroupList(?string $userId = null, ?array $groupList = []): bool {
		if ($userId === null) {
			// Share links set the incognito mode so in order to still get the
			// user information we need to temporarily switch it off to get the current user
			$incognito = false;
			if (\OC_User::isIncognitoMode()) {
				\OC_User::setIncognitoMode(false);
				$incognito = true;
			}
			$user = $this->userSession->getUser();
			$userId = $user?->getUID();
			if ($incognito) {
				\OC_User::setIncognitoMode(true);
			}
		}

		if ($userId === null) {
			// Access for public users will be checked separately based on the share owner
			// when generating the WOPI  token and loading the scripts on public share links
			return false;
		}

		if ($groupList === null || $groupList === []) {
			return true;
		}

		if ($this->groupManager->isAdmin($userId)) {
			return true;
		}

		$userGroups = $this->groupManager->getUserGroupIds($this->userManager->get($userId));

		foreach ($groupList as $group) {
			if (in_array($group, $userGroups)) {
				return true;
			}
		}

		return false;
	}

	public function loggedInUser(): ?string {
		$incognito = false;

		if (\OC_User::isIncognitoMode()) {
			\OC_User::setIncognitoMode(false);
			$incognito = true;
		}

		$user = $this->userSession->getUser();
		$userId = $user?->getUID();

		if ($incognito) {
			\OC_User::setIncognitoMode(true);
		}

		return $userId;
	}

	public function isEnabledForUser(?string $userId = null): bool {
		if ($this->userMatchesGroupList($userId, $this->appConfig->getUseGroups())) {
			return true;
		}

		return false;
	}

	public function userCanEdit(?string $userId = null): bool {
		if ($this->userMatchesGroupList($userId, $this->appConfig->getEditGroups())) {
			return true;
		}

		return false;
	}

	public function userIsFeatureLocked(?string $userId = null): bool {
		if ($this->appConfig->isReadOnlyFeatureLocked() && !$this->userCanEdit($userId)) {
			return true;
		}

		return false;
	}

	public function shouldWatermark(Node|ICacheEntry $nodeOrCacheEntry, ?string $userId = null, ?IShare $share = null, ?string $ownerId = null): bool {
		if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_enabled', 'no') === 'no') {
			return false;
		}

		if (!in_array($nodeOrCacheEntry->getMimetype(), $this->appConfig->getMimeTypes(), true)) {
			return false;
		}

		$fileId = $nodeOrCacheEntry->getId();

		$isUpdatable = $nodeOrCacheEntry instanceof Node
			? $nodeOrCacheEntry->isUpdateable()
			: $nodeOrCacheEntry->getPermissions() & Constants::PERMISSION_UPDATE;
		$isUpdatable = $isUpdatable && (!$share || $share->getPermissions() & Constants::PERMISSION_UPDATE);

		$hasShareAttributes = $share && method_exists($share, 'getAttributes') && $share->getAttributes() instanceof IAttributes;
		$isDisabledDownload = $hasShareAttributes && $share->getAttributes()->getAttribute('permissions', 'download') === false;
		$isHideDownload = $share && $share->getHideDownload();
		$isSecureView = $isDisabledDownload || $isHideDownload;
		if ($share && $share->getShareType() === IShare::TYPE_LINK) {
			if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_linkAll', 'no') === 'yes') {
				return true;
			}
			if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_linkRead', 'no') === 'yes' && !$isUpdatable) {
				return true;
			}
			if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_linkSecure', 'no') === 'yes' && $isSecureView) {
				return true;
			}

			if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_linkTags', 'no') === 'yes') {
				$tags = $this->appConfig->getAppValueArray('watermark_linkTagsList');
				$fileTags = $this->systemTagObjectMapper->getTagIdsForObjects([$fileId], 'files')[$fileId];
				$fileTags = array_map('strval', $fileTags);
				foreach ($fileTags as $tagId) {
					if (in_array($tagId, $tags, true)) {
						return true;
					}
				}
			}
		}

		if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_shareAll', 'no') === 'yes') {
			if (!$ownerId && $nodeOrCacheEntry instanceof Node) {
				$ownerId = $nodeOrCacheEntry->getOwner()?->getUID();
			}
			if ($userId === null || $ownerId !== $userId) {
				return true;
			}
		}

		if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_shareRead', 'no') === 'yes' && !$isUpdatable) {
			return true;
		}

		if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_shareDisabledDownload', 'no') === 'yes' && $isDisabledDownload) {
			return true;
		}

		if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_shareTalkPublic', 'no') === 'yes') {
			if ($userId === null && $share?->getShareType() === IShare::TYPE_ROOM) {
				return true;
			}
		}

		if ($userId !== null && $this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_allGroups', 'no') === 'yes') {
			$groups = $this->appConfig->getAppValueArray('watermark_allGroupsList');
			foreach ($groups as $group) {
				if ($this->groupManager->isInGroup($userId, $group)) {
					return true;
				}
			}
		}
		if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_allTags', 'no') === 'yes') {
			$tags = $this->appConfig->getAppValueArray('watermark_allTagsList');
			$fileTags = $this->systemTagObjectMapper->getTagIdsForObjects([$fileId], 'files')[$fileId];
			$fileTags = array_map('strval', $fileTags);
			foreach ($fileTags as $tagId) {
				if (in_array($tagId, $tags, true)) {
					return true;
				}
			}
		}

		return false;
	}
}
