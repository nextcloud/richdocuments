<?php
/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Listener;

use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\PermissionManager;
use OCP\Collaboration\Resources\LoadAdditionalScriptsEvent;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Util;

/** @template-implements IEventListener<LoadAdditionalScriptsEvent> */
class LoadAdditionalListener implements IEventListener {
	public function __construct(
		private PermissionManager $permissionManager,
		private ?string $userId,
	) {
	}

	public function handle(Event $event): void {
		if (!($event instanceof LoadAdditionalScriptsEvent)) {
			return;
		}

		if ($this->permissionManager->isEnabledForUser() && $this->userId !== null) {
			Util::addInitScript(Application::APPNAME, 'richdocuments-fileActions');
		}
	}
}
