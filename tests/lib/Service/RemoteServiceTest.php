<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments\Service;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Service\CapabilitiesService;
use OCA\Richdocuments\Service\RemoteService;
use OCP\Http\Client\IClient;
use OCP\Http\Client\IClientService;
use OCP\Http\Client\IResponse;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class RemoteServiceTest extends TestCase {
	private AppConfig&MockObject $appConfig;
	private IClientService&MockObject $clientService;
	private IClient&MockObject $client;
	private CapabilitiesService&MockObject $capabilitiesService;
	private LoggerInterface&MockObject $logger;
	private RemoteService $service;

	protected function setUp(): void {
		parent::setUp();

		$this->appConfig = $this->createMock(AppConfig::class);
		$this->clientService = $this->createMock(IClientService::class);
		$this->client = $this->createMock(IClient::class);
		$this->capabilitiesService = $this->createMock(CapabilitiesService::class);
		$this->logger = $this->createMock(LoggerInterface::class);

		$this->clientService->method('newClient')
			->willReturn($this->client);

		$this->service = new RemoteService(
			$this->appConfig,
			$this->clientService,
			$this->capabilitiesService,
			$this->logger,
		);
	}

	public function testConvertToSendsConversionOptionsAsMultipartFields(): void {
		$stream = fopen('php://memory', 'r+');
		$response = $this->createMock(IResponse::class);

		$this->appConfig->method('getCollaboraUrlInternal')
			->willReturn('http://cool.example');
		$this->appConfig->method('getDisableCertificateValidation')
			->willReturn(false);
		$response->method('getBody')
			->willReturn('converted-content');

		$this->client->expects($this->once())
			->method('post')
			->with(
				'http://cool.example/cool/convert-to/pdf',
				$this->callback(function (array $options) use ($stream): bool {
					$this->assertSame([
						[
							'name' => 'document.xlsx',
							'filename' => 'document.xlsx',
							'contents' => $stream,
						],
						[
							'name' => 'lang',
							'contents' => 'de-DE',
						],
					], $options['multipart']);

					return true;
				})
			)
			->willReturn($response);

		$result = $this->service->convertTo('document.xlsx', $stream, 'pdf', ['lang' => 'de-DE']);

		$this->assertSame('converted-content', $result);
	}
}
