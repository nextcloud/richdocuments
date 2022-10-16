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

use OCP\IGroupManager;
use OCP\IUserManager;
use OCP\IUserSession;

class PermissionManager {
	/** @var AppConfig */
	private $config;
	/** @var IGroupManager */
	private $groupManager;
	/** @var IUserManager */
	private $userManager;
	/** @var IUserSession */
	private $userSession;

	public function __construct(
		AppConfig $config,
		IGroupManager $groupManager,
		IUserManager $userManager,
		IUserSession $userSession
	) {
		$this->config = $config;
		$this->groupManager = $groupManager;
		$this->userManager = $userManager;
		$this->userSession = $userSession;
	}

	private function userMatchesGroupList(?string $userId = null, ?array $groupList = []): bool {
		if ($userId === null) {
			$user = $this->userSession->getUser();
			$userId = $user ? $user->getUID() : null;
		}

		if ($userId === null) {
			return true;
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
		if ($this->userMatchesGroupList($userId, $this->config->getUseGroups())) {
			return true;
		}

		return false;
	}

	public function userCanEdit(string $userId = null): bool {
		if ($this->userMatchesGroupList($userId, $this->config->getEditGroups())) {
			return true;
		}

		return false;
	}

	public function userIsFeatureLocked(string $userId = null): bool {
		if ($this->config->isReadOnlyFeatureLocked() && !$this->userCanEdit($userId)) {
			return true;
		}

		return false;
	}
}
