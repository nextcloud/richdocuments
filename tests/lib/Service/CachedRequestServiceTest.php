<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments;

use OCA\Richdocuments\Service\CachedRequestService;
use OCP\Files\AppData\IAppDataFactory;
use OCP\Files\IAppData;
use OCP\Files\SimpleFS\ISimpleFile;
use OCP\Files\SimpleFS\ISimpleFolder;
use OCP\Http\Client\IClient;
use OCP\Http\Client\IClientService;
use OCP\IAppConfig;
use OCP\ICache;
use OCP\ICacheFactory;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

// Test double for CachedRequestService (abstract)
class TestCachedRequestService extends CachedRequestService {
	public string $responseToReturn = 'default-response';

	protected function sendRequest(IClient $client): string {
		return $this->responseToReturn;
	}
}

class CachedRequestServiceTest extends TestCase {
	private IClientService&MockObject $clientService;
	private ICacheFactory&MockObject $cacheFactory;
	private ICache&MockObject $cache;
	private IAppDataFactory&MockObject $appDataFactory;
	private IAppData&MockObject $appData;
	private ISimpleFolder&MockObject $folder;
	private ISimpleFile&MockObject $file;
	private IAppConfig&MockObject $appConfig;
	private LoggerInterface&MockObject $logger;
	private TestCachedRequestService $service;

	protected function setUp(): void {
		parent::setUp();
		$this->clientService = $this->createMock(IClientService::class);
		$this->cacheFactory = $this->createMock(ICacheFactory::class);
		$this->cache = $this->createMock(ICache::class);
		$this->appDataFactory = $this->createMock(IAppDataFactory::class);
		$this->appData = $this->createMock(IAppData::class);
		$this->folder = $this->createMock(ISimpleFolder::class);
		$this->file = $this->createMock(ISimpleFile::class);
		$this->appConfig = $this->createMock(IAppConfig::class);
		$this->logger = $this->createMock(LoggerInterface::class);

		$this->cacheFactory->method('createDistributed')->willReturn($this->cache);
		$this->appDataFactory->method('get')->willReturn($this->appData);
		$this->appData->method('getFolder')->willReturn($this->folder);

		$this->service = new TestCachedRequestService(
			$this->clientService,
			$this->cacheFactory,
			$this->appDataFactory,
			$this->appConfig,
			$this->logger,
			'unittest-cachekey'
		);
	}

	public function testFetchStoresToCacheAndReturnsResponse(): void {
		$this->cache->expects($this->once())
			->method('set')
			->with('unittest-cachekey', 'default-response');
		$this->folder->expects($this->once())
			->method('newFile')
			->with('unittest-cachekey', 'default-response');

		$result = $this->service->fetch();
		$this->assertEquals('default-response', $result);
	}

	public function testGetReturnsCachedValueIfPresent(): void {
		$this->cache->expects($this->once())
			->method('get')
			->with('unittest-cachekey')
			->willReturn('from-cache');
		$this->folder->expects($this->never())->method('fileExists');
		$this->folder->expects($this->never())->method('getFile');
		$this->cache->expects($this->never())->method('set');
		$result = $this->service->get();
		$this->assertEquals('from-cache', $result);
	}

	public function testGetReturnsFileValueIfCacheMiss(): void {
		$this->cache->expects($this->once())
			->method('get')
			->with('unittest-cachekey')
			->willReturn(null);
		$this->folder->expects($this->once())
			->method('fileExists')
			->with('unittest-cachekey')
			->willReturn(true);
		$this->folder->expects($this->once())
			->method('getFile')
			->with('unittest-cachekey')
			->willReturn($this->file);
		$this->file->expects($this->once())
			->method('getContent')
			->willReturn('from-file');
		$this->cache->expects($this->once())
			->method('set')
			->with('unittest-cachekey', 'from-file', 3600);

		$result = $this->service->get();
		$this->assertEquals('from-file', $result);
	}

	public function testResetCacheRemovesCacheAndFile(): void {
		$this->cache->expects($this->once())->method('remove')->with('unittest-cachekey');
		$this->folder->method('fileExists')->with('unittest-cachekey')->willReturn(true);
		$this->folder->method('getFile')->with('unittest-cachekey')->willReturn($this->file);
		$this->file->expects($this->once())->method('delete');

		$this->service->resetCache();
		$this->assertTrue(true); // No exceptions thrown
	}

	public function testGetLastUpdateReturnsMTimeIfFileExists(): void {
		$this->folder->expects($this->once())
			->method('fileExists')
			->with('unittest-cachekey')
			->willReturn(true);
		$this->folder->expects($this->once())
			->method('getFile')
			->with('unittest-cachekey')
			->willReturn($this->file);
		$this->file->expects($this->once())
			->method('getMTime')
			->willReturn(1700000000); // Some fake timestamp

		$result = $this->service->getLastUpdate();
		$this->assertEquals(1700000000, $result);
	}

	public function testGetLastUpdateReturnsNullIfFileDoesNotExist(): void {
		$this->folder->expects($this->once())
			->method('fileExists')
			->with('unittest-cachekey')
			->willReturn(false);
		$this->folder->expects($this->never())->method('getFile');
		$this->file->expects($this->never())->method('getMTime');

		$result = $this->service->getLastUpdate();
		$this->assertNull($result);
	}

	public function testFetchPropagatesExceptionAndLeavesCacheIntact(): void {
		// Set up a test double that throws
		$service = new class($this->clientService, $this->cacheFactory, $this->appDataFactory, $this->appConfig, $this->logger, 'unittest-cachekey') extends CachedRequestService {
			protected function sendRequest(IClient $client): string {
				throw new \RuntimeException('Remote endpoint unreachable!');
			}
		};

		// Existing cache should not be set, folder->newFile should not be called
		$this->cache->expects($this->never())->method('set');
		$this->folder->expects($this->never())->method('newFile');

		$this->expectException(\RuntimeException::class);
		$this->expectExceptionMessage('Remote endpoint unreachable!');
		$service->fetch();
	}
}
