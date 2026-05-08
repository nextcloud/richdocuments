<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Controller;

use OCA\Viewer\Event\LoadViewer;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\IRequest;
use OCP\Server;
use OCP\Util;

class OverviewController extends Controller {

	public function __construct(
		string $appName,
		IRequest $request,
	) {
		parent::__construct($appName, $request);
	}

	/**
	 * @return TemplateResponse
	 */
	#[NoAdminRequired]
	#[NoCSRFRequired]
	public function index(): TemplateResponse {
		Util::addScript('richdocuments', 'richdocuments-overview');

		Server::get(IEventDispatcher::class)
			->dispatchTyped(new LoadViewer());

		return new TemplateResponse('richdocuments', 'overview', [
			'id-app-content' => '#app-content-vue',
			'id-app-navigation' => '#app-navigation-vue',
		]);
	}
}
