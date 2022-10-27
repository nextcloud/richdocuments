<?php

declare(strict_types=1);

/**
 * @copyright Copyright (c) 2022 Julius Härtl <jus@bitgrid.net>
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
 */


namespace OCA\Richdocuments\Listener;

use OCA\Files_Sharing\SharedStorage;
use OCA\Richdocuments\PermissionManager;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Files\NotFoundException;
use OCP\IRequest;
use OCP\IUserSession;
use OCP\Preview\BeforePreviewFetchedEvent;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager;
use OCP\Share\IShare;

class BeforeFetchPreviewListener implements IEventListener {
	private PermissionManager $permissionManager;
	private IUserSession $userSession;
	private IRequest $request;
	private IManager $shareManager;

	public function __construct(PermissionManager $permissionManager, IUserSession $userSession, IRequest $request, IManager $shareManager) {
		$this->permissionManager = $permissionManager;
		$this->userSession = $userSession;
		$this->request = $request;
		$this->shareManager = $shareManager;
	}

	public function handle(Event $event): void {
		if (!$event instanceof BeforePreviewFetchedEvent) {
			return;
		}
		$shareToken = $this->request->getParam('token');

		$share = null;

		// Get share for internal shares
		$storage = $event->getNode()->getStorage();
		if (!$shareToken && $storage->instanceOfStorage(SharedStorage::class)) {
			if (method_exists(IShare::class, 'getAttributes')) {
				/** @var SharedStorage $storage */
				$share = $storage->getShare();
			}
		}

		// Get different share for public previews as the share from the node is only set for mounted shares
		try {
			$share = $shareToken ? $this->shareManager->getShareByToken($shareToken) : $share;
		} catch (ShareNotFound $e) {
		}

		$userId = $this->userSession->getUser() ? $this->userSession->getUser()->getUID() : null;
		if ($this->permissionManager->shouldWatermark($event->getNode(), $userId, $share)) {
			throw new NotFoundException();
		}
	}
}
