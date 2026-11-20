<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Stream;

/**
 * A read filter that hashes the bytes passing through a stream without
 * altering them, and hands the digest to a callback once the stream has been
 * read to its end.
 *
 * It lets a request body be hashed while it is being written to storage at no
 * extra read: whoever consumes the stream sees exactly the bytes it would have
 * seen without the filter.
 *
 * The callback runs only once the underlying stream has reported EOF, so the
 * digest always describes the whole of what the stream held. A stream that is
 * closed before that, because the copy failed midway, yields no digest at all
 * rather than the digest of a truncated body.
 */
class HashFilter extends \php_user_filter {
	private const NAME = 'richdocuments.hash';

	private ?\HashContext $context = null;
	private bool $done = false;

	/**
	 * Attach a hashing filter to a readable stream.
	 *
	 * @param resource $stream the stream about to be read
	 * @param string $algo any algorithm hash_init() accepts, such as 'sha256'
	 * @param callable(string): void $onDigest receives the lowercase hex digest
	 *                                         once the stream has reported EOF
	 * @return bool whether the filter is in place
	 */
	public static function attach($stream, string $algo, callable $onDigest): bool {
		if (!in_array(self::NAME, stream_get_filters(), true) && !stream_filter_register(self::NAME, self::class)) {
			return false;
		}

		return stream_filter_append($stream, self::NAME, STREAM_FILTER_READ, [
			'algo' => $algo,
			'onDigest' => $onDigest,
		]) !== false;
	}

	#[\Override]
	public function onCreate(): bool {
		if (!is_array($this->params) || !is_string($this->params['algo'] ?? null) || !is_callable($this->params['onDigest'] ?? null)) {
			return false;
		}

		$this->context = hash_init($this->params['algo']);
		return true;
	}

	#[\Override]
	public function filter($in, $out, &$consumed, bool $closing): int {
		if ($this->context === null) {
			return PSFS_ERR_FATAL;
		}

		while ($bucket = stream_bucket_make_writeable($in)) {
			hash_update($this->context, $bucket->data);
			$consumed += $bucket->datalen;
			stream_bucket_append($out, $bucket);
		}

		if ($closing) {
			$this->finish();
		}

		return PSFS_PASS_ON;
	}

	private function finish(): void {
		if ($this->done || $this->context === null) {
			return;
		}

		$this->done = true;
		($this->params['onDigest'])(hash_final($this->context));
	}
}
