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
	 * @throws Exception
	 */
	private function getUrlSrc(string $mimetype): array {
		$discovery = $this->discoveryService->get();
		$this->logger->debug('WOPI::getUrlSrc discovery: {discovery}', ['discovery' => $discovery]);
		$discoveryParsed = simplexml_load_string($discovery);

		$result = $discoveryParsed->xpath(sprintf('/wopi-discovery/net-zone/app[@name=\'%s\']/action', $mimetype));
		if ($result && count($result) > 0) {
			return [
				'urlsrc' => (string)$result[0]['urlsrc'],
				'action' => (string)$result[0]['name'],
			];
		}

		$this->logger->error('Didn\'t find urlsrc for mimetype {mimetype} in this WOPI discovery response: {discovery}', ['mimetype' => $mimetype, 'discovery' => $discovery]);
		throw new Exception('Could not find urlsrc for ' . $mimetype . ' in WOPI discovery response');
	}
}
