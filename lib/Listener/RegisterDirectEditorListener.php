<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Listener;

use OCA\Richdocuments\DirectEditing\OfficeDirectEditor;
use OCP\DirectEditing\RegisterDirectEditorEvent;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;

/** @template-implements IEventListener<Event|RegisterDirectEditorEvent> */
final class RegisterDirectEditorListener implements IEventListener {

	public function __construct(
		private OfficeDirectEditor $editor,
	) {
	}

	#[\Override]
	public function handle(Event $event): void {
		if (!$event instanceof RegisterDirectEditorEvent) {
			return;
		}
		$event->register($this->editor);
	}
}
