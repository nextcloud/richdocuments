<?php
/**
 * @copyright Copyright (c) 2016 Lukas Reschke <lukas@statuscode.ch>
 *
 * @author Lukas Reschke <lukas@statuscode.ch>
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

class Admin implements ISettings {

	/** @var IConfig */
	private $config;

	/** @var TemplateManager */
	private $manager;

	/** @var array */
	private $capabilities;

	/**
	 * Admin template settings
	 *
	 * @param IConfig $config
	 * @param TemplateManager $manager
	 * @param Capabilities $capabilities
	 */
	public function __construct(IConfig $config,
								TemplateManager $manager,
								Capabilities $capabilities) {
		$this->config  = $config;
		$this->manager = $manager;
		$this->capabilities = $capabilities->getCapabilities()['richdocuments'];
	}
	/**
	 * @return TemplateResponse
	 */
	public function getForm() {
		return new TemplateResponse(
			'richdocuments',
			'admin',
			[
				'wopi_url'           => $this->config->getAppValue('richdocuments', 'wopi_url'),
				'edit_groups'        => $this->config->getAppValue('richdocuments', 'edit_groups'),
				'use_groups'         => $this->config->getAppValue('richdocuments', 'use_groups'),
				'doc_format'         => $this->config->getAppValue('richdocuments', 'doc_format'),
				'external_apps'      => $this->config->getAppValue('richdocuments', 'external_apps'),
				'canonical_webroot'  => $this->config->getAppValue('richdocuments', 'canonical_webroot'),
				'disable_certificate_verification' => $this->config->getAppValue('richdocuments', 'disable_certificate_verification'),
				'templates'          => $this->manager->getSystemFormatted(),
				'templatesAvailable' => array_key_exists('templates', $this->capabilities) && $this->capabilities['templates']
			],
			'blank'
		);
	}
	/**
	 * @return string the section ID, e.g. 'sharing'
	 */
	public function getSection() {
		return 'richdocuments';
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
