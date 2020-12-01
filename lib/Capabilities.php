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

use OCA\Richdocuments\Service\CapabilitiesService;
use OCP\Capabilities\ICapability;
use OCP\IL10N;

class Capabilities implements ICapability {

	const MIMETYPES = [
		'application/vnd.oasis.opendocument.text',
		'application/vnd.oasis.opendocument.spreadsheet',
		'application/vnd.oasis.opendocument.graphics',
		'application/vnd.oasis.opendocument.presentation',
		'application/vnd.lotus-wordpro',
		'application/vnd.visio',
		'application/vnd.ms-visio.drawing',
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

	/** @var IL10N */
	private $l10n;
	/** @var AppConfig */
	private $config;
	/** @var CapabilitiesService */
	private $capabilitiesService;

	private $capabilities = null;

	public function __construct(IL10N $l10n, AppConfig $config, CapabilitiesService $capabilitiesService) {
		$this->l10n = $l10n;
		$this->config = $config;
		$this->capabilitiesService = $capabilitiesService;
	}

	public function getCapabilities() {
		if (!$this->capabilities) {
			$collaboraCapabilities = $this->capabilitiesService->getCapabilities();
			$this->capabilities = [
				'richdocuments' => [
					'version' => \OC::$server->getAppManager()->getAppVersion('richdocuments'),
					'mimetypes' => self::MIMETYPES,
					'mimetypesNoDefaultOpen' => self::MIMETYPES_OPTIONAL,
					'collabora' => $collaboraCapabilities,
					'direct_editing' => isset($collaboraCapabilities['hasMobileSupport']) ?: false,
					'templates' => isset($collaboraCapabilities['hasTemplateSaveAs']) || isset($collaboraCapabilities['hasTemplateSource']) ?: false,
					'productName' => isset($collaboraCapabilities['productName']) ? $collaboraCapabilities['productName'] : $this->l10n->t('Collabora Online'),
					'config' => [
						'wopi_url' => $this->config->getAppValue('wopi_url'),
						'public_wopi_url' => $this->config->getAppValue('public_wopi_url'),
						'disable_certificate_verification' => $this->config->getAppValue('disable_certificate_verification'),
						'edit_groups' => $this->config->getAppValue('edit_groups'),
						'use_groups' => $this->config->getAppValue('use_groups'),
						'doc_format' => $this->config->getAppValue('doc_format'),
						'timeout' => $this->config->getAppValue('timeout'),

					]
				],
			];
		}
		return $this->capabilities;
	}
}
