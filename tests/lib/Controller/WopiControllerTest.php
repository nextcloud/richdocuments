<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments\Controller;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Controller\WopiController;
use OCA\Richdocuments\Db\Wopi;
use OCA\Richdocuments\Db\WopiMapper;
use OCA\Richdocuments\Helper;
use OCA\Richdocuments\PermissionManager;
use OCA\Richdocuments\Service\CapabilitiesService;
use OCA\Richdocuments\Service\FederationService;
use OCA\Richdocuments\Service\SettingsService;
use OCA\Richdocuments\Service\UserScopeService;
use OCA\Richdocuments\Service\WopiRateLimitService;
use OCA\Richdocuments\TaskProcessingManager;
use OCA\Richdocuments\TemplateManager;
use OCA\Richdocuments\TokenManager;
use OCA\Richdocuments\WOPI\SettingsType;
use OCA\Richdocuments\WOPI\SettingsUrl;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\JSONResponse;
use OCP\Encryption\IManager as IEncryptionManager;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\Files\File;
use OCP\Files\IRootFolder;
use OCP\Files\IUserFolder;
use OCP\Files\Lock\ILockManager;
use OCP\IConfig;
use OCP\IGroupManager;
use OCP\IRequest;
use OCP\IURLGenerator;
use OCP\IUserManager;
use OCP\Share\IManager as IShareManager;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class WopiControllerTest extends TestCase {
	private const UPLOAD_RESULT = ['stamp' => 'etag', 'uri' => 'https://localhost/file'];

	private WopiMapper $wopiMapper;
	private IGroupManager $groupManager;
	private IUserManager $userManager;
	private SettingsService $settingsService;
	private CapabilitiesService $capabilitiesService;
	private IRootFolder $rootFolder;

	protected function setUp(): void {
		parent::setUp();

		$this->wopiMapper = $this->createMock(WopiMapper::class);
		$this->groupManager = $this->createMock(IGroupManager::class);
		$this->userManager = $this->createMock(IUserManager::class);
		$this->settingsService = $this->createMock(SettingsService::class);
		$this->capabilitiesService = $this->createMock(CapabilitiesService::class);
		$this->rootFolder = $this->createMock(IRootFolder::class);
	}

	private function makeController(): WopiController {
		return new WopiController(
			'richdocuments',
			$this->createMock(IRequest::class),
			$this->rootFolder,
			$this->createMock(IURLGenerator::class),
			$this->createMock(IConfig::class),
			$this->createMock(AppConfig::class),
			$this->createMock(TokenManager::class),
			$this->createMock(PermissionManager::class),
			$this->userManager,
			$this->wopiMapper,
			$this->createMock(LoggerInterface::class),
			$this->createMock(TemplateManager::class),
			$this->createMock(IShareManager::class),
			$this->createMock(UserScopeService::class),
			$this->createMock(FederationService::class),
			$this->createMock(IEncryptionManager::class),
			$this->groupManager,
			$this->createMock(ILockManager::class),
			$this->createMock(IEventDispatcher::class),
			$this->createMock(TaskProcessingManager::class),
			$this->settingsService,
			$this->capabilitiesService,
			$this->createMock(Helper::class),
			$this->createMock(WopiRateLimitService::class),
		);
	}

	/**
	 * Registers the token that {@see WopiMapper::getWopiForToken()} will resolve.
	 */
	private function givenToken(int $tokenType, ?string $editorUid, bool $isAdmin = false, bool $userExists = true): void {
		$wopi = new Wopi();
		$wopi->setToken('token');
		$wopi->setTokenType($tokenType);
		$wopi->setEditorUid($editorUid);
		$wopi->setOwnerUid($editorUid ?? '');
		$wopi->setFileid(1);
		$wopi->setVersion('0');
		$wopi->setCanwrite(false);
		$wopi->setServerHost('https://localhost/');

		$this->wopiMapper->method('getWopiForToken')->willReturn($wopi);
		$this->groupManager->method('isAdmin')->willReturn($isAdmin);
		$this->userManager->method('userExists')->willReturn($userExists);
	}

	private function settingsPath(SettingsType $type, string $category = 'wordbook', string $name = 'x.dic'): string {
		return '/settings/' . $type->value . '/' . $category . '/' . $name;
	}

	/**
	 * Calls one of the settings endpoints for $type. The read endpoint takes the type directly
	 * while the write endpoints carry it inside the settings path.
	 */
	private function callSettingsEndpoint(string $endpoint, SettingsType $type): JSONResponse {
		$controller = $this->makeController();

		return match ($endpoint) {
			'getSettings' => $controller->getSettings($type->value, 'token'),
			'uploadSettingsFile' => $controller->uploadSettingsFile($this->settingsPath($type), 'token'),
			'deleteSettingsFile' => $controller->deleteSettingsFile($this->settingsPath($type), 'token'),
		};
	}

	/**
	 * Asserts that the request never reached the service behind any settings endpoint.
	 */
	private function expectNoSettingsAccess(): void {
		$this->settingsService->expects($this->never())->method('generateSettingsConfig');
		$this->settingsService->expects($this->never())->method('uploadFile');
		$this->settingsService->expects($this->never())->method('deleteSettingsFile');
	}

	public static function settingsEndpointProvider(): array {
		return [
			'read' => ['getSettings'],
			'upload' => ['uploadSettingsFile'],
			'delete' => ['deleteSettingsFile'],
		];
	}

	public static function writeEndpointProvider(): array {
		return [
			'upload' => ['uploadSettingsFile'],
			'delete' => ['deleteSettingsFile'],
		];
	}

	public static function unsupportedTokenTypeProvider(): array {
		$cases = [];
		foreach (self::settingsEndpointProvider() as $endpointName => [$endpoint]) {
			foreach ([
				'guest' => Wopi::TOKEN_TYPE_GUEST,
				'remote user' => Wopi::TOKEN_TYPE_REMOTE_USER,
				'remote guest' => Wopi::TOKEN_TYPE_REMOTE_GUEST,
				'initiator' => Wopi::TOKEN_TYPE_INITIATOR,
			] as $tokenName => $tokenType) {
				$cases[$endpointName . ' / ' . $tokenName] = [$endpoint, $tokenType];
			}
		}
		return $cases;
	}

	/**
	 * Settings are only reachable with a settings token or with the document token of the editor
	 * session the settings iframe runs in.
	 *
	 * @dataProvider unsupportedTokenTypeProvider
	 */
	public function testSettingsEndpointsRejectUnsupportedTokenTypes(string $endpoint, int $tokenType): void {
		$this->givenToken($tokenType, 'alice');
		$this->expectNoSettingsAccess();

		$response = $this->callSettingsEndpoint($endpoint, SettingsType::UserConfig);

		$this->assertSame(Http::STATUS_FORBIDDEN, $response->getStatus());
	}

	/**
	 * User settings are stored per user, so a token naming no existing account, such as the
	 * synthetic user of a public session, must not reach them.
	 *
	 * @dataProvider settingsEndpointProvider
	 */
	public function testSettingsEndpointsRejectUserConfigForUnknownUser(string $endpoint): void {
		$this->givenToken(Wopi::TOKEN_TYPE_SETTING_AUTH, 'Guest-a1b2c3d4', userExists: false);
		$this->expectNoSettingsAccess();

		$response = $this->callSettingsEndpoint($endpoint, SettingsType::UserConfig);

		$this->assertSame(Http::STATUS_FORBIDDEN, $response->getStatus());
	}

	/**
	 * A token with no editor at all has to be treated like the empty user it is, rather than
	 * reaching the service or failing on the null.
	 *
	 * @dataProvider settingsEndpointProvider
	 */
	public function testSettingsEndpointsRejectUserConfigForTokenWithoutEditor(string $endpoint): void {
		$this->givenToken(Wopi::TOKEN_TYPE_USER, null, userExists: false);
		$this->expectNoSettingsAccess();

		$response = $this->callSettingsEndpoint($endpoint, SettingsType::UserConfig);

		$this->assertSame(Http::STATUS_FORBIDDEN, $response->getStatus());
	}

	/**
	 * The document token is not scoped to the settings session, so admin rights alone must not let
	 * it reach instance wide configuration.
	 *
	 * @dataProvider writeEndpointProvider
	 */
	public function testWriteEndpointsRejectSystemConfigForUserToken(string $endpoint): void {
		$this->givenToken(Wopi::TOKEN_TYPE_USER, 'admin', isAdmin: true);
		$this->expectNoSettingsAccess();

		$response = $this->callSettingsEndpoint($endpoint, SettingsType::SystemConfig);

		$this->assertSame(Http::STATUS_FORBIDDEN, $response->getStatus());
	}

	/**
	 * @dataProvider writeEndpointProvider
	 */
	public function testWriteEndpointsRejectSystemConfigForNonAdmin(string $endpoint): void {
		$this->givenToken(Wopi::TOKEN_TYPE_SETTING_AUTH, 'alice', isAdmin: false);
		$this->expectNoSettingsAccess();

		$response = $this->callSettingsEndpoint($endpoint, SettingsType::SystemConfig);

		$this->assertSame(Http::STATUS_FORBIDDEN, $response->getStatus());
	}

	public static function invalidSettingsPathProvider(): array {
		$cases = [];
		foreach (self::writeEndpointProvider() as $endpointName => [$endpoint]) {
			foreach ([
				'unrelated appdata folder' => '/settings/fonts/overview/x.png',
				'case variant of systemconfig' => '/settings/SystemConfig/wordbook/x.dic',
				'not a settings path' => '/nonsense',
				'incomplete path' => '/settings/userconfig/wordbook',
			] as $caseName => $fileId) {
				$cases[$endpointName . ' / ' . $caseName] = [$endpoint, $fileId];
			}
		}
		return $cases;
	}

	/**
	 * The write endpoints take the type from the settings path, so an unknown type and a path that
	 * is no settings path at all both have to be refused before anything is written.
	 *
	 * @dataProvider invalidSettingsPathProvider
	 */
	public function testWriteEndpointsRejectInvalidSettingsPath(string $endpoint, string $fileId): void {
		$this->givenToken(Wopi::TOKEN_TYPE_SETTING_AUTH, 'admin', isAdmin: true);
		$this->expectNoSettingsAccess();

		$response = $this->makeController()->$endpoint($fileId, 'token');

		$this->assertSame(Http::STATUS_BAD_REQUEST, $response->getStatus());
	}

	public static function unknownReadTypeProvider(): array {
		return [
			'another user config directory' => ['userconfig/victim'],
			'unrelated appdata folder' => ['fonts'],
			'case variant of systemconfig' => ['SystemConfig'],
			'traversal' => ['../fonts'],
			'empty' => [''],
		];
	}

	/**
	 * The read endpoint takes the type straight from the query, where a nested type would otherwise
	 * list another user's settings directory.
	 *
	 * @dataProvider unknownReadTypeProvider
	 */
	public function testGetSettingsRejectsUnknownType(string $type): void {
		$this->givenToken(Wopi::TOKEN_TYPE_SETTING_AUTH, 'alice');
		$this->expectNoSettingsAccess();

		$response = $this->makeController()->getSettings($type, 'token');

		$this->assertSame(Http::STATUS_BAD_REQUEST, $response->getStatus());
	}

	/**
	 * Collabora reads settings and rounds presets back to the host with the document token, so a
	 * user token has to keep working for userconfig.
	 */
	public function testGetSettingsAcceptsUserTokenForUserConfig(): void {
		$this->givenToken(Wopi::TOKEN_TYPE_USER, 'alice');
		$this->settingsService->expects($this->once())
			->method('generateSettingsConfig')
			->with(SettingsType::UserConfig->value, 'alice')
			->willReturn(['kind' => 'user']);

		$response = $this->callSettingsEndpoint('getSettings', SettingsType::UserConfig);

		$this->assertSame(Http::STATUS_OK, $response->getStatus());
	}

	/**
	 * Shared settings are instance wide and carry no user, so a public session must still read them.
	 */
	public function testGetSettingsAllowsSystemConfigForEmptyUser(): void {
		$this->givenToken(Wopi::TOKEN_TYPE_SETTING_AUTH, '', userExists: false);
		$this->settingsService->expects($this->once())
			->method('generateSettingsConfig')
			->with(SettingsType::SystemConfig->value, '')
			->willReturn(['kind' => 'shared']);

		$response = $this->callSettingsEndpoint('getSettings', SettingsType::SystemConfig);

		$this->assertSame(Http::STATUS_OK, $response->getStatus());
	}

	/**
	 * The target directory comes from the token, never from the request, so a crafted path cannot
	 * name another user's settings.
	 */
	public function testUploadSettingsFileWritesOnlyToTokenOwnersDirectory(): void {
		$this->givenToken(Wopi::TOKEN_TYPE_USER, 'alice');
		$this->settingsService->expects($this->once())
			->method('uploadFile')
			->with(
				$this->callback(fn (SettingsUrl $url) => $url->getSettingsType() === SettingsType::UserConfig),
				$this->anything(),
				'alice',
			)
			->willReturn(self::UPLOAD_RESULT);

		$response = $this->makeController()->uploadSettingsFile(
			$this->settingsPath(SettingsType::UserConfig, 'victim', 'wordbook/x.dic'),
			'token',
		);

		$this->assertSame(Http::STATUS_OK, $response->getStatus());
	}

	public function testDeleteSettingsFileDeletesOnlyFromTokenOwnersDirectory(): void {
		$this->givenToken(Wopi::TOKEN_TYPE_USER, 'alice');
		$this->settingsService->expects($this->once())
			->method('deleteSettingsFile')
			->with(SettingsType::UserConfig->value, 'victim', 'wordbook/x.dic', 'alice');

		$response = $this->makeController()->deleteSettingsFile(
			$this->settingsPath(SettingsType::UserConfig, 'victim', 'wordbook/x.dic'),
			'token',
		);

		$this->assertSame(Http::STATUS_OK, $response->getStatus());
	}

	public function testUploadSettingsFileAcceptsSettingsAuthForSystemConfig(): void {
		$this->givenToken(Wopi::TOKEN_TYPE_SETTING_AUTH, 'admin', isAdmin: true);
		$this->settingsService->expects($this->once())->method('uploadFile')->willReturn(self::UPLOAD_RESULT);

		$response = $this->callSettingsEndpoint('uploadSettingsFile', SettingsType::SystemConfig);

		$this->assertSame(Http::STATUS_OK, $response->getStatus());
	}

	public function testDeleteSettingsFileAcceptsSettingsAuthForSystemConfig(): void {
		$this->givenToken(Wopi::TOKEN_TYPE_SETTING_AUTH, 'admin', isAdmin: true);
		$this->settingsService->expects($this->once())->method('deleteSettingsFile');

		$response = $this->callSettingsEndpoint('deleteSettingsFile', SettingsType::SystemConfig);

		$this->assertSame(Http::STATUS_OK, $response->getStatus());
	}

	/**
	 * A public session has no user, so the settings token handed to Collabora must not be bound to
	 * the synthetic guest id that is only used as a display name.
	 */
	public function testCheckFileInfoBindsSettingsTokenToTheRealEditor(): void {
		$this->givenToken(Wopi::TOKEN_TYPE_GUEST, null, userExists: false);
		$this->capabilitiesService->method('hasSettingIframeSupport')->willReturn(true);

		$file = $this->createMock(File::class);
		$file->method('getName')->willReturn('document.odt');
		$file->method('getSize')->willReturn(1);
		$file->method('getMTime')->willReturn(0);
		$file->method('getId')->willReturn(1);

		$userFolder = $this->createMock(IUserFolder::class);
		$userFolder->method('getById')->willReturn([$file]);
		$this->rootFolder->method('getUserFolder')->willReturn($userFolder);

		$this->settingsService->expects($this->once())
			->method('generateIframeToken')
			->with('user', '')
			->willReturn(['token' => 'settings-token', 'token_ttl' => 0]);
		$this->settingsService->method('getFolderEtag')->willReturn('etag');
		$this->settingsService->method('getPresentationFolderEtag')->willReturn('etag');

		$response = $this->makeController()->checkFileInfo('1_instanceid', 'token');

		$this->assertSame(Http::STATUS_OK, $response->getStatus());
		$this->assertArrayNotHasKey('UserSettings', $response->getData());
	}
}
