<?php
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

use OCA\Richdocuments\AppInfo\Application;
use OCP\IConfig;
use OCP\IGroupManager;
use OCP\IUserSession;

class PermissionManager {

	/** @var IConfig */
	private $config;
	/** @var IGroupManager */
	private $groupManager;
	/** @var IUserSession */
	private $userSession;

	public function __construct(
		IConfig $config,
		IGroupManager $groupManager,
		IUserSession $userSession
	) {
		$this->config = $config;
		$this->groupManager = $groupManager;
		$this->userSession = $userSession;
	}

	/**
	 * @param string $groupString
	 * @return array
	 */
	private function splitGroups($groupString) {
		return explode('|', $groupString);
	}

	public function isEnabledForUser(string $userId = null) {
		if ($userId === null) {
			$user = $this->userSession->getUser();
			$userId = $user ? $user->getUID() : null;
		}

		if ($userId === null) {
			return true;
		}

		$enabledForGroups = $this->config->getAppValue(Application::APPNAME, 'use_groups', '');
		if($enabledForGroups === '') {
			return true;
		}

		$groups = $this->splitGroups($enabledForGroups);
		foreach ($groups as $group) {
			if ($this->groupManager->isInGroup($userId, $group)) {
				return true;
			}
		}

		return false;
	}
}
