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
			->addOption('wopi-url', 'w', InputOption::VALUE_REQUIRED,
						'URL that Nextcloud will use to connect to Collabora', null)
			->addOption('builtin', null, InputOption::VALUE_NONE,
						'Configure the built-in CODE server (richdocumentscode app must be installed)')
			->addOption('callback-url', 'c', InputOption::VALUE_REQUIRED,
						'URL that is passed to Collabora to connect back to Nextcloud', null)
			->setDescription('Activate config changes');
	}

	protected function execute(InputInterface $input, OutputInterface $output): int {
		try {
			if ($input->getOption('builtin')) {
				return $this->executeBuiltin($input, $output);
			}
			
			if ($input->getOption('wopi-url') !== null) {
				$wopiUrl = $input->getOption('wopi-url');
				$this->appConfig->setAppValue(AppConfig::WOPI_URL, $wopiUrl);
				$this->appConfig->setAppValue(AppConfig::SERVER_MODE, 'custom');
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
				$output->writeln('<error>Failed to fetch discovery endpoint from ' . $this->appConfig->getCollaboraUrlInternal() . '</error>');
				$output->writeln($e->getMessage());
				return 1;
			}

			try {
				$this->connectivityService->testCapabilities($output);
			} catch (\Throwable $e) {
				$output->writeln('<error>Failed to fetch capabilities endpoint from ' . $this->capabilitiesService->getCapabilitiesEndpoint() . '</error>');
				$output->writeln($e->getMessage());
				return 1;
			}

			try {
				// For custom servers, derives public_wopi_url from discovery urlsrc
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
				$output->writeln('  autodetected (will use the same URL as your users for browsing Nextcloud)');
			} else {
				$output->writeln('  ' . $callbackUrl);
			}

			return 0;
		} catch (\Exception $e) {
			$output->writeln('<error>Failed to activate any config changes</error>');
			$output->writeln($e->getMessage());
			$output->writeln($e->getTraceAsString());
			return 1;
		}
	}

	private function executeBuiltin(InputInterface $input, OutputInterface $output): int {
		// getBuiltinServerUrl() already checks OS/arch/installed
		$builtinUrl = $this->appConfig->getBuiltinServerUrl();
		if ($builtinUrl === null) {
			$output->writeln('<error>Built-in CODE server is not available.</error>');
			$output->writeln('<error>Check: richdocumentscode (or richdocumentscode_arm64) is installed,'
							 . ' OS is Linux, arch is x86_64 or aarch64.</error>');
			return 1;
        }

		$this->appConfig->setAppValue(AppConfig::WOPI_URL, $builtinUrl);
		$this->appConfig->setAppValue(AppConfig::SERVER_MODE, 'builtin');
		$this->appConfig->setAppValue('disable_certificate_verification', 'yes');
		$output->writeln('<info>✓ Configured built-in CODE server</info>');

		// Derive public_wopi_url from IURLGenerator -- same source, same result as HTTP context,
		// provided overwrite.cli.url is correctly set (a standard Nextcloud requirement).
		// For builtin, public_wopi_url is simply Nextcloud's own public origin.
        $publicUrl = $this->appConfig->getCollaboraUrlPublic(); // delegates to IURLGenerator for builtin

		// Sanity check: if the derived URL looks internal, overwrite.cli.url is probably wrong.
		// Fail fast with an actionable message rather than silently storing a broken value.
		// Often be a false positive warning in test environments.
		$host = parse_url($publicUrl, PHP_URL_HOST);
		if ($host === 'localhost' || $host === '127.0.0.1' || str_ends_with($host, '.local')) {
			$output->writeln('<error>Derived public URL looks internal: ' . $publicUrl . '</error>');
			$output->writeln('<error>Is "overwrite.cli.url" set correctly in config.php?</error>');
			$output->writeln('<error>This is required for any occ command that generates absolute URLs.</error>');
			// TODO: Roll back unless forced: don't leave a broken server_mode=builtin with an internal public URL
			// $this->appConfig->setAppValue(AppConfig::SERVER_MODE, '');
			// return 1;
		}

		$output->writeln('');
		$output->writeln('Built-in CODE URL (Nextcloud → CODE, server-side):');
		$output->writeln('  ' . $builtinUrl);
		$output->writeln('Public URL (browser → CODE, via Nextcloud proxy):');
		$output->writeln('  ' . $publicUrl);

		// Test internal connectivity (server-to-server via proxy.php — valid in CLI context)
		try {
			$this->connectivityService->testDiscovery($output);
		} catch (\Throwable $e) {
			$output->writeln('<error>Failed to reach built-in CODE server internally: '
							 . $e->getMessage() . '</error>');
			// TODO: don't rollback if forced
			$this->appConfig->setAppValue(AppConfig::SERVER_MODE, '');
			return 1;
		}

		try {
			$this->connectivityService->testCapabilities($output);
		} catch (\Throwable $e) {
			$output->writeln('<error>Failed to fetch capabilities from built-in CODE server: '
							 . $e->getMessage() . '</error>');
			$this->appConfig->setAppValue(AppConfig::SERVER_MODE, '');
			return 1;
		}

		// autoConfigurePublicUrl() is intentionally not called here:
		// it is a no-op for builtin (see ConnectivityService), and public_wopi_url
		// is derived dynamically by AppConfig::getCollaboraUrlPublic() for builtin mode.

		if ($input->getOption('callback-url') !== null) {
			$callbackUrl = $input->getOption('callback-url');
			$this->appConfig->setAppValue(AppConfig::WOPI_CALLBACK_URL, $callbackUrl);
			$output->writeln('<info>✓ Set callback url to ' . $callbackUrl . '</info>');
		} else {
			$this->appConfig->setAppValue(AppConfig::WOPI_CALLBACK_URL, '');
			$output->writeln('<info>✓ Callback URL: autodetect</info>');
		}

		$output->writeln('');
		$output->writeln('<info>✓ Built-in CODE server configured successfully.</info>');

		return 0;
	}
}
