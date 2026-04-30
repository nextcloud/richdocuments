<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Controller;

use InvalidArgumentException;
use OCA\Richdocuments\Service\OverviewService;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCS\OCSBadRequestException;
use OCP\AppFramework\OCS\OCSException;
use OCP\AppFramework\OCS\OCSForbiddenException;
use OCP\AppFramework\OCS\OCSNotFoundException;
use OCP\AppFramework\OCSController;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\IRequest;
use Psr\Log\LoggerInterface;

/**
 * OCS endpoints powering the Overview page.
 *
 * All endpoints require an authenticated user (no public access). The
 * Nextcloud OCS framework adds CSRF protection, brute-force throttling,
 * and rate limiting. Inputs are coerced to safe types here and validated
 * deeper in OverviewService.
 */
class OverviewApiController extends OCSController {
	private const MAX_QUERY_LENGTH = 200;
	private const MAX_FILENAME_LENGTH = 200;
	private const MAX_FOLDER_PATH_LENGTH = 4000;

	public function __construct(
		string $appName,
		IRequest $request,
		private OverviewService $service,
		private ?string $userId,
		private LoggerInterface $logger,
	) {
		parent::__construct($appName, $request);
	}

	/**
	 * @NoAdminRequired
	 *
	 * @throws OCSForbiddenException when called by a guest
	 */
	#[NoAdminRequired]
	public function recent(?string $q = null, ?string $type = null, int $offset = 0, int $limit = 0): DataResponse {
		$this->requireUser();
		[$q, $type, $offset, $limit] = $this->normalizeListParams($q, $type, $offset, $limit);
		return new DataResponse($this->service->getRecent($this->userId, $q, $type, $offset, $limit));
	}

	/**
	 * @NoAdminRequired
	 *
	 * @throws OCSForbiddenException when called by a guest
	 */
	#[NoAdminRequired]
	public function shared(?string $q = null, ?string $type = null, int $offset = 0, int $limit = 0): DataResponse {
		$this->requireUser();
		[$q, $type, $offset, $limit] = $this->normalizeListParams($q, $type, $offset, $limit);
		return new DataResponse($this->service->getShared($this->userId, $q, $type, $offset, $limit));
	}

	/**
	 * @NoAdminRequired
	 *
	 * @throws OCSForbiddenException when called by a guest
	 */
	#[NoAdminRequired]
	public function templates(?string $q = null, ?string $type = null, int $offset = 0, int $limit = 0): DataResponse {
		$this->requireUser();
		[$q, $type, $offset, $limit] = $this->normalizeListParams($q, $type, $offset, $limit);
		return new DataResponse($this->service->getTemplates($this->userId, $q, $type, $offset, $limit));
	}

	/**
	 * Toggle "favourite" status for a file the current user can see.
	 * Pins / unpins the file in the overview list.
	 *
	 * @NoAdminRequired
	 *
	 * @throws OCSBadRequestException invalid arguments
	 * @throws OCSNotFoundException   file not visible to the user
	 * @throws OCSForbiddenException  guest call
	 */
	#[NoAdminRequired]
	public function favourite(int $fileid = 0, bool $favorite = false): DataResponse {
		$this->requireUser();
		if ($fileid <= 0) {
			throw new OCSBadRequestException('fileid is required');
		}
		try {
			$this->service->setFavourite($this->userId, $fileid, $favorite);
		} catch (NotFoundException) {
			throw new OCSNotFoundException();
		} catch (\Throwable $e) {
			$this->logger->error('Overview: failed to toggle favourite', [
				'exception' => $e,
				'app' => 'richdocuments',
			]);
			throw new OCSException('Failed to toggle favourite');
		}
		return new DataResponse(['fileid' => $fileid, 'favorite' => $favorite]);
	}

	/**
	 * @NoAdminRequired
	 *
	 * @throws OCSBadRequestException invalid arguments
	 * @throws OCSNotFoundException   template or folder missing
	 * @throws OCSForbiddenException  no write permission on folder
	 * @throws OCSException           unexpected server error
	 */
	#[NoAdminRequired]
	public function createFromTemplate(int $templateFileId = 0, string $filename = '', string $folderPath = '/'): DataResponse {
		$this->requireUser();

		if ($templateFileId <= 0) {
			throw new OCSBadRequestException('templateFileId is required');
		}
		$filename = trim($filename);
		if ($filename === '' || mb_strlen($filename) > self::MAX_FILENAME_LENGTH) {
			throw new OCSBadRequestException('filename is required and must be <= ' . self::MAX_FILENAME_LENGTH . ' characters');
		}
		if (mb_strlen($folderPath) > self::MAX_FOLDER_PATH_LENGTH) {
			throw new OCSBadRequestException('folderPath is too long');
		}

		try {
			$result = $this->service->createFromTemplate($this->userId, $templateFileId, $filename, $folderPath);
			return new DataResponse($result);
		} catch (NotFoundException) {
			throw new OCSNotFoundException('Template or target folder not found');
		} catch (NotPermittedException) {
			throw new OCSForbiddenException('No permission to create file in target folder');
		} catch (InvalidArgumentException $e) {
			throw new OCSBadRequestException($e->getMessage());
		} catch (\Throwable $e) {
			$this->logger->error('Overview: failed to create document from template', [
				'exception' => $e,
				'app' => 'richdocuments',
			]);
			throw new OCSException('Failed to create document from template');
		}
	}

	/**
	 * @return array{0: ?string, 1: ?string, 2: int, 3: int}
	 */
	private function normalizeListParams(?string $q, ?string $type, int $offset, int $limit): array {
		// Normalize search string.
		if ($q !== null) {
			$q = trim($q);
			if ($q === '') {
				$q = null;
			} elseif (mb_strlen($q) > self::MAX_QUERY_LENGTH) {
				$q = mb_substr($q, 0, self::MAX_QUERY_LENGTH);
			}
		}

		// Validate the type filter strictly: only known group keys (or "all"
		// / null) are accepted. Anything else collapses to null so a stray
		// query param can never widen the result set unexpectedly.
		if ($type !== null) {
			$type = trim($type);
			if ($type === '' || $type === 'all') {
				$type = null;
			} elseif (!array_key_exists($type, OverviewService::TYPE_GROUPS)) {
				$type = null;
			}
		}

		// Clamp pagination. Server caps at PAGE_SIZE; clients can ask for less but not more.
		$offset = max(0, $offset);
		$limit = $limit <= 0 ? OverviewService::PAGE_SIZE : min(max(1, $limit), OverviewService::PAGE_SIZE);

		return [$q, $type, $offset, $limit];
	}

	/**
	 * @throws OCSForbiddenException
	 */
	private function requireUser(): void {
		if ($this->userId === null || $this->userId === '') {
			throw new OCSForbiddenException();
		}
	}
}
