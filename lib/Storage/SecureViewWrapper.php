<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Storage;

use OC\Files\Storage\Wrapper\Wrapper;
use OCA\Richdocuments\Middleware\WOPIMiddleware;
use OCA\Richdocuments\PermissionManager;
use OCA\Richdocuments\Service\SecureViewService;
use OCP\Files\ForbiddenException;
use OCP\Files\IRootFolder;
use OCP\Files\Storage\IStorage;
use OCP\IUserSession;
use OCP\Server;

class SecureViewWrapper extends Wrapper {
	private PermissionManager $permissionManager;
	private WOPIMiddleware $wopiMiddleware;
	private IRootFolder $rootFolder;
	private IUserSession $userSession;
	private SecureViewService $secureViewService;

	private string $mountPoint;

	public function __construct(array $parameters) {
		parent::__construct($parameters);

		$this->permissionManager = Server::get(PermissionManager::class);
		$this->wopiMiddleware = Server::get(WOPIMiddleware::class);
		$this->rootFolder = Server::get(IRootFolder::class);
		$this->userSession = Server::get(IUserSession::class);
		$this->secureViewService = Server::get(SecureViewService::class);

		$this->mountPoint = $parameters['mountPoint'];
	}

	public function fopen($path, $mode) {
		$this->checkFileAccess($path);

		return $this->storage->fopen($path, $mode);
	}

	public function file_get_contents(string $path): false|string {
		$this->checkFileAccess($path);

		return $this->storage->file_get_contents($path);
	}

	public function copy(string $source, string $target): bool {
		$this->checkSourceAndTarget($source, $target);

		return parent::copy($source, $target);
	}

	public function copyFromStorage(IStorage $sourceStorage, string $sourceInternalPath, string $targetInternalPath): bool {
		$this->checkSourceAndTarget($sourceInternalPath, $targetInternalPath, $sourceStorage);

		return parent::copyFromStorage($sourceStorage, $sourceInternalPath, $targetInternalPath);
	}

	public function moveFromStorage(IStorage $sourceStorage, string $sourceInternalPath, string $targetInternalPath): bool {
		$this->checkSourceAndTarget($sourceInternalPath, $targetInternalPath, $sourceStorage);

		return parent::moveFromStorage($sourceStorage, $sourceInternalPath, $targetInternalPath);
	}

	public function rename(string $source, string $target): bool {
		$this->checkSourceAndTarget($source, $target);

		return parent::rename($source, $target);
	}

	/**
	 * @throws ForbiddenException
	 */
	private function checkFileAccess(string $path): void {
		if (!$this->wopiMiddleware->isWOPIRequest() && $this->secureViewService->shouldSecure($path, $this, false)) {
			throw new ForbiddenException('Download blocked due the secure view policy', false);
		}
	}

	private function checkSourceAndTarget(string $source, string $target, ?IStorage $sourceStorage = null): void {
		if ($this->secureViewService->shouldSecure($source, $sourceStorage ?? $this, $sourceStorage !== null)
			&& !$this->secureViewService->shouldSecure($target, $this)
		) {
			throw new ForbiddenException('Download blocked due the secure view policy. The source requires secure view that the target cannot offer.', false);
		}
	}
}
