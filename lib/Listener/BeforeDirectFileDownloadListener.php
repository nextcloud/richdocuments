<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Listener;

use OCA\Richdocuments\Service\SecureViewService;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Files\Events\BeforeDirectFileDownloadEvent;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\IUserSession;

/** @template-implements IEventListener<Event|BeforeDirectFileDownloadEvent> */
class BeforeDirectFileDownloadListener implements IEventListener {
	public function __construct(
		private IUserSession $userSession,
		private IRootFolder $rootFolder,
		private SecureViewService $secureViewService,
	) {
	}

	#[\Override]
	public function handle(Event $event): void {
		if (!$event instanceof BeforeDirectFileDownloadEvent || !$this->secureViewService->isEnabled()) {
			return;
		}

		$user = $this->userSession->getUser();
		if ($user === null) {
			return;
		}

		try {
			$node = $this->rootFolder->getUserFolder($user->getUID())->get($event->getPath());
			$secured = $this->secureViewService->shouldSecureNode($node);
		} catch (NotFoundException) {
			return;
		}

		if ($secured) {
			$event->setSuccessful(false);
			$event->setErrorMessage('Access to this resource has been denied.');
		}
	}
}
