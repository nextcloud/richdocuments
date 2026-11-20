<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments;

use OCA\DAV\Connector\Sabre\PublicAuth;
use OCA\Richdocuments\Helper;
use OCP\AppFramework\PublicShareController;
use OCP\ISession;
use OCP\Share\IShare;
use PHPUnit\Framework\Attributes\PreserveGlobalState;
use PHPUnit\Framework\Attributes\RunInSeparateProcess;
use PHPUnit\Framework\TestCase;

class HelperTest extends TestCase {
	private function share(string $passwordHash): IShare {
		$share = $this->createMock(IShare::class);
		$share->method('getId')->willReturn('42');
		$share->method('getToken')->willReturn('sharetoken');
		$share->method('getPassword')->willReturn($passwordHash);
		return $share;
	}

	private function session(?string $passwordHash): ISession {
		$session = $this->createMock(ISession::class);
		$session->method('get')->willReturnMap([
			['public_link_authenticated', $passwordHash === null ? null : ['42']],
			[PublicShareController::DAV_AUTHENTICATED_FRONTEND, $passwordHash === null ? null : json_encode(['sharetoken' => $passwordHash])],
		]);
		return $session;
	}

	private function requireServerCheck(): void {
		if (!class_exists(PublicAuth::class)) {
			$this->markTestSkipped('PublicAuth is not available');
		}
		$method = new \ReflectionMethod(PublicAuth::class, 'isShareInSession');
		if (!$method->isPublic() || !$method->isStatic()) {
			$this->markTestSkipped('Server does not provide the static PublicAuth::isShareInSession');
		}
	}

	public function testShareAuthenticatedWithCurrentPassword(): void {
		$this->requireServerCheck();
		$this->assertTrue(Helper::isShareAuthenticated($this->session('hash-current'), $this->share('hash-current')));
	}

	public function testShareNotAuthenticatedWithOtherPasswordHash(): void {
		$this->requireServerCheck();
		$this->assertFalse(Helper::isShareAuthenticated($this->session('hash-old'), $this->share('hash-current')));
	}

	public function testShareNotAuthenticatedWithoutSession(): void {
		$this->assertFalse(Helper::isShareAuthenticated($this->session(null), $this->share('hash-current')));
	}

	/**
	 * @runInSeparateProcess
	 * @preserveGlobalState disabled
	 */
	#[RunInSeparateProcess]
	#[PreserveGlobalState(false)]
	public function testShareAuthenticatedByIdWithNonStaticServerCheck(): void {
		if (class_exists(PublicAuth::class, false)) {
			$this->markTestSkipped('PublicAuth is already loaded');
		}
		require __DIR__ . '/../fixtures/PublicAuthWithoutStaticCheck.php';
		$this->assertTrue(Helper::isShareAuthenticated($this->session('hash-old'), $this->share('hash-current')));
	}
}
