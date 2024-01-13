<?php
/**
 * @copyright Copyright (c) 2017 Lukas Reschke <lukas@statuscode.ch>
 *
 * @author Andrii Ilkiv <a.ilkiv.ye@gmail.com>
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
use OCP\Files\Node;
use OCP\IConfig;
use OCP\IGroupManager;
use OCP\IUser;
use OCP\IUserManager;
use OCP\IUserSession;
use OCP\Share\IShare;
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
	/** @var ISystemTagObjectMapper */
	private $systemTagMapper;

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

	public static function dataGroupMatchGroups(): array {
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
	
	public function testIsEnabledForUserEnabledNotInGroup() {
		/** @var IUser|MockBuilder $user */
		$user = $this->createMock(IUser::class);

		$this->appConfig
			->expects($this->once())
			->method('getUseGroups')
			->willReturn(['Enabled1', 'Enabled2', 'Enabled3']);

		$this->userManager
			->expects($this->once())
			->method('get')
			->willReturn($user);

		$this->groupManager
			->expects(self::any())
			->method('getUserGroupIds')
			->willReturnCallback(function ($user) {
				return [];
			});

		$this->assertFalse($this->permissionManager->isEnabledForUser('TestUser'));
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
		$this->groupManager
			->expects(self::any())
			->method('isInGroup')
			->willReturnCallback(function ($user, $group) {
				if ($user === 'TestUser' && $group === 'Enabled2') {
					return true;
				}
				return false;
			});

		$canEdit = $this->permissionManager->userCanEdit('user1');
		$isLocked = $this->permissionManager->userIsFeatureLocked('user1');

		$this->assertEquals(!$result, $isLocked);
		$this->assertEquals($result, $canEdit);

		// Users with edit permission should never be locked
		$this->assertFalse($isLocked && $canEdit);
	}


	public static function dataWatermarkTagIds(): array {
		return [
			[['1', '2', '3'], ['1', '2']],
			// From php 8.1 queries on integer columns return integers
			[[1, 2, 3], ['1', '2']],
		];
	}

	/** @dataProvider dataWatermarkTagIds */
	public function testShouldWatermarkOptionLinkTags(array $objectTagIds, array $watermarkTagIds): void {
		$node = $this->createMock(Node::class);
		$share = $this->createMock(IShare::class);
		$userId = 'testUserId';

		$this->config
			->expects($this->exactly(5))
			->method('getAppValue')
			->willReturnMap([
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_enabled', 'no', 'yes'],
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_linkAll', 'no', 'no'],
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_linkRead', 'no', 'no'],
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_linkSecure', 'no', 'no'],
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_linkTags', 'no', 'yes'],
			]);

		$node->expects($this->once())->method('getId')->willReturn('testFileId');
		$node->expects($this->once())->method('isUpdateable')->willReturn(false);

		$share->expects($this->once())->method('getHideDownload')->willReturn(true);
		$share->expects($this->once())->method('getAttributes')->willReturn(null);
		$share->expects($this->once())->method('getShareType')->willReturn(IShare::TYPE_LINK);
		$this->systemTagMapper->expects($this->once())->method('getTagIdsForObjects')->willReturn(['testFileId' => $objectTagIds]);
		$this->appConfig->expects($this->once())->method('getAppValueArray')->willReturn($watermarkTagIds);

		$result = $this->permissionManager->shouldWatermark($node, $userId, $share);

		$this->assertTrue($result);
	}

	/** @dataProvider dataWatermarkTagIds */
	public function testShouldWatermarkOptionAllTags(array $objectTagIds, array $watermarkTagIds): void {
		$node = $this->createMock(Node::class);
		$share = $this->createMock(IShare::class);
		$userId = 'testUserId';

		$this->config
			->expects($this->exactly(6))
			->method('getAppValue')
			->willReturnMap([
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_enabled', 'no', 'yes'],
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_shareAll', 'no', 'no'],
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_shareRead', 'no', 'no'],
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_shareDisabledDownload', 'no', 'no'],
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_allGroups', 'no', 'no'],
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_allTags', 'no', 'yes'],
			]);

		$node->expects($this->once())->method('getId')->willReturn('testFileId');
		$node->expects($this->once())->method('isUpdateable')->willReturn(false);
		$this->systemTagMapper->expects($this->once())->method('getTagIdsForObjects')->willReturn(['testFileId' => $objectTagIds]);
		$this->appConfig->expects($this->once())->method('getAppValueArray')->willReturn($watermarkTagIds);

		$result = $this->permissionManager->shouldWatermark($node, $userId, null);

		$this->assertTrue($result);
	}
}
