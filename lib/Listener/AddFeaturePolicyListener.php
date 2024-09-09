<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Listener;

use OCA\Richdocuments\AppConfig;
use OCP\AppFramework\Http\FeaturePolicy;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\IRequest;
use OCP\Security\FeaturePolicy\AddFeaturePolicyEvent;

/** @template-implements IEventListener<Event|AddFeaturePolicyEvent> */
class AddFeaturePolicyListener implements IEventListener {
	public function __construct(
		private IRequest $request,
		private AppConfig $config,
	) {
	}

	public function handle(Event $event): void {
		if (!$event instanceof AddFeaturePolicyEvent) {
			return;
		}

		if (!$this->isPageLoad()) {
			return;
		}

		$policy = new FeaturePolicy();

		foreach ($this->config->getDomainList() as $url) {
			$policy->addAllowedFullScreenDomain($url);
		}

		$event->addPolicy($policy);
	}

	private function isPageLoad(): bool {
		$scriptNameParts = explode('/', $this->request->getScriptName());
		return end($scriptNameParts) === 'index.php';
	}
}
