<?php
declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments;

use DateTime;
use DateTimeZone;
use OCA\Files_Sharing\SharedStorage;
use OCP\Files\Folder;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\Share\IShare;

class Helper {
	/**
	 * @param string|null $userId Current user ID, or null for guest sessions.
	 */
	public function __construct(
		private ?string $userId,
	) {
	}

	/**
	 * Parse the WOPI/richdocuments file identifier string.
	 *
	 * Breaks the WOPI-encoded file identifier into Nextcloud fileId and optional instanceId, version, and template parts.
	 *
	 * Format examples:
	 * - {fileId}
	 * - {fileId}_{instanceId}
	 * - {fileId}_{instanceId}_{version}
	 *
	 * For template-based documents, the file part contains a template marker and may be
	 * encoded as "{fileId}/{templateId}".
	 *
	 * @param string $fileId WOPI-encoded file identifier.
	 * @return array{0: string, 1: string, 2: string, 3: string|null}
	 * @throws \InvalidArgumentException If the identifier does not match the expected format.
	 */
	public static function parseFileId(string $fileId): array {
		$parts = explode('_', $fileId);

		if (count($parts) > 3) {
			throw new \InvalidArgumentException('$fileId does not match the expected format');
		}

		$fileIdPart = $parts[0];
		$instanceId = $parts[1] ?? '';
		$version = $parts[2] ?? '0';
		$templateId = null;

		$hasTemplateMarker = str_contains($fileIdPart, '-');
		if ($hasTemplateMarker) {
			[$fileIdPart, $templateId] = array_pad(explode('/', $fileIdPart, 2), 2, null);
		}

		return [$fileIdPart, $instanceId, $version, $templateId];
	}

	/**
	 * Convert a Unix timestamp to WOPI's ISO 8601 round-trip format.
	 *
	 * @param int $time Seconds since the Unix epoch.
	 * @return string|false Formatted timestamp, or false if conversion fails.
	 */
	public static function toISO8601(int $time): string|false {
		$datetime = DateTime::createFromFormat('U', (string)$time, new DateTimeZone('UTC'));
		if ($datetime) {
			return $datetime->format('Y-m-d\TH:i:s.u\Z');
		}

		return false;
	}

	/**
	 * Return a unique file name by appending an incrementing suffix if needed.
	 *
	 * @param Folder $folder Folder to check for name collisions.
	 * @param string $filename Proposed file name.
	 * @return string Collision-free file name.
	 * @throws \RuntimeException If regex/PCRE outright fails (unlikely).
	 */
	public static function getNewFileName(Folder $folder, string $filename): string {
		$fileNum = 1;

		while ($folder->nodeExists($filename)) {
			$fileNum++;
			$newFilename = preg_replace('/(\.| \(\d+\)\.)([^.]*)$/', ' (' . $fileNum . ').$2', $filename);

			if ($newFilename === null) {
				// unlikely unless regex is broken
				throw new \RuntimeException('Failed to generate a unique filename');
			}

			$filename = $newFilename;
		}

		return $filename;
	}

	/**
	 * Resolve the share associated with a node from shared storage.
	 *
	 * TODO: Put this elsewhere.
	 *
	 * @param Node $node File node to inspect.
	 * @return IShare|null The share backing the node, or null if it is not shared.
	 */
	public function getShareFromNode(Node $node): ?IShare {
		try {
			$storage = $node->getStorage();
		} catch (NotFoundException) {
			return null;
		}
		if ($storage->instanceOfStorage(SharedStorage::class)) {
			/** @var SharedStorage $storage */
			return $storage->getShare();
		}
		return null;
	}
}
