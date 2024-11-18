<?php
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);


namespace OCA\Richdocuments\Listener;

use OCA\Richdocuments\Capabilities;
use OCA\Richdocuments\Service\CapabilitiesService;
use OCA\Richdocuments\Service\TemplateFieldService;
use OCA\Richdocuments\TemplateManager;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Files\Template\FileCreatedFromTemplateEvent;

/** @template-implements IEventListener<Event|FileCreatedFromTemplateEvent> */
class FileCreatedFromTemplateListener implements IEventListener {

	public function __construct(
		private TemplateManager $templateManager,
		private TemplateFieldService $templateFieldService,
		private CapabilitiesService $capabilitiesService,
	) {
	}

	public function handle(Event $event): void {
		if (!($event instanceof FileCreatedFromTemplateEvent)) {
			return;
		}

		$targetFile = $event->getTarget();
		if (!in_array($targetFile->getMimetype(), Capabilities::MIMETYPES) && $targetFile->getMimeType() !== 'application/pdf') {
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

		if ($this->capabilitiesService->hasFormFilling()) {
			$filledTemplate = $this->templateFieldService->fillFields($templateFile, $event->getTemplateFields());
			$event->getTarget()->putContent($filledTemplate);
		}

		// Avoid having the mimetype of the source file set
		$event->getTarget()->getStorage()->getCache()->update($event->getTarget()->getId(), [
			'mimetype' => $event->getTarget()->getMimeType()
		]);
	}
}
