<?php
/**
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Richdocuments\Service;

use InvalidArgumentException;
use OC_Util;
use OCP\IUserManager;
use OCP\IUserSession;

class UserScopeService {
	public function __construct(
		private IUserSession $userSession,
		private IUserManager $userManager
	) {
	}

	/**
	 * Set a valid user in IUserSession since lots of server logic is relying on obtaining
	 * the current acting user from that
	 *
	 * @throws InvalidArgumentException
	 */
	public function setUserScope(?string $uid = null): void {
		if ($uid === null) {
			return;
		}

		$user = $this->userManager->get($uid);
		if ($user === null) {
			throw new InvalidArgumentException('No user found for the uid ' . $uid);
		}

		/** @psalm-suppress RedundantCondition */
		if (method_exists($this->userSession, 'setVolatileActiveUser')) {
			$this->userSession->setVolatileActiveUser($user);
		} else {
			$this->userSession->setUser($user);
		}
	}

	/**
	 * Setup the FS which is needed to emit hooks
	 *
	 * This is required for versioning/activity as the legacy filesystem hooks
	 * are not emitted if filesystem operations are executed though \OCP\Files\Node\File
	 *
	 * @param string $owner
	 */
	public function setFilesystemScope(string $owner): void {
		OC_Util::tearDownFS();
		OC_Util::setupFS($owner);
	}
}
