<?php
/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Command;

use OCA\Richdocuments\Service\FontService;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class InstallDefaultFonts extends Command {
	public function __construct(
		private FontService $fontService,
	) {
		parent::__construct();
	}

	protected function configure() {
		$this
			->setName('richdocuments:install-fonts')
			->setDescription('Install default fonts');
	}

	protected function execute(InputInterface $input, OutputInterface $output) {
		try {
			$this->fontService->installDefaultFonts();
			return 0;
		} catch (\Exception $e) {
			$output->writeln('<error>Failed to install default fonts</error>');
			$output->writeln($e->getMessage());
			$output->writeln($e->getTraceAsString());
			return 1;
		}
	}
}
