<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-FileCopyrightText: 2016 Lukas Reschke <lukas@statuscode.ch>
 * SPDX-License-Identifier: AGPL-3.0-or-later
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
	private const XPATH_PROOF_KEY = '//proof-key[1]';
	// XML Attribute names for proof keys
	private const KEY_ATTR_VALUE = 'value';
	private const KEY_ATTR_MODULUS = 'modulus';
	private const KEY_ATTR_EXPONENT = 'exponent';
	private const KEY_ATTR_OLDVALUE = 'oldvalue';
	private const KEY_ATTR_OLDMODULUS = 'oldmodulus';
	private const KEY_ATTR_OLDEXPONENT = 'oldexponent';

	// Cached (per request) parsed discovery XML
	private ?SimpleXMLElement $parsedDiscovery = null;

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

	/**
	 * Send an HTTP request to the WOPI discovery endpoint and return its XML content as a string.
	 */
	#[\Override]
	protected function sendRequest(IClient $client): string {
		$response = $client->get($this->getDiscoveryEndpoint(), $this->getDefaultRequestOptions());
		return (string)$response->getBody();
	}

	/**
	 * @throws \RuntimeException if wopi_url is not configured.
	 */
	private function getDiscoveryEndpoint(): string {
		// @todo: any virtue to the use of IConfig vs IAppConfig here?
		$remoteHost = $this->config->getAppValue('richdocuments', 'wopi_url');

		if (empty($remoteHost)) {
			$this->logger->error('WOPI server URL (wopi_url) is not configured.');
			throw new \RuntimeException('WOPI server URL (wopi_url) is not configured');
		}

		return rtrim($remoteHost, '/') . '/hosting/discovery';
	}

	/**
	 * Returns true if a <proof-key> node is present in the parsed discovery XML.
	 * Note this just indicates its presence, not its validity or usability.
	 */
	public function hasProofKey(): bool {
		try {
			$parsed = $this->getParsedDiscoveryXml();
		} catch (\Exception $e) {
			$this->logger->debug('Error determining proof-key presence: ' . $e->getMessage());
			return false;
		}

		$node = $parsed->xpath(self::XPATH_PROOF_KEY);

		if (empty($node)) {
			$this->logger->debug('No proof-key node found');
			return false;
		}

		return true;
	}

	/** Retrieve the primary proof key from the parsed discovery XML.
	 *
	 * @return ProofKey|null ProofKey (if present and complete), otherwise null.
	 */
	public function getProofKey(): ?ProofKey {
		// consider adding success debug level logging
		return $this->extractProofKey(
			self::KEY_ATTR_VALUE,
			self::KEY_ATTR_MODULUS,
			self::KEY_ATTR_EXPONENT
		);
	}

	/**
	 * Retrieve the previous/old proof key from the parsed discovery XML.
	 *
	 * @return ProofKey|null ProofKey (if present and complete), otherwise null.
	 */
	public function getProofKeyOld(): ?ProofKey {
		// consider adding success debug level logging
		return $this->extractProofKey(
			self::KEY_ATTR_OLDVALUE,
			self::KEY_ATTR_OLDMODULUS,
			self::KEY_ATTR_OLDEXPONENT
		);
	}

	/**
	 * Retrieve the discovery XML then load/parse/return it as a SimpleXMLElement instance.
	 * Uses per request cache; retrieves from endpoint when necessary.
	 *
	 * @throws \Exception If parsing the XML fails.
	 * @return SimpleXMLElement
	 */
	private function getParsedDiscoveryXml(): SimpleXMLElement {
		// Try cache (per request)
		if ($this->parsedDiscovery !== null) {
			return $this->parsedDiscovery;
		}

		try {
			$xml = $this->get();
			$this->parsedDiscovery = new SimpleXMLElement($xml);
			// @todo: Consider registering namespace
			return $this->parsedDiscovery;
		} catch (\Exception $e) {
			$this->logger->error('Could not parse discovery XML: ' . $e->getMessage());
			throw new \Exception('Could not parse discovery XML', 0, $e);
		}
	}

	/**
	 * Helper for extracting a proof key (primary or old) from the discovery XML.
	 *
	 * @param string $valAttr Attribute name for the key value.
	 * @param string $modAttr Attribute name for the modulus.
	 * @param string $expAttr Attribute name for the exponent.
	 * @return ProofKey|null
	 */
	private function extractProofKey(
		string $valAttr,
		string $modAttr,
		string $expAttr
	): ?ProofKey {
		try {
			$xml = $this->getParsedDiscoveryXml();

			$publicKeyResult = $xml->xpath(self::XPATH_PROOF_KEY . '/@' . $valAttr);
			$publicKeyNode = (is_array($publicKeyResult) && isset($publicKeyResult[0])) ? $publicKeyResult[0] : null;

			$modulusResult   = $xml->xpath(self::XPATH_PROOF_KEY . '/@' . $modAttr);
			$modulusNode = (is_array($modulusResult) && isset($modulusResult[0])) ? $modulusResult[0] : null;

			$exponentResult = $xml->xpath(self::XPATH_PROOF_KEY . '/@' . $expAttr);
			$exponentNode = (is_array($exponentResult) && isset($exponentResult[0])) ? $exponentResult[0] : null;

			if ($publicKeyNode === null || $modulusNode === null || $exponentNode === null) {
				$this->logger->warning(sprintf(
					'Missing proof-key attributes: value=%s, modulus=%s, exponent=%s',
					$valAttr, $modAttr, $expAttr
				));
				return null;
			}

			return new ProofKey(
				(string)$publicKeyNode,
				(string)$modulusNode,
				(string)$exponentNode
			);
		} catch (\Exception $e) {
			$this->logger->error('Error extracting proof key: ' . $e->getMessage());
			return null;
		}
	}
}
