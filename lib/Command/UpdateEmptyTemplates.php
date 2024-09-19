<?php
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */


namespace OCA\Richdocuments\Command;

use OCA\Richdocuments\TemplateManager;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class UpdateEmptyTemplates extends Command {
	public function __construct(
		private TemplateManager $templateManager,
	) {
		parent::__construct();
	}

	protected function configure() {
		$this
			->setName('richdocuments:update-empty-templates')
			->setDescription('Update empty template files');
	}

	protected function execute(InputInterface $input, OutputInterface $output) {
		try {
			$this->templateManager->updateEmptyTemplates();
			$output->writeln('<info>Empty template files were updated</info>');
			return 0;
		} catch (\Exception $e) {
			$output->writeln('<error>Failed to update templates</error>');
			$output->writeln($e->getMessage());
			$output->writeln($e->getTraceAsString());
			return 1;
		}
	}
}
