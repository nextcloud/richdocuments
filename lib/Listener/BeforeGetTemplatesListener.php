<?php

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Listener;

use OCA\Richdocuments\Service\TemplateFieldService;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Files\Template\BeforeGetTemplatesEvent;

/** @template-implements IEventListener<BeforeGetTemplatesEvent|Event> */
class BeforeGetTemplatesListener implements IEventListener {
	public function __construct(
		private TemplateFieldService $templateFieldService,
	) {
	}

	public function handle(Event $event): void {
		if (!$event instanceof BeforeGetTemplatesEvent) {
			return;
		}

		foreach ($event->getTemplates() as $template) {
			$templateFileId = $template->jsonSerialize()['fileid'];
			$fields = $this->templateFieldService->extractFields($templateFileId);
			
			$template->setFields($fields);
		}
	}
}
