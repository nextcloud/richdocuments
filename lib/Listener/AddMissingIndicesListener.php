<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Listener;

use OCP\DB\Events\AddMissingIndicesEvent;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;

/**
 * @template-implements IEventListener<AddMissingIndicesEvent>
 */
class AddMissingIndicesListener implements IEventListener {
	#[\Override]
	public function handle(Event $event): void {
		if (!($event instanceof AddMissingIndicesEvent)) {
			return;
		}

		/**
		 * Added to @see Version2060Date20200302131958
		 */
		$event->addMissingIndex(
			'richdocuments_wopi',
			'rd_wopi_expiry_idx',
			['expiry']
		);
	}
}
