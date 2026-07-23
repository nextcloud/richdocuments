<?php

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Controller;

use OCA\Richdocuments\Service\TemplateFieldService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCSController;
use OCP\Constants;
use OCP\Files\File;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\IRequest;
use OCP\IUserSession;

class TemplateFieldController extends OCSController {
	public function __construct(
		string $appName,
		IRequest $request,
		private TemplateFieldService $templateFieldService,
		private IRootFolder $rootFolder,
		private IUserSession $userSession,
	) {
		parent::__construct($appName, $request);
	}

	/** Resolve strictly within the acting user's scope (blocks IDOR). */
	private function getUserFile(int $fileId): File {
		$user = $this->userSession->getUser();
		if ($user === null) {
			throw new NotFoundException();
		}
		$node = $this->rootFolder->getUserFolder($user->getUID())->getFirstNodeById($fileId);
		if (!$node instanceof File) {
			throw new NotFoundException();
		}
		return $node;
	}

	/**
	 * @param int $fileId
	 * @return DataResponse
	 */
	#[NoAdminRequired]
	public function extractFields(int $fileId): DataResponse {
		try {
			$fields = $this->templateFieldService->extractFields($this->getUserFile($fileId));
			return new DataResponse($fields, Http::STATUS_OK);
		} catch (NotFoundException) {
			return new DataResponse(['File not found'], Http::STATUS_NOT_FOUND);
		} catch (\Exception) {
			return new DataResponse(['Unable to extract fields from given file'], Http::STATUS_INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * @param int $fileId
	 * @param array $fields
	 * @return DataResponse
	 */
	#[NoAdminRequired]
	public function fillFields(int $fileId, array $fields = [], ?string $destination = null, ?string $convert = null): DataResponse {
		try {
			$file = $this->getUserFile($fileId);

			// Filling a PDF overwrites the source in place, so require write access.
			if ($file->getMimeType() === 'application/pdf'
				&& !($file->getPermissions() & Constants::PERMISSION_UPDATE)) {
				throw new NotPermittedException();
			}

			$content = $this->templateFieldService->fillFields($file, $fields, $destination, $convert);
			if ($destination === null) {
				echo $content;
				die();
			}
			return new DataResponse([], Http::STATUS_OK);
		} catch (NotFoundException) {
			return new DataResponse(['File not found'], Http::STATUS_NOT_FOUND);
		} catch (NotPermittedException) {
			return new DataResponse(['No permission to modify this file'], Http::STATUS_FORBIDDEN);
		} catch (\Exception) {
			return new DataResponse(['Unable to fill fields into the given file'], Http::STATUS_INTERNAL_SERVER_ERROR);
		}
	}
}
