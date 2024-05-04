<?php
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
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
