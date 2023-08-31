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

use OCP\App\IAppManager;
use OCA\Richdocuments\Service\CapabilitiesService;
use OCP\Capabilities\ICapability;
use OCP\IL10N;

class Capabilities implements ICapability {

	const MIMETYPES = [
		'application/vnd.oasis.opendocument.text',
		'application/vnd.oasis.opendocument.spreadsheet',
		'application/vnd.oasis.opendocument.graphics',
		'application/vnd.oasis.opendocument.presentation',
		'application/vnd.oasis.opendocument.text-flat-xml',
		'application/vnd.oasis.opendocument.spreadsheet-flat-xml',
		'application/vnd.oasis.opendocument.graphics-flat-xml',
		'application/vnd.oasis.opendocument.presentation-flat-xml',
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
	/** @var PermissionManager */
	private $permissionManager;
	/** @var IAppManager */
	private $appManager;
	private ?string $userId = null;

	private $capabilities = null;

	public function __construct(IL10N $l10n, AppConfig $config, CapabilitiesService $capabilitiesService, PermissionManager $permissionManager, IAppManager $appManager, ?string $userId) {
		$this->l10n = $l10n;
		$this->config = $config;
		$this->capabilitiesService = $capabilitiesService;
		$this->permissionManager = $permissionManager;
		$this->appManager = $appManager;
		$this->userId = $userId;
	}

	public function getCapabilities() {
		// Only expose capabilities for users with enabled office or guests (where it depends on the share owner if they have access)
		if (!$this->permissionManager->isEnabledForUser() && $this->userId !== null) {
			return [];
		}

		if (!$this->capabilities) {
			$collaboraCapabilities = $this->capabilitiesService->getCapabilities();
			$filteredMimetypes = self::MIMETYPES;
			$optionalMimetypes = self::MIMETYPES_OPTIONAL;
			// If version is too old, draw is not supported
			if (!$this->capabilitiesService->hasDrawSupport()) {
				$filteredMimetypes = array_diff($filteredMimetypes, [
					'application/vnd.oasis.opendocument.graphics',
					'application/vnd.oasis.opendocument.graphics-flat-xml',
				]);
			}

			if (!$this->appManager->isEnabledForUser('files_pdfviewer')) {
				$filteredMimetypes[] = 'application/pdf';
				$optionalMimetypes = array_diff($optionalMimetypes, ['application/pdf']);
			}

			$this->capabilities = [
				'richdocuments' => [
					'version' => \OC::$server->getAppManager()->getAppVersion('richdocuments'),
					'mimetypes' => array_values($filteredMimetypes),
					'mimetypesNoDefaultOpen' => array_values($optionalMimetypes),
					'collabora' => $collaboraCapabilities,
					'direct_editing' => isset($collaboraCapabilities['hasMobileSupport']) && $this->config->getAppValue('mobile_editing') ?: false,
					'templates' => isset($collaboraCapabilities['hasTemplateSaveAs']) || isset($collaboraCapabilities['hasTemplateSource']) ?: false,
					'productName' => $this->capabilitiesService->getProductName(),
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
