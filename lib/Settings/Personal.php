<?php
/**
 * @copyright Copyright (c) 2018, Roeland Jago Douma <roeland@famdouma.nl>
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

namespace OCA\Richdocuments\Settings;

use OCA\Richdocuments\Capabilities;
use OCA\Richdocuments\TemplateManager;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\IConfig;
use OCP\Settings\ISettings;

class Personal implements ISettings {

	private $config;
	private $userId;
	private $capabilities;

	public function __construct(IConfig $config, Capabilities $capabilities, $userId) {
		$this->config = $config;
		$this->capabilities = $capabilities->getCapabilities()['richdocuments'];
		$this->userId = $userId;
	}

	/**
	 * @return TemplateResponse
	 */
	public function getForm() {
		if (array_key_exists('templates', $this->capabilities) && $this->capabilities['templates'] === true) {
			return new TemplateResponse(
				'richdocuments',
				'personal',
				[
					'templateFolder' => $this->config->getUserValue($this->userId, 'richdocuments', 'templateFolder', '')
				],
				'blank'
			);
		}
	}
	/**
	 * @return string the section ID, e.g. 'sharing'
	 */
	public function getSection() {
		// Only show the personal section if templates are available
		if (array_key_exists('templates', $this->capabilities) && $this->capabilities['templates'] === true) {
			return 'richdocuments';
		}
	}
	/**
	 * @return int whether the form should be rather on the top or bottom of
	 * the admin section. The forms are arranged in ascending order of the
	 * priority values. It is required to return a value between 0 and 100.
	 *
	 * keep the server setting at the top, right after "server settings"
	 */
	public function getPriority() {
		return 0;
	}
}
