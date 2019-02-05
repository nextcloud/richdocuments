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

namespace OCA\Richdocuments;

use OCP\AppFramework\Utility\ITimeFactory;
use OCP\Capabilities\ICapability;
use OCP\Files\IAppData;
use OCP\Files\NotFoundException;
use OCP\Files\SimpleFS\ISimpleFolder;
use OCP\Http\Client\IClientService;
use OCP\IConfig;
use OCP\IURLGenerator;

class Capabilities implements ICapability {

	/** @var ISimpleFolder */
	private $appData;

	/**
	 * Capabilities constructor.
	 *
	 * @param IAppData $appData
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function __construct(IAppData $appData) {
		try {
			$this->appData = $appData->getFolder('richdocuments');
		} catch (NotFoundException $e) {
			$this->appData = $appData->newFolder('richdocuments');
		}
	}

	public function getCapabilities() {
		$collaboraCapabilities = $this->getCollaboraCapabilities();
		return [
			'richdocuments' => [
				'mimetypes' => [
					'application/vnd.oasis.opendocument.text',
					'application/vnd.oasis.opendocument.spreadsheet',
					'application/vnd.oasis.opendocument.presentation',
					'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
					'application/vnd.openxmlformats-officedocument.presentationml.presentation',
				],
				'collabora' => $collaboraCapabilities,
				'direct_editing' => isset($collaboraCapabilities['hasMobileSupport']) ? : false,
				'templates' => isset($collaboraCapabilities['hasTemplateSaveAs']) ? : false,
			],
		];
	}

	/**
	 * @return array
	 * @throws \OCP\Files\NotPermittedException
	 */
	private function getCollaboraCapabilities() {
		try {
			$file = $this->appData->getFile('capabilities.json');
			$decodedFile = \json_decode($file->getContent(), true);
		} catch (NotFoundException $e) {
			return [];
		}

		if (!is_array($decodedFile)) {
			return [];
		}

		return $decodedFile;
	}
}
