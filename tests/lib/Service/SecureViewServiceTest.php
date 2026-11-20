<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Tests\Service;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\PermissionManager;
use OCA\Richdocuments\Service\SecureViewService;
use OCP\Constants;
use OCP\Files\Cache\ICacheEntry;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\Node;
use OCP\Files\Storage\IStorage;
use OCP\IAppConfig;
use OCP\IUser;
use OCP\IUserSession;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class SecureViewServiceTest extends TestCase {
	private const SECURED_FILE_ID = 42;

	private PermissionManager&MockObject $permissionManager;
	private SecureViewService $service;
	private Folder&MockObject $targetParent;
	/** @var list<ICacheEntry> */
	private array $checkedTargets = [];
	private bool $targetSecured = false;

	protected function setUp(): void {
		parent::setUp();

		$user = $this->createMock(IUser::class);
		$user->method('getUID')->willReturn('alice');
		$userSession = $this->createMock(IUserSession::class);
		$userSession->method('getUser')->willReturn($user);

		$this->permissionManager = $this->createMock(PermissionManager::class);
		$this->permissionManager->method('shouldWatermark')->willReturnCallback(function (Node|ICacheEntry $nodeOrEntry): bool {
			if ($nodeOrEntry instanceof Node) {
				return $nodeOrEntry->getId() === self::SECURED_FILE_ID;
			}
			$this->checkedTargets[] = $nodeOrEntry;
			return $this->targetSecured;
		});

		$this->service = new SecureViewService($userSession, $this->permissionManager, $this->createMock(IAppConfig::class), $this->createMock(AppConfig::class));

		$this->targetParent = $this->createMock(Folder::class);
		$this->targetParent->method('getPermissions')->willReturn(Constants::PERMISSION_ALL);
		$this->targetParent->method('getStorage')->willReturn($this->createMock(IStorage::class));
	}

	private function file(int $id): File&MockObject {
		$file = $this->createMock(File::class);
		$file->method('getId')->willReturn($id);
		$file->method('getMimetype')->willReturn('application/vnd.oasis.opendocument.text');
		$file->method('getStorage')->willReturn($this->createMock(IStorage::class));
		return $file;
	}

	public function testCopyLeavingSecureViewIsRefused(): void {
		$this->assertFalse($this->service->staysSecuredIn($this->file(self::SECURED_FILE_ID), $this->targetParent, false));

		$this->assertCount(1, $this->checkedTargets);
		$this->assertSame(-1, $this->checkedTargets[0]->getId());
		$this->assertSame(Constants::PERMISSION_ALL, $this->checkedTargets[0]->getPermissions());
		$this->assertSame('application/vnd.oasis.opendocument.text', $this->checkedTargets[0]->getMimeType());
	}

	public function testCopyIntoSecureViewIsAllowed(): void {
		$this->targetSecured = true;

		$this->assertTrue($this->service->staysSecuredIn($this->file(self::SECURED_FILE_ID), $this->targetParent, false));
	}

	public function testMoveKeepsTheFileIdForTheTargetCheck(): void {
		$this->service->staysSecuredIn($this->file(self::SECURED_FILE_ID), $this->targetParent, true);

		$this->assertSame(self::SECURED_FILE_ID, $this->checkedTargets[0]->getId());
	}

	public function testFilesWithoutSecureViewAreNotChecked(): void {
		$this->assertTrue($this->service->staysSecuredIn($this->file(7), $this->targetParent, false));
		$this->assertSame([], $this->checkedTargets);
	}

	public function testFolderWithSecuredFileIsRefused(): void {
		$folder = $this->createMock(Folder::class);
		$folder->method('search')->willReturn([$this->file(7), $this->file(self::SECURED_FILE_ID)]);

		$this->assertFalse($this->service->staysSecuredIn($folder, $this->targetParent, false));
	}
}
