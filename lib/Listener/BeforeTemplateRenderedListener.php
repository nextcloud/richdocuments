<?php

declare(strict_types=1);

namespace OCA\Richdocuments\Listener;

use OCA\Richdocuments\Service\CapabilitiesService;
use OCP\AppFramework\Http\Events\BeforeTemplateRenderedEvent;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;

/** @template-implements IEventListener<BeforeTemplateRenderedEvent|Event> */
class BeforeTemplateRenderedListener implements IEventListener {
	private CapabilitiesService $capabilitiesService;

	public function __construct(CapabilitiesService $capabilitiesService) {
		$this->capabilitiesService = $capabilitiesService;
	}

	public function handle(Event $event): void {
		if (!$event instanceof BeforeTemplateRenderedEvent) {
			return;
		}

		if ($this->capabilitiesService->hasWASMSupport()) {
			$event->getResponse()->addHeader('Cross-Origin-Opener-Policy', 'same-origin');
			$event->getResponse()->addHeader('Cross-Origin-Embedder-Policy', 'require-corp');
		}
	}
}
