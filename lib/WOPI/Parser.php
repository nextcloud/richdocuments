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

use OCA\Richdocuments\Exception\InvalidDiscoveryException;
use const PHP_VERSION_ID;

class Parser {
	/** @var DiscoveryManager */
	private $discoveryManager;

	public function __construct(DiscoveryManager $discoveryManager) {
		$this->discoveryManager = $discoveryManager;
	}

	/**
	 * @throws InvalidDiscoveryException
	 */
	public function getUrlSrc(string $mimetype): array {
		$discovery = $this->discoveryManager->get();
		if (PHP_VERSION_ID < 80000) {
			$loadEntities = libxml_disable_entity_loader(true);
			$discoveryParsed = simplexml_load_string($discovery);
			libxml_disable_entity_loader($loadEntities);
		} else {
			$discoveryParsed = simplexml_load_string($discovery);
		}

		if (!$discoveryParsed) {
			throw new InvalidDiscoveryException('Invalid response for /hosting/discovery endpoint: Could not be parsed as XML');
		}

		$result = $discoveryParsed->xpath(sprintf('/wopi-discovery/net-zone/app[@name=\'%s\']/action', $mimetype));
		if ($result && count($result) > 0) {
			return [
				'urlsrc' => (string)$result[0]['urlsrc'],
				'action' => (string)$result[0]['name'],
			];
		}

		throw new InvalidDiscoveryException('Invalid response for /hosting/discovery endpoint: Could not find urlsrc in WOPI');
	}
}
