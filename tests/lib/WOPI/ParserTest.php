<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments\WOPI;

use Exception;
use OCA\Richdocuments\Service\DiscoveryService;
use OCA\Richdocuments\WOPI\Parser;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class ParserTest extends TestCase {
	private DiscoveryService&MockObject $discoveryService;
	private LoggerInterface&MockObject $logger;

	private Parser $parser;

	protected function setUp(): void {
		parent::setUp();

		$this->discoveryService = $this->createMock(DiscoveryService::class);
		$this->logger = $this->createMock(LoggerInterface::class);

		$this->parser = new Parser($this->discoveryService, $this->logger);
	}

	public function testGetUrlSrcValue(): void {
		$discoveryXml = <<<END
		<wopi-discovery>
			<net-zone name="external-http">
				<app name="application/vnd.oasis.opendocument.text">
					<action name="edit" urlsrc="https://collabora\.example\.com/browser/abc/cool\.html?"/>
				</app>
			</net-zone>
		</wopi-discovery>
		END;

		$this->discoveryService->method('get')
			->willReturn($discoveryXml);

		$this->assertEquals(
			'https://collabora.example.com/browser/abc/cool.html?',
			$this->parser->getUrlSrcValue('application/vnd.oasis.opendocument.text')
		);
	}

	public function testGetUrlSrcValueWithoutDiscoveryData(): void {
		$this->discoveryService->method('get')
			->willReturn(null);

		$this->expectException(Exception::class);
		$this->expectExceptionMessage('No discovery data available');

		$this->parser->getUrlSrcValue('application/vnd.oasis.opendocument.text');
	}

	public function testGetUrlSrcValueWithUnparseableDiscoveryData(): void {
		$this->discoveryService->method('get')
			->willReturn('this is not xml');

		$useInternalErrors = libxml_use_internal_errors(true);

		try {
			$this->expectException(Exception::class);
			$this->expectExceptionMessage('Could not parse WOPI discovery response');

			$this->parser->getUrlSrcValue('application/vnd.oasis.opendocument.text');
		} finally {
			libxml_clear_errors();
			libxml_use_internal_errors($useInternalErrors);
		}
	}

	public function testGetUrlSrcValueWithUnknownMimetype(): void {
		$discoveryXml = <<<END
		<wopi-discovery>
			<net-zone name="external-http">
				<app name="application/vnd.oasis.opendocument.text">
					<action name="edit" urlsrc="https://collabora.example.com/browser/abc/cool.html?"/>
				</app>
			</net-zone>
		</wopi-discovery>
		END;

		$this->discoveryService->method('get')
			->willReturn($discoveryXml);

		$this->expectException(Exception::class);
		$this->expectExceptionMessage('Could not find urlsrc for application/vnd.ms-excel');

		$this->parser->getUrlSrcValue('application/vnd.ms-excel');
	}
}
