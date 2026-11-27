<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Tests\Storage;

use OC\Files\Storage\Temporary;
use OC\Files\Storage\Wrapper\Jail;
use OCA\Richdocuments\Service\SecureViewService;
use OCA\Richdocuments\Storage\SecureViewWrapper;
use PHPUnit\Framework\MockObject\MockObject;
use Test\TestCase;

class DirectDownloadStorage extends Temporary {
	public const DOWNLOAD = ['url' => 'https://objectstore.example/signed', 'expiration' => 1];

	#[\Override]
	public function getDirectDownload(string $path): array|false {
		return self::DOWNLOAD;
	}

	#[\Override]
	public function getDirectDownloadById(string $fileId): array|false {
		return self::DOWNLOAD;
	}
}

/**
 * @group DB
 */
class SecureViewWrapperTest extends TestCase {
	private SecureViewService&MockObject $secureViewService;
	private DirectDownloadStorage $inner;
	private SecureViewWrapper $wrapper;
	private string $fileId;

	protected function setUp(): void {
		parent::setUp();

		$this->secureViewService = $this->createMock(SecureViewService::class);
		$this->overwriteService(SecureViewService::class, $this->secureViewService);

		$this->inner = new DirectDownloadStorage();
		$this->inner->mkdir('folder/sub');
		$this->inner->file_put_contents('folder/sub/document.odt', 'content');
		$this->inner->getScanner()->scan('');

		$jail = new Jail(['storage' => $this->inner, 'root' => 'folder']);
		$this->wrapper = new SecureViewWrapper(['storage' => $jail, 'mountPoint' => '/user/files/folder/']);
		$this->fileId = (string)$this->wrapper->getCache()->getId('sub/document.odt');
	}

	protected function tearDown(): void {
		$this->restoreService(SecureViewService::class);
		$this->inner->cleanUp();
		parent::tearDown();
	}

	public function testDirectDownloadIsKeptForFilesWithoutSecureView(): void {
		$this->secureViewService->method('shouldSecure')->willReturn(false);

		$this->assertSame(DirectDownloadStorage::DOWNLOAD, $this->wrapper->getDirectDownload('sub/document.odt'));
		$this->assertSame(DirectDownloadStorage::DOWNLOAD, $this->wrapper->getDirectDownloadById($this->fileId));
	}

	public function testNoDirectDownloadForFilesInSecureView(): void {
		$this->secureViewService->expects($this->exactly(2))
			->method('shouldSecure')
			->with('sub/document.odt', $this->wrapper, false)
			->willReturn(true);

		$this->assertFalse($this->wrapper->getDirectDownload('sub/document.odt'));
		$this->assertFalse($this->wrapper->getDirectDownloadById($this->fileId));
	}

	public function testNoDirectDownloadWhenTheCheckFails(): void {
		$this->secureViewService->method('shouldSecure')->willThrowException(new \RuntimeException('lookup failed'));

		$this->assertFalse($this->wrapper->getDirectDownloadById($this->fileId));
	}

	public function testNoDirectDownloadForFilesOutsideTheStorage(): void {
		$this->secureViewService->expects($this->never())->method('shouldSecure');

		$this->assertFalse($this->wrapper->getDirectDownloadById('-1'));
	}

	public function testSkipsTheCheckWithoutDirectDownload(): void {
		$this->secureViewService->expects($this->never())->method('shouldSecure');
		$wrapper = new SecureViewWrapper(['storage' => new Temporary(), 'mountPoint' => '/user/files/']);

		$this->assertFalse($wrapper->getDirectDownloadById($this->fileId));
	}
}
