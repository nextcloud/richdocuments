<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\DAV;

use OCA\DAV\Connector\Sabre\FilesPlugin;
use OCA\DAV\Connector\Sabre\Node;
use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Middleware\WOPIMiddleware;
use OCA\Richdocuments\PermissionManager;
use OCA\Richdocuments\Storage\SecureViewWrapper;
use OCP\Files\ForbiddenException;
use OCP\Files\NotFoundException;
use OCP\Files\Storage\ISharedStorage;
use OCP\Files\Storage\IStorage;
use OCP\IAppConfig;
use OCP\IUserSession;
use Sabre\DAV\INode;
use Sabre\DAV\PropFind;
use Sabre\DAV\Server;
use Sabre\DAV\ServerPlugin;

class SecureViewPlugin extends ServerPlugin {
	public function __construct(
		protected WOPIMiddleware $wopiMiddleware,
		protected IUserSession $userSession,
		protected PermissionManager $permissionManager,
		protected IAppConfig $appConfig,
	) {
	}

	public function initialize(Server $server) {
		if ($this->appConfig->getValueString(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_enabled', 'no') === 'no') {
			return;
		}
		$server->on('propFind', $this->handleGetProperties(...));
	}

	private function handleGetProperties(PropFind $propFind, INode $node): void {
		if (!$node instanceof Node) {
			return;
		}

		$requestedProperties = $propFind->getRequestedProperties();
		if (!in_array(FilesPlugin::SHARE_HIDE_DOWNLOAD_PROPERTYNAME, $requestedProperties, true)) {
			return;
		}
		$currentValue = $propFind->get(FilesPlugin::SHARE_HIDE_DOWNLOAD_PROPERTYNAME);
		if ($currentValue === 'true') {
			// We won't unhide, hence can return early
			return;
		}

		if (!$this->isDownloadable($node->getNode())) {
			// FIXME: coordinate with Files how a better solution looks like. Maybe by setting it only to 'true' by any provider? To avoid overwriting. Or throwing a dedicated event in just this case?
			$propFind->set(FilesPlugin::SHARE_HIDE_DOWNLOAD_PROPERTYNAME, 'true');
			// avoid potential race condition with FilesPlugin that may set it to "false"
			$propFind->handle(FilesPlugin::SHARE_HIDE_DOWNLOAD_PROPERTYNAME, 'true');
		}
	}

	private function isDownloadable(\OCP\Files\Node $node): bool {
		try {
			$this->checkFileAccess($node->getInternalPath(), $node->getStorage());
			return true;
		} catch (ForbiddenException) {
			return false;
		}
	}

	private function checkFileAccess(string $path, IStorage $storage): void {
		if ($this->wopiMiddleware->isWOPIRequest() || !$storage->instanceOfStorage(SecureViewWrapper::class)) {
			return;
		}

		if ($this->shouldSecure($path, $storage)) {
			throw new ForbiddenException('Download blocked due the secure view policy', false);
		}
	}

	// FIXME: remove duplication by moving into a SecureViewService
	private function shouldSecure(string $path, ?IStorage $sourceStorage = null): bool {
		if ($sourceStorage !== $this && $sourceStorage !== null) {
			$fp = $sourceStorage->fopen($path, 'r');
			fclose($fp);
		}

		$storage = $sourceStorage ?? $this;
		$cacheEntry = $storage->getCache()->get($path);
		if (!$cacheEntry) {
			$parent = dirname($path);
			if ($parent === '.') {
				$parent = '';
			}
			$cacheEntry = $storage->getCache()->get($parent);
			if (!$cacheEntry) {
				throw new NotFoundException(sprintf('Could not find cache entry for path and parent of %s within storage %s ', $path, $storage->getId()));
			}
		}

		$isSharedStorage = $storage->instanceOfStorage(ISharedStorage::class);

		$share = $isSharedStorage ? $storage->getShare() : null;
		$userId = $this->userSession->getUser()?->getUID();

		return $this->permissionManager->shouldWatermark($cacheEntry, $userId, $share, $storage->getOwner($path) ?: null);
	}
}
