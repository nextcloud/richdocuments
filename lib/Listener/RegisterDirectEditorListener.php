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

	/**
	 * Minimum mobile client version per platform that can drive the
	 * server-managed Direct Editing flow. The iOS client resolves editors from
	 * a hardcoded list and silently falls back to a native share sheet on an
	 * unknown editor id; it only learned about this editor in 34.1.2.
	 */
	private const MIN_MOBILE_CLIENT_VERSIONS = [
		IRequest::USER_AGENT_CLIENT_IOS => '34.1.2',
		IRequest::USER_AGENT_CLIENT_ANDROID => '34',
	];

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

		foreach (self::MIN_MOBILE_CLIENT_VERSIONS as $pattern => $minVersion) {
			if (preg_match($pattern, $userAgent, $matches) !== 1) {
				continue;
			}
			// Branded builds append a "-Brand" suffix, which version_compare()
			// would otherwise rank below the plain version number.
			$version = explode('-', $matches[1], 2)[0];
			return version_compare($version, $minVersion, '>=');
		}

		return true;
	}
}
