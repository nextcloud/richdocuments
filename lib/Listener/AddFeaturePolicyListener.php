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
