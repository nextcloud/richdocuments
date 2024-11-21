<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Listener;

use OCA\Richdocuments\Service\CapabilitiesService;
use OCA\Richdocuments\Service\InitialStateService;
use OCP\AppFramework\Http\Events\BeforeTemplateRenderedEvent;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\IRequest;

/** @template-implements IEventListener<BeforeTemplateRenderedEvent|Event> */
class BeforeTemplateRenderedListener implements IEventListener {
	public function __construct(
		private CapabilitiesService $capabilitiesService,
		private InitialStateService $initialStateService,
		private IRequest $request,
	) {
	}

	public function handle(Event $event): void {
		if (!$event instanceof BeforeTemplateRenderedEvent) {
			return;
		}

		if ($this->capabilitiesService->hasWASMSupport()) {
			$event->getResponse()->addHeader('Cross-Origin-Opener-Policy', 'same-origin');
			$event->getResponse()->addHeader('Cross-Origin-Embedder-Policy', 'require-corp');
		}

		$startPresentation = $this->request->getParam('startPresentation') === 'true';
		$this->initialStateService->providePresentation($startPresentation);
	}
}
