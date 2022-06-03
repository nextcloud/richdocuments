<?php

declare(strict_types=1);
/**
 * @copyright Copyright (c) 2022 Julius Härtl <jus@bitgrid.net>
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
namespace OCA\Richdocuments\Listener;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Service\FederationService;
use OCP\App\IAppManager;
use OCP\AppFramework\Http\EmptyContentSecurityPolicy;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\GlobalScale\IConfig as GlobalScaleConfig;
use OCP\IRequest;
use OCP\Security\CSP\AddContentSecurityPolicyEvent;

class CSPListener implements IEventListener {
	private IRequest $request;
	private AppConfig $config;
	private IAppManager $appManager;
	private FederationService $federationService;
	private GlobalScaleConfig $globalScaleConfig;

	public function __construct(IRequest $request, AppConfig $config, IAppManager $appManager, FederationService $federationService, GlobalScaleConfig $globalScaleConfig) {
		$this->request = $request;
		$this->config = $config;
		$this->appManager = $appManager;
		$this->federationService = $federationService;
		$this->globalScaleConfig = $globalScaleConfig;
	}

	public function handle(Event $event): void {
		if (!$event instanceof AddContentSecurityPolicyEvent) {
			return;
		}

		if (!$this->isPageLoad()) {
			return;
		}

		$urls = array_merge(
			[ $this->domainOnly($this->config->getCollaboraUrlPublic()) ],
			$this->getFederationDomains(),
			$this->getGSDomains()
		);

		$urls = array_filter($urls);

		$policy = new EmptyContentSecurityPolicy();
		$policy->addAllowedFrameDomain("'self'");

		foreach ($urls as $url) {
			$policy->addAllowedFrameDomain($url);
			$policy->addAllowedFormActionDomain($url);
			$policy->addAllowedFrameAncestorDomain($url);
			$policy->addAllowedImageDomain($url);
		}

		$event->addPolicy($policy);
	}

	private function isPageLoad(): bool {
		$scriptNameParts = explode('/', $this->request->getScriptName());
		return end($scriptNameParts) === 'index.php';
	}

	private function getFederationDomains(): array {
		if (!$this->appManager->isEnabledForUser('federation')) {
			return [];
		}

		$trustedNextcloudDomains = array_filter(array_map(function ($server) {
			return $this->federationService->isTrustedRemote($server) ? $server : null;
		}, $this->federationService->getTrustedServers()));

		$trustedCollaboraDomains = array_filter(array_map(function ($server) {
			try {
				return $this->federationService->getRemoteCollaboraURL($server);
			} catch (\Exception $e) {
				// If there is no remote collabora server we can just skip that
				return null;
			}
		}, $trustedNextcloudDomains));

		return array_map(function ($url) {
			return $this->domainOnly($url);
		}, array_merge($trustedNextcloudDomains, $trustedCollaboraDomains));
	}

	private function getGSDomains(): array {
		if (!$this->globalScaleConfig->isGlobalScaleEnabled()) {
			return [];
		}

		return $this->config->getGlobalScaleTrustedHosts();
	}

	/**
	 * Strips the path and query parameters from the URL.
	 */
	private function domainOnly(string $url): string {
		$parsedUrl = parse_url($url);
		$scheme = isset($parsedUrl['scheme']) ? $parsedUrl['scheme'] . '://' : '';
		$host = $parsedUrl['host'] ?? '';
		$port = isset($parsedUrl['port']) ? ':' . $parsedUrl['port'] : '';
		return "$scheme$host$port";
	}
}
