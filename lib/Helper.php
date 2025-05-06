<?php
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
	 * @param string|null $userId
	 */
	public function __construct(
		private $userId,
	) {
	}

	/**
	 * @param string $fileId
	 * @return array
	 * @throws \Exception
	 */
	public static function parseFileId(string $fileId) {
		$arr = explode('_', $fileId);
		$templateId = null;
		if (count($arr) === 1) {
			$fileId = $arr[0];
			$instanceId = '';
			$version = '0';
		} elseif (count($arr) === 2) {
			[$fileId, $instanceId] = $arr;
			$version = '0';
		} elseif (count($arr) === 3) {
			[$fileId, $instanceId, $version] = $arr;
		} else {
			throw new \Exception('$fileId has not the expected format');
		}

		if (str_contains($fileId, '-')) {
			[$fileId, $templateId] = array_pad(explode('/', $fileId), 2, null);
		}

		return [
			$fileId,
			$instanceId,
			$version,
			$templateId
		];
	}

	/**
	 * WOPI helper function to convert to ISO 8601 round-trip format.
	 * @param integer $time Must be seconds since unix epoch
	 */
	public static function toISO8601($time) {
		// TODO: Be more precise and don't ignore milli, micro seconds ?
		$datetime = DateTime::createFromFormat('U', $time, new DateTimeZone('UTC'));
		if ($datetime) {
			return $datetime->format('Y-m-d\TH:i:s.u\Z');
		}

		return false;
	}

	public static function getNewFileName(Folder $folder, $filename) {
		$fileNum = 1;

		while ($folder->nodeExists($filename)) {
			$fileNum++;
			$filename = preg_replace('/(\.| \(\d+\)\.)([^.]*)$/', ' (' . $fileNum . ').$2', $filename);
		}

		return $filename;
	}

	public function getGuestNameFromCookie() {
		if ($this->userId !== null || !isset($_COOKIE['guestUser']) || $_COOKIE['guestUser'] === '') {
			return null;
		}
		return $_COOKIE['guestUser'];
	}

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
