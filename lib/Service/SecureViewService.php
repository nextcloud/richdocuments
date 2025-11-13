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
	 * @throws NotFoundException
	 */
	public function shouldSecure(string $path, IStorage $storage, bool $tryOpen = true): bool {
		if ($tryOpen) {
			// pity… fopen() does not document any possible Exceptions
			$fp = $storage->fopen($path, 'r');
			fclose($fp);
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

		$isSharedStorage = $storage->instanceOfStorage(ISharedStorage::class);
		/** @noinspection PhpPossiblePolymorphicInvocationInspection */
		/** @psalm-suppress UndefinedMethod **/
		$share = $isSharedStorage ? $storage->getShare() : null;
		$userId = $this->userSession->getUser()?->getUID();

		return $this->permissionManager->shouldWatermark($cacheEntry, $userId, $share, $storage->getOwner($path) ?: null);
	}
}
