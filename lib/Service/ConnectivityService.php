<?php
/**
 * @copyright Copyright (c) 2023 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
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
		$this->discoveryService->fetchFromRemote();
		$output->writeln('<info>✓ Fetched /hosting/discovery endpoint</info>');

		$this->parser->getUrlSrcValue('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
		$output->writeln('<info>✓ Valid mimetype response</info>');

		// FIXME: Optional when allowing generic WOPI servers
		if ($this->hasCapabilities()) {
			$output->writeln('<info>✓ Valid capabilities entry</info>');
		}
	}

	public function hasCapabilities() : bool {
		try {
			return $this->parser->getUrlSrcValue('Capabilities') !== '';
		} catch (\Throwable) {
			return false;
		}
	}

	public function testCapabilities(OutputInterface $output): void {
		$this->capabilitiesService->resetCache();
		$this->capabilitiesService->fetchFromRemote(true);
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
		if ($detectedUrl === '') {
			$determinedUrl = $this->parser->getUrlSrcByExtension('internal-http', 'docx', 'edit');
			$detectedUrl = $this->appConfig->domainOnly($determinedUrl);
		}
		$this->appConfig->setAppValue('public_wopi_url', $detectedUrl);
	}
}
