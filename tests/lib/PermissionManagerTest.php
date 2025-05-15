<?php
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace Tests\Richdocuments;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Capabilities;
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


	public static function dataWatermarkTagIds(): array {
		return [
			[['1', '2', '3'], ['1', '2']],
			// From php 8.1 queries on integer columns return integers
			[[1, 2, 3], ['1', '2']],
		];
	}

	/** @dataProvider dataWatermarkTagIds */
	public function testShouldWatermarkOptionLinkTags(array $objectTagIds, array $watermarkTagIds): void {
		$node = $this->createNodeMock();
		$share = $this->createShareMock(IShare::TYPE_LINK);
		$userId = 'testUserId';

		$this->appConfig->expects($this->any())
			->method('getMimeTypes')
			->willReturn(Capabilities::MIMETYPES);

		$this->config
			->method('getAppValue')
			->willReturnMap([
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_enabled', 'no', 'yes'],
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_linkAll', 'no', 'no'],
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_linkRead', 'no', 'no'],
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_linkSecure', 'no', 'no'],
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_linkTags', 'no', 'yes'],
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_shareTalkPublic', 'no', 'no'],
			]);

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
		$node = $this->createNodeMock();
		$userId = 'testUserId';

		$this->appConfig->expects($this->any())
			->method('getMimeTypes')
			->willReturn(Capabilities::MIMETYPES);

		$this->config
			->method('getAppValue')
			->willReturnMap([
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_enabled', 'no', 'yes'],
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_shareAll', 'no', 'no'],
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_shareRead', 'no', 'no'],
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_shareDisabledDownload', 'no', 'no'],
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_allGroups', 'no', 'no'],
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_allTags', 'no', 'yes'],
			]);

		$this->systemTagMapper->expects($this->once())->method('getTagIdsForObjects')->willReturn(['testFileId' => $objectTagIds]);
		$this->appConfig->expects($this->once())->method('getAppValueArray')->willReturn($watermarkTagIds);

		$result = $this->permissionManager->shouldWatermark($node, $userId, null);

		$this->assertTrue($result);
	}

	public function testShouldWatermarkOptionTalkPublic(): void {
		$node = $this->createNodeMock();
		$share = $this->createShareMock(IShare::TYPE_ROOM);
		$userId = null;

		$this->appConfig->expects($this->any())
			->method('getMimeTypes')
			->willReturn(Capabilities::MIMETYPES);

		$this->config
			->method('getAppValue')
			->willReturnMap([
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_enabled', 'no', 'yes'],
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_linkAll', 'no', 'no'],
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_linkRead', 'no', 'no'],
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_linkSecure', 'no', 'no'],
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_linkTags', 'no', 'no'],
				[AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_shareTalkPublic', 'no', 'yes'],
			]);
		$result = $this->permissionManager->shouldWatermark($node, $userId, $share);

		$this->assertTrue($result);
	}

	private function createNodeMock(): Node {
		$node = $this->createMock(Node::class);
		$node->expects($this->any())->method('getMimetype')->willReturn('application/vnd.oasis.opendocument.spreadsheet');
		$node->expects($this->any())->method('getId')->willReturn('testFileId');
		$node->expects($this->any())->method('isUpdateable')->willReturn(false);
		return $node;
	}

	private function createShareMock(?int $shareType): ?IShare {
		if ($shareType === null) {
			return null;
		}

		$share = $this->createMock(IShare::class);
		$share->expects($this->any())->method('getHideDownload')->willReturn(true);
		$share->expects($this->any())->method('getAttributes')->willReturn(null);
		$share->expects($this->any())->method('getShareType')->willReturn($shareType);
		return $share;
	}
}
