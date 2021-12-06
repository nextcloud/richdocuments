<?php

namespace OCA\Richdocuments\Service;

use Exception;
use OCA\Richdocuments\AppConfig;
use OCP\App\IAppManager;
use OCP\Http\Client\IClientService;
use OCP\IURLGenerator;

class BuiltInProxyService {

	/** @var IClientService */
	private $clientService;
	/** @var AppConfig */
	private $appConfig;
	/** @var IURLGenerator */
	private $urlGenerator;
	/** @var IAppManager */
	private $appManager;

	public function __construct(IClientService $clientService, AppConfig $appConfig, IURLGenerator $urlGenerator, IAppManager $appManager) {
		$this->clientService = $clientService;
		$this->appConfig = $appConfig;
		$this->urlGenerator = $urlGenerator;
		$this->appManager = $appManager;
	}

	public function checkAndEnableCODEServer(): bool {
		// Supported only on Linux OS, and x86_64 & ARM64 platforms
		$supportedArchitectures = ['x86_64', 'aarch64'];
		$osFamily = PHP_VERSION_ID >= 70200 ? PHP_OS_FAMILY : PHP_OS;
		if ($osFamily !== 'Linux' || !in_array(php_uname('m'), $supportedArchitectures))
			return false;

		$CODEAppID = (php_uname('m') === 'x86_64') ? 'richdocumentscode' : 'richdocumentscode_arm64';

		if ($this->appManager->isEnabledForUser($CODEAppID)) {
			$wopi_url = $this->appConfig->getAppValue('wopi_url');
			$isCODEEnabled = strpos($wopi_url, 'proxy.php?req=') !== false;

			// Check if we have the wopi_url set to custom currently
			if ($wopi_url !== null && $wopi_url !== '' && $isCODEEnabled === false) {
				return false;
			}

			$relativeUrl = $this->urlGenerator->linkTo($CODEAppID, '') . 'proxy.php';
			$absoluteUrl = $this->urlGenerator->getAbsoluteURL($relativeUrl);
			$new_wopi_url = $absoluteUrl . '?req=';

			// Check if the wopi url needs to be updated
			if ($isCODEEnabled && $wopi_url === $new_wopi_url) {
				return false;
			}

			// Wait some time for the proxy to come up before applying the config
			for ($i=0; $i<10; $i++) {
				if ($this->isProxyStarting($new_wopi_url)) {
					sleep(1);
					continue;
				}

				break;
			}

			$this->appConfig->setAppValue('wopi_url', $new_wopi_url);
			$this->appConfig->setAppValue('disable_certificate_verification', 'yes');

			return true;
		}

		return false;
	}

	/**
	 * @return boolean indicating if proxy.php is in initialize or false otherwise
	 */
	public function isProxyStarting($url): bool {
		$proxyStatus = $this->getProxyStatus($url);
		return $proxyStatus === 'starting'
			|| $proxyStatus === 'stopped'
			|| $proxyStatus === 'restarting';
	}

	private function getProxyStatus($url): string {
		$proxyPos = strrpos($url, 'proxy.php');
		$usesProxy = $proxyPos !== false;

		if ($usesProxy) {
			$statusUrl = substr($url, 0, $proxyPos);
			$statusUrl = $statusUrl . 'proxy.php?status';

			$client = $this->clientService->newClient();
			$options = ['timeout' => 5, 'nextcloud' => ['allow_local_address' => true]];

			if ($this->appConfig->getAppValue('disable_certificate_verification') === 'yes') {
				$options['verify'] = false;
			}

			try {
				$response = $client->get($statusUrl, $options);

				if ($response->getStatusCode() === 200) {
					$body = json_decode($response->getBody(), true);
					return $body['status'] ?? 'error';
				}
			} catch (Exception $e) {
			}
			return 'error';
		}

		return '';
	}
}
