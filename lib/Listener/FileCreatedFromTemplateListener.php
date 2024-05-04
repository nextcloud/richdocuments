<?php
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);


namespace OCA\Richdocuments\Listener;

use OCA\Richdocuments\TemplateManager;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Files\Template\FileCreatedFromTemplateEvent;

/** @template-implements IEventListener<Event|FileCreatedFromTemplateEvent> */
class FileCreatedFromTemplateListener implements IEventListener {
	/** @var TemplateManager */
	private $templateManager;

	public function __construct(
		TemplateManager $templateManager
	) {
		$this->templateManager = $templateManager;
	}

	public function handle(Event $event): void {
		if (!($event instanceof FileCreatedFromTemplateEvent)) {
			return;
		}

		$templateFile = $event->getTemplate();

		// Empty template
		if ($templateFile === null) {
			$event->getTarget()->putContent($this->templateManager->getEmptyFileContent($event->getTarget()->getExtension()));
			$templateType = $this->templateManager->getTemplateTypeForExtension($event->getTarget()->getExtension());
			$emptyTemplates = $this->templateManager->getEmpty($templateType);
			$emptyTemplate = array_shift($emptyTemplates);
			if ($emptyTemplate && $this->templateManager->isSupportedTemplateSource($emptyTemplate->getExtension())) {
				// Only use TemplateSource if supported filetype
				$this->templateManager->setTemplateSource($event->getTarget()->getId(), $emptyTemplate->getId());
			}
			return;
		}

		if ($this->templateManager->isSupportedTemplateSource($templateFile->getExtension())) {
			// Only use TemplateSource if supported filetype
			$this->templateManager->setTemplateSource($event->getTarget()->getId(), $templateFile->getId());
		}

		// Avoid having the mimetype of the source file set
		$event->getTarget()->getStorage()->getCache()->update($event->getTarget()->getId(), [
			'mimetype' => $event->getTarget()->getMimeType()
		]);
	}
}
