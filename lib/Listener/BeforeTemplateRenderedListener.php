<?php

declare(strict_types=1);

namespace OCA\Richdocuments\Listener;

use OCP\AppFramework\Http\Events\BeforeTemplateRenderedEvent;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;

/** @template-implements IEventListener<BeforeTemplateRenderedEvent|Event> */
class BeforeTemplateRenderedListener implements IEventListener {
	public function handle(Event $event): void {
		if (!$event instanceof BeforeTemplateRenderedEvent) {
			return;
		}

		// FIXME: Might be too wide, we should only do this when needed

		//$event->getResponse()->addHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
		//$event->getResponse()->addHeader('Cross-Origin-Embedder-Policy', 'require-corp');
	}
}
