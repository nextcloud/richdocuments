<?php

namespace Tests\OCA\Richdocuments\Controller;

use Generator;
use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Db\Wopi;
use OCA\Richdocuments\Service\WatermarkService;
use OCP\App\IAppManager;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\IConfig;
use OCP\IGroupManager;
use OCP\IUser;
use OCP\SystemTag\ISystemTagObjectMapper;
use PHPUnit\Framework\MockObject\MockObject;
use Test\TestCase;

/**
 * @group DB
 */
class WatermarkServiceTest extends TestCase {
	public const WATERMARK_USER = false;
	public const WATERMARK_PUBLIC = true;

	public const WATERMARK_USER_GUEST = null;
	public const WATERMARK_USER_OWNER = 'admin';
	public const WATERMARK_USER_RECIPIENT = 'user1';

	/** @var IConfig|MockObject */
	private $config;
	/** @var IGroupManager|MockObject */
	private $groupManager;

	public function setUp(): void {
		parent::setUp();

		$this->config = $this->createMock(IConfig::class);
		$this->groupManager = $this->createMock(IGroupManager::class);
	}

	public static function dataWatermark(): Generator {
		yield [
			self::WATERMARK_USER,
			self::WATERMARK_USER_OWNER,
			[],
			false
		];

		yield [
			self::WATERMARK_USER,
			self::WATERMARK_USER_OWNER,
			['watermark_enabled' => true],
			false
		];

		yield [
			self::WATERMARK_USER,
			self::WATERMARK_USER_OWNER,
			['watermark_enabled' => true, 'watermark_linkAll' => true],
			false
		];

		yield [
			self::WATERMARK_USER,
			self::WATERMARK_USER_RECIPIENT,
			['watermark_enabled' => true, 'watermark_shareAll' => true],
			true
		];

		yield [
			self::WATERMARK_USER,
			self::WATERMARK_USER_RECIPIENT,
			['watermark_enabled' => true, 'watermark_allGroups' => true, 'watermark_allGroupsList' => ''],
			false
		];

		yield [
			self::WATERMARK_USER,
			self::WATERMARK_USER_RECIPIENT,
			['watermark_enabled' => true, 'watermark_allGroups' => true, 'watermark_allGroupsList' => 'group2,group3'],
			false
		];

		yield [
			self::WATERMARK_USER,
			self::WATERMARK_USER_RECIPIENT,
			['watermark_enabled' => true, 'watermark_allGroups' => true, 'watermark_allGroupsList' => 'group2,group3,group3,group1'],
			true
		];

		yield [
			self::WATERMARK_USER,
			self::WATERMARK_USER_RECIPIENT,
			['watermark_enabled' => true, 'watermark_allGroups' => true, 'watermark_allGroupsList' => 'group1'],
			true
		];

		yield [
			self::WATERMARK_PUBLIC,
			self::WATERMARK_USER_GUEST,
			[],
			false
		];

		yield [
			self::WATERMARK_PUBLIC,
			self::WATERMARK_USER_GUEST,
			['watermark_enabled' => true],
			false
		];

		yield [
			self::WATERMARK_PUBLIC,
			self::WATERMARK_USER_GUEST,
			['watermark_enabled' => true, 'watermark_linkAll' => true],
			true
		];

		yield [
			self::WATERMARK_PUBLIC,
			self::WATERMARK_USER_GUEST,
			['watermark_enabled' => true, 'watermark_linkAll' => true],
			true
		];
	}

	private function createWatermarkConfigMock(array $config): void {
		$this->config->expects(self::any())
			->method('getAppValue')
			->willReturnCallback(function ($app, $key, $default) use ($config) {
				if (isset($config[$key])) {
					if (is_bool($config[$key])) {
						return $config[$key] ? 'yes' : 'no';
					}

					return $config[$key];
				}
				return $default;
			});
	}

	/** @dataProvider dataWatermark */
	public function testWatermark(bool $isPublic, ?string $user, array $config, bool $expected): void {
		$rootFolder = $this->createMock(IRootFolder::class);
		$this->createWatermarkConfigMock($config);
		$this->groupManager->expects(self::any())
			->method('isInGroup')
			->willReturnCallback(function ($userId, $groupId) {
				return ($userId === 'user1' && $groupId === 'group1');
			});

		$controller = new WatermarkService(
			$this->config,
			new AppConfig($this->config, $this->createMock(IAppManager::class), $this->createMock(\OCP\GlobalScale\IConfig::class)),
			$this->groupManager,
			$this->createMock(ISystemTagObjectMapper::class),
			$rootFolder
		);

		$fileId = 1234;
		$userFolder = $this->createMock(Folder::class);
		$file = $this->createMock(File::class);
		$storageUser = $this->createMock(IUser::class);
		$storageUser->method('getUID')->willReturn(self::WATERMARK_USER_OWNER);
		$rootFolder->method('getUserFolder')
			->willReturn($userFolder);
		$userFolder->method('getById')->willReturn([$file]);
		$file->method('getOwner')->willReturn($storageUser);

		$wopi = new Wopi();
		$wopi->setFileid($fileId);
		$wopi->setOwnerUid(self::WATERMARK_USER_OWNER);
		$wopi->setEditorUid($user);
		$wopi->setTokenType($isPublic ? Wopi::TOKEN_TYPE_GUEST : Wopi::TOKEN_TYPE_USER);

		self::assertEquals($expected, $this->invokePrivate($controller, 'shouldWatermark', [$wopi]));
	}
}
