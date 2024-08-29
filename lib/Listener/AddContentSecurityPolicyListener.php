<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Listener;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Service\CapabilitiesService;
use OCP\AppFramework\Http\EmptyContentSecurityPolicy;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\IRequest;
use OCP\Security\CSP\AddContentSecurityPolicyEvent;

/** @template-implements IEventListener<Event|AddContentSecurityPolicyEvent> */
class AddContentSecurityPolicyListener implements IEventListener {
	public function __construct(
		private IRequest $request,
		private AppConfig $config,
		private CapabilitiesService $capabilitiesService,
	) {
	}

	public function handle(Event $event): void {
		if (!$event instanceof AddContentSecurityPolicyEvent) {
			return;
		}

		if (!$this->isPageLoad()) {
			return;
		}

		$policy = new EmptyContentSecurityPolicy();
		$policy->addAllowedFrameDomain("'self'");
		$policy->addAllowedFrameDomain('nc:');

		if ($this->capabilitiesService->hasWASMSupport()) {
			$policy->allowEvalWasm(true);
		}

		foreach ($this->config->getDomainList() as $url) {
			$policy->addAllowedFrameDomain($url);
			$policy->addAllowedFormActionDomain($url);
			$policy->addAllowedFrameAncestorDomain($url);
			$policy->addAllowedImageDomain($url);
		}

		if ($this->isSettingsPage()) {
			$policy->addAllowedConnectDomain('*');
		}

		$event->addPolicy($policy);
	}

	private function isPageLoad(): bool {
		$scriptNameParts = explode('/', $this->request->getScriptName());
		return end($scriptNameParts) === 'index.php';
	}

	private function isSettingsPage(): bool {
		return str_starts_with($this->request->getPathInfo(), '/settings/admin/richdocuments');
	}
}
