<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments;

use OCA\Richdocuments\Service\CapabilitiesService;
use OCP\App\IAppManager;
use OCP\Capabilities\ICapability;
use OCP\IURLGenerator;

class Capabilities implements ICapability {
	public const MIMETYPES = [
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
		'application/rtf',
		'application/vnd.oasis.opendocument.text-template',
		'application/vnd.oasis.opendocument.spreadsheet-template',
		'application/vnd.oasis.opendocument.presentation-template',
		'text/rtf',
		'application/x-iwork-pages-sffpages',
		'application/x-iwork-numbers-sffnumbers',
		'application/x-iwork-keynote-sffkey',
	];

	public const MIMETYPES_MSOFFICE = [
		'application/msonenote',
		'application/msword',
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
		'text/csv',
	];

	public const MIMETYPES_OPTIONAL = [
		'image/svg+xml',
		'application/pdf',
		'text/plain',
		'text/spreadsheet',
	];

	public const SECURE_VIEW_ADDITIONAL_MIMES = [
		'image/jpeg',
		'image/svg+xml',
		'image/cgm',
		'image/vnd.dxf',
		'image/x-emf',
		'image/x-wmf',
		'image/x-wpg',
		'image/x-freehand',
		'image/bmp',
		'image/png',
		'image/gif',
		'image/tiff',
		'image/jpg',
		'image/jpeg',
		'text/plain',
		'application/pdf',
	];

	private ?array $capabilities = null;

	public function __construct(
		private AppConfig $config,
		private CapabilitiesService $capabilitiesService,
		private PermissionManager $permissionManager,
		private IAppManager $appManager,
		private ?string $userId,
		private IURLGenerator $urlGenerator,
	) {
	}

	public function getCapabilities() {
		// Only expose capabilities for users with enabled office or guests (where it depends on the share owner if they have access)
		if (!$this->permissionManager->isEnabledForUser() && $this->userId !== null) {
			return [];
		}

		if (!$this->capabilities) {
			$collaboraCapabilities = $this->capabilitiesService->getCapabilities();

			$defaultMimetypes = self::MIMETYPES;
			$optionalMimetypes = self::MIMETYPES_OPTIONAL;

			if (!$this->capabilitiesService->hasOtherOOXMLApps()) {
				array_push($defaultMimetypes, ...self::MIMETYPES_MSOFFICE);
			} else {
				array_push($optionalMimetypes, ...self::MIMETYPES_MSOFFICE);
			}

			// If version is too old, draw is not supported
			if (!$this->capabilitiesService->hasDrawSupport()) {
				$defaultMimetypes = array_diff($defaultMimetypes, [
					'application/vnd.oasis.opendocument.graphics',
					'application/vnd.oasis.opendocument.graphics-flat-xml',
				]);
			}

			if (!$this->appManager->isEnabledForUser('files_pdfviewer')) {
				$defaultMimetypes[] = 'application/pdf';
				$optionalMimetypes = array_diff($optionalMimetypes, ['application/pdf']);
			}

			$this->capabilities = [
				'richdocuments' => [
					'version' => $this->appManager->getAppVersion('richdocuments'),
					'mimetypes' => array_values($defaultMimetypes),
					'mimetypesNoDefaultOpen' => array_values($optionalMimetypes),
					'mimetypesSecureView' => $this->config->useSecureViewAdditionalMimes() ? self::SECURE_VIEW_ADDITIONAL_MIMES : [],
					'collabora' => $collaboraCapabilities,
					'direct_editing' => ($collaboraCapabilities['hasMobileSupport'] ?? false) && $this->config->getAppValue('mobile_editing', 'yes') === 'yes',
					'templates' => ($collaboraCapabilities['hasTemplateSource'] ?? false),
					'productName' => $this->capabilitiesService->getProductName(),
					'editonline_endpoint' => $this->urlGenerator->linkToRouteAbsolute('richdocuments.document.editOnline'),
					'config' => [
						'wopi_url' => $this->config->getCollaboraUrlInternal(),
						'public_wopi_url' => $this->config->getCollaboraUrlPublic(),
						'wopi_callback_url' => $this->config->getNextcloudUrl(),
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
