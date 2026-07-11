<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments\Controller;

use OCA\Richdocuments\Controller\FederationController;
use OCA\Richdocuments\Db\Wopi;
use OCA\Richdocuments\Db\WopiMapper;
use OCA\Richdocuments\Service\FederationService;
use OCP\AppFramework\OCS\OCSForbiddenException;
use OCP\AppFramework\OCS\OCSNotFoundException;
use OCP\Http\Client\IClient;
use OCP\Http\Client\IClientService;
use OCP\Http\Client\IResponse;
use OCP\IConfig;
use OCP\IRequest;
use OCP\IURLGenerator;
use OCP\IUser;
use OCP\IUserManager;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class FederationControllerTest extends TestCase {
	private FederationController $controller;
	private WopiMapper $wopiMapper;
	private IUserManager $userManager;
	private FederationService $federationService;
	private IClientService $clientService;

	protected function setUp(): void {
		parent::setUp();

		$this->wopiMapper = $this->createMock(WopiMapper::class);
		$this->userManager = $this->createMock(IUserManager::class);
		$this->federationService = $this->createMock(FederationService::class);
		$this->clientService = $this->createMock(IClientService::class);

		$this->controller = new FederationController(
			'richdocuments',
			$this->createMock(IRequest::class),
			$this->createMock(IConfig::class),
			$this->createMock(LoggerInterface::class),
			$this->wopiMapper,
			$this->userManager,
			$this->createMock(IURLGenerator::class),
			$this->clientService,
			$this->federationService,
		);
	}

	private function makeGuestWopi(string $remoteServer, string $remoteServerToken): Wopi {
		$wopi = new Wopi();
		$wopi->setTokenType(Wopi::TOKEN_TYPE_INITIATOR);
		$wopi->setRemoteServer($remoteServer);
		$wopi->setRemoteServerToken($remoteServerToken);
		return $wopi;
	}

	/**
	 * @test
	 */
	public function testRemoteWopiTokenRejectsNonInitiatorType(): void {
		$wopi = Wopi::fromParams(['tokenType' => Wopi::TOKEN_TYPE_USER]);
		$this->wopiMapper->expects($this->once())
			->method('getWopiForToken')
			->willReturn($wopi);

		$this->expectException(OCSNotFoundException::class);
		$this->controller->remoteWopiToken('some-token');
	}

	/**
	 * @test
	 */
	public function remoteWopiTokenThrowsForbiddenForUntrustedServer(): void {
		$wopi = $this->makeGuestWopi('http://evil.example.com/', 'dummy');
		$this->wopiMapper->method('getWopiForToken')->willReturn($wopi);
		$this->federationService->method('isTrustedRemote')->with('http://evil.example.com/')->willReturn(false);
		$this->clientService->expects($this->never())->method('newClient');

		$this->expectException(OCSForbiddenException::class);
		$this->controller->remoteWopiToken('some-token');
	}

	/**
	 * @test
	 */
	public function remoteWopiTokenMakesHttpPostForTrustedServer(): void {
		$wopi = $this->makeGuestWopi('http://trusted.example.com/', 'real-token');
		$this->wopiMapper->method('getWopiForToken')->willReturn($wopi);
		$this->federationService->method('isTrustedRemote')->with('http://trusted.example.com/')->willReturn(true);

		$httpResponse = $this->createMock(IResponse::class);
		$httpResponse->method('getBody')->willReturn(json_encode([
			'ocs' => ['data' => ['displayName' => 'Remote User']],
		]));

		$httpClient = $this->createMock(IClient::class);
		$httpClient->expects($this->once())
			->method('post')
			->with($this->stringContains('http://trusted.example.com/'))
			->willReturn($httpResponse);

		$this->clientService->method('newClient')->willReturn($httpClient);

		$response = $this->controller->remoteWopiToken('some-token');
		$this->assertEquals(200, $response->getStatus());
	}

	/**
	 * @test
	 */
	public function testRemoteWopiTokenReturnsMinimalFields(): void {
		$wopi = Wopi::fromParams([
			'tokenType' => Wopi::TOKEN_TYPE_INITIATOR,
			'editorUid' => 'user1',
			'canwrite' => true,
			'hideDownload' => false,
		]);
		$this->wopiMapper->expects($this->once())
			->method('getWopiForToken')
			->willReturn($wopi);

		$user = $this->createMock(IUser::class);
		$user->method('getDisplayName')->willReturn('User One');
		$this->userManager->expects($this->once())
			->method('get')
			->with('user1')
			->willReturn($user);

		$response = $this->controller->remoteWopiToken('some-token');
		$data = $response->getData();

		$this->assertCount(5, $data);
		$this->assertSame(Wopi::TOKEN_TYPE_INITIATOR, $data['tokenType']);
		$this->assertSame('user1', $data['editorUid']);
		$this->assertSame('User One', $data['guestDisplayname']);
		$this->assertTrue($data['canwrite']);
		$this->assertFalse($data['hideDownload']);
	}
}
