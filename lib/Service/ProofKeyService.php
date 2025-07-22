<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\Richdocuments\Service;

use DateTime;
use DateTimeImmutable;

class ProofKeyService {
	// The Windows epoch is used for WOPI timestamps (as it is a MS protocol)
	//     Notes: According to the MS documentation it begins on 01-01-0001
	//            but all evidence in practice points to 01-01-1601
	private const WINDOWS_EPOCH = '01-01-1601 00:00:00';
	private const UNIX_EPOCH = '01-01-1970 00:00:00';

	public function __construct() {
	}

	public function verifyProof(
		string $accessToken,
		string $url,
		string $wopiTimeStamp,
	): bool {
		return false;
	}

	public function windowsToUnixTimestamp(string $windowsTimestamp): string {
		// Convert the epochs to timestamps
		$windowsEpoch = strtotime(self::WINDOWS_EPOCH);
		$unixEpoch = strtotime(self::UNIX_EPOCH);

		// Calculate the difference between the Unix and Windows epochs in seconds
		$epochOffset = (float)($unixEpoch - $windowsEpoch);

		// Convert the Windows timestamp from 100-nanoseconds intervals to seconds
		$windowsTimestampSeconds = ((float)$windowsTimestamp) / 1e7;
		
		// Finally, subtract the number of seconds between the Windows and Unix epochs
		// from the number of seconds in the given Windows timestamp
		$convertedWindowsTimestamp = (int)($windowsTimestampSeconds - $epochOffset);

		return (string)$convertedWindowsTimestamp;
	}

	public function isOldTimestamp(int $timestamp): bool {
		$timestampDateTime = new DateTime();
		$timestampDateTime->setTimestamp($timestamp);

		$now = new DateTimeImmutable();
		$controlDateTime = $now->modify('-20 minutes');

		// The timestamp is old if it is from over 20 minutes ago
		if ($timestampDateTime < $controlDateTime) {
			return true;
		}

		return false;
	}
}
