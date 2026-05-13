<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Service;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Controller\DocumentTrait;
use OCA\Richdocuments\TemplateManager;
use OCA\Richdocuments\TokenManager;
use OCP\AppFramework\Http\RedirectResponse;
use OCP\AppFramework\Http\Response;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\Files\File;
use OCP\Files\IRootFolder;
use OCP\IConfig;
use Psr\Log\LoggerInterface;

/**
 * Shared rendering logic for direct-editing entry points.
 *
 * Used both by the legacy {@see \OCA\Richdocuments\Controller\DirectViewController}
 * webview route and by {@see \OCA\Richdocuments\DirectEditing\OfficeDirectEditor}
 * implementing the server's {@see \OCP\DirectEditing\IEditor} contract.
 */
class DirectEditingViewService {
	use DocumentTrait;

	public function __construct(
		private IRootFolder $rootFolder,
		private TokenManager $tokenManager,
		private TemplateManager $templateManager,
		private FederationService $federationService,
		private InitialStateService $initialState,
		private IConfig $config,
		private AppConfig $appConfig,
		private IEventDispatcher $eventDispatcher,
		private LoggerInterface $logger,
	) {
	}

	/**
	 * Render the editor for a file owned by $userId. Caller is responsible for
	 * having set the user/filesystem scope.
	 *
	 * Returns a {@see RedirectResponse} when the file lives on a federated
	 * mount that has its own collabora instance.
	 */
	/**
	 * Associate a template source with a target file id so the next call to
	 * {@see self::render()} generates a template-aware WOPI token. Used by
	 * the legacy direct token flow where the template id is carried on the
	 * `richdocuments_direct` row instead of `richdocuments_template`.
	 */
	public function primeTemplateSource(int $targetFileId, int $templateFileId, string $userId): void {
		$this->templateManager->setUserId($userId);
		$this->templateManager->setTemplateSource($targetFileId, $templateFileId);
	}

	public function render(File $file, string $userId, bool $isDirect = true): Response {
		$federatedUrl = $this->federationService->getRemoteRedirectURL($file);
		if ($federatedUrl !== null) {
			return new RedirectResponse($federatedUrl);
		}

		$this->templateManager->setUserId($userId);
		$templateSource = $this->templateManager->getTemplateSource($file->getId());
		if ($templateSource !== null) {
			$wopi = $this->tokenManager->generateWopiTokenForTemplate(
				$templateSource,
				$file->getId(),
				$userId,
				false,
				$isDirect,
			);
		} else {
			$wopi = $this->tokenManager->generateWopiToken((string)$file->getId(), null, $userId, $isDirect);
		}

		$urlSrc = $this->tokenManager->getUrlSrc($file);

		$folder = $this->rootFolder->getUserFolder($userId);
		$relativePath = $folder->getRelativePath($file->getPath()) ?? $file->getName();

		$params = [
			'permissions' => $file->getPermissions(),
			'title' => basename($relativePath),
			'fileId' => $wopi->getFileid() . '_' . $this->config->getSystemValue('instanceid'),
			'token' => $wopi->getToken(),
			'token_ttl' => $wopi->getExpiry(),
			'urlsrc' => $urlSrc,
			'path' => $relativePath,
			'direct' => $isDirect,
			'userId' => $userId,
		];

		return $this->documentTemplateResponse($wopi, $params);
	}
}
