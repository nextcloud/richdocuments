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


namespace OCA\Richdocuments\Command;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Service\CapabilitiesService;
use OCA\Richdocuments\Service\ConnectivityService;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class ActivateConfig extends Command {
	public function __construct(
		private AppConfig $appConfig,
		private ConnectivityService $connectivityService,
		private CapabilitiesService $capabilitiesService,
	) {
		parent::__construct();
	}

	protected function configure(): void {
		$this
			->setName('richdocuments:activate-config')
			->setAliases(['richdocuments:setup'])
			->addOption('wopi-url', 'w', InputOption::VALUE_REQUIRED, 'URL that the Nextcloud server will use to connect to Collabora', null)
			->addOption('callback-url', 'c', InputOption::VALUE_REQUIRED, 'URL that is passed to Collabora to connect back to Nextcloud', null)
			->setDescription('Activate config changes');
	}

	protected function execute(InputInterface $input, OutputInterface $output): int {
		try {
			if ($input->getOption('wopi-url') !== null) {
				$wopiUrl = $input->getOption('wopi-url');
				$this->appConfig->setAppValue(AppConfig::WOPI_URL, $wopiUrl);
				$output->writeln('<info>✓ Set WOPI url to ' . $wopiUrl . '</info>');
			}

			if ($input->getOption('callback-url') !== null) {
				$callbackUrl = $input->getOption('callback-url');
				$this->appConfig->setAppValue(AppConfig::WOPI_CALLBACK_URL, $callbackUrl);
				$output->writeln('<info>✓ Set callback url to ' . $callbackUrl . '</info>');
			} else {
				$this->appConfig->setAppValue(AppConfig::WOPI_CALLBACK_URL, '');
				$output->writeln('<info>✓ Reset callback url autodetect</info>');
			}

			$output->writeln('Checking configuration');
			$output->writeln('🛈 Configured WOPI URL: ' . $this->appConfig->getCollaboraUrlInternal());
			$output->writeln('🛈 Configured public WOPI URL: ' . $this->appConfig->getCollaboraUrlPublic());
			$output->writeln('🛈 Configured callback URL: ' . $this->appConfig->getNextcloudUrl());
			$output->writeln('');

			try {
				$this->connectivityService->testDiscovery($output);
			} catch (\Throwable $e) {
				$output->writeln('<error>Failed to fetch discovery endpoint from ' . $this->appConfig->getCollaboraUrlInternal());
				$output->writeln($e->getMessage());
				return 1;
			}

			try {
				$this->connectivityService->testCapabilities($output);
			} catch (\Throwable $e) {
				// FIXME: Optional when allowing generic WOPI servers
				$output->writeln('<error>Failed to fetch capabilities endpoint from ' . $this->capabilitiesService->getCapabilitiesEndpoint());
				$output->writeln($e->getMessage());
				return 1;
			}

			try {
				$this->connectivityService->autoConfigurePublicUrl();
			} catch (\Throwable $e) {
				$output->writeln('<error>Failed to determine public URL from discovery response</error>');
				$output->writeln($e->getMessage());
				return 1;
			}

			// Summarize URLs for easier debugging

			$output->writeln('');
			$output->writeln('Collabora URL (used for Nextcloud to contact the Collabora server):');
			$output->writeln('  ' . $this->appConfig->getCollaboraUrlInternal());

			$output->writeln('Collabora public URL (used in the browser to open Collabora):');
			$output->writeln('  ' . $this->appConfig->getCollaboraUrlPublic());

			$output->writeln('Callback URL (used by Collabora to connect back to Nextcloud):');
			$callbackUrl = $this->appConfig->getNextcloudUrl();
			if ($callbackUrl === '') {
				$output->writeln('  autodetected (will use the same URL as your user for browsing Nextcloud)');
			} else {
				$output->writeln('  ' . $this->appConfig->getNextcloudUrl());
			}

			return 0;
		} catch (\Exception $e) {
			$output->writeln('<error>Failed to activate any config changes</error>');
			$output->writeln($e->getMessage());
			$output->writeln($e->getTraceAsString());
			return 1;
		}
	}
}
