<?php
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Backgroundjobs;

use OCA\Richdocuments\Service\CapabilitiesService;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\BackgroundJob\TimedJob;

class ObtainCapabilities extends TimedJob {
	/** @var CapabilitiesService */
	private $capabilitiesService;

	public function __construct(ITimeFactory $time, CapabilitiesService $capabilitiesService) {
		parent::__construct($time);
		$this->capabilitiesService = $capabilitiesService;

		$this->setInterval(60 * 60);
	}

	protected function run($argument) {
		$this->capabilitiesService->fetchFromRemote();
	}
}
