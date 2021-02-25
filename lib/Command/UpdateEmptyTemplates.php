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

use OCA\Richdocuments\TemplateManager;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class UpdateEmptyTemplates extends Command {

	/** @var TemplateManager */
	private $templateManager;

	public function __construct(TemplateManager $templateManager) {
		$this->templateManager = $templateManager;
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
