<?php
/**
 * SPDX-FileCopyrightText: 2016 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\WOPI;

use Exception;
use OCA\Richdocuments\Service\DiscoveryService;
use Psr\Log\LoggerInterface;

class Parser {
	public function __construct(
		private DiscoveryService $discoveryService,
		private LoggerInterface $logger,
	) {
	}

	/**
	 * @throws Exception
	 */
	public function getUrlSrcValue(string $appName): string {
		$result = $this->getUrlSrc($appName)['urlsrc'];

		// Fix for potentially escaped urls that are misconfigured on the Collabora docker image
		// https://github.com/nextcloud/richdocuments/issues/3262
		$result = str_replace('\.', '.', $result);

		return (string)$result;
	}

	/**
	 * Retrieves the urlsrc of the first action from WOPI discovery for the specified app name.
	 *
	 * @return array{urlsrc: string, action: string}
	 * @throws Exception if discovery XML is null, empty, malformed, or does not contain a matching action node.
	 */
	private function getUrlSrc(string $appName): array {
		$discovery = $this->discoveryService->get();

		if ($discovery === null || $discovery === '') {
			$this->logger->error('WOPI::getUrlSrc - Discovery XML is null or empty');
			throw new Exception('Discovery XML is null or empty');
		}

		$this->logger->debug('WOPI::getUrlSrc discovery: {discovery}', ['discovery' => $discovery]);

		$discoveryParsed = simplexml_load_string($discovery);
		if ($discoveryParsed === false) {
			$this->logger->error(
				'WOPI::getUrlSrc - Invalid or malformed XML in WOPI discovery response',
				['discovery' => $discovery]
			);
			throw new Exception('Malformed XML in WOPI discovery response');
		}

		$result = $discoveryParsed->xpath(sprintf('/wopi-discovery/net-zone/app[@name="%s"]/action[1]', $appName));
		if (empty($result)) {
			$this->logger->error(
				"WOPI::getUrlSrc - Could not find action for appName {appName} in this WOPI discovery response: {discovery}",
				['appName' => $appName, 'discovery' => $discovery]
			);
			throw new Exception("Could not find action for {$appName} in WOPI discovery response");
		}

		$firstAction = $result[0];
		$urlsrcSet = isset($firstAction['urlsrc']) && (string)$firstAction['urlsrc'] !== '';
		$nameSet = isset($firstAction['name']) && (string)$firstAction['name'] !== '';

		if (!$urlsrcSet || !$nameSet) {
			$this->logger->error(
				"WOPI::getUrlSrc - Found node for appName {appName}, but urlsrc and/or name are missing/empty in WOPI discovery",
				['appName' => $appName, 'discovery' => $discovery]
			);
			throw new Exception("Found node for {$appName}, but urlsrc and/or name are missing/empty");
		}

		return [
			'urlsrc' => (string)$firstAction['urlsrc'],
			'action' => (string)$firstAction['name'],
		];
	}
}
