<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Service\CapabilitiesService;
use OCA\Richdocuments\Service\PdfService;
use OCA\Richdocuments\Service\RemoteService;
use OCA\Richdocuments\Service\TemplateFieldService;
use OCP\Files\File;
use OCP\Files\IRootFolder;
use OCP\Files\Storage\IStorage;
use OCP\ICache;
use OCP\ICacheFactory;
use OCP\ITempManager;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class TemplateFieldServiceTest extends TestCase {
	private IRootFolder&MockObject $rootFolder;
	private ICacheFactory&MockObject $cacheFactory;
	private ICache&MockObject $cache;
	private RemoteService&MockObject $remoteService;
	private LoggerInterface&MockObject $logger;
	private TemplateFieldService $service;

	protected function setUp(): void {
		parent::setUp();
		$this->rootFolder = $this->createMock(IRootFolder::class);
		$this->cacheFactory = $this->createMock(ICacheFactory::class);
		$this->cache = $this->createMock(ICache::class);
		$this->remoteService = $this->createMock(RemoteService::class);
		$this->logger = $this->createMock(LoggerInterface::class);

		$this->cacheFactory->method('createLocal')->willReturn($this->cache);
		$this->cache->method('get')->willReturn(null);

		$this->service = new TemplateFieldService(
			$this->createMock(\OCP\Http\Client\IClientService::class),
			$this->createMock(CapabilitiesService::class),
			$this->createMock(AppConfig::class),
			$this->rootFolder,
			$this->logger,
			$this->cacheFactory,
			$this->remoteService,
			$this->createMock(ITempManager::class),
			$this->createMock(PdfService::class),
			'testuser',
		);
	}

	private function createFileMock(string $mimetype): File&MockObject {
		$storage = $this->createMock(IStorage::class);
		$storage->method('fopen')->willReturn(fopen('php://memory', 'r'));

		$file = $this->createMock(File::class);
		$file->method('getId')->willReturn(42);
		$file->method('getEtag')->willReturn('etag-42');
		$file->method('getName')->willReturn('template.docx');
		$file->method('getInternalPath')->willReturn('files/template.docx');
		$file->method('getMimetype')->willReturn($mimetype);
		$file->method('getStorage')->willReturn($storage);

		return $file;
	}

	public function testExtractFieldsReturnsEmptyForUnsupportedMimetype(): void {
		$file = $this->createFileMock('application/octet-stream');

		$this->remoteService->expects($this->never())->method('extractDocumentStructure');

		$result = $this->service->extractFields($file);
		$this->assertEquals([], $result);
	}

	public function testExtractFieldsCallsRemoteServiceForOdfMimetype(): void {
		$file = $this->createFileMock('application/vnd.oasis.opendocument.text');

		$this->remoteService->expects($this->once())
			->method('extractDocumentStructure')
			->willReturn([]);

		$this->service->extractFields($file);
	}

	public function testExtractFieldsCallsRemoteServiceForOoxmlMimetype(): void {
		$file = $this->createFileMock('application/vnd.openxmlformats-officedocument.wordprocessingml.document');

		$this->remoteService->expects($this->once())
			->method('extractDocumentStructure')
			->willReturn([]);

		$this->service->extractFields($file);
	}
}
