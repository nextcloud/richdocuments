<?php
/**
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Controller;

use OCA\Richdocuments\Controller\Attribute\RestrictToWopiServer;
use OCA\Richdocuments\Db\AssetMapper;
use OCA\Richdocuments\Helper;
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
use OCP\IL10N;
use OCP\IRequest;
use OCP\IURLGenerator;
use OCP\TaskProcessing\IManager;

class AssetsController extends Controller {
	public function __construct(
		$appName,
		IRequest $request,
		private AssetMapper $assetMapper,
		private IRootFolder $rootFolder,
		private ?string $userId,
		private UserScopeService $userScopeService,
		private IURLGenerator $urlGenerator,
		private IManager $taskProcessingManager,
		private IL10N $l10n,
		private Helper $helper,
	) {
		parent::__construct($appName, $request);
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

			$share = $this->helper->getShareFromNode($node);
			$attributes = $share?->getAttributes();
			if ($attributes !== null
				&& $attributes->getAttribute('permissions', 'download') === false
			) {
				throw new NotPermittedException();
			}
		} catch (NotFoundException) {
			return new JSONResponse([], Http::STATUS_NOT_FOUND);
		} catch (NotPermittedException) {
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
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 *
	 * @param int $taskId
	 * @param array<int> $fileIds
	 * @return JSONResponse
	 */
	public function createFromTask(int $taskId, array $fileIds): JSONResponse {
		$task = $this->taskProcessingManager->getTask($taskId);
		$taskOutput = $task->getOutput();
		$assets = [];

		if ($task->getUserId() !== $this->userId) {
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		foreach ($fileIds as $fileId) {
			$validFileIdForTask = array_key_exists($fileId, array_flip($taskOutput['images']));

			if (!$validFileIdForTask) {
				continue;
			}

			$node = $this->rootFolder->getFirstNodeById($fileId);
			if (is_null($node)) {
				$node = $this->rootFolder->getFirstNodeByIdInPath($fileId, '/' . $this->rootFolder->getAppDataDirectoryName() . '/');
			}

			if (!($node instanceof File)) {
				return new JSONResponse([], Http::STATUS_NOT_FOUND);
			}

			$asset = $this->assetMapper->newAsset($this->userId, $node->getId());
			$assets[] = [
				'filename' => $node->getName() . $node->getExtension(),
				'url' => $this->urlGenerator->linkToRouteAbsolute('richdocuments.assets.get', [
					'token' => $asset->getToken(),
					'fromTask' => true,
				]),
			];
		}

		if (empty($assets)) {
			return new JSONResponse([
				'message' => $this->l10n->t('No files found for this task.'),
			], Http::STATUS_NOT_FOUND);
		}

		return new JSONResponse($assets, Http::STATUS_CREATED);
	}

	/**
	 * @PublicPage
	 * @NoCSRFRequired
	 *
	 * @param string $token
	 * @param boolean $fromTask
	 * @return Http\Response
	 */
	#[RestrictToWopiServer]
	public function get($token, $fromTask = false) {
		try {
			$asset = $this->assetMapper->getAssetByToken($token);
		} catch (DoesNotExistException) {
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		}

		// Do not clear the asset on HEAD requests
		if ($this->request->getMethod() === 'GET') {
			// Clear the assets so we can only fetch it once
			$this->assetMapper->delete($asset);
		}

		$this->userScopeService->setUserScope($asset->getUid());

		if ($fromTask) {
			$node = $this->rootFolder->getFirstNodeById($asset->getFileid());
			if (is_null($node)) {
				$node = $this->rootFolder->getFirstNodeByIdInPath($asset->getFileid(), '/' . $this->rootFolder->getAppDataDirectoryName() . '/');
			}
		} else {
			$userFolder = $this->rootFolder->getUserFolder($asset->getUid());
			$node = $userFolder->getFirstNodeById($asset->getFileid());
		}

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
