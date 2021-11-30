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

use OCA\Richdocuments\Service\CapabilitiesService;
use OCA\Richdocuments\Service\InitialStateService;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\IConfig;
use OCP\Settings\ISettings;

class Personal implements ISettings {

	/** @var IConfig Config */
	private $config;

	/** @var CapabilitiesService */
	private $capabilitiesService;

	/** @var InitialStateService */
	private $initialState;

	/** @var string */
	private $userId;

	public function __construct(IConfig $config, CapabilitiesService $capabilitiesService, InitialStateService $initialStateService, $userId) {
		$this->config = $config;
		$this->capabilitiesService = $capabilitiesService;
		$this->initialState = $initialStateService;
		$this->userId = $userId;
	}

	/** @psalm-suppress InvalidNullableReturnType */
	public function getForm() {
		if (!$this->capabilitiesService->hasTemplateSaveAs() && !$this->capabilitiesService->hasTemplateSource()) {
			/** @psalm-suppress NullableReturnStatement */
			return null;
		}

		$this->initialState->provideCapabilities();
		return new TemplateResponse(
			'richdocuments',
			'personal',
			[
				'templateFolder' => $this->config->getUserValue($this->userId, 'richdocuments', 'templateFolder', '')
			],
			'blank'
		);
	}

	public function getSection() {
		if (!$this->capabilitiesService->hasTemplateSaveAs() && !$this->capabilitiesService->hasTemplateSource()) {
			return null;
		}

		return 'richdocuments';
	}

	public function getPriority() {
		return 0;
	}
}
