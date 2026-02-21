<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments\Preview;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Capabilities;
use OCA\Richdocuments\Preview\Office;
use OCA\Richdocuments\Service\RemoteService;
use OCP\Files\File;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class OfficeTest extends TestCase {
	private RemoteService&MockObject $remoteService;
	private LoggerInterface&MockObject $logger;
	private AppConfig&MockObject $appConfig;
	private Capabilities&MockObject $capabilities;
	private Office $provider;

	protected function setUp(): void {
		parent::setUp();

		$this->remoteService = $this->createMock(RemoteService::class);
		$this->logger = $this->createMock(LoggerInterface::class);
		$this->appConfig = $this->createMock(AppConfig::class);
		$this->capabilities = $this->createMock(Capabilities::class);
		$this->capabilities->method('getCapabilities')->willReturn(['richdocuments' => []]);

		$this->provider = new class($this->remoteService, $this->logger, $this->appConfig, $this->capabilities) extends Office {
			#[\Override]
			public function getMimeType(): string {
				return '/application\\/test/';
			}
		};
	}

	public function testGetThumbnailSkipsConversionWhenFileIsTooLarge(): void {
		$file = $this->createMock(File::class);
		$file->expects($this->once())->method('getSize')->willReturn(101 * 1024 * 1024);

		$this->appConfig->expects($this->once())
			->method('getPreviewConversionMaxFileSize')
			->willReturn(100 * 1024 * 1024);
		$this->remoteService->expects($this->never())->method('convertFileTo');

		$result = $this->provider->getThumbnail($file, 64, 64);

		$this->assertNull($result);
	}

	public function testGetThumbnailReturnsNullForEmptyFile(): void {
		$file = $this->createMock(File::class);
		$file->expects($this->once())->method('getSize')->willReturn(0);

		$this->appConfig->expects($this->never())->method('getPreviewConversionMaxFileSize');
		$this->remoteService->expects($this->never())->method('convertFileTo');

		$result = $this->provider->getThumbnail($file, 64, 64);

		$this->assertNull($result);
	}

	public function testGetThumbnailAttemptsConversionWhenFileSizeIsExactlyAtLimit(): void {
		$file = $this->createMock(File::class);
		$file->expects($this->once())->method('getSize')->willReturn(100 * 1024 * 1024);

		$this->appConfig->expects($this->once())
			->method('getPreviewConversionMaxFileSize')
			->willReturn(100 * 1024 * 1024);
		// Conversion is attempted; throw to keep the test simple (image loading is not unit-tested here)
		$this->remoteService->expects($this->once())
			->method('convertFileTo')
			->with($file, 'png')
			->willThrowException(new \Exception('conversion failed'));

		$result = $this->provider->getThumbnail($file, 64, 64);

		$this->assertNull($result);
	}

	public function testGetThumbnailReturnsNullWhenConversionFails(): void {
		$file = $this->createMock(File::class);
		$file->expects($this->once())->method('getSize')->willReturn(1024);

		$this->appConfig->expects($this->once())
			->method('getPreviewConversionMaxFileSize')
			->willReturn(100 * 1024 * 1024);
		$this->remoteService->expects($this->once())
			->method('convertFileTo')
			->with($file, 'png')
			->willThrowException(new \Exception('conversion failed'));

		$result = $this->provider->getThumbnail($file, 64, 64);

		$this->assertNull($result);
	}
}
