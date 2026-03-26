<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\Richdocuments\Service;

use DateTime;
use DateTimeImmutable;
use phpseclib3\Crypt\PublicKeyLoader;
use phpseclib3\Crypt\RSA;
use phpseclib3\Math\BigInteger;
use Throwable;

class ProofKeyService {
	// Offset between the .NET epoch (01-01-0001 00:00:00 UTC)
	// and the Unix epoch (01-01-1970 00:00:00 UTC)
	// in 100-nanosecond intervals
	private const EPOCH_OFFSET = 621355968000000000;

	public function __construct(
		private DiscoveryService $discoveryService,
	) {
	}

	public function isProofValid(string $accessToken, string $url, string $wopiTimestamp, string $proof, string $proofOld): bool {
		$expected = $this->constructProof(
			$accessToken,
			$url,
			$wopiTimestamp
		);

		$proofKey = $this->discoveryService->getProofKey();
		$proofKeyOld = $this->discoveryService->getProofKeyOld();

		$key = $this->calculateRSAKey($proofKey->getModulus(), $proofKey->getExponent());
		$keyOld = $this->calculateRSAKey($proofKeyOld->getModulus(), $proofKeyOld->getExponent());

		$isValid = ($this->verifyKey($expected, $proof, $key) ||
					$this->verifyKey($expected, $proof, $keyOld) ||
					$this->verifyKey($expected, $proofOld, $key));

		return $isValid;
	}

	public function ticksToUnixTimestamp(int $ticks): int {
		// Subtract the epoch offset from the .NET ticks
		$unixTicks = $ticks - self::EPOCH_OFFSET;

		// Divide that by 1e7 to convert from 100ns intervals to seconds
		$unixTimestamp = intdiv($unixTicks, 10000000);

		// That leaves us with the Unix timestamp
		return $unixTimestamp;
	}

	public function isOldTimestamp(int $unixTimestamp): bool {
		$timestampDateTime = new DateTime();
		$timestampDateTime->setTimestamp($unixTimestamp);

		$now = new DateTimeImmutable();
		$controlDateTime = $now->modify('-20 minutes');

		// The timestamp is old if it is from over 20 minutes ago
		if ($timestampDateTime < $controlDateTime) {
			return true;
		}

		return false;
	}

	private function calculateRSAKey(string $modulus, string $exponent): string {
		$rsa = PublicKeyLoader::load([
			'e' => new BigInteger(base64_decode($exponent, true), 256),
			'n' => new BigInteger(base64_decode($modulus, true), 256),
		]);

		return (string)$rsa->__toString();
	}

	private function constructProof(
		string $accessToken,
		string $url,
		string $wopiTimeStamp,
	): string {
		// Four bytes representing the length, in bytes, of the access token
		$accessTokenLength = pack('N', strlen($accessToken));

		// The access token in UTF-8 encoding
		$accessToken = mb_convert_encoding($accessToken, 'UTF-8', 'auto');

		// Four bytes representing the length, in bytes, of the URL
		$urlLength = pack('N', strlen($url));

		// The UTF-8 encoded URL converted to uppercase
		$uppercaseURL = mb_strtoupper(mb_convert_encoding($url, 'UTF-8', 'auto'), 'UTF-8');

		// Four bytes representing the size, in bytes, of the WOPI timestamp
		//     Note: The WOPI timestamp should be converted to a long, so this
		//           is architecture dependant (here we use PHP_INT_SIZE)
		$wopiTimestampSize = pack('N', PHP_INT_SIZE);

		// The WOPI timestamp converted to a long (in PHP we use int)
		$wopiTimestamp = pack('J', $wopiTimeStamp);

		return sprintf(
			'%s%s%s%s%s%s',
			$accessTokenLength,
			$accessToken,
			$urlLength,
			$uppercaseURL,
			$wopiTimestampSize,
			$wopiTimestamp
		);
	}

	private function verifyKey(string $expected, string $proof, string $proofKey): bool {
		try {
			/** @var RSA\PublicKey */
			$key = PublicKeyLoader::loadPublicKey($proofKey);
		} catch (Throwable $e) {
			return false;
		}

		$proof = (string)base64_decode($proof, true);

		$key = $key->withHash('sha256');
		$key = $key->withPadding(RSA::SIGNATURE_PKCS1);

		return $key->verify($expected, $proof);
	}
}
