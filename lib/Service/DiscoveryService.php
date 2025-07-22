<?php
/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

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

namespace OCA\Richdocuments\Service;

use OCA\Richdocuments\WOPI\ProofKey;
use OCP\Files\AppData\IAppDataFactory;
use OCP\Http\Client\IClient;
use OCP\Http\Client\IClientService;
use OCP\IAppConfig;
use OCP\ICacheFactory;
use OCP\IConfig;
use Psr\Log\LoggerInterface;
use SimpleXMLElement;

class DiscoveryService extends CachedRequestService {
	public function __construct(
		private IClientService $clientService,
		private ICacheFactory $cacheFactory,
		private IAppDataFactory $appDataFactory,
		private IAppConfig $appConfig,
		private LoggerInterface $logger,
		private IConfig $config,
	) {
		parent::__construct(
			$this->clientService,
			$this->cacheFactory,
			$this->appDataFactory,
			$this->appConfig,
			$this->logger,
			'discovery',
		);
	}

	protected function sendRequest(IClient $client): string {
		$response = $client->get($this->getDiscoveryEndpoint(), $this->getDefaultRequestOptions());
		return (string)$response->getBody();
	}

	private function getDiscoveryEndpoint(): string {
		$remoteHost = $this->config->getAppValue('richdocuments', 'wopi_url');
		return rtrim($remoteHost, '/') . '/hosting/discovery';

	}

	public function getProofKey(): ?array {
		try {
			$parsed = new SimpleXMLElement($this->get());
		} catch (\Exception $e) {
			$this->logger->error($e->getMessage());
			throw new \Exception('Could not parse discovery XML');
		}

		// TODO: Maybe throw an exception instead of just null
		$proofKey = $parsed->{'proof-key'};
		if (!$proofKey) {
			return null;
		}

		// TODO: Maybe check if there even is an old proof key

		$currentProofKey = new ProofKey(
			(string)$proofKey['exponent'],
			(string)$proofKey['modulus'],
			(string)$proofKey['value'],
		);

		$oldProofKey = new ProofKey(
			(string)$proofKey['oldexponent'],
			(string)$proofKey['oldmodulus'],
			(string)$proofKey['oldvalue'],
		);

		return [
			'current' => $currentProofKey,
			'old' => $oldProofKey,
		];
	}
}
