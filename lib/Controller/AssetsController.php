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
		$nodes = $userFolder->getById($asset->getFileid());

		if ($nodes === []) {
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		}

		$node = array_pop($nodes);
		if (!($node instanceof File)) {
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		}

		$response = new StreamResponse($node->fopen('rb'));
		$response->addHeader('Content-Disposition', 'attachment');
		$response->addHeader('Content-Type', 'application/octet-stream');
		return $response;
	}
}
