<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
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

/** @template-implements IEventListener<Event|BeforePreviewFetchedEvent> */
class BeforeFetchPreviewListener implements IEventListener {
	public function __construct(
		private PermissionManager $permissionManager,
		private IUserSession $userSession,
		private IRequest $request,
		private IManager $shareManager,
	) {
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
		} catch (ShareNotFound) {
		}

		$userId = $this->userSession->getUser() ? $this->userSession->getUser()->getUID() : null;
		if ($this->permissionManager->shouldWatermark($event->getNode(), $userId, $share)) {
			throw new NotFoundException();
		}
	}
}
