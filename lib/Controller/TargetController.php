<?php
/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Controller;

use OC\User\NoUserException;
use OCA\Richdocuments\Service\FileTargetService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataDisplayResponse;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\Response;
use OCP\Files\File;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\IRequest;

class TargetController extends \OCP\AppFramework\OCSController {

	public function __construct(
		string $appName,
		IRequest $request,
		private FileTargetService $fileTargetService,
		private IRootFolder $rootFolder,
		private ?string $userId,
	) {
		parent::__construct($appName, $request);
	}

	/**
	 * @NoAdminRequired
	 */
	public function getTargets(string $path): DataResponse {
		try {
			$file = $this->getFile($path);
			return new DataResponse($this->fileTargetService->getFileTargets($file));
		} catch (NotFoundException) {
		}

		return new DataResponse('File not found', Http::STATUS_NOT_FOUND);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 */
	public function getPreview(string $path, string $target): Response {
		try {
			$file = $this->getFile($path);
			return new DataDisplayResponse(
				$this->fileTargetService->getTargetPreview($file, $target),
				Http::STATUS_OK,
				['Content-Type' => 'image/png']
			);
		} catch (NotFoundException) {
			return new DataResponse('File not found', Http::STATUS_NOT_FOUND);
		}
	}

	/**
	 * @throws NotFoundException
	 */
	private function getFile(string $path): File {
		try {
			$file = $this->rootFolder->getUserFolder($this->userId)->get($path);

			if (!$file instanceof File) {
				throw new NotFoundException();
			}

			return $file;
		} catch (NotFoundException|NotPermittedException|NoUserException) {
			throw new NotFoundException();
		}
	}
}
