<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments\Controller;

use OCA\Richdocuments\Controller\OverviewController;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Services\IInitialState;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\IPreview;
use OCP\IRequest;
use Test\TestCase;

class OverviewControllerTest extends TestCase {
	private IEventDispatcher $eventDispatcher;
	private IInitialState $initialState;
	private IPreview $preview;
	private OverviewController $controller;

	protected function setUp(): void {
		parent::setUp();

		$this->eventDispatcher = $this->createMock(IEventDispatcher::class);
		$this->initialState = $this->createMock(IInitialState::class);
		$this->preview = $this->createMock(IPreview::class);

		$this->controller = new OverviewController(
			'richdocuments',
			$this->createMock(IRequest::class),
			$this->eventDispatcher,
			$this->initialState,
			$this->preview,
		);
	}

	public function testIndexReturnsTemplateResponse(): void {
		$response = $this->controller->index();

		$this->assertInstanceOf(TemplateResponse::class, $response);
		$this->assertSame('richdocuments', $response->getApp());
		$this->assertSame('overview', $response->getTemplateName());
		$this->assertSame('#app-content-vue', $response->getParams()['id-app-content']);
		$this->assertSame('#app-navigation-vue', $response->getParams()['id-app-navigation']);
	}

	public function testIndexSetsPreviewEnabledTrue(): void {
		$this->preview->expects($this->once())
			->method('isMimeSupported')
			->with('application/vnd.oasis.opendocument.text')
			->willReturn(true);

		$this->initialState->expects($this->once())
			->method('provideInitialState')
			->with('previewEnabled', true);

		$this->controller->index();
	}

	public function testIndexSetsPreviewEnabledFalse(): void {
		$this->preview->expects($this->once())
			->method('isMimeSupported')
			->with('application/vnd.oasis.opendocument.text')
			->willReturn(false);

		$this->initialState->expects($this->once())
			->method('provideInitialState')
			->with('previewEnabled', false);

		$this->controller->index();
	}
}
