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


namespace OCA\RichDocuments\Migration;

use OCA\Richdocuments\TemplateManager;
use OCP\Migration\IRepairStep;
use OCP\Migration\IOutput;

class UpdateEmptyTemplates implements IRepairStep {


	/** @var TemplateManager */
	private $templateManager;

	public function __construct(TemplateManager $templateManager) {
		$this->templateManager = $templateManager;
	}

	/*
	 * @inheritdoc
	 */
	public function getName() {
		return 'Update empty template files';
	}

	/**
	 * @inheritdoc
	 */
	public function run(IOutput $output) {
		try {
			$this->templateManager->updateEmptyTemplates();
		} catch (\Exception $e) {
			$output->warning('Failed to update templates');
			$output->warning($e->getMessage());
			$output->warning($e->getTraceAsString());
		}
	}
}
