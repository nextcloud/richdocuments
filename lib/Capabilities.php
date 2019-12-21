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

namespace OCA\Wopi;

use OCP\AppFramework\Utility\ITimeFactory;
use OCP\Capabilities\ICapability;
use OCP\Files\IAppData;
use OCP\Files\NotFoundException;
use OCP\Files\SimpleFS\ISimpleFolder;
use OCP\Http\Client\IClientService;
use OCP\IConfig;
use OCP\IL10N;
use OCP\IURLGenerator;

class Capabilities implements ICapability {

	const MIMETYPES = [
		'application/vnd.oasis.opendocument.text',
		'application/vnd.oasis.opendocument.spreadsheet',
		'application/vnd.oasis.opendocument.graphics',
		'application/vnd.oasis.opendocument.presentation',
		'application/vnd.lotus-wordpro',
		'application/vnd.visio',
		'application/vnd.wordperfect',
		'application/msonenote',
		'application/msword',
		'application/rtf',
		'text/rtf',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
		'application/vnd.ms-word.document.macroEnabled.12',
		'application/vnd.ms-word.template.macroEnabled.12',
		'application/vnd.ms-excel',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
		'application/vnd.ms-excel.sheet.macroEnabled.12',
		'application/vnd.ms-excel.template.macroEnabled.12',
		'application/vnd.ms-excel.addin.macroEnabled.12',
		'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
		'application/vnd.ms-powerpoint',
		'application/vnd.openxmlformats-officedocument.presentationml.presentation',
		'application/vnd.openxmlformats-officedocument.presentationml.template',
		'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
		'application/vnd.ms-powerpoint.addin.macroEnabled.12',
		'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
		'application/vnd.ms-powerpoint.template.macroEnabled.12',
		'application/vnd.ms-powerpoint.slideshow.macroEnabled.12',
		'text/csv'
	];

	const MIMETYPES_OPTIONAL = [
		'image/svg+xml',
		'application/pdf',
		'text/plain',
		'text/spreadsheet'
	];

	/** @var ISimpleFolder */
	private $appData;

	/** @var IL10N */
	private $l10n;

	/**
	 * Capabilities constructor.
	 *
	 * @param IAppData $appData
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function __construct(IAppData $appData, IL10N $l10n) {
		$this->l10n = $l10n;
		try {
			$this->appData = $appData->getFolder('wopi');
		} catch (NotFoundException $e) {
			$this->appData = $appData->newFolder('wopi');
		}
	}

	public function getCapabilities() {
		$collaboraCapabilities = $this->getCollaboraCapabilities();
		return [
			'wopi' => [
				'mimetypes' => self::MIMETYPES,
				'mimetypesNoDefaultOpen' => self::MIMETYPES_OPTIONAL,
				'collabora' => $collaboraCapabilities,
				'direct_editing' => isset($collaboraCapabilities['hasMobileSupport']) ? : false,
				'templates' => isset($collaboraCapabilities['hasTemplateSaveAs']) || isset($collaboraCapabilities['hasTemplateSource']) ? : false,
				'productName' => isset($collaboraCapabilities['productName']) ? $collaboraCapabilities['productName'] : $this->l10n->t('Collabora Online'),
			],
		];
	}

	/**
	 * TODO: use CapabilitiesService
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
