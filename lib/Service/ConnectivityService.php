<?php
/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Service;

use Exception;
use GuzzleHttp\Exception\ClientException;
use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\WOPI\Parser;
use OCP\Http\Client\IClientService;
use OCP\IL10N;
use OCP\IURLGenerator;
use Symfony\Component\Console\Output\OutputInterface;

class ConnectivityService {
	public function __construct(
		private AppConfig $appConfig,
		private DiscoveryService $discoveryService,
		private CapabilitiesService $capabilitiesService,
		private IClientService $clientService,
		private IURLGenerator $urlGenerator,
		private Parser $parser,
		private IL10N $l10n,
	) {
	}

	/**
	 * @throws Exception
	 */
	public function testDiscovery(?OutputInterface $output = null): void {
		$this->discoveryService->resetCache();
		$this->discoveryService->fetch();
		$output?->writeln('<info>✓ Fetched /hosting/discovery endpoint</info>');

		$this->parser->getUrlSrcValue('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
		$output?->writeln('<info>✓ Valid mimetype response</info>');

		// FIXME: Optional when allowing generic WOPI servers
		$this->parser->getUrlSrcValue('Capabilities');
		$output?->writeln('<info>✓ Valid capabilities entry</info>');
	}

	public function testCapabilities(?OutputInterface $output = null): void {
		$this->capabilitiesService->resetCache();
		$this->capabilitiesService->fetch();
		$output?->writeln('<info>✓ Fetched /hosting/capabilities endpoint</info>');

		if ($this->capabilitiesService->getCapabilities() === []) {
			throw new \Exception('Empty capabilities, unexpected result from ' . $this->capabilitiesService->getCapabilitiesEndpoint());
		}
		$output?->writeln('<info>✓ Detected WOPI server: ' . $this->capabilitiesService->getServerProductName() . ' ' . $this->capabilitiesService->getProductVersion() . '</info>');
	}

	public function testWopiAccess(?OutputInterface $output = null): void {
		$client = $this->clientService->newClient();

		if (!$this->capabilitiesService->hasWopiAccessCheck()) {
			return;
		}

		$url = str_replace('/hosting/capabilities', '/hosting/wopiAccessCheck', $this->capabilitiesService->getCapabilitiesEndpoint());
		$callbackUrl = $this->appConfig->getNextcloudUrl() ?: trim($this->urlGenerator->getAbsoluteURL(''), '/');

		try {
			$result = $client->post($url, ['body' => json_encode(['callbackUrl' => $callbackUrl . '/status.php']), 'headers' => ['Content-Type' => 'application/json']]);
		} catch (ClientException $e) {
			$result = $e->getResponse();
		}
		$response = json_decode($result->getBody(), true);

		$errorMessage = match ($response['status']) {
			'Ok' => null,
			'NotHttpSuccess' => $this->l10n->t('The connection was successful but the response to the request was not 200'),
			'HostNotFound' => $this->l10n->t('DNS error, the host is not known by the Collabora Online server'),
			'WopiHostNotAllowed' => $this->l10n->t('The host for this request is not allowed to be used as a WOPI Host, this is likely a configuration issue in coolwsd.xml'),
			'ConnectionAborted' => $this->l10n->t('The connection was aborted by the destination server'),
			'CertificateValidation' => $this->l10n->t('The certificate of the response is invalid or otherwise not accepted'),
			'SelfSignedCertificate' => $this->l10n->t('The certificate of the response is self-signed and not trusted by the system'),
			'ExpiredCertificate' => $this->l10n->t('The certificate of the response is expired'),
			'SslHandshakeFail' => $this->l10n->t('Couldn’t establish an SSL/TLS connection'),
			'MissingSsl' => $this->l10n->t('The response wasn’t using SSL/TLS contrary to expected'),
			'NotHttps' => $this->l10n->t('HTTPS is expected to connect to Collabora Online as the WOPI host uses it. This is necessary to prevent mixed content errors.'),
			'NoScheme' => $this->l10n->t('A scheme (http:// or https://) for the WOPI host URL must be specified'),
			'Timeout' => $this->l10n->t('The request didn’t get a response within the time frame allowed'),
			default => $this->l10n->t('Unknown error "%s". Check the server logs of Collabora for more details.', [$response['status']]),
		};

		if ($errorMessage) {
			throw new \Exception(
				$this->l10n->t('The Collabora server could not properly reach the Nextcloud server at %s', [$callbackUrl]) . ' ' . $errorMessage
			);
		}

		$output?->writeln('WOPI access was verified');
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

	/**
	 * @throws Exception
	 */
	public function test(?OutputInterface $output = null): void {
		$this->testDiscovery($output);
		$this->testCapabilities($output);
		$this->testWopiAccess($output);
	}
}
