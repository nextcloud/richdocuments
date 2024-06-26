<?php
/**
 * @copyright Copyright (c) 2019, Roeland Jago Douma <roeland@famdouma.nl>
 *
 * @author Roeland Jago Douma <roeland@famdouma.nl>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
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
