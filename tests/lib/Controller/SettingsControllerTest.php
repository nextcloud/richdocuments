<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments\Controller;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Controller\SettingsController;
use OCA\Richdocuments\Db\Wopi;
use OCA\Richdocuments\Db\WopiMapper;
use OCA\Richdocuments\Service\CapabilitiesService;
use OCA\Richdocuments\Service\ConnectivityService;
use OCA\Richdocuments\Service\DemoService;
use OCA\Richdocuments\Service\DiscoveryService;
use OCA\Richdocuments\Service\FontService;
use OCA\Richdocuments\Service\SettingsService;
use OCA\Richdocuments\TemplateManager;
use OCP\AppFramework\Http;
use OCP\Files\SimpleFS\ISimpleFile;
use OCP\IConfig;
use OCP\IL10N;
use OCP\IRequest;
use OCP\IURLGenerator;
use OCP\IUserManager;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class SettingsControllerTest extends TestCase {
	private WopiMapper $wopiMapper;
	private IUserManager $userManager;
	private SettingsService $settingsService;

	protected function setUp(): void {
		parent::setUp();

		$this->wopiMapper = $this->createMock(WopiMapper::class);
		$this->userManager = $this->createMock(IUserManager::class);
		$this->settingsService = $this->createMock(SettingsService::class);
	}

	private function makeController(): SettingsController {
		return new SettingsController(
			'richdocuments',
			$this->createMock(IRequest::class),
			$this->createMock(IL10N::class),
			$this->createMock(AppConfig::class),
			$this->createMock(IConfig::class),
			$this->createMock(ConnectivityService::class),
			$this->createMock(DiscoveryService::class),
			$this->createMock(CapabilitiesService::class),
			$this->createMock(DemoService::class),
			$this->createMock(FontService::class),
			$this->settingsService,
			$this->createMock(LoggerInterface::class),
			$this->createMock(IURLGenerator::class),
			$this->wopiMapper,
			$this->userManager,
			'admin',
			$this->createMock(TemplateManager::class),
		);
	}

	private function givenSettingsToken(?string $editorUid, bool $userExists = true): void {
		$wopi = new Wopi();
		$wopi->setToken('token');
		$wopi->setTokenType(Wopi::TOKEN_TYPE_SETTING_AUTH);
		$wopi->setEditorUid($editorUid);
		$wopi->setOwnerUid($editorUid ?? '');

		$this->wopiMapper->method('getWopiForToken')->willReturn($wopi);
		$this->userManager->method('userExists')->willReturn($userExists);
	}

	/**
	 * A public session holds a settings token with no user. An empty user would collapse
	 * "userconfig/" back onto the userconfig folder itself, so the category segment would address
	 * another user's directory and serve that user's file contents.
	 */
	public function testGetSettingsFileRefusesUserConfigForEmptyUser(): void {
		$this->givenSettingsToken('', userExists: false);
		$this->settingsService->expects($this->never())->method('getSettingsFile');

		$response = $this->makeController()->getSettingsFile(
			'userconfig',
			'token',
			'victim',
			'wordbook/victim-private.dic',
		);

		$this->assertSame(Http::STATUS_FORBIDDEN, $response->getStatus());
	}

	public function testGetSettingsFileRefusesUserConfigForUnknownUser(): void {
		$this->givenSettingsToken('Guest-a1b2c3d4', userExists: false);
		$this->settingsService->expects($this->never())->method('getSettingsFile');

		$response = $this->makeController()->getSettingsFile('userconfig', 'token', 'wordbook', 'x.dic');

		$this->assertSame(Http::STATUS_FORBIDDEN, $response->getStatus());
	}

	public function testGetSettingsFileRefusesUnknownType(): void {
		$this->givenSettingsToken('admin');
		$this->settingsService->expects($this->never())->method('getSettingsFile');

		$response = $this->makeController()->getSettingsFile('fonts', 'token', 'injected', 'evil.ttf');

		$this->assertSame(Http::STATUS_FORBIDDEN, $response->getStatus());
	}

	public function testGetSettingsFileRefusesNonSettingsToken(): void {
		$wopi = new Wopi();
		$wopi->setToken('token');
		$wopi->setTokenType(Wopi::TOKEN_TYPE_USER);
		$wopi->setEditorUid('admin');
		$this->wopiMapper->method('getWopiForToken')->willReturn($wopi);
		$this->settingsService->expects($this->never())->method('getSettingsFile');

		$response = $this->makeController()->getSettingsFile('userconfig', 'token', 'wordbook', 'x.dic');

		$this->assertSame(Http::STATUS_FORBIDDEN, $response->getStatus());
	}

	/**
	 * The user directory comes from the token, so the path is always scoped to its owner.
	 */
	public function testGetSettingsFileScopesUserConfigToTheTokenOwner(): void {
		$this->givenSettingsToken('alice');

		$file = $this->createMock(ISimpleFile::class);
		$file->method('getContent')->willReturn('content');
		$file->method('getMimeType')->willReturn('application/octet-stream');

		$this->settingsService->expects($this->once())
			->method('getSettingsFile')
			->with('userconfig/alice', 'wordbook', 'x.dic')
			->willReturn($file);

		$response = $this->makeController()->getSettingsFile('userconfig', 'token', 'wordbook', 'x.dic');

		$this->assertSame(Http::STATUS_OK, $response->getStatus());
	}

	/**
	 * Shared settings are instance wide and carry no user, so a public session must still read them.
	 */
	public function testGetSettingsFileAllowsSystemConfigForEmptyUser(): void {
		$this->givenSettingsToken('', userExists: false);

		$file = $this->createMock(ISimpleFile::class);
		$file->method('getContent')->willReturn('content');
		$file->method('getMimeType')->willReturn('application/octet-stream');

		$this->settingsService->expects($this->once())
			->method('getSettingsFile')
			->with('systemconfig', 'wordbook', 'shared.dic')
			->willReturn($file);

		$response = $this->makeController()->getSettingsFile('systemconfig', 'token', 'wordbook', 'shared.dic');

		$this->assertSame(Http::STATUS_OK, $response->getStatus());
	}
}
