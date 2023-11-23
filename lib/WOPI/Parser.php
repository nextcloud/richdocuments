<?php
/**
 * @copyright Copyright (c) 2016 Lukas Reschke <lukas@statuscode.ch>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Richdocuments\WOPI;

use Exception;
use OCA\Richdocuments\Service\DiscoveryService;
use Psr\Log\LoggerInterface;

class Parser {
	public function __construct(
		private DiscoveryService $discoveryService,
		private LoggerInterface $logger
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
