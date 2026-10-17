<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments\Controller;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Controller\DocumentController;
use OCA\Richdocuments\Db\Wopi;
use OCA\Richdocuments\Service\FederationService;
use OCA\Richdocuments\Service\InitialStateService;
use OCA\Richdocuments\TemplateManager;
use OCA\Richdocuments\TokenManager;
use OCP\AppFramework\Http;
use OCP\Constants;
use OCP\Files\File;
use OCP\Files\IRootFolder;
use OCP\Files\IUserFolder;
use OCP\IConfig;
use OCP\IRequest;
use OCP\ISession;
use OCP\IURLGenerator;
use OCP\Share\IManager as IShareManager;
use OCP\Share\IShare;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class DocumentControllerTest extends TestCase {
	private const FILE_ID = 42;
	private const USER_ID = 'user1';

	private DocumentController $controller;
	private TokenManager $tokenManager;
	private TemplateManager $templateManager;
	private FederationService $federationService;
	private IRootFolder $rootFolder;
	private ISession $session;
	private IShareManager $shareManager;
	private InitialStateService $initialStateService;

	public function setUp(): void {
		parent::setUp();

		$this->tokenManager = $this->createMock(TokenManager::class);
		$this->templateManager = $this->createMock(TemplateManager::class);
		$this->federationService = $this->createMock(FederationService::class);
		$this->rootFolder = $this->createMock(IRootFolder::class);
		$this->session = $this->createMock(ISession::class);
		$this->shareManager = $this->createMock(IShareManager::class);
		$this->initialStateService = $this->createMock(InitialStateService::class);

		$this->controller = new DocumentController(
			'richdocuments',
			$this->createMock(IRequest::class),
			$this->createMock(IConfig::class),
			$this->createMock(AppConfig::class),
			$this->shareManager,
			$this->tokenManager,
			$this->rootFolder,
			$this->session,
			self::USER_ID,
			$this->createMock(LoggerInterface::class),
			$this->templateManager,
			$this->federationService,
			$this->initialStateService,
			$this->createMock(IURLGenerator::class),
		);
	}

	/**
	 * Wire up the happy path of token(): an own (non-shared, non-federated,
	 * non-template) file for which TokenManager hands back the given Wopi.
	 */
	private function expectTokenFor(Wopi $wopi): void {
		$file = $this->createMock(File::class);
		$file->method('getId')->willReturn(self::FILE_ID);

		$userFolder = $this->createMock(IUserFolder::class);
		$userFolder->method('getFirstNodeById')->with(self::FILE_ID)->willReturn($file);
		$this->rootFolder->method('getUserFolder')->with(self::USER_ID)->willReturn($userFolder);

		$this->federationService->method('getRemoteRedirectURL')->willReturn(null);
		$this->templateManager->method('getTemplateSource')->willReturn(null);

		$this->tokenManager->method('generateWopiToken')->willReturn($wopi);
		$this->tokenManager->method('getUrlSrc')->willReturn('https://collabora.example.com/browser/dist/cool.html');

		$this->session->method('get')->willReturn(null);
	}

	private function makeWopi(string $token, int $expiry): Wopi {
		return Wopi::fromParams([
			'fileid' => self::FILE_ID,
			'token' => $token,
			'expiry' => $expiry,
		]);
	}

	/**
	 * Collabora needs the expiry to arm its refresh timer. The value is the
	 * absolute expiry from the Wopi record, not a remaining lifetime — the
	 * frontend converts it straight to milliseconds for Collabora.
	 *
	 * @test
	 */
	public function tokenResponseIncludesTtl(): void {
		$expiry = 1700000000;
		$this->expectTokenFor($this->makeWopi('wopi-token-abc123', $expiry));

		$response = $this->controller->token(self::FILE_ID);

		$this->assertEquals(Http::STATUS_OK, $response->getStatus());
		$data = $response->getData();
		$this->assertSame('wopi-token-abc123', $data['token']);
		$this->assertSame($expiry, $data['token_ttl']);
	}

	/**
	 * The remote page is embedded by the initiator instance, so it has to post
	 * its messages to the initiator's origin, not to its own.
	 *
	 * @test
	 */
	public function remotePassesInitiatorOriginAsParentOrigin(): void {
		$file = $this->createMock(File::class);
		$file->method('getId')->willReturn(self::FILE_ID);
		$file->method('getName')->willReturn('document.odt');

		$share = $this->createMock(IShare::class);
		$share->method('getPassword')->willReturn(null);
		$share->method('getPermissions')->willReturn(Constants::PERMISSION_READ | Constants::PERMISSION_UPDATE);
		$share->method('getNode')->willReturn($file);
		$this->shareManager->method('getShareByToken')->with('share-token')->willReturn($share);

		$this->tokenManager->method('getUrlSrc')->willReturn('https://collabora.example.com/browser/dist/cool.html');
		$this->tokenManager->method('generateWopiToken')->willReturn($this->makeWopi('wopi-token-abc123', 1700000000));
		$this->federationService->method('getRemoteFileDetails')
			->with('https://initiator.example.com:8443/', 'remote-token')
			->willReturn(Wopi::fromParams(['editorUid' => 'alice', 'canwrite' => true]));

		$params = null;
		$this->initialStateService->expects($this->once())
			->method('provideDocument')
			->willReturnCallback(function (Wopi $wopi, array $documentParams) use (&$params): void {
				$params = $documentParams;
			});

		$this->controller->remote('share-token', 'https://initiator.example.com:8443/', 'remote-token');

		$this->assertSame('https://initiator.example.com:8443', $params['parentOrigin']);
	}
}
