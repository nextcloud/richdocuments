<?php
/**
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
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
 *
 */


namespace OCA\RichDocuments\Command;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Service\CapabilitiesService;
use OCA\Richdocuments\TemplateManager;
use OCA\Richdocuments\WOPI\DiscoveryManager;
use OCA\Richdocuments\WOPI\Parser;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ActivateConfig extends Command {

	/** @var AppConfig */
	private $appConfig;

	/** @var CapabilitiesService */
	private $capabilitiesService;

	/** @var DiscoveryManager  */
	private $discoveryManager;

	/** @var Parser */
	private $wopiParser;

	public function __construct(AppConfig $appConfig, CapabilitiesService $capabilitiesService, DiscoveryManager $discoveryManager, Parser $wopiParser) {
		parent::__construct();

		$this->appConfig = $appConfig;
		$this->capabilitiesService = $capabilitiesService;
		$this->discoveryManager = $discoveryManager;
		$this->wopiParser = $wopiParser;
	}

	protected function configure() {
		$this
			->setName('richdocuments:activate-config')
			->setDescription('Activate config changes');
	}

	protected function execute(InputInterface $input, OutputInterface $output) {
		try {
			$this->discoveryManager->refetch();
			$this->capabilitiesService->clear();
			$capaUrlSrc = $this->wopiParser->getUrlSrc('Capabilities');
			if (is_array($capaUrlSrc) && $capaUrlSrc['action'] === 'getinfo') {
				$public_wopi_url = str_replace('/hosting/capabilities', '', $capaUrlSrc['urlsrc']);
				if ($public_wopi_url !== null) {
					$this->appConfig->setAppValue('public_wopi_url', $public_wopi_url);
				}
			}
			$this->capabilitiesService->clear();
			$this->capabilitiesService->refetch();
			$output->writeln('<info>Activated any config changes</info>');
			return 0;
		} catch (\Exception $e) {
			$output->writeln('<error>Failed to activate any config changes</error>');
			$output->writeln($e->getMessage());
			$output->writeln($e->getTraceAsString());
			return 1;
		}
	}

}
