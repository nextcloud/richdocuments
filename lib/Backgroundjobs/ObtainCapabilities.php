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

use OC\BackgroundJob\TimedJob;
use OCA\Richdocuments\Service\CapabilitiesService;

class ObtainCapabilities extends TimedJob {

	/** @var CapabilitiesService */
	private $capabilitiesService;

	public function __construct(CapabilitiesService $capabilitiesService) {
		$this->capabilitiesService = $capabilitiesService;

		$this->setInterval(60*60);
	}

	protected function run($argument) {
		$this->capabilitiesService->refetch();
	}
}
