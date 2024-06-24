<?php
/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Service;

use Exception;
use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\WOPI\Parser;
use Symfony\Component\Console\Output\OutputInterface;

class ConnectivityService {
	public function __construct(
		private AppConfig $appConfig,
		private DiscoveryService $discoveryService,
		private CapabilitiesService $capabilitiesService,
		private Parser $parser,
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
