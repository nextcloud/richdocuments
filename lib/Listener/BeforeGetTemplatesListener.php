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

		/** @psalm-suppress RedundantCondition */
		if (method_exists($event, 'shouldGetFields') && !$event->shouldGetFields()) {
			return;
		}

		foreach ($event->getTemplates() as $template) {
			$templateId = $template->jsonSerialize()['fileid'];
			$fields = $this->templateFieldService->extractFields($templateId);

			$template->setFields($fields);
		}
	}
}
