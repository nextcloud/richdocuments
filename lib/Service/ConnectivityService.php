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
	 * Test discovery and capabilities reachability against an explicit URL.
	 * Used when the URL to test has not yet been committed to config — avoids
	 * the need to transiently mutate server_mode just to resolve the right URL.
	 */
	public function testUrl(string $wopiUrl, OutputInterface $output): void {
    	// Temporarily override the URL for the duration of this test by driving
    	// DiscoveryService and CapabilitiesService directly with the given URL,
    	// rather than going through AppConfig.
    	$previousUrl = $this->appConfig->getAppValue(AppConfig::WOPI_URL);
    	$previousMode = $this->appConfig->getServerMode();

	    // Write only the raw wopi_url key — not server_mode — so AppConfig's
    	// getCollaboraUrlInternal() custom path (builtin vs stored) is bypassed
    	// and the explicit URL is used directly.
    	$this->appConfig->setAppValue(AppConfig::WOPI_URL, $wopiUrl);

    	try {
        	$this->testDiscovery($output);
        	$this->testCapabilities($output);
    	} finally {
        	// Always restore, whether the test passed or threw
        	$this->appConfig->setAppValue(AppConfig::WOPI_URL, $previousUrl);
    	}
	}

	/**
	 * Detect public URL of the WOPI server for setting CSP on Nextcloud.
	 *
	 * This value is not meant to be set manually. If this turns out to be the wrong URL
	 * it is likely a misconfiguration either of the Collabora (i.e. server_name) or
	 * Nextcloud itself (i.e. overwrite.cli.url).
	 *
	 * Skipped for the built-in CODE server: public_wopi_url for builtin is always
	 * Nextcloud's own public origin, derived directly from IURLGenerator in AppConfig.
	 * Running discovery-based detection server-side would be redundant and would produce
	 * incorrect results in CLI context where overwrite.cli.url may differ from the
	 * public-facing URL that CODE's ProxyPrefix would return to a browser.
	 *
	 * For standalone Collabora, server_name in coolwsd.xml makes urlsrc deterministic
	 * regardless of request context, so server-side detection remains appropriate.
	 */
	public function autoConfigurePublicUrl(): void {
		if ($this->appConfig->isBuiltinServer()) {
			return;
		}
		$determinedUrl = $this->parser->getUrlSrcValue(
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
		);
		$detectedUrl = $this->appConfig->domainOnly($determinedUrl);
		$this->appConfig->setAppValue('public_wopi_url', $detectedUrl);
	}
}
