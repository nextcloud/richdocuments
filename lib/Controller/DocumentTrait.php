<?php
/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Controller;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Db\Wopi;
use OCP\AppFramework\Http\FeaturePolicy;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\Collaboration\Reference\RenderReferenceEvent;
use OCP\EventDispatcher\IEventDispatcher;

trait DocumentTrait {
	private AppConfig $appConfig;

	private function documentTemplateResponse(Wopi $wopi, array $params): TemplateResponse {
		$eventDispatcher = \OCP\Server::get(IEventDispatcher::class);
		$eventDispatcher->dispatchTyped(new RenderReferenceEvent());
		$this->initialState->provideDocument($wopi, $params);
		$response = new TemplateResponse('richdocuments', 'documents', $params, 'base');
		$this->applyPolicies($response);
		return $response;
	}

	/**
	 * Setup policy headers for the response
	 */
	private function applyPolicies($response) {
		$collaboraHost = $this->domainOnly($this->appConfig->getCollaboraUrlPublic());

		$featurePolicy = new FeaturePolicy();
		$featurePolicy->addAllowedFullScreenDomain($collaboraHost);
		$response->setFeaturePolicy($featurePolicy);

		$response->addHeader('X-Frame-Options', 'ALLOW');
	}

	/**
	 * Strips the path and query parameters from the URL.
	 *
	 * @param string $url
	 * @return string
	 */
	private function domainOnly(string $url): string {
		$parsed_url = parse_url($url);
		$scheme = isset($parsed_url['scheme']) ? $parsed_url['scheme'] . '://' : '';
		$host = $parsed_url['host'] ?? '';
		$port = isset($parsed_url['port']) ? ':' . $parsed_url['port'] : '';
		return "$scheme$host$port";
	}
}
