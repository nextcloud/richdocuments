<?php
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Backgroundjobs;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Service\CapabilitiesService;
use OCA\Richdocuments\Service\DiscoveryService;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\BackgroundJob\TimedJob;
use Psr\Log\LoggerInterface;

class ObtainCapabilities extends TimedJob {
	public function __construct(
		ITimeFactory $time,
		private LoggerInterface $logger,
		private CapabilitiesService $capabilitiesService,
		private DiscoveryService $discoveryService,
		private AppConfig $appConfig,
	) {
		parent::__construct($time);

		$this->setInterval(60 * 60);
	}

	protected function run($argument) {
		if (!$this->appConfig->getCollaboraUrlInternal()) {
			return;
		}

		try {
			$this->capabilitiesService->fetch();
		} catch (\Exception $e) {
			$this->logger->error('Failed to fetch capabilities: ' . $e->getMessage(), ['exception' => $e]);
		}

		try {
			$this->discoveryService->fetch();
		} catch (\Exception $e) {
			$this->logger->error('Failed to fetch discovery: ' . $e->getMessage(), ['exception' => $e]);
		}
	}
}
