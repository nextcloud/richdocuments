<?php
/*
 * @copyright Copyright (c) 2021 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

declare(strict_types=1);


namespace OCA\Richdocuments\Listener;


use OCA\Richdocuments\TemplateManager;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Files\Template\FileCreatedFromTemplateEvent;

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
