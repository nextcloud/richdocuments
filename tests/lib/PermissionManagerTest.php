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

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\PermissionManager;
use OCP\IConfig;
use OCP\IGroupManager;
use OCP\IUser;
use OCP\IUserManager;
use OCP\IUserSession;
use OCP\SystemTag\ISystemTagObjectMapper;
use PHPUnit\Framework\MockObject\MockObject;
use Test\TestCase;

class PermissionManagerTest extends TestCase {
	/** @var AppConfig|MockObject */
	private $appConfig;
	/** @var IConfig|MockObject */
	private $config;
	/** @var IGroupManager|MockObject */
	private $groupManager;
	/** @var IUserManager|MockObject */
	private $userManager;
	/** @var IUserSession|MockObject */
	private $userSession;
	/** @var PermissionManager */
	private $permissionManager;

	public function setUp(): void {
		parent::setUp();
		$this->appConfig = $this->createMock(AppConfig::class);
		$this->config = $this->createMock(IConfig::class);
		$this->groupManager = $this->createMock(IGroupManager::class);
		$this->userManager = $this->createMock(IUserManager::class);
		$this->userSession = $this->createMock(IUserSession::class);
		$this->systemTagMapper = $this->createMock(ISystemTagObjectMapper::class);
		$this->permissionManager = new PermissionManager($this->appConfig, $this->config, $this->groupManager, $this->userManager, $this->userSession, $this->systemTagMapper);
	}

	public function testIsEnabledForUserEnabledNoRestrictions(): void {
		$this->appConfig
			->expects($this->once())
			->method('getUseGroups')
			->willReturn(null);

		$this->assertTrue($this->permissionManager->isEnabledForUser('TestUser'));
	}

	public function dataGroupMatchGroups(): array {
		return [
			[['admin', 'guests'], ['admin'], true],
			[['admin', 'guests'], [], false],
			[['group1', 'group2', 'group3'], [], false],
			[['group1', 'group2', 'group3'], ['group1'], true],
			[['group1', 'group2', 'group3'], ['group2'], true],
			[['group1', 'group2', 'group3'], ['group0', 'group3'], true],
			[['group1', 'group2', 'group3'], ['group1', 'group2'], true],
			[[], [], true],
		];
	}

	/** @dataProvider dataGroupMatchGroups */
	public function testEditGroups($editGroups, $userGroups, $result): void {
		$userMock = $this->createMock(IUser::class);
		$this->appConfig->expects($this->any())
			->method('getEditGroups')
			->willReturn($editGroups);
		$this->userManager->expects($this->any())
			->method('get')
			->willReturn($userMock);
		$this->groupManager->expects($this->any())
			->method('getUserGroupIds')
			->willReturn($userGroups);

		$this->assertEquals($result, $this->permissionManager->userCanEdit('user1'));
	}

	/** @dataProvider dataGroupMatchGroups */
	public function testUseGroups($editGroups, $userGroups, $result): void {
		$userMock = $this->createMock(IUser::class);
		$this->appConfig->expects($this->any())
			->method('getUseGroups')
			->willReturn($editGroups);
		$this->userManager->expects($this->any())
			->method('get')
			->willReturn($userMock);
		$this->groupManager->expects($this->any())
			->method('getUserGroupIds')
			->willReturn($userGroups);

		$this->assertEquals($result, $this->permissionManager->isEnabledForUser('user1'));
	}

	/** @dataProvider dataGroupMatchGroups */
	public function testFeatureLock($editGroups, $userGroups, $result): void {
		$userMock = $this->createMock(IUser::class);
		$this->appConfig->expects($this->any())
			->method('getEditGroups')
			->willReturn($editGroups);
		$this->appConfig->expects($this->any())
			->method('isReadOnlyFeatureLocked')
			->willReturn(true);
		$this->userManager->expects($this->any())
			->method('get')
			->willReturn($userMock);
		$this->groupManager->expects($this->any())
			->method('getUserGroupIds')
			->willReturn($userGroups);

		$canEdit = $this->permissionManager->userCanEdit('user1');
		$isLocked = $this->permissionManager->userIsFeatureLocked('user1');

		$this->assertEquals(!$result, $isLocked);
		$this->assertEquals($result, $canEdit);

		// Users with edit permission should never be locked
		$this->assertFalse($isLocked && $canEdit);
	}
}
