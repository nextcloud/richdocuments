<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Listener;

use OCA\Richdocuments\AppConfig;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\SystemTag\Events\TagDeletedEvent;

/** @template-implements IEventListener<Event|TagDeletedEvent> */
final class TagDeletedListener implements IEventListener {

	public function __construct(
		private AppConfig $appConfig,
	) {
	}

	#[\Override]
	public function handle(Event $event): void {
		if (!$event instanceof TagDeletedEvent) {
			return;
		}

		$tagId = $event->getTag()->getId();

		foreach (AppConfig::SECURE_VIEW_TAG_KEYS as $key) {
			$tagIds = $this->appConfig->getAppValueArray($key);
			$remaining = array_values(array_diff($tagIds, [$tagId]));
			if ($remaining === $tagIds) {
				continue;
			}
			$this->appConfig->setAppValue($key, implode(',', $remaining));
		}
	}
}
