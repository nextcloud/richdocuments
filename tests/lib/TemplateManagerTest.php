<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments;

use OCA\Richdocuments\TemplateManager;
use OCP\Files\Folder;
use OCP\Files\IAppData;
use OCP\Files\IRootFolder;
use OCP\Files\IUserFolder;
use OCP\IConfig;
use OCP\IDBConnection;
use OCP\IL10N;
use OCP\IURLGenerator;
use Psr\Log\LoggerInterface;
use Test\TestCase;

class TemplateManagerTest extends TestCase {
	public static function templateFolderSettings(): array {
		return [
			'richdocuments setting' => ['/Office Templates', '/Personal Templates', '/Office Templates'],
			'server setting' => ['', '/Personal Templates', '/Personal Templates'],
			'default' => ['', '', 'Templates'],
		];
	}

	/** @dataProvider templateFolderSettings */
	public function testGetUserTemplateDir(string $richdocumentsPath, string $serverPath, string $expectedPath): void {
		$config = $this->createMock(IConfig::class);
		$config->method('getUserValue')->willReturnMap([
			['alice', 'richdocuments', 'templateFolder', '', $richdocumentsPath],
			['alice', 'core', 'templateDirectory', '', $serverPath],
		]);
		$templateDir = $this->createMock(Folder::class);
		$userFolder = $this->createMock(IUserFolder::class);
		$userFolder->expects(self::once())->method('get')->with($expectedPath)->willReturn($templateDir);
		$rootFolder = $this->createMock(IRootFolder::class);
		$rootFolder->method('getUserFolder')->with('alice')->willReturn($userFolder);

		$manager = new TemplateManager(
			'alice',
			$config,
			$this->createMock(IAppData::class),
			$this->createMock(IURLGenerator::class),
			$rootFolder,
			$this->createMock(IL10N::class),
			$this->createMock(IDBConnection::class),
			$this->createMock(LoggerInterface::class),
		);

		self::assertSame($templateDir, $manager->getUserTemplateDir());
	}
}
