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
use OCP\IRequest;

/** @template-implements IEventListener<Event|RegisterDirectEditorEvent> */
final class RegisterDirectEditorListener implements IEventListener {

	private const MIN_MOBILE_CLIENT_VERSION = 34;

	public function __construct(
		private OfficeDirectEditor $editor,
		private IRequest $request,
	) {
	}

	#[\Override]
	public function handle(Event $event): void {
		if (!$event instanceof RegisterDirectEditorEvent) {
			return;
		}
		if (!$this->shouldExposeEditor()) {
			return;
		}
		$event->register($this->editor);
	}

	private function shouldExposeEditor(): bool {
		$userAgent = $this->request->getHeader('User-Agent');
		if ($userAgent === '') {
			return true;
		}

		foreach ([IRequest::USER_AGENT_CLIENT_IOS, IRequest::USER_AGENT_CLIENT_ANDROID] as $pattern) {
			if (preg_match($pattern, $userAgent, $matches) !== 1) {
				continue;
			}
			$major = (int)explode('.', $matches[1] ?? '0')[0];
			return $major >= self::MIN_MOBILE_CLIENT_VERSION;
		}

		return true;
	}
}
