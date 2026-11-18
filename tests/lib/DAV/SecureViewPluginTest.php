<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Tests\DAV;

use OCA\DAV\Connector\Sabre\Directory;
use OCA\DAV\Connector\Sabre\File;
use OCA\Richdocuments\DAV\SecureViewPlugin;
use OCA\Richdocuments\Middleware\WOPIMiddleware;
use OCA\Richdocuments\Service\SecureViewService;
use OCP\Files\File as FileNode;
use OCP\Files\Folder;
use OCP\IAppConfig;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;
use Sabre\DAV\Exception\Forbidden;
use Sabre\DAV\Server;
use Sabre\DAV\Tree;

class SecureViewPluginTest extends TestCase {
	private SecureViewService&MockObject $secureViewService;
	private Server $server;
	private FileNode $source;
	private Folder $targetFolder;

	protected function setUp(): void {
		parent::setUp();

		$this->source = $this->createMock(FileNode::class);
		$sourceNode = $this->createMock(File::class);
		$sourceNode->method('getNode')->willReturn($this->source);

		$this->targetFolder = $this->createMock(Folder::class);
		$targetNode = $this->createMock(Directory::class);
		$targetNode->method('getNode')->willReturn($this->targetFolder);

		$tree = $this->createMock(Tree::class);
		$tree->method('getNodeForPath')->willReturnMap([
			['files/alice/shared/document.odt', $sourceNode],
			['files/alice/target', $targetNode],
		]);

		$this->secureViewService = $this->createMock(SecureViewService::class);
		$this->secureViewService->method('isEnabled')->willReturn(true);

		$this->server = new Server($tree);
		$plugin = new SecureViewPlugin(
			$this->createMock(WOPIMiddleware::class),
			$this->createMock(IAppConfig::class),
			$this->secureViewService,
			$this->createMock(LoggerInterface::class),
		);
		$plugin->initialize($this->server);
	}

	public function testRefusesCopyToTargetWithoutSecureView(): void {
		$this->secureViewService->method('staysSecuredIn')
			->with($this->source, $this->targetFolder, false)
			->willReturn(false);

		$this->expectException(Forbidden::class);
		$this->server->emit('beforeCopy', ['files/alice/shared/document.odt', 'files/alice/target/document.odt']);
	}

	public function testRefusesMoveToTargetWithoutSecureView(): void {
		$this->secureViewService->method('staysSecuredIn')
			->with($this->source, $this->targetFolder, true)
			->willReturn(false);

		$this->expectException(Forbidden::class);
		$this->server->emit('beforeMove', ['files/alice/shared/document.odt', 'files/alice/target/document.odt']);
	}

	public function testRefusesWhenTheCheckFails(): void {
		$this->secureViewService->method('staysSecuredIn')->willThrowException(new \RuntimeException('lookup failed'));

		$this->expectException(Forbidden::class);
		$this->server->emit('beforeCopy', ['files/alice/shared/document.odt', 'files/alice/target/document.odt']);
	}

	public function testAllowsCopyToTargetWithSecureView(): void {
		$this->secureViewService->method('staysSecuredIn')->willReturn(true);

		$this->assertTrue($this->server->emit('beforeCopy', ['files/alice/shared/document.odt', 'files/alice/target/document.odt']));
	}

	public function testRenameInPlaceIsNotChecked(): void {
		$this->secureViewService->expects($this->never())->method('staysSecuredIn');

		$this->assertTrue($this->server->emit('beforeMove', ['files/alice/shared/document.odt', 'files/alice/shared/renamed.odt']));
	}
}
