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
use OCP\IUserSession;

class SecureViewService {
	public function __construct(
		protected IUserSession $userSession,
		protected PermissionManager $permissionManager,
		protected IAppConfig $appConfig,
	) {
	}

	public function isEnabled(): bool {
		return $this->appConfig->getValueString(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_enabled', 'no') !== 'no';
	}

	/**
	 * Prepares metadata and context needed to decide if SecureView restrictions (such as watermarking or
	 * download blocking) may apply to a given file or folder. Ensures filecache metadata is available by
	 * triggering backend cache updates for files if requested, and supports external storages. Delegates
	 * the actual policy decision to shouldWatermark().
	 *
	 * @param string $path Relative storage path to check.
	 * @param IStorage $storage Storage backend instance.
	 * @param bool $tryOpen Whether to attempt opening files to force/cache refresh file metadata.
	 * @return bool True if SecureView restrictions may apply (per shouldWatermark()), false otherwise.
	 * @throws NotFoundException If neither the file nor its parent are present in the filecache/remote storage.
	 */
	public function shouldSecure(string $path, IStorage $storage, bool $tryOpen = true): bool {
		// First: try to get the cache entry for $path
		$cacheEntry = $storage->getCache()->get($path);

		$isDir = false;
		// Prefer cache for fast directory check; fall back to (potentially slower) is_dir() if needed
		if ($cacheEntry && !empty($cacheEntry['mimetype']) && $cacheEntry['mimetype'] === 'httpd/unix-directory') {
			$isDir = true;
		} elseif (!$cacheEntry && method_exists($storage, 'is_dir') && $storage->is_dir($path)) {
			$isDir = true;
		}
		
		if ($tryOpen && !$isDir) {
			// Attempt to open the file to potentially trigger cache entry creation
			$fp = $storage->fopen($path, 'r');
			if ($fp !== false && is_resource($fp)) {
				fclose($fp);
			}
			// Re-fetch the cache entry after the 'poke'
			$cacheEntry = $storage->getCache()->get($path);
		}

		// Fallback to parent *only if cache entry still missing after poke*
		if (!$cacheEntry) {
			$parent = dirname($path);
			if ($parent === '.') {
				$parent = '';
			}
			$cacheEntry = $storage->getCache()->get($parent);
			if (!$cacheEntry) {
				throw new NotFoundException(sprintf(
					'Could not find cache entry for path and parent of %s within storage %s',
					$path, $storage->getId()
				));
			}
		}

		// Now carry on with original SecureView logic...
		$isSharedStorage = $storage->instanceOfStorage(ISharedStorage::class);
		/** @noinspection PhpPossiblePolymorphicInvocationInspection */
		/** @psalm-suppress UndefinedMethod **/
		$share = $isSharedStorage ? $storage->getShare() : null;
		$userId = $this->userSession->getUser()?->getUID();

		return $this->permissionManager->shouldWatermark(
			$cacheEntry,
			$userId,
			$share,
			$storage->getOwner($path) ?: null
		);
	}
}
