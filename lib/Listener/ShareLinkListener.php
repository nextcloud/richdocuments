<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */



namespace OCA\Richdocuments\Listener;

use OCA\Files_Sharing\Event\ShareLinkAccessedEvent;
use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\PermissionManager;
use OCA\Richdocuments\Service\InitialStateService;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Share\IShare;
use OCP\Util;

/** @template-implements IEventListener<Event|ShareLinkAccessedEvent> */
class ShareLinkListener implements \OCP\EventDispatcher\IEventListener {
	/** @var PermissionManager */
	private $permissionManager;
	/** @var InitialStateService */
	private $initialStateService;

	public function __construct(PermissionManager $permissionManager, InitialStateService $initialStateService) {
		$this->permissionManager = $permissionManager;
		$this->initialStateService = $initialStateService;
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
			$updatable = (bool)($share->getPermissions() & \OCP\Constants::PERMISSION_UPDATE);
			$updatable = $updatable && $this->permissionManager->userCanEdit($owner);
			
			$this->initialStateService->prepareParams(['userId' => $loggedInUser]);
			$this->initialStateService->providePublicShare($updatable);

			Util::addInitScript(Application::APPNAME, Application::APPNAME . '-init-viewer');
			Util::addScript(Application::APPNAME, Application::APPNAME . '-viewer', 'viewer');
			Util::addScript(Application::APPNAME, Application::APPNAME . '-public', 'viewer');
		}
	}
}
