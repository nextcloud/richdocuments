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
use OCP\Files\Folder;
use OCP\Files\ForbiddenException;
use OCP\Files\IRootFolder;
use OCP\Files\Storage\ISharedStorage;
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

	public function checkFileAccess($path) {
		$isWopiRequest = $this->wopiMiddleware->isWOPIRequest();

		$isSharedStorage = $this->instanceOfStorage(ISharedStorage::class);
		$mountNode = $this->rootFolder->get($this->mountPoint);
		$node = $mountNode instanceof Folder ? $mountNode->get($path) : $mountNode;
		$share = $isSharedStorage && method_exists($this, 'getShare') ? $this->getShare() : null;
		$userId = $this->userSession->getUser()?->getUID();

		if ($this->permissionManager->shouldWatermark($node, $userId, $share) && !$isWopiRequest) {
			throw new ForbiddenException('Download blocked due the secure view policy', false);
		}
	}
}
