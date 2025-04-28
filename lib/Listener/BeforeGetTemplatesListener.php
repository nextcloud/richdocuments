<?php

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Listener;

use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\IURLGenerator;
use OCP\Files\Template\Template;
use OCP\Files\Template\BeforeGetTemplatesEvent;

/** @template-implements IEventListener<BeforeGetTemplatesEvent|Event> */
class BeforeGetTemplatesListener implements IEventListener {
	public function __construct(
		private IURLGenerator $urlGenerator,
	) {
	}

	public function handle(Event $event): void {
		if (!$event instanceof BeforeGetTemplatesEvent) {
			return;
		}

		/** @var $template Template */
		foreach ($event->getTemplates() as $template) {
			$templateId = $template->jsonSerialize()['fileid'];
			$fieldsUrl = $this->urlGenerator->linkToOCSRouteAbsolute(
				'richdocuments.TemplateField.extractFields',
				[
					'fileId' => $templateId
				],
			);
			
			$template->setFieldsUrl($fieldsUrl);
		}
	}
}
