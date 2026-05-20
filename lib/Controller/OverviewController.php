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
use OCP\AppFramework\Services\IInitialState;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\IConfig;
use OCP\IPreview;
use OCP\IRequest;
use OCP\Util;

class OverviewController extends Controller {

	public function __construct(
		string $appName,
		IRequest $request,
		private IEventDispatcher $eventDispatcher,
		private IInitialState $initialState,
		private IPreview $preview,
		private IConfig $config,
		private ?string $userId,
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

		$this->initialState->provideInitialState('previewEnabled', $this->preview->isMimeSupported('application/vnd.oasis.opendocument.text'));
		$this->initialState->provideInitialState('overview_config', [
			'overview_grid_view' => $this->userId !== null
				&& $this->config->getUserValue($this->userId, 'richdocuments', 'overview_grid_view', '0') === '1',
		]);

		// Viewer is pre-installed in production but may not be available in other environments
		if (class_exists(LoadViewer::class)) {
			$this->eventDispatcher->dispatchTyped(new LoadViewer());
		}

		return new TemplateResponse('richdocuments', 'overview', [
			'id-app-content' => '#app-content-vue',
			'id-app-navigation' => '#app-navigation-vue',
		]);
	}
}
