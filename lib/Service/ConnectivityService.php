<?php

namespace OCA\Richdocuments\Service;

use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\WOPI\Parser;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\IConfig;

class ConnectivityService {
	public const STATUS_OK = true;
	public const STATUS_FAILED = false;

	public function __construct(
		private DiscoveryService $discoveryService,
		private CapabilitiesService $capabilitiesService,
		private Parser $parser,
		private IConfig $config,
		private ITimeFactory $timeFactory
	) {
	}

	public function getStatus() {
		return [
			'configured' => $this->isConfigured(),
			'discovery' => $this->getDiscoveryStatus(),
			'capabilities' => $this->getCapabilitiesStatus(),
		];
	}

	public function getDiscoveryStatus(): array {
		return json_decode($this->config->getAppValue(Application::APPNAME, 'connectivity_discovery', '{}'), true);
	}

	public function isDiscoveryReachable(): bool {
		return ($this->getDiscoveryStatus()['status'] ?? self::STATUS_FAILED) === self::STATUS_OK;
	}

	public function getCapabilitiesStatus(): array {
		return json_decode($this->config->getAppValue(Application::APPNAME, 'connectivity_capabilities', '{}'), true);
	}

	public function isCapabilitiesReachable(): bool {
		return ($this->getCapabilitiesStatus()['status'] ?? self::STATUS_FAILED) === self::STATUS_OK;
	}

	public function isConfigured(): bool {
		return $this->config->getAppValue(Application::APPNAME, 'connectivity', 'no') === 'yes';
	}

	public function verifyConnection(bool $reconfigure = false): void {
		$configured = $this->config->getAppValue(Application::APPNAME, 'connectivity', 'no') === 'yes';
		$discoveryStatus = [];
		$capabilitiesStatus = [];

		if (!$configured && !$reconfigure) {
			// No need to verify anything yet
			return;
		}

		if ($reconfigure) {
			$this->config->deleteAppValue(Application::APPNAME, 'public_wopi_url');
			$this->discoveryService->clear();
			$this->capabilitiesService->clear();
		}

		try {
			$discoveryStatus['last_checked'] = $this->timeFactory->getTime();
			$this->discoveryService->fetch();
			$discoveryStatus['status'] = self::STATUS_OK;
		} catch (\Exception $e) {
			$discoveryStatus['status'] = self::STATUS_FAILED;
			$discoveryStatus['message'] = $e->getMessage();
		}

		try {
			$this->parser->getUrlSrc('application/vnd.oasis.opendocument.text');
		} catch (\Exception $e) {
			$discoveryStatus['status'] = self::STATUS_FAILED;
			$discoveryStatus['message'] = $e->getMessage();
		}

		if ($discoveryStatus['status'] === self::STATUS_OK) {
			try {
				$capabilitiesStatus['last_checked'] = $this->timeFactory->getTime();
				$this->capabilitiesService->fetch();
				$capabilitiesStatus['status'] = self::STATUS_OK;
			} catch (\Exception $e) {
				$capabilitiesStatus['status'] = self::STATUS_FAILED;
				$capabilitiesStatus['message'] = $e->getMessage();
			}
		}

		// If we verify connection for the first time passing, set as configured
		$configured = $configured || $discoveryStatus['status'] === self::STATUS_OK;

		$this->config->setAppValue(Application::APPNAME, 'connectivity', $configured ? 'yes' : 'no');
		$this->config->setAppValue(Application::APPNAME, 'connectivity_discovery', json_encode($discoveryStatus));
		$this->config->setAppValue(Application::APPNAME, 'connectivity_capabilities', json_encode($capabilitiesStatus));
	}

	public function reset(): void {
		$this->config->deleteAppValue(Application::APPNAME, 'connectivity');
		$this->config->deleteAppValue(Application::APPNAME, 'connectivity_discovery');
		$this->config->deleteAppValue(Application::APPNAME, 'connectivity_capabilities');
	}
}
