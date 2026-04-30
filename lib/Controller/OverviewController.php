<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Controller;

use OCA\Richdocuments\AppInfo\Application;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Services\IInitialState;
use OCP\IRequest;

/**
 * Renders the SPA shell that hosts the Vue overview app.
 *
 * The Vue router takes over once the shell is mounted, so a single route
 * handles every overview path (Home, Recent, Shared, Templates).
 */
class OverviewController extends Controller {
	public function __construct(
		string $appName,
		IRequest $request,
		private IInitialState $initialState,
	) {
		parent::__construct($appName, $request);
	}

	#[NoAdminRequired]
	#[NoCSRFRequired]
	public function index(): TemplateResponse {
		$this->initialState->provideInitialState('overview', [
			'pageSize' => \OCA\Richdocuments\Service\OverviewService::PAGE_SIZE,
			'homeSectionLimit' => \OCA\Richdocuments\Service\OverviewService::HOME_SECTION_LIMIT,
			'windowDays' => \OCA\Richdocuments\Service\OverviewService::RECENT_WINDOW_DAYS,
		]);

		return new TemplateResponse(Application::APPNAME, 'overview', [], TemplateResponse::RENDER_AS_USER);
	}
}
