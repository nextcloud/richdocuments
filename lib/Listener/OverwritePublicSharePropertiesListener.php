<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Listener;

use OCA\Richdocuments\PermissionManager;
use OCA\Talk\Events\OverwritePublicSharePropertiesEvent;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Files\NotFoundException;

/** @template-implements IEventListener<OverwritePublicSharePropertiesEvent|Event> */
class OverwritePublicSharePropertiesListener implements IEventListener {
	public function __construct(
		private PermissionManager $permissionManager,
		private ?string $userId,
	) {
	}

	public function handle(Event $event): void {
		if (!$event instanceof OverwritePublicSharePropertiesEvent) {
			return;
		}

		$share = $event->getShare();
		try {
			$node = $share->getNode();
		} catch (NotFoundException) {
			return;
		}

		if ($this->permissionManager->shouldWatermark($node, $this->userId, $share)) {
			$share->setHideDownload(true);
		}
	}
}
