<?php
/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Service;

use Exception;
use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\WOPI\Parser;
use OCP\Http\Client\IClientService;
use OCP\IURLGenerator;
use Symfony\Component\Console\Output\OutputInterface;

class ConnectivityService {
	public function __construct(
		private AppConfig $appConfig,
		private DiscoveryService $discoveryService,
		private CapabilitiesService $capabilitiesService,
		private Parser $parser,
		private IClientService $clientService,
		private IURLGenerator $urlGenerator,
	) {
	}

	/**
	 * @throws Exception
	 */
	public function testDiscovery(OutputInterface $output): void {
		$this->discoveryService->resetCache();
		$this->discoveryService->fetch();
		$output->writeln('<info>✓ Fetched /hosting/discovery endpoint</info>');

		$this->parser->getUrlSrcValue('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
		$output->writeln('<info>✓ Valid mimetype response</info>');

		// FIXME: Optional when allowing generic WOPI servers
		$this->parser->getUrlSrcValue('Capabilities');
		$output->writeln('<info>✓ Valid capabilities entry</info>');
	}

	public function testCapabilities(OutputInterface $output): void {
		$this->capabilitiesService->resetCache();
		$this->capabilitiesService->fetch();
		$output->writeln('<info>✓ Fetched /hosting/capabilities endpoint</info>');

		if ($this->capabilitiesService->getCapabilities() === []) {
			throw new \Exception('Empty capabilities, unexpected result from ' . $this->capabilitiesService->getCapabilitiesEndpoint());
		}
		$output->writeln('<info>✓ Detected WOPI server: ' . $this->capabilitiesService->getServerProductName() . ' ' . $this->capabilitiesService->getProductVersion() . '</info>');
	}

	public function testCallback(OutputInterface $output): void {
		$url = $this->parser->getUrlSrcValue('Capabilities');
		if ($url === '') {
			// Fixme can we skip early if the collabora version does not have the wopiAccessCheck endpoint, maybe it can be exposed in discovery
			return;
		}

		$url = str_replace('/hosting/capabilities', '/hosting/wopiAccessCheck', $url);

		$callbackUrl = $this->urlGenerator->getAbsoluteURL('/status.php');

		$client = $this->clientService->newClient();
		try {
			$response = $client->post($url, [
				...RemoteOptionsService::getDefaultOptions(),
				'body' => json_encode([
					'callbackUrl' => $callbackUrl,
				]),
				'headers' => [
					'Content-Type' => 'application/json',
				],
			]);
			$result = json_decode($response->getBody(), true, 512, JSON_THROW_ON_ERROR);
			if ($result['status'] === 'CheckStatus::WopiHostNotAllowed') {
				throw new \Exception('WOPI host not allowed by Collabora');
			}
		} catch (Exception $e) {
			throw $e;
		}
		$output->writeln('<info>✓ URL Callback ok</info>');
	}

	/**
	 * Detect public URL of the WOPI server for setting CSP on Nextcloud
	 *
	 * This value is not meant to be set manually. If this turns out to be the wrong URL
	 * it is likely a misconfiguration on your WOPI server. Collabora will inherit the URL to use
	 * form the request and the ssl.enable/ssl.termination settings and server_name (if configured)
	 */
	public function autoConfigurePublicUrl(): void {
		$determinedUrl = $this->parser->getUrlSrcValue('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
		$detectedUrl = $this->appConfig->domainOnly($determinedUrl);
		$this->appConfig->setAppValue('public_wopi_url', $detectedUrl);
	}
}
