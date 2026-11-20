<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Tests\Listener;

use OCA\Richdocuments\Listener\BeforeDirectFileDownloadListener;
use OCA\Richdocuments\Service\SecureViewService;
use OCP\Files\Events\BeforeDirectFileDownloadEvent;
use OCP\Files\File;
use OCP\Files\IRootFolder;
use OCP\Files\IUserFolder;
use OCP\Files\NotFoundException;
use OCP\IUser;
use OCP\IUserSession;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class BeforeDirectFileDownloadListenerTest extends TestCase {
	private IUserSession&MockObject $userSession;
	private IUserFolder&MockObject $userFolder;
	private SecureViewService&MockObject $secureViewService;
	private BeforeDirectFileDownloadListener $listener;

	protected function setUp(): void {
		parent::setUp();

		$user = $this->createMock(IUser::class);
		$user->method('getUID')->willReturn('alice');
		$this->userSession = $this->createMock(IUserSession::class);
		$this->userSession->method('getUser')->willReturn($user);

		$this->userFolder = $this->createMock(IUserFolder::class);
		$rootFolder = $this->createMock(IRootFolder::class);
		$rootFolder->method('getUserFolder')->with('alice')->willReturn($this->userFolder);

		$this->secureViewService = $this->createMock(SecureViewService::class);
		$this->secureViewService->method('isEnabled')->willReturn(true);

		$this->listener = new BeforeDirectFileDownloadListener($this->userSession, $rootFolder, $this->secureViewService);
	}

	private function download(bool $secured): BeforeDirectFileDownloadEvent {
		$file = $this->createMock(File::class);
		$this->userFolder->method('get')->with('/document.odt')->willReturn($file);
		$this->secureViewService->method('shouldSecureNode')->with($file)->willReturn($secured);

		$event = new BeforeDirectFileDownloadEvent('/document.odt');
		$this->listener->handle($event);
		return $event;
	}

	public function testDeniesFilesInSecureView(): void {
		$this->assertFalse($this->download(true)->isSuccessful());
	}

	public function testAllowsFilesWithoutSecureView(): void {
		$this->assertTrue($this->download(false)->isSuccessful());
	}

	public function testIgnoresUnknownFiles(): void {
		$this->userFolder->method('get')->willThrowException(new NotFoundException());

		$event = new BeforeDirectFileDownloadEvent('/missing.odt');
		$this->listener->handle($event);

		$this->assertTrue($event->isSuccessful());
	}
}
