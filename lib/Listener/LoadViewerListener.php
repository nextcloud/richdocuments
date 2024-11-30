<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */



namespace OCA\Richdocuments\Listener;

use OCA\Richdocuments\PermissionManager;
use OCA\Richdocuments\Service\InitialStateService;
use OCA\Viewer\Event\LoadViewer;
use OCP\Collaboration\Reference\RenderReferenceEvent;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\EventDispatcher\IEventListener;
use OCP\Util;

/** @template-implements IEventListener<Event|LoadViewer> */
class LoadViewerListener implements IEventListener {
	public function __construct(
		private PermissionManager $permissionManager,
		private InitialStateService $initialStateService,
		private IEventDispatcher $eventDispatcher,
		private ?string $userId,
	) {
	}

	public function handle(Event $event): void {
		if (!$event instanceof LoadViewer) {
			return;
		}
		if ($this->permissionManager->isEnabledForUser() && $this->userId !== null) {
			$this->initialStateService->provideCapabilities();
			Util::addScript('richdocuments', 'richdocuments-viewer', 'viewer');
			$this->eventDispatcher->dispatchTyped(new RenderReferenceEvent());
		}
	}
}
