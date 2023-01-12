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
 *
 */



namespace OCA\Richdocuments\Listener;

use OCA\Files_Sharing\Event\ShareLinkAccessedEvent;
use OCA\Richdocuments\PermissionManager;
use OCA\Richdocuments\Service\InitialStateService;
use OCP\EventDispatcher\Event;
use OCP\Share\IShare;
use OCP\Util;

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

		if ($this->permissionManager->isEnabledForUser($owner)) {
			$this->initialStateService->provideCapabilities();
			Util::addScript('richdocuments', 'richdocuments-files');
			Util::addScript('richdocuments', 'richdocuments-viewer', 'viewer');
		}
	}
}
