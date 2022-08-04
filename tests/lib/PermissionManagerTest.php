<?php
/**
 * @copyright Copyright (c) 2017 Lukas Reschke <lukas@statuscode.ch>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace Tests\Richdocuments;

use OCA\Richdocuments\PermissionManager;
use OCP\IConfig;
use OCP\IGroupManager;
use OCP\IUser;
use OCP\IUserSession;
use PHPUnit\Framework\MockObject\MockBuilder;
use PHPUnit\Framework\MockObject\MockObject;
use Test\TestCase;

class PermissionManagerTest extends TestCase {
	/** @var IConfig|MockObject */
	private $config;
	/** @var IGroupManager|MockObject */
	private $groupManager;
	/** @var IUserSession|MockObject */
	private $userSession;
	/** @var PermissionManager */
	private $permissionManager;

	public function setUp(): void {
		parent::setUp();
		$this->config = $this->createMock(IConfig::class);
		$this->groupManager = $this->createMock(IGroupManager::class);
		$this->userSession = $this->createMock(IUserSession::class);
		$this->permissionManager = new PermissionManager($this->config, $this->groupManager, $this->userSession);
	}

	public function testIsEnabledForUserEnabledNoRestrictions() {
		$this->config
			->expects($this->once())
			->method('getAppValue')
			->with('richdocuments', 'use_groups', '')
			->willReturn('');

		$this->assertTrue($this->permissionManager->isEnabledForUser('TestUser'));
	}

	public function testIsEnabledForUserEnabledNotInGroupSession() {
		/** @var IUser|MockBuilder $user */
		$user = $this->createMock(IUser::class);
		$user
			->expects($this->any())
			->method('getUID')
			->willReturn('TestUser');
		$this->userSession->expects($this->once())
			->method('getUser')
			->willReturn($user);

		$this->config
			->expects($this->once())
			->method('getAppValue')
			->with('richdocuments', 'use_groups', '')
			->willReturn('Enabled1|Enabled2|Enabled3');

		$this->groupManager
			->expects($this->at(0))
			->method('isInGroup')
			->with('TestUser', 'Enabled1')
			->willReturn(true);
		$this->assertTrue($this->permissionManager->isEnabledForUser());
	}

	public function testIsEnabledForUserEnabledNotInGroup() {
		$this->config
			->expects($this->once())
			->method('getAppValue')
			->with('richdocuments', 'use_groups', '')
			->willReturn('Enabled1|Enabled2|Enabled3');

		$this->groupManager
			->expects($this->at(0))
			->method('isInGroup')
			->with('TestUser', 'Enabled1')
			->willReturn(false);
		$this->groupManager
			->expects($this->at(1))
			->method('isInGroup')
			->with('TestUser', 'Enabled2')
			->willReturn(false);
		$this->groupManager
			->expects($this->at(2))
			->method('isInGroup')
			->with('TestUser', 'Enabled3')
			->willReturn(false);

		$this->assertFalse($this->permissionManager->isEnabledForUser('TestUser'));
	}

	public function testIsEnabledForUserEnabledInGroup() {
		$this->config
			->expects($this->once())
			->method('getAppValue')
			->with('richdocuments', 'use_groups', '')
			->willReturn('Enabled1|Enabled2|Enabled3');

		$this->groupManager
			->expects($this->at(0))
			->method('isInGroup')
			->with('TestUser', 'Enabled1')
			->willReturn(false);
		$this->groupManager
			->expects($this->at(1))
			->method('isInGroup')
			->with('TestUser', 'Enabled2')
			->willReturn(true);

		$this->assertTrue($this->permissionManager->isEnabledForUser('TestUser'));
	}
}
