<?php

declare(strict_types=1);
/**
 * @copyright Copyright (c) 2017 Lukas Reschke <lukas@statuscode.ch>
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

use OCP\Constants;
use OCP\Files\Node;
use OCP\IConfig;
use OCP\IGroupManager;
use OCP\IUserManager;
use OCP\IUserSession;
use OCP\Share\IAttributes;
use OCP\Share\IShare;
use OCP\SystemTag\ISystemTagObjectMapper;

class PermissionManager {
	/** @var AppConfig */
	private $appConfig;
	/** @var IConfig */
	private $config;
	/** @var IGroupManager */
	private $groupManager;
	/** @var IUserManager */
	private $userManager;
	/** @var IUserSession */
	private $userSession;
	/** @var ISystemTagObjectMapper */
	private $systemTagObjectMapper;

	public function __construct(
		AppConfig              $appConfig,
		IConfig                $config,
		IGroupManager          $groupManager,
		IUserManager           $userManager,
		IUserSession           $userSession,
		ISystemTagObjectMapper $systemTagObjectMapper
	) {
		$this->appConfig = $appConfig;
		$this->config = $config;
		$this->groupManager = $groupManager;
		$this->userManager = $userManager;
		$this->userSession = $userSession;
		$this->systemTagObjectMapper = $systemTagObjectMapper;
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
			$userId = $user ? $user->getUID() : null;
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

	public function isEnabledForUser(string $userId = null): bool {
		if ($this->userMatchesGroupList($userId, $this->appConfig->getUseGroups())) {
			return true;
		}

		return false;
	}

	public function userCanEdit(string $userId = null): bool {
		if ($this->userMatchesGroupList($userId, $this->appConfig->getEditGroups())) {
			return true;
		}

		return false;
	}

	public function userIsFeatureLocked(string $userId = null): bool {
		if ($this->appConfig->isReadOnlyFeatureLocked() && !$this->userCanEdit($userId)) {
			return true;
		}

		return false;
	}

	public function shouldWatermark(Node $node, ?string $userId = null, ?IShare $share = null): bool {
		if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_enabled', 'no') === 'no') {
			return false;
		}

		$fileId = $node->getId();

		$isUpdatable = $node->isUpdateable() && (!$share || $share->getPermissions() & Constants::PERMISSION_UPDATE);

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
				foreach ($fileTags as $tagId) {
					if (in_array($tagId, $tags, true)) {
						return true;
					}
				}
			}
		}

		if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_shareAll', 'no') === 'yes') {
			if ($node->getOwner()->getUID() !== $userId) {
				return true;
			}
		}

		if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_shareRead', 'no') === 'yes' && !$isUpdatable) {
			return true;
		}

		if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_shareDisabledDownload', 'no') === 'yes' && $isDisabledDownload) {
			return true;
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
			foreach ($fileTags as $tagId) {
				if (in_array($tagId, $tags, true)) {
					return true;
				}
			}
		}

		return false;
	}
}
