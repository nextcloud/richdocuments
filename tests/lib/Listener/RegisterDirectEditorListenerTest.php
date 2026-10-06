<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Tests\Listener;

use OCA\Richdocuments\DirectEditing\OfficeDirectEditor;
use OCA\Richdocuments\Listener\RegisterDirectEditorListener;
use OCP\DirectEditing\IManager;
use OCP\DirectEditing\RegisterDirectEditorEvent;
use OCP\EventDispatcher\Event;
use OCP\IRequest;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class RegisterDirectEditorListenerTest extends TestCase {
	private OfficeDirectEditor|MockObject $editor;
	private IRequest|MockObject $request;
	private IManager|MockObject $directEditingManager;
	private RegisterDirectEditorListener $listener;

	protected function setUp(): void {
		parent::setUp();

		$this->editor = $this->createMock(OfficeDirectEditor::class);
		$this->request = $this->createMock(IRequest::class);
		$this->directEditingManager = $this->createMock(IManager::class);

		$this->listener = new RegisterDirectEditorListener($this->editor, $this->request);
	}

	public static function userAgentProvider(): array {
		return [
			'no user agent' => ['', true],
			'browser' => ['Mozilla/5.0 (X11; Linux x86_64; rv:140.0) Gecko/20100101 Firefox/140.0', true],
			'desktop client' => ['Mozilla/5.0 (Linux) mirall/3.17.0', true],
			// The iOS client resolves editors from a hardcoded list and only
			// learned about this editor in 34.1.2, see richdocuments#5951.
			'iOS 33.0.0' => ['Mozilla/5.0 (iOS) Nextcloud-iOS/33.0.0', false],
			'iOS 34.1.0' => ['Mozilla/5.0 (iOS) Nextcloud-iOS/34.1.0', false],
			'iOS 34.1.1' => ['Mozilla/5.0 (iOS) Nextcloud-iOS/34.1.1', false],
			'iOS 34.1.2' => ['Mozilla/5.0 (iOS) Nextcloud-iOS/34.1.2', true],
			'iOS 35.0.0' => ['Mozilla/5.0 (iOS) Nextcloud-iOS/35.0.0', true],
			'branded iOS 34.1.2' => ['Mozilla/5.0 (iOS) Nextcloud-iOS/34.1.2-Branded', true],
			'branded iOS 34.1.1' => ['Mozilla/5.0 (iOS) Nextcloud-iOS/34.1.1-Branded', false],
			'iOS without a version' => ['Mozilla/5.0 (iOS) Nextcloud-iOS/', false],
			// Android resolves editors by id from the server response, so it
			// stays on the major-version floor and diverges from iOS here.
			'Android 33.1.2' => ['Mozilla/5.0 (Android) Nextcloud-android/33.1.2', false],
			'Android 34.1.0' => ['Mozilla/5.0 (Android) Nextcloud-android/34.1.0', true],
			'Android 35.1.0 RC1' => ['Mozilla/5.0 (Android) Nextcloud-android/35.1.0 RC1', true],
		];
	}

	/**
	 * @dataProvider userAgentProvider
	 */
	public function testHandleExposesEditorByClientVersion(string $userAgent, bool $expectedToRegister): void {
		$this->request->method('getHeader')
			->with('User-Agent')
			->willReturn($userAgent);

		$this->directEditingManager->expects($expectedToRegister ? self::once() : self::never())
			->method('registerDirectEditor')
			->with($this->editor);

		$this->listener->handle(new RegisterDirectEditorEvent($this->directEditingManager));
	}

	public function testHandleIgnoresUnrelatedEvent(): void {
		$this->request->expects(self::never())
			->method('getHeader');

		$this->listener->handle(new Event());
	}
}
