<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Service;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\PermissionManager;
use OCP\Files\NotFoundException;
use OCP\Files\Storage\ISharedStorage;
use OCP\Files\Storage\IStorage;
use OCP\IAppConfig;

class SecureViewService {
	public function __construct(
		protected PermissionManager $permissionManager,
		protected IAppConfig $appConfig,
		protected AppConfig $richdocumentsAppConfig,
	) {
	}

	public function isEnabled(): bool {
		return $this->appConfig->getValueString(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_enabled', 'no') !== 'no';
	}

	/**
	 * @throws NotFoundException
	 */
	public function shouldSecure(string $path, IStorage $storage, bool $tryOpen = true): bool {
		if ($tryOpen && !$storage->file_exists($path)) {
			// File does not exist yet (e.g. rename target or version snapshot).
			// Assume the target will be in a secure context so that rename/copy
			// is not blocked by checkSourceAndTarget.
			return true;
		}

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

		// Secure view applies only to office files handled by Collabora
		if (!in_array($cacheEntry->getMimetype(), $this->richdocumentsAppConfig->getMimeTypes(), true)) {
			return false;
		}

		$isSharedStorage = $storage->instanceOfStorage(ISharedStorage::class);
		/** @noinspection PhpPossiblePolymorphicInvocationInspection */
		/** @psalm-suppress UndefinedMethod **/
		$share = $isSharedStorage ? $storage->getShare() : null;

		return $this->permissionManager->isDownloadRestricted($share);
	}
}
