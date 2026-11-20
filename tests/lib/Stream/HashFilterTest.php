<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments\Stream;

use OCA\Richdocuments\Stream\HashFilter;
use PHPUnit\Framework\TestCase;

class HashFilterTest extends TestCase {
	/**
	 * @return resource
	 */
	private function streamOf(string $content) {
		$stream = fopen('php://temp', 'r+');
		fwrite($stream, $content);
		rewind($stream);
		return $stream;
	}

	public function testHashesWhatPassesThroughWithoutAlteringIt(): void {
		// Longer than a stream chunk, so that the digest spans several buckets.
		$content = random_bytes(3 * 8192 + 123);
		$source = $this->streamOf($content);
		$digest = null;
		$this->assertTrue(HashFilter::attach($source, 'sha256', function (string $hex) use (&$digest): void {
			$digest = $hex;
		}));

		$target = fopen('php://temp', 'r+');
		stream_copy_to_stream($source, $target);
		rewind($target);

		$this->assertSame($content, stream_get_contents($target));
		$this->assertSame(hash('sha256', $content), $digest);
	}

	public function testHashesAnEmptyStream(): void {
		$source = $this->streamOf('');
		$digest = null;
		HashFilter::attach($source, 'sha256', function (string $hex) use (&$digest): void {
			$digest = $hex;
		});

		$this->assertSame('', stream_get_contents($source));
		$this->assertSame(hash('sha256', ''), $digest);
	}

	/**
	 * php://input, like a socket, reports EOF only on a read that returns nothing,
	 * and a read may return less than the whole body. The digest must wait for
	 * that final read: until then the body may still be incomplete.
	 */
	public function testWaitsForTheEndOfAStreamFedFromElsewhere(): void {
		[$reader, $writer] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, STREAM_IPPROTO_IP);
		stream_set_blocking($reader, false);
		$content = str_repeat('a', 100);
		$digest = null;
		HashFilter::attach($reader, 'sha256', function (string $hex) use (&$digest): void {
			$digest = $hex;
		});

		fwrite($writer, $content);
		$this->assertSame($content, fread($reader, 8192));
		$this->assertNull($digest, 'no digest while the stream may still deliver more');

		fclose($writer);
		$this->assertSame('', fread($reader, 8192));
		$this->assertSame(hash('sha256', $content), $digest);
		fclose($reader);
	}

	public function testSupportsOtherAlgorithms(): void {
		$source = $this->streamOf('hello');
		$digest = null;
		HashFilter::attach($source, 'md5', function (string $hex) use (&$digest): void {
			$digest = $hex;
		});

		stream_get_contents($source);

		$this->assertSame(md5('hello'), $digest);
	}
}
