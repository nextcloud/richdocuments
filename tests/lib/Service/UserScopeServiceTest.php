<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments;

use OCA\Richdocuments\Service\UserScopeService;
use OCP\Activity\IManager as IActivityManager;
use OCP\IUserManager;
use OCP\IUserSession;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class UserScopeServiceTest extends TestCase {
	private IActivityManager&MockObject $activityManager;
	private UserScopeService $service;

	protected function setUp(): void {
		parent::setUp();
		$this->activityManager = $this->createMock(IActivityManager::class);
		$this->service = new UserScopeService(
			$this->createMock(IUserSession::class),
			$this->createMock(IUserManager::class),
			$this->activityManager,
		);
	}

	public function testSetActivityActorKeepsAPlainName(): void {
		$this->activityManager->expects($this->once())
			->method('setCurrentUserId')
			->with('Alice (Guest)');

		$this->service->setActivityActor('Alice (Guest)');
	}

	/**
	 * An actor containing an @ is read as a federated cloud id, which splits the
	 * name into an account and an instance that does not exist.
	 */
	public function testSetActivityActorStripsAnAtSign(): void {
		$this->activityManager->expects($this->once())
			->method('setCurrentUserId')
			->with('aliceexample.com (Guest)');

		$this->service->setActivityActor('alice@example.com (Guest)');
	}

	/**
	 * A name the cloud id parser rejects costs the activity entirely, so every
	 * occurrence has to go, not just the first.
	 */
	public function testSetActivityActorStripsEveryAtSign(): void {
		$this->activityManager->expects($this->once())
			->method('setCurrentUserId')
			->with('Anna  Marketing  work (Guest)');

		$this->service->setActivityActor('Anna @ Marketing @ work (Guest)');
	}
}
