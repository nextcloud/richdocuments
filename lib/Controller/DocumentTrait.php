<?php

namespace OCA\Richdocuments\Controller;

use OCP\AppFramework\Http\ContentSecurityPolicy;
use OCP\AppFramework\Http\FeaturePolicy;

trait DocumentTrait {
	private $appConfig;

	/**
	 * Setup policy headers for the response
	 */
	private function applyPolicies($response) {
		$collaboraHost = $this->domainOnly($this->appConfig->getCollaboraUrlPublic());

		// FIXME We can skip inline source once templates/documents.php is migrated to IInitialState
		$policy = new ContentSecurityPolicy();
		$policy->allowInlineScript(true);
		$response->setContentSecurityPolicy($policy);

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
		$host = isset($parsed_url['host']) ? $parsed_url['host'] : '';
		$port = isset($parsed_url['port']) ? ':' . $parsed_url['port'] : '';
		return "$scheme$host$port";
	}
}
