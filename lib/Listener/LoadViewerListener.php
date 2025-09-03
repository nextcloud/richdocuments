<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */



namespace OCA\Richdocuments\Listener;

use OCA\Richdocuments\AppInfo\Application;
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
	/** @var PermissionManager */
	private $permissionManager;
	/** @var InitialStateService */
	private $initialStateService;
	/** @var IEventDispatcher */
	private $eventDispatcher;

	private ?string $userId = null;

	public function __construct(PermissionManager $permissionManager, InitialStateService $initialStateService, IEventDispatcher $eventDispatcher, ?string $userId) {
		$this->permissionManager = $permissionManager;
		$this->initialStateService = $initialStateService;
		$this->eventDispatcher = $eventDispatcher;
		$this->userId = $userId;
	}

	public function handle(Event $event): void {
		if (!$event instanceof LoadViewer) {
			return;
		}
		if ($this->permissionManager->isEnabledForUser() && $this->userId !== null) {
			$this->initialStateService->provideCapabilities();
			Util::addInitScript(Application::APPNAME, Application::APPNAME . '-init-viewer');
			Util::addScript(Application::APPNAME, Application::APPNAME . '-viewer', 'viewer');
			$this->eventDispatcher->dispatchTyped(new RenderReferenceEvent());
		}
	}
}
