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
use OCP\IUser;

class PermissionManager {

	/** @var IConfig */
	private $config;
	/** @var IGroupManager */
	private $groupManager;

	public function __construct(IConfig $config,
								IGroupManager $groupManager) {
		$this->config = $config;
		$this->groupManager = $groupManager;
	}

	/**
	 * @param string $groupString
	 * @return array
	 */
	private function splitGroups($groupString) {
		return explode('|', $groupString);
	}

	public function isEnabledForUser(IUser $user) {
		$enabledForGroups = $this->config->getAppValue(Application::APPNAME, 'use_groups', '');
		if($enabledForGroups === '') {
			return true;
		}

		$groups = $this->splitGroups($enabledForGroups);
		$uid = $user->getUID();
		foreach($groups as $group) {
			if($this->groupManager->isInGroup($uid, $group)) {
				return true;
			}
		}

		return false;
	}
}
