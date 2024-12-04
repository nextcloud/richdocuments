<?php
/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Controller;

use OC\AppFramework\Http;
use OCA\Richdocuments\Controller\Attribute\RestrictToWopiServer;
use OCA\Richdocuments\Service\FontService;
use OCA\Richdocuments\TemplateManager;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\Attribute\PublicPage;
use OCP\AppFramework\Http\DataDownloadResponse;
use OCP\AppFramework\Http\DataResponse;
use OCP\Files\File;
use OCP\Files\NotFoundException;
use OCP\Files\SimpleFS\ISimpleFile;
use OCP\IRequest;
use OCP\IURLGenerator;

class RemoteAssetController extends Controller {

	public function __construct(
		string $appName,
		IRequest $request,
		private IURLGenerator $urlGenerator,
		private FontService $fontService,
		private TemplateManager $templateManager,
	) {
		parent::__construct($appName, $request);
	}

	#[NoAdminRequired]
	#[PublicPage]
	#[NoCSRFRequired]
	#[RestrictToWopiServer]
	#[FrontpageRoute(verb: 'GET', url: '/settings/assets')]
	public function getRemoteAssets(): DataResponse {
		return new DataResponse($this->getRemoteAssetData());
	}

	#[NoAdminRequired]
	#[PublicPage]
	#[NoCSRFRequired]
	#[RestrictToWopiServer]
	#[FrontpageRoute(verb: 'GET', url: '/settings/assets/{type}/{identifier}')]
	public function downloadRemoteAsset(string $type, string $identifier): DataResponse|DataDownloadResponse {
		if ($type === 'template-presentation') {
			try {
				$file = $this->templateManager->get((int)$identifier);
			} catch (NotFoundException) {
			}
		}

		if ($type === 'font') {
			try {
				$file = $this->fontService->getFontFile($identifier);
			} catch (NotFoundException) {
			}
		}

		if ($file instanceof File || $file instanceof ISimpleFile) {
			$response = new DataDownloadResponse($file->getContent(), $file->getName(), $file->getMimeType());
			return $response;
		}

		return new DataResponse([], Http::STATUS_NOT_FOUND);
	}


	/**
	 * @deprecated To remove once collabora no longer supports a searate remote font config (also cleanup fontsOnly param then)
	 */
	#[NoAdminRequired]
	#[PublicPage]
	#[NoCSRFRequired]
	#[RestrictToWopiServer]
	#[FrontpageRoute(verb: 'GET', url: '/settings/fonts.json')]
	public function getJsonFontList(): DataResponse {
		return new DataResponse($this->getRemoteAssetData(true));
	}

	private function getRemoteAssetData(bool $fontsOnly = false): array {
		$data = [
			'kind' => 'assetconfiguration',
			'server' => $this->request->getServerHost(),

			'fonts' => array_values(array_map(function ($font) {
				return [
					'uri' => $this->urlGenerator->linkToRouteAbsolute('richdocuments.remoteasset.downloadRemoteAsset', [
						'type' => 'font',
						'identifier' => $font->getName(),
					]),
					'version' => $font->getEtag(),
				];
			}, $this->fontService->getFontFiles())),
		];

		if ($fontsOnly) {
			return $data;
		}

		$data['templates'] = [
			'presentation' => array_values(array_map(function ($template) {
				return [
					'uri' => $this->urlGenerator->linkToRouteAbsolute('richdocuments.remoteasset.downloadRemoteAsset', [
						'type' => 'template-presentation',
						'identifier' => $template->getId(),
					]),
					'version' => $template->getEtag(),
				];
			}, $this->templateManager->getSystem('presentation'))),
		];

		return $data;
	}

}
