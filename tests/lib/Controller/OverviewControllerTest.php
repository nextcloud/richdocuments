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

	public function testIndexReturnsTemplateResponse(): void {
		$request = $this->createMock(IRequest::class);
		$eventDispatcher = $this->createMock(IEventDispatcher::class);
		$initialState = $this->createMock(IInitialState::class);
		$preview = $this->createMock(IPreview::class);
		$preview->method('isMimeSupported')->willReturn(false);

		$controller = new OverviewController('richdocuments', $request, $eventDispatcher, $initialState, $preview);
		$response = $controller->index();

		$this->assertInstanceOf(TemplateResponse::class, $response);
		$this->assertSame('richdocuments', $response->getApp());
		$this->assertSame('overview', $response->getTemplateName());
		$this->assertSame('#app-content-vue', $response->getParams()['id-app-content']);
		$this->assertSame('#app-navigation-vue', $response->getParams()['id-app-navigation']);
	}

	public function testIndexSetsPreviewEnabledTrue(): void {
		$request = $this->createMock(IRequest::class);
		$eventDispatcher = $this->createMock(IEventDispatcher::class);
		$initialState = $this->createMock(IInitialState::class);
		$preview = $this->createMock(IPreview::class);

		$preview->expects($this->once())
			->method('isMimeSupported')
			->with('application/vnd.oasis.opendocument.text')
			->willReturn(true);

		$initialState->expects($this->once())
			->method('provideInitialState')
			->with('previewEnabled', true);

		$controller = new OverviewController('richdocuments', $request, $eventDispatcher, $initialState, $preview);
		$controller->index();
	}

	public function testIndexSetsPreviewEnabledFalse(): void {
		$request = $this->createMock(IRequest::class);
		$eventDispatcher = $this->createMock(IEventDispatcher::class);
		$initialState = $this->createMock(IInitialState::class);
		$preview = $this->createMock(IPreview::class);

		$preview->expects($this->once())
			->method('isMimeSupported')
			->with('application/vnd.oasis.opendocument.text')
			->willReturn(false);

		$initialState->expects($this->once())
			->method('provideInitialState')
			->with('previewEnabled', false);

		$controller = new OverviewController('richdocuments', $request, $eventDispatcher, $initialState, $preview);
		$controller->index();
	}
}
