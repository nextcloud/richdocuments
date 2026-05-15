<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Service;

use OC\Files\Search\SearchBinaryOperator;
use OC\Files\Search\SearchComparison;
use OC\Files\Search\SearchOrder;
use OC\Files\Search\SearchQuery;
use OCA\Richdocuments\TemplateManager;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\Files\Search\ISearchComparison;
use OCP\Files\Search\ISearchOrder;
use OCP\IDBConnection;
use OCP\ITagManager;
use OCP\IURLGenerator;
use OCP\IUserManager;
use OCP\Share\IManager as IShareManager;
use OCP\Share\IShare;

/**
 * Service powering the Overview page (recent / shared / templates).
 *
 * Design notes:
 *   - "Recent" and "Shared with me" are both backed by the same indexed
 *     search across the user's folder. Files mounted from incoming shares
 *     (user/group/circle/federated) appear in the user's folder
 *     automatically, so we partition the search results by file owner:
 *     owner == current user -> recent, owner != current user -> shared.
 *     This keeps the query plan single-shot and predictable.
 *   - Pagination is offset-based, server-capped at 25 per request. Within
 *     a single 60-day window with a mimetype filter the result count is
 *     bounded enough that offset drift is acceptable.
 *   - Search predicate matches against name and path (both stored in the
 *     file cache); we apply it as a server-side LIKE filter.
 */
class OverviewService {
	public const PAGE_SIZE = 25;
	public const HOME_SECTION_LIMIT = 6;
	public const RECENT_WINDOW_DAYS = 60;

	/**
	 * MIME-type groups exposed to the frontend as filter pills.
	 *
	 * The frontend sends the group key (e.g. "documents") and the service
	 * narrows the search to that subset. Unknown values are ignored.
	 */
	public const TYPE_GROUPS = [
		'documents' => [
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			'application/vnd.oasis.opendocument.text',
		],
		'spreadsheets' => [
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'application/vnd.oasis.opendocument.spreadsheet',
		],
		'presentations' => [
			'application/vnd.openxmlformats-officedocument.presentationml.presentation',
			'application/vnd.oasis.opendocument.presentation',
		],
		'pdfs' => [
			'application/pdf',
		],
	];

	/**
	 * MIME types the overview surfaces (docx/xlsx/pptx/odt/ods/odp/pdf).
	 * Built from TYPE_GROUPS so the two stay in sync by construction.
	 *
	 * @var list<string>
	 */
	public const ALLOWED_MIMETYPES = [
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'application/vnd.oasis.opendocument.text',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		'application/vnd.oasis.opendocument.spreadsheet',
		'application/vnd.openxmlformats-officedocument.presentationml.presentation',
		'application/vnd.oasis.opendocument.presentation',
		'application/pdf',
	];

	public function __construct(
		private IRootFolder $rootFolder,
		private IShareManager $shareManager,
		private IUserManager $userManager,
		private IURLGenerator $urlGenerator,
		private TemplateManager $templateManager,
		private IDBConnection $db,
		private ITimeFactory $timeFactory,
		private ITagManager $tagManager,
	) {
	}

	/**
	 * Files in the user's storage that the user owns and were modified
	 * within the recent window.
	 *
	 * @return array{items: array<int, array<string, mixed>>, nextOffset: ?int}
	 */
	public function getRecent(string $userId, ?string $query, ?string $type, int $offset, int $limit): array {
		return $this->getOwnedOrShared($userId, $query, $type, $offset, $limit, true);
	}

	/**
	 * Files reachable through incoming shares (user/group/circle/federated)
	 * that were modified within the recent window.
	 *
	 * @return array{items: array<int, array<string, mixed>>, nextOffset: ?int}
	 */
	public function getShared(string $userId, ?string $query, ?string $type, int $offset, int $limit): array {
		return $this->getOwnedOrShared($userId, $query, $type, $offset, $limit, false);
	}

	/**
	 * Templates the user has defined in their personal templates folder.
	 *
	 * @return array{items: array<int, array<string, mixed>>, nextOffset: ?int}
	 */
	public function getTemplates(string $userId, ?string $query, ?string $type, int $offset, int $limit): array {
		$this->templateManager->setUserId($userId);
		$templates = $this->templateManager->getUser();

		// Allowed template mimes: the office mimes we surface plus their
		// equivalent template mime types (.ott, .otp, ots, .dotx, .pptx-template, etc.)
		$baseAllowed = array_merge(
			self::ALLOWED_MIMETYPES,
			TemplateManager::MIMES_DOCUMENTS,
			TemplateManager::MIMES_SHEETS,
			TemplateManager::MIMES_PRESENTATIONS,
		);
		$allowed = $this->resolveTemplateTypeFilter($type, $baseAllowed);

		$templates = array_values(array_filter(
			$templates,
			fn (File $file): bool => in_array($file->getMimeType(), $allowed, true),
		));

		if ($query !== null && $query !== '') {
			$needle = mb_strtolower($query);
			$templates = array_values(array_filter($templates, function (File $file) use ($needle): bool {
				return mb_strpos(mb_strtolower($file->getName()), $needle) !== false;
			}));
		}

		// Sort by name asc for stable, browseable order.
		usort($templates, fn (File $a, File $b): int => strnatcasecmp($a->getName(), $b->getName()));

		$slice = array_slice($templates, $offset, $limit);
		$items = array_map(fn (File $file): array => $this->serializeTemplate($file), $slice);

		$nextOffset = ($offset + $limit) < count($templates) ? ($offset + $limit) : null;
		return ['items' => $items, 'nextOffset' => $nextOffset];
	}

	/**
	 * Resolve a template node by id. Used by the create-from-template
	 * endpoint to validate that a template exists before copying.
	 *
	 * @throws NotFoundException
	 */
	public function getTemplateNode(string $userId, int $templateId): File {
		$this->templateManager->setUserId($userId);
		$file = $this->templateManager->get($templateId);
		if (!($file instanceof File)) {
			throw new NotFoundException();
		}
		return $file;
	}

	/**
	 * Create a new file from a template by copying the template content
	 * into the chosen folder, auto-resolving filename collisions.
	 *
	 * Returns the created file together with a frontend-ready open URL.
	 *
	 * @return array{fileid: int, name: string, path: string, openUrl: string}
	 *
	 * @throws NotFoundException             folder or template missing
	 * @throws \OCP\Files\NotPermittedException no write permission
	 */
	public function createFromTemplate(
		string $userId,
		int $templateId,
		string $filename,
		string $folderPath,
	): array {
		$template = $this->getTemplateNode($userId, $templateId);
		$userFolder = $this->rootFolder->getUserFolder($userId);

		$folderPath = $folderPath === '' ? '/' : $folderPath;
		$folder = $userFolder->get($folderPath);
		if (!($folder instanceof Folder)) {
			throw new NotFoundException('Target is not a folder');
		}

		// Build the full filename using the template's extension.
		$extension = $this->extensionFromMime($template->getMimeType()) ?? pathinfo($template->getName(), PATHINFO_EXTENSION);
		$basename = $this->sanitizeFilename($filename);
		if ($basename === '') {
			throw new \InvalidArgumentException('Empty filename');
		}
		$fullName = $extension !== '' ? $basename . '.' . $extension : $basename;
		$fullName = $folder->getNonExistingName($fullName);

		$newFile = $folder->newFile($fullName, $template->fopen('rb'));

		return [
			'fileid' => $newFile->getId(),
			'name' => $newFile->getName(),
			'path' => $userFolder->getRelativePath($newFile->getPath()),
			'openUrl' => $this->urlGenerator->linkToRoute('richdocuments.document.index', [
				'fileId' => $newFile->getId(),
			]),
		];
	}

	/**
	 * Shared core: search the user's folder, partition by ownership.
	 *
	 * @return array{items: array<int, array<string, mixed>>, nextOffset: ?int}
	 */
	private function getOwnedOrShared(string $userId, ?string $query, ?string $type, int $offset, int $limit, bool $ownedOnly): array {
		$userFolder = $this->rootFolder->getUserFolder($userId);

		$cutoff = time() - (self::RECENT_WINDOW_DAYS * 86400);

		$activeMimetypes = $this->resolveTypeFilter($type);

		// Build the SearchQuery: mimetype IN (...) AND mtime >= cutoff [AND name|path LIKE ?].
		$mimeOps = array_map(
			fn (string $mime) => new SearchComparison(ISearchComparison::COMPARE_EQUAL, 'mimetype', $mime),
			$activeMimetypes,
		);
		$conditions = [
			new SearchBinaryOperator(SearchBinaryOperator::OPERATOR_OR, $mimeOps),
			new SearchComparison(ISearchComparison::COMPARE_GREATER_THAN_EQUAL, 'mtime', $cutoff),
		];

		if ($query !== null && $query !== '') {
			// Match against filename or path (both stored in oc_filecache).
			$like = '%' . $this->escapeLike($query) . '%';
			$conditions[] = new SearchBinaryOperator(SearchBinaryOperator::OPERATOR_OR, [
				new SearchComparison(ISearchComparison::COMPARE_LIKE, 'name', $like),
				new SearchComparison(ISearchComparison::COMPARE_LIKE, 'path', $like),
			]);
		}

		// We need to over-fetch so we can post-filter by ownership and still
		// fill the requested page. Cap the over-fetch to keep memory bounded.
		$searchLimit = max($limit * 8, 200);
		$searchOffset = $offset * 0; // We can't reliably translate offsets after partitioning; we re-scan.

		/** @var \OCP\Files\Search\ISearchQuery $searchQuery */
		$searchQuery = new SearchQuery(
			new SearchBinaryOperator(SearchBinaryOperator::OPERATOR_AND, $conditions),
			$searchLimit + $offset,
			$searchOffset,
			[new SearchOrder(ISearchOrder::DIRECTION_DESCENDING, 'mtime')],
			$this->userManager->get($userId),
		);

		/** @var Node[] $results */
		$results = $userFolder->search($searchQuery);

		// Partition by ownership.
		$matched = [];
		foreach ($results as $node) {
			if (!($node instanceof File)) {
				continue;
			}
			try {
				$ownerUid = $node->getOwner()?->getUID();
			} catch (\Throwable) {
				$ownerUid = null;
			}
			$isOwned = $ownerUid === $userId;
			if ($ownedOnly === $isOwned) {
				$matched[] = $node;
			}
		}

		$total = count($matched);
		$slice = array_slice($matched, $offset, $limit);

		// Batch-load active editors and favourites for the page so we don't
		// issue one query per row.
		$fileIds = array_map(fn (File $node): int => $node->getId(), $slice);
		$editorsByFileId = $this->getActiveEditors($fileIds);
		$favouriteIds = $this->getFavouriteFileIds($userId, $fileIds);

		$items = [];
		foreach ($slice as $node) {
			$items[] = $this->serializeNode(
				$node,
				$userId,
				$userFolder,
				!$ownedOnly,
				$editorsByFileId[$node->getId()] ?? [],
				in_array($node->getId(), $favouriteIds, true),
			);
		}

		$nextOffset = ($offset + $limit) < $total ? ($offset + $limit) : null;

		return ['items' => $items, 'nextOffset' => $nextOffset];
	}

	/**
	 * Project a file node into the JSON shape consumed by the frontend.
	 *
	 * @param list<array{uid: ?string, displayName: string}> $currentEditors
	 *
	 * @return array<string, mixed>
	 */
	private function serializeNode(File $node, string $userId, Folder $userFolder, bool $includeShareSource, array $currentEditors, bool $favorite): array {
		$relPath = $userFolder->getRelativePath($node->getPath()) ?? $node->getName();
		$folder = ltrim(dirname($relPath), '.');
		if ($folder === '' || $folder === '/') {
			$folder = '/';
		}

		$ownerUid = null;
		$ownerDisplay = null;
		try {
			$owner = $node->getOwner();
			if ($owner !== null) {
				$ownerUid = $owner->getUID();
				$ownerDisplay = $owner->getDisplayName();
			}
		} catch (\Throwable) {
			// owner unavailable for some federated mounts
		}

		$shareSource = null;
		if ($includeShareSource) {
			$shareSource = $this->resolveShareSource($node, $userId);
		}

		return [
			'fileid' => $node->getId(),
			'name' => $node->getName(),
			'path' => $relPath,
			'folder' => $folder,
			'mimetype' => $node->getMimeType(),
			'size' => $node->getSize(),
			'mtime' => $node->getMTime(),
			'modifiedBy' => [
				'uid' => $ownerUid,
				'displayName' => $ownerDisplay ?? $ownerUid ?? '',
			],
			'thumbnailUrl' => $this->urlGenerator->linkToRoute('core.Preview.getPreviewByFileId', [
				'fileId' => $node->getId(),
				'x' => 64,
				'y' => 64,
				'a' => 1,
				'forceIcon' => 1,
			]),
			'openUrl' => $this->urlGenerator->linkToRoute('richdocuments.document.index', [
				'fileId' => $node->getId(),
			]),
			'shareSource' => $shareSource,
			'currentEditors' => $currentEditors,
			'favorite' => $favorite,
		];
	}

	/**
	 * @return array<string, mixed>
	 */
	private function serializeTemplate(File $file): array {
		return [
			'fileid' => $file->getId(),
			'name' => $file->getName(),
			'mimetype' => $file->getMimeType(),
			'extension' => pathinfo($file->getName(), PATHINFO_EXTENSION),
			'thumbnailUrl' => $this->urlGenerator->linkToRoute('richdocuments.templates.getPreview', [
				'fileId' => $file->getId(),
				'x' => 96,
				'y' => 96,
			]),
		];
	}

	/**
	 * Toggle the user's "favourite" status for the given file. The frontend
	 * uses this to pin documents to the top of the overview lists.
	 *
	 * Validates that the user can actually see the file before tagging,
	 * to avoid letting one user mark another's file as a favourite via a
	 * guessed file id.
	 *
	 * @throws NotFoundException when the file is not visible to this user
	 */
	public function setFavourite(string $userId, int $fileId, bool $favourite): void {
		$userFolder = $this->rootFolder->getUserFolder($userId);
		$node = $userFolder->getFirstNodeById($fileId);
		if ($node === null) {
			throw new NotFoundException();
		}
		$tags = $this->tagManager->load('files', [], false, $userId);
		if ($favourite) {
			$tags->addToFavorites($fileId);
		} else {
			$tags->removeFromFavorites($fileId);
		}
	}

	/**
	 * Filter the given file ids down to those tagged as favourite by the
	 * current user.
	 *
	 * @param list<int> $fileIds
	 * @return list<int>
	 */
	private function getFavouriteFileIds(string $userId, array $fileIds): array {
		if ($fileIds === []) {
			return [];
		}
		try {
			$tags = $this->tagManager->load('files', [], false, $userId);
			$favouriteIds = $tags->getFavorites();
		} catch (\Throwable) {
			return [];
		}
		return array_values(array_intersect($fileIds, array_map('intval', $favouriteIds)));
	}

	/**
	 * Look up users currently holding a non-expired writable WOPI token for
	 * each given file id. The richdocuments_wopi table grows on every open
	 * and entries are aged out by `expiry`; a non-expired write token is the
	 * best proxy we have for "someone is editing this right now."
	 *
	 * Edge cases: a user who closes their browser without an explicit
	 * disconnect will still appear as an editor until the token expires.
	 * That's accepted; the alternative (live presence pings) is out of
	 * scope for v1 and would require an event channel.
	 *
	 * @param list<int> $fileIds
	 * @return array<int, list<array{uid: ?string, displayName: string}>>
	 */
	private function getActiveEditors(array $fileIds): array {
		if ($fileIds === []) {
			return [];
		}
		$now = $this->timeFactory->getTime();

		$qb = $this->db->getQueryBuilder();
		$qb->selectDistinct(['fileid', 'editor_uid', 'guest_displayname'])
			->from('richdocuments_wopi')
			->where($qb->expr()->in('fileid', $qb->createNamedParameter($fileIds, IQueryBuilder::PARAM_INT_ARRAY)))
			->andWhere($qb->expr()->eq('canwrite', $qb->createNamedParameter(true, IQueryBuilder::PARAM_BOOL)))
			->andWhere($qb->expr()->gt('expiry', $qb->createNamedParameter($now, IQueryBuilder::PARAM_INT)));

		$result = $qb->executeQuery();

		// Aggregate, deduping by uid (or by guest display name when uid is null).
		/** @var array<int, array<string, array{uid: ?string, displayName: string}>> $byFile */
		$byFile = [];
		while ($row = $result->fetch()) {
			$fileId = (int)$row['fileid'];
			$editorUid = $row['editor_uid'] !== null && $row['editor_uid'] !== '' ? (string)$row['editor_uid'] : null;
			$guestName = $row['guest_displayname'] !== null ? (string)$row['guest_displayname'] : '';
			$key = $editorUid ?? ('guest:' . $guestName);
			if ($key === 'guest:') {
				continue;
			}
			$byFile[$fileId][$key] = [
				'uid' => $editorUid,
				'displayName' => $editorUid !== null
					? ($this->userManager->get($editorUid)?->getDisplayName() ?? $editorUid)
					: $guestName,
			];
		}
		$result->closeCursor();

		// Drop the dedup keys; preserve a stable, alphabetical order so the
		// frontend renders consistently across reloads.
		$out = [];
		foreach ($byFile as $fileId => $editors) {
			$values = array_values($editors);
			usort($values, fn (array $a, array $b): int => strnatcasecmp($a['displayName'], $b['displayName']));
			$out[$fileId] = $values;
		}
		return $out;
	}

	/**
	 * Map a frontend filter key (e.g. "documents") to the mime list used in
	 * the search predicate. Unknown / null falls back to the full set.
	 *
	 * @return list<string>
	 */
	private function resolveTypeFilter(?string $type): array {
		if ($type === null || $type === '' || $type === 'all') {
			return self::ALLOWED_MIMETYPES;
		}
		return self::TYPE_GROUPS[$type] ?? self::ALLOWED_MIMETYPES;
	}

	/**
	 * Variant of resolveTypeFilter() for templates: extends each office
	 * group with the matching .ott / .ots / .otp / .dotx etc. template
	 * mime types so user-saved template files are included.
	 *
	 * @param list<string> $base full allowed mime list (no type filter)
	 * @return list<string>
	 */
	private function resolveTemplateTypeFilter(?string $type, array $base): array {
		if ($type === null || $type === '' || $type === 'all') {
			return $base;
		}
		// Templates can never be PDF; gracefully ignore.
		if ($type === 'pdfs') {
			return [];
		}
		$mimes = self::TYPE_GROUPS[$type] ?? null;
		if ($mimes === null) {
			return $base;
		}
		return match ($type) {
			'documents' => array_values(array_unique(array_merge($mimes, TemplateManager::MIMES_DOCUMENTS))),
			'spreadsheets' => array_values(array_unique(array_merge($mimes, TemplateManager::MIMES_SHEETS))),
			'presentations' => array_values(array_unique(array_merge($mimes, TemplateManager::MIMES_PRESENTATIONS))),
			default => $base,
		};
	}

	/**
	 * Best-effort lookup of the share that brought a node into the user's
	 * folder. Used to label "Shared with me" rows with share metadata.
	 *
	 * Federated remote-server detection is left null for v1 because the
	 * IShare interface exposes the federated source only on dedicated
	 * external-share entries; we surface what we have today and degrade
	 * gracefully on missing fields.
	 *
	 * @return array{type: string, displayName: string, remoteServer: ?string}|null
	 */
	private function resolveShareSource(File $node, string $userId): ?array {
		$types = [
			IShare::TYPE_USER,
			IShare::TYPE_GROUP,
			IShare::TYPE_CIRCLE,
			IShare::TYPE_REMOTE,
			IShare::TYPE_REMOTE_GROUP,
		];

		foreach ($types as $type) {
			try {
				$shares = $this->shareManager->getSharedWith($userId, $type, $node, 1, 0);
			} catch (\Throwable) {
				continue;
			}
			foreach ($shares as $share) {
				$ownerUid = $share->getShareOwner();
				$ownerDisplay = $ownerUid;
				$ownerUser = $this->userManager->get($ownerUid);
				if ($ownerUser !== null) {
					$ownerDisplay = $ownerUser->getDisplayName();
				}
				$remoteServer = null;
				if ($type === IShare::TYPE_REMOTE || $type === IShare::TYPE_REMOTE_GROUP) {
					// Federated share owners are stored as user@server.
					if (str_contains((string)$ownerUid, '@')) {
						$remoteServer = substr($ownerUid, strrpos($ownerUid, '@') + 1);
					}
				}
				return [
					'type' => $this->shareTypeLabel($type),
					'displayName' => $ownerDisplay ?: (string)$ownerUid,
					'remoteServer' => $remoteServer,
				];
			}
		}
		return null;
	}

	private function shareTypeLabel(int $type): string {
		return match ($type) {
			IShare::TYPE_USER => 'user',
			IShare::TYPE_GROUP => 'group',
			IShare::TYPE_CIRCLE => 'circle',
			IShare::TYPE_REMOTE, IShare::TYPE_REMOTE_GROUP => 'federated',
			default => 'user',
		};
	}

	/**
	 * Strip path separators / control characters / leading dots from a
	 * user-supplied filename. The caller appends the extension separately.
	 */
	private function sanitizeFilename(string $name): string {
		$name = trim($name);
		// Disallow path traversal and shell-meta characters.
		$name = preg_replace('#[\\\\/\\x00-\\x1F\\x7F]#u', '', $name) ?? '';
		$name = ltrim($name, '.');
		// Avoid Windows-reserved names just in case.
		if (preg_match('/^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i', $name)) {
			$name = '_' . $name;
		}
		// Cap length so we never exceed OS / DB limits.
		if (mb_strlen($name) > 200) {
			$name = mb_substr($name, 0, 200);
		}
		return $name;
	}

	private function escapeLike(string $value): string {
		// Backslash-escape the LIKE wildcards so user input can't broaden the search.
		return addcslashes($value, '\\%_');
	}

	private function extensionFromMime(string $mime): ?string {
		return match ($mime) {
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'docx',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' => 'xlsx',
			'application/vnd.openxmlformats-officedocument.presentationml.presentation' => 'pptx',
			'application/vnd.oasis.opendocument.text', 'application/vnd.oasis.opendocument.text-template' => 'odt',
			'application/vnd.oasis.opendocument.spreadsheet', 'application/vnd.oasis.opendocument.spreadsheet-template' => 'ods',
			'application/vnd.oasis.opendocument.presentation', 'application/vnd.oasis.opendocument.presentation-template' => 'odp',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.template' => 'docx',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.template' => 'xlsx',
			'application/vnd.openxmlformats-officedocument.presentationml.template' => 'pptx',
			default => null,
		};
	}
}
