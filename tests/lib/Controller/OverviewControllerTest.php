<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments\Controller;

use OCA\Richdocuments\Controller\OverviewController;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\IRequest;
use Test\TestCase;

class OverviewControllerTest extends TestCase {

	public function testIndexReturnsTemplateResponse(): void {
		$request = $this->createMock(IRequest::class);
		$eventDispatcher = $this->createMock(IEventDispatcher::class);

		$controller = new OverviewController('richdocuments', $request, $eventDispatcher);
		$response = $controller->index();

		$this->assertInstanceOf(TemplateResponse::class, $response);
		$this->assertSame('richdocuments', $response->getApp());
		$this->assertSame('overview', $response->getTemplateName());
		$this->assertSame('#app-content-vue', $response->getParams()['id-app-content']);
		$this->assertSame('#app-navigation-vue', $response->getParams()['id-app-navigation']);
	}
}
