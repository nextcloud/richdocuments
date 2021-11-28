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

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Service\CapabilitiesService;
use OCA\Richdocuments\Service\DemoService;
use OCA\Richdocuments\Service\InitialStateService;
use OCA\Richdocuments\TemplateManager;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\IConfig;
use OCP\Settings\ISettings;

class Admin implements ISettings {

	/** @var IConfig */
	private $config;

	/** @var AppConfig */
	private $appConfig;

	/** @var TemplateManager */
	private $manager;

	/** @var CapabilitiesService */
	private $capabilitiesService;

	/** @var DemoService */
	private $demoService;

	/** @var InitialStateService */
	private $initialState;

	public function __construct(
		IConfig             $config,
		AppConfig           $appConfig,
		TemplateManager     $manager,
		CapabilitiesService $capabilitiesService,
		DemoService         $demoService,
		InitialStateService $initialStateService
	) {
		$this->config  = $config;
		$this->appConfig = $appConfig;
		$this->manager = $manager;
		$this->capabilitiesService = $capabilitiesService;
		$this->demoService = $demoService;
		$this->initialState = $initialStateService;
	}

	public function getForm() {
		$this->initialState->provideCapabilities();
		return new TemplateResponse(
			'richdocuments',
			'admin',
			[
				'settings' => [
					'wopi_url'           => $this->config->getAppValue('richdocuments', 'wopi_url'),
					'wopi_allowlist'     => $this->config->getAppValue('richdocuments', 'wopi_allowlist'),
					'edit_groups'        => $this->config->getAppValue('richdocuments', 'edit_groups'),
					'use_groups'         => $this->config->getAppValue('richdocuments', 'use_groups'),
					'doc_format'         => $this->config->getAppValue('richdocuments', 'doc_format'),
					'external_apps'      => $this->config->getAppValue('richdocuments', 'external_apps'),
					'canonical_webroot'  => $this->config->getAppValue('richdocuments', 'canonical_webroot'),
					'disable_certificate_verification' => $this->config->getAppValue('richdocuments', 'disable_certificate_verification', '') === 'yes',
					'templates'          => $this->manager->getSystemFormatted(),
					'templatesAvailable' => $this->capabilitiesService->hasTemplateSaveAs() || $this->capabilitiesService->hasTemplateSource(),
					'settings' => $this->appConfig->getAppSettings(),
					'demo_servers' => $this->demoService->fetchDemoServers(),
					'web_server' => strtolower($_SERVER['SERVER_SOFTWARE']),
					'os_family' => PHP_VERSION_ID >= 70200 ? PHP_OS_FAMILY : PHP_OS,
					'platform' => php_uname('m')
				],
			],
			'blank'
		);
	}

	public function getSection() {
		return 'richdocuments';
	}

	public function getPriority() {
		return 0;
	}

}
