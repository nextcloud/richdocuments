<?php

namespace OCA\Richdocuments\Listener;

use OCA\Richdocuments\AppInfo\Application;
use OCP\Collaboration\Resources\LoadAdditionalScriptsEvent;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Util;

/** @template-implements IEventListener<LoadAdditionalScriptsEvent> */
class LoadAdditionalListener implements IEventListener {
	public function handle(Event $event): void {
		// If not a LoadAdditionalScriptsEvent, we should do nothing
		if (!($event instanceof LoadAdditionalScriptsEvent)) {
			return;
		}

		// If we can add an init script, we add the file-actions script
		if (method_exists(Util::class, 'addInitScript')) {
			Util::addInitScript(Application::APPNAME, 'richdocuments-fileActions');
		}
	}
}
