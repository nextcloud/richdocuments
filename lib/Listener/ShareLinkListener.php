<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */



namespace OCA\Richdocuments\Listener;

use OCA\Files_Sharing\Event\ShareLinkAccessedEvent;
use OCA\Richdocuments\PermissionManager;
use OCA\Richdocuments\Service\InitialStateService;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Share\IShare;
use OCP\Util;

/** @template-implements IEventListener<Event|ShareLinkAccessedEvent> */
class ShareLinkListener implements \OCP\EventDispatcher\IEventListener {
	public function __construct(
		private PermissionManager $permissionManager,
		private InitialStateService $initialStateService,
	) {
	}

	public function handle(Event $event): void {
		if (!$event instanceof ShareLinkAccessedEvent) {
			return;
		}

		/** @var IShare $share */
		$share = $event->getShare();
		$owner = $share->getShareOwner();
		$loggedInUser = $this->permissionManager->loggedInUser();

		if ($this->permissionManager->isEnabledForUser($owner)) {
			$this->initialStateService->prepareParams(['userId' => $loggedInUser]);
			$this->initialStateService->provideCapabilities();

			Util::addScript('richdocuments', 'richdocuments-viewer', 'viewer');
			Util::addScript('richdocuments', 'richdocuments-public', 'viewer');
		}
	}
}
