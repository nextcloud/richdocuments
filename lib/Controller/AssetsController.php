<?php
/**
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Controller;

use OCA\Files_Sharing\SharedStorage;
use OCA\Richdocuments\Controller\Attribute\RestrictToWopiServer;
use OCA\Richdocuments\Db\AssetMapper;
use OCA\Richdocuments\Service\UserScopeService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\StreamResponse;
use OCP\Files\File;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\IRequest;
use OCP\IURLGenerator;

class AssetsController extends Controller {
	private AssetMapper $assetMapper;
	private IRootFolder $rootFolder;
	private ?string $userId;
	private UserScopeService $userScopeService;
	private IURLGenerator $urlGenerator;

	public function __construct($appName,
		IRequest $request,
		AssetMapper $assetMapper,
		IRootFolder $rootFolder,
		$userId,
		UserScopeService $userScopeService,
		IURLGenerator $urlGenerator) {
		parent::__construct($appName, $request);

		$this->assetMapper = $assetMapper;
		$this->rootFolder = $rootFolder;
		$this->userId = $userId;
		$this->userScopeService = $userScopeService;
		$this->urlGenerator = $urlGenerator;
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 *
	 * @param string $path
	 * @return JSONResponse
	 */
	public function create($path) {
		$userFolder = $this->rootFolder->getUserFolder($this->userId);

		try {
			$node = $userFolder->get($path);

			if (!($node instanceof File)) {
				return new JSONResponse([], Http::STATUS_NOT_FOUND);
			}

			$storage = $node->getStorage();
			if ($storage->instanceOfStorage(SharedStorage::class)) {
				/** @var SharedStorage $storage */
				$share = $storage->getShare();
				$attributes = $share->getAttributes();
				if ($attributes !== null && $attributes->getAttribute('permissions', 'download') === false) {
					throw new NotPermittedException();
				}
			}
		} catch (NotFoundException $e) {
			return new JSONResponse([], Http::STATUS_NOT_FOUND);
		} catch (NotPermittedException $e) {
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		$asset = $this->assetMapper->newAsset($this->userId, $node->getId());

		return new JSONResponse([
			'url' => $this->urlGenerator->linkToRouteAbsolute('richdocuments.assets.get', [
				'token' => $asset->getToken(),
			])
		]);
	}

	/**
	 * @PublicPage
	 * @NoCSRFRequired
	 *
	 * @param string $token
	 * @return Http\Response
	 */
	#[RestrictToWopiServer]
	public function get($token) {
		try {
			$asset = $this->assetMapper->getAssetByToken($token);
		} catch (DoesNotExistException $e) {
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		}

		// Do not clear the asset on HEAD requests
		if ($this->request->getMethod() === 'GET') {
			// Clear the assets so we can only fetch it once
			$this->assetMapper->delete($asset);
		}


		$this->userScopeService->setUserScope($asset->getUid());
		$userFolder = $this->rootFolder->getUserFolder($asset->getUid());
		$node = $userFolder->getFirstNodeById($asset->getFileid());

		if ($node === null) {
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		}

		if (!($node instanceof File)) {
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		}

		$response = new StreamResponse($node->fopen('rb'));
		$response->addHeader('Content-Disposition', 'attachment');
		$response->addHeader('Content-Type', 'application/octet-stream');
		return $response;
	}
}
