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
use OCP\Files\ForbiddenException;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\Files\Storage\ISharedStorage;
use OCP\Files\Storage\IStorage;
use OCP\IUserSession;
use OCP\Server;

class SecureViewWrapper extends Wrapper {
	private PermissionManager $permissionManager;
	private WOPIMiddleware $wopiMiddleware;
	private IRootFolder $rootFolder;
	private IUserSession $userSession;

	private string $mountPoint;

	public function __construct(array $parameters) {
		parent::__construct($parameters);

		$this->permissionManager = Server::get(PermissionManager::class);
		$this->wopiMiddleware = Server::get(WOPIMiddleware::class);
		$this->rootFolder = Server::get(IRootFolder::class);
		$this->userSession = Server::get(IUserSession::class);

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
		if ($this->shouldSecure($path) && !$this->wopiMiddleware->isWOPIRequest()) {
			throw new ForbiddenException('Download blocked due the secure view policy', false);
		}
	}

	private function shouldSecure(string $path, ?IStorage $sourceStorage = null): bool {
		if ($sourceStorage !== $this && $sourceStorage !== null) {
			$fp = $sourceStorage->fopen($path, 'r');
			fclose($fp);
		}

		try {
			$node = $this->rootFolder->get($this->mountPoint . $path);
		} catch (NotFoundException) {
			// If the file is just created we may need to check the parent as this is only just about figuring out if it is a share
			$node = $this->rootFolder->get(dirname($this->mountPoint . $path));
		}

		$isSharedStorage = $node->getStorage()->instanceOfStorage(ISharedStorage::class);

		$share = $isSharedStorage ? $node->getStorage()->getShare() : null;
		$userId = $this->userSession->getUser()?->getUID();

		return $this->permissionManager->shouldWatermark($node, $userId, $share);
	}


	private function checkSourceAndTarget(string $source, string $target, ?IStorage $sourceStorage = null): void {
		if ($this->shouldSecure($source, $sourceStorage) && !$this->shouldSecure($target)) {
			throw new ForbiddenException('Download blocked due the secure view policy. The source requires secure view that the target cannot offer.', false);
		}
	}
}
