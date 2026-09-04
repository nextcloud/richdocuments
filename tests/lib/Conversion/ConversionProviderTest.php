<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments\Conversion;

use OCA\Richdocuments\Conversion\ConversionProvider;
use OCA\Richdocuments\Service\RemoteOptionsService;
use OCA\Richdocuments\Service\RemoteService;
use OCA\Richdocuments\Service\SecureViewService;
use OCP\Files\File;
use OCP\IL10N;
use OCP\L10N\IFactory;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class ConversionProviderTest extends TestCase {
	private RemoteService&MockObject $remoteService;
	private LoggerInterface&MockObject $logger;
	private IFactory&MockObject $l10nFactory;
	private IL10N&MockObject $l10n;
	private SecureViewService&MockObject $secureViewService;
	private ConversionProvider $provider;

	protected function setUp(): void {
		parent::setUp();

		$this->remoteService = $this->createMock(RemoteService::class);
		$this->logger = $this->createMock(LoggerInterface::class);
		$this->l10nFactory = $this->createMock(IFactory::class);
		$this->l10n = $this->createMock(IL10N::class);
		$this->secureViewService = $this->createMock(SecureViewService::class);

		$this->l10n->method('t')->willReturnCallback(static fn (string $text): string => $text);
		$this->l10nFactory->method('get')
			->with('richdocuments')
			->willReturn($this->l10n);

		$this->provider = new ConversionProvider(
			$this->remoteService,
			$this->logger,
			$this->l10nFactory,
			$this->secureViewService,
		);
	}

	public function testConvertFilePassesCurrentLocaleToCollabora(): void {
		$file = $this->createMock(File::class);

		$this->l10n->expects($this->once())
			->method('getLocaleCode')
			->willReturn('de_DE');
		$this->secureViewService->method('isEnabled')
			->willReturn(false);
		$this->remoteService->expects($this->once())
			->method('convertFileTo')
			->with($file, 'pdf', RemoteOptionsService::REMOTE_TIMEOUT_DEFAULT, ['lang' => 'de-DE'])
			->willReturn('pdf-content');

		$result = $this->provider->convertFile($file, 'application/pdf');

		$this->assertSame('pdf-content', $result);
	}
}
