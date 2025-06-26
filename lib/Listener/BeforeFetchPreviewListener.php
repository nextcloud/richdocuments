<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */


namespace OCA\Richdocuments\Listener;

use OCA\Richdocuments\Helper;
use OCA\Richdocuments\PermissionManager;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Files\NotFoundException;
use OCP\IRequest;
use OCP\IUserSession;
use OCP\Preview\BeforePreviewFetchedEvent;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager;

/** @template-implements IEventListener<Event|BeforePreviewFetchedEvent> */
class BeforeFetchPreviewListener implements IEventListener {
	public function __construct(
		private PermissionManager $permissionManager,
		private IUserSession $userSession,
		private IRequest $request,
		private IManager $shareManager,
		private Helper $helper,
	) {
	}

	public function handle(Event $event): void {
		if (!$event instanceof BeforePreviewFetchedEvent) {
			return;
		}
		$shareToken = $this->request->getParam('token');

		$share = null;
		try {
			$share = $shareToken ?
				// Get different share for public previews as the share from the node is only set for mounted shares
				$this->shareManager->getShareByToken($shareToken)
				// Get share for internal shares
				: $this->helper->getShareFromNode($event->getNode());
		} catch (ShareNotFound) {
		}

		$userId = $this->userSession->getUser() ? $this->userSession->getUser()->getUID() : null;
		if ($this->permissionManager->shouldWatermark($event->getNode(), $userId, $share)) {
			throw new NotFoundException();
		}
	}
}
