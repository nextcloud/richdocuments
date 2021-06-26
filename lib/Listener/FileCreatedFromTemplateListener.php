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


use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Files\Template\FileCreatedFromTemplateEvent;

class FileCreatedFromTemplateListener implements IEventListener {

	public function handle(Event $event): void {
		if (!($event instanceof FileCreatedFromTemplateEvent)) {
			return;
		}
		/** @var FileCreatedFromTemplateEvent $event */
		if ($event->getTemplate() === null) {
			$templates = [
				'application/vnd.oasis.opendocument.text' => 'document.ott',
				'application/vnd.oasis.opendocument.spreadsheet' => 'spreadsheet.ots',
				'application/vnd.oasis.opendocument.presentation' => 'presentation.otp'
			];

			\OC::$server->getLogger()->error('MIMETYPE' . $event->getTarget()->getMimeType());

			$template = $templates[$event->getTarget()->getMimeType()] ?? null;
			if ($template) {
				$event->getTarget()->putContent(file_get_contents(__DIR__ . '/../assets/' . $template));
			}
		}
	}
}
