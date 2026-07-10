<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments\Controller;

use OCA\Richdocuments\Controller\OCSController;
use OCA\Richdocuments\Db\Direct;
use OCA\Richdocuments\Db\DirectMapper;
use OCA\Richdocuments\DirectEditing\OfficeDirectEditor;
use OCA\Richdocuments\Service\FederationService;
use OCA\Richdocuments\TemplateManager;
use OCA\Richdocuments\TokenManager;
use OCP\AppFramework\Http;
use OCP\Constants;
use OCP\DirectEditing\IManager as IDirectEditingManager;
use OCP\Files\File;
use OCP\Files\IRootFolder;
use OCP\Http\Client\IClientService;
use OCP\IRequest;
use OCP\IURLGenerator;
use OCP\Share\IManager as IShareManager;
use OCP\Share\IShare;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class OCSControllerTest extends TestCase {
	private OCSController $controller;
	private FederationService $federationService;
	private IShareManager $shareManager;
	private DirectMapper $directMapper;
	private IURLGenerator $urlGenerator;

	public function setUp(): void {
		parent::setUp();

		$this->federationService = $this->createMock(FederationService::class);
		$this->shareManager = $this->createMock(IShareManager::class);
		$this->directMapper = $this->createMock(DirectMapper::class);
		$this->urlGenerator = $this->createMock(IURLGenerator::class);

		$this->controller = new OCSController(
			'richdocuments',
			$this->createMock(IRequest::class),
			$this->createMock(IRootFolder::class),
			$this->createMock(IClientService::class),
			null,
			$this->directMapper,
			$this->urlGenerator,
			$this->createMock(TemplateManager::class),
			$this->createMock(TokenManager::class),
			$this->shareManager,
			$this->federationService,
			$this->createMock(IDirectEditingManager::class),
			$this->createMock(OfficeDirectEditor::class),
			$this->createMock(LoggerInterface::class),
		);
	}

	private function makeShare(): IShare {
		$file = $this->createMock(File::class);
		$file->method('getId')->willReturn(42);

		$share = $this->createMock(IShare::class);
		$share->method('getPassword')->willReturn(null);
		$share->method('getPermissions')->willReturn(Constants::PERMISSION_READ);
		$share->method('getNode')->willReturn($file);
		return $share;
	}

	/**
	 * @test
	 */
	public function createPublicFromInitiatorBlocksUntrustedServer(): void {
		$this->shareManager->method('getShareByToken')->willReturn($this->makeShare());
		$this->federationService->method('isTrustedRemote')->with('http://evil.example.com/')->willReturn(false);
		$this->directMapper->expects($this->never())->method('newDirect');

		$response = $this->controller->createPublicFromInitiator(
			'http://evil.example.com/',
			'dummy',
			'share-token',
		);

		$this->assertEquals(Http::STATUS_FORBIDDEN, $response->getStatus());
	}

	/**
	 * @test
	 */
	public function createPublicFromInitiatorAllowsTrustedServer(): void {
		$this->shareManager->method('getShareByToken')->willReturn($this->makeShare());
		$this->federationService->method('isTrustedRemote')->with('http://trusted.example.com/')->willReturn(true);

		$direct = new Direct();
		$direct->setToken('direct-abc123');
		$this->directMapper->method('newDirect')->willReturn($direct);

		$this->urlGenerator->method('linkToRouteAbsolute')
			->willReturn('http://cloud.example.com/apps/richdocuments/direct/direct-abc123');

		$response = $this->controller->createPublicFromInitiator(
			'http://trusted.example.com/',
			'initiator-token',
			'share-token',
		);

		$this->assertEquals(Http::STATUS_OK, $response->getStatus());
		$this->assertArrayHasKey('url', $response->getData());
	}
}
