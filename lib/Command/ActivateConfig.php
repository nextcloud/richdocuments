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
			->addOption('force', null, InputOption::VALUE_NONE,
						'Persist configuration even if connectivity or sanity checks fail')
			->setDescription('Activate config changes');
	}

	protected function execute(InputInterface $input, OutputInterface $output): int {
		try {
			if ($input->getOption('builtin')) {
				return $this->executeBuiltin($input, $output);
			}
			return $this->executeCustom($input, $output);
		} catch (\Exception $e) {
			$output->writeln('<error>Failed to activate any config changes</error>');
			$output->writeln($e->getMessage());
			$output->writeln($e->getTraceAsString());
			return 1;
		}
	}

	private function executeBuiltin(InputInterface $input, OutputInterface $output): int {
		$force = (bool)$input->getOption('force');

		// Validate preconditions before writing anything: getBuiltinServerUrl() checks OS/arch/installed
		$builtinUrl = $this->appConfig->getBuiltinServerUrl();
		if ($builtinUrl === null) {
			$output->writeln('<error>Built-in CODE server is not available.</error>');
			$output->writeln('<error>Check: richdocumentscode (or richdocumentscode_arm64) is installed,'
							 . ' OS is Linux, arch is x86_64 or aarch64.</error>');
			return 1;
        }

		// Validate public URL looks correct before writing anything.
		// For builtin, the public URL is always Nextcloud's own origin — derived
		// directly from IURLGenerator without requiring server_mode to be set yet.
    	$publicUrl = $this->appConfig->deriveBuiltinPublicUrl();

		// If the derived URL looks internal, overwrite.cli.url is probably wrong.
		// Fail fast with an actionable message rather than silently storing a broken value.
		// Often will be a false positive warning in test environments, but can be forced if necessary still.
		$host = parse_url($publicUrl, PHP_URL_HOST);
		$looksInternal = $host === 'localhost' || $host === '127.0.0.1' || str_ends_with($host, '.local');

		if ($looksInternal && !$force) {
			$output->writeln('<error>Derived public URL looks internal: ' . $publicUrl . '</error>');
			$output->writeln('<error>"overwrite.cli.url" in config.php must be set to your public Nextcloud URL.</error>');
			$output->writeln('<error>This is required for any occ command that generates absolute URLs.</error>');
			$output->writeln('<comment>To override and persist anyway: --force</comment>');
			return 1;
		}

		if ($looksInternal) {
			$output->writeln('<comment>⚠ Warning: public URL looks internal (' . $publicUrl . ').'
							 . ' Proceeding anyway due to --force.</comment>');
		}

		// Test connectivity against the derived URL directly; no config mutation needed.
        if (!$force) {
            try {
				$this->connectivityService->testUrl($builtinUrl, $output);
            } catch (\Throwable $e) {
				// Nothing was writtent o config; no rollback needed
                $output->writeln('<error>Failed to reach built-in CODE server: ' . $e->getMessage() . '</error>');
                $output->writeln('<comment>To configure without connectivity: --force</comment>');
                return 1;
            }
        }		

		// All checks passed (or --force). Now commit atomically.
        $this->appConfig->setAppValue(AppConfig::SERVER_MODE, 'builtin');
        $this->appConfig->setAppValue('disable_certificate_verification', 'yes');
        // Explicitly delete any previously stored wopi_url and public_wopi_url to avoid ambiguity.
        $this->appConfig->setAppValue(AppConfig::WOPI_URL, '');
        $this->appConfig->setAppValue(AppConfig::PUBLIC_WOPI_URL, '');

       if ($input->getOption('callback-url') !== null) {
            $callbackUrl = $input->getOption('callback-url');
            $this->appConfig->setAppValue(AppConfig::WOPI_CALLBACK_URL, $callbackUrl);
        } else {
            $this->appConfig->setAppValue(AppConfig::WOPI_CALLBACK_URL, '');
        }

		$output->writeln('<info>✓ Built-in CODE server configured successfully.</info>');
		$output->writeln('Built-in CODE URL (Nextcloud → CODE):  ' . $this->appConfig->getCollaboraUrlInternal());
		$output->writeln('Public URL (browser → CODE):           ' . $this->appConfig->getCollaboraUrlPublic());
		$callbackUrl = $this->appConfig->getNextcloudUrl();
		$output->writeln('Callback URL (Collabora → Nextcloud):  '
			. ($callbackUrl === '' ? 'autodetected' : $callbackUrl));

		return 0;
	}

    private function executeCustom(InputInterface $input, OutputInterface $output): int {
        $force = (bool)$input->getOption('force');

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

        if (!$force) {
            try {
                $this->connectivityService->testDiscovery($output);
            } catch (\Throwable $e) {
                $output->writeln('<error>Failed to fetch discovery endpoint from '
                    . $this->appConfig->getCollaboraUrlInternal() . '</error>');
                $output->writeln($e->getMessage());
                $output->writeln('<comment>To configure without connectivity: --force</comment>');
                return 1;
            }

            try {
                $this->connectivityService->testCapabilities($output);
            } catch (\Throwable $e) {
                $output->writeln('<error>Failed to fetch capabilities from '
                    . $this->capabilitiesService->getCapabilitiesEndpoint() . '</error>');
                $output->writeln($e->getMessage());
                $output->writeln('<comment>To configure without connectivity: --force</comment>');
                return 1;
            }

            try {
                $this->connectivityService->autoConfigurePublicUrl();
            } catch (\Throwable $e) {
                $output->writeln('<error>Failed to determine public URL from discovery response</error>');
                $output->writeln($e->getMessage());
                $output->writeln('<comment>To configure without connectivity: --force</comment>');
                return 1;
            }
        } else {
            $output->writeln('<comment>⚠ Skipping connectivity checks (--force).</comment>');
        }

        $output->writeln('');
        $output->writeln('Collabora URL (used for Nextcloud to contact the Collabora server):');
        $output->writeln('  ' . $this->appConfig->getCollaboraUrlInternal());
        $output->writeln('Collabora public URL (used in the browser to open Collabora):');
        $output->writeln('  ' . $this->appConfig->getCollaboraUrlPublic());
        $output->writeln('Callback URL (used by Collabora to connect back to Nextcloud):');
        $callbackUrl = $this->appConfig->getNextcloudUrl();
        $output->writeln($callbackUrl === ''
            ? '  autodetected (will use the same URL as your user for browsing Nextcloud)'
            : '  ' . $callbackUrl);

        return 0;
    }
}
