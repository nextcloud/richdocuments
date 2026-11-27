<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Service;

use OC\Files\Cache\CacheEntry;
use OC\Files\Search\SearchBinaryOperator;
use OC\Files\Search\SearchComparison;
use OC\Files\Search\SearchQuery;
use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\PermissionManager;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\Files\Search\ISearchBinaryOperator;
use OCP\Files\Search\ISearchComparison;
use OCP\Files\Storage\ISharedStorage;
use OCP\Files\Storage\IStorage;
use OCP\IAppConfig;
use OCP\IUserSession;
use OCP\Share\IShare;

class SecureViewService {
	public function __construct(
		protected IUserSession $userSession,
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

		$isSharedStorage = $storage->instanceOfStorage(ISharedStorage::class);
		/** @noinspection PhpPossiblePolymorphicInvocationInspection */
		/** @psalm-suppress UndefinedMethod **/
		$share = $isSharedStorage ? $storage->getShare() : null;
		$userId = $this->userSession->getUser()?->getUID();

		return $this->permissionManager->shouldWatermark($cacheEntry, $userId, $share, $storage->getOwner($path) ?: null);
	}

	public function shouldSecureNode(Node $node): bool {
		return $this->permissionManager->shouldWatermark(
			$node,
			$this->userSession->getUser()?->getUID(),
			$this->getShare($node->getStorage()),
			$node->getOwner()?->getUID(),
		);
	}

	/**
	 * Whether every secured file in $source stays secured when it is copied or moved into $targetParent
	 *
	 * @param bool $keepsFileId true for moves, where the file id and with it the tags are kept
	 * @throws NotFoundException
	 */
	public function staysSecuredIn(Node $source, Folder $targetParent, bool $keepsFileId): bool {
		$targetShare = $this->getShare($targetParent->getStorage());
		$targetOwner = $targetParent->getOwner()?->getUID();
		$userId = $this->userSession->getUser()?->getUID();

		foreach ($this->officeFilesIn($source) as $file) {
			if (!$this->shouldSecureNode($file)) {
				continue;
			}

			$targetEntry = new CacheEntry([
				'fileid' => $keepsFileId ? $file->getId() : -1,
				'mimetype' => $file->getMimetype(),
				'permissions' => $targetParent->getPermissions(),
			]);
			if (!$this->permissionManager->shouldWatermark($targetEntry, $userId, $targetShare, $targetOwner)) {
				return false;
			}
		}

		return true;
	}

	private function getShare(IStorage $storage): ?IShare {
		/** @psalm-suppress UndefinedMethod */
		return $storage->instanceOfStorage(ISharedStorage::class) ? $storage->getShare() : null;
	}

	/**
	 * @return iterable<Node>
	 */
	private function officeFilesIn(Node $node): iterable {
		if (!$node instanceof Folder) {
			return $node instanceof File ? [$node] : [];
		}

		// ponytail: one check per office file below the folder, batch the tag lookups if large folder copies get slow
		$mimeTypes = array_map(
			fn (string $mimeType) => new SearchComparison(ISearchComparison::COMPARE_EQUAL, 'mimetype', $mimeType),
			$this->richdocumentsAppConfig->getMimeTypes(),
		);
		return $node->search(new SearchQuery(new SearchBinaryOperator(ISearchBinaryOperator::OPERATOR_OR, $mimeTypes), 0, 0, []));
	}
}
