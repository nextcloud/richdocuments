<?php

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Service;

use InvalidArgumentException;
use OC_Util;
use OCP\Activity\IManager as IActivityManager;
use OCP\IUserManager;
use OCP\IUserSession;

class UserScopeService {
	public function __construct(
		private IUserSession $userSession,
		private IUserManager $userManager,
		private IActivityManager $activityManager,
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

		$this->userSession->setVolatileActiveUser($user);
	}

	/**
	 * Name the actor that activities are recorded under
	 *
	 * Without this the activity app reads the actor from the session, which is
	 * empty for a guest on a public share, and the activity ends up attributed
	 * to nobody.
	 *
	 * An actor containing an @ is taken for a federated cloud id, which either
	 * renders the activity as an account on a made up instance or, for a name
	 * the cloud id parser rejects, drops the activity altogether. The character
	 * is therefore removed rather than passed on.
	 */
	public function setActivityActor(string $actor): void {
		$this->activityManager->setCurrentUserId(str_replace('@', '', $actor));
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
