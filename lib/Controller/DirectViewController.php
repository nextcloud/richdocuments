<?php
/**
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Controller;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Db\Direct;
use OCA\Richdocuments\Db\DirectMapper;
use OCA\Richdocuments\Service\FederationService;
use OCA\Richdocuments\Service\InitialStateService;
use OCA\Richdocuments\Service\UserScopeService;
use OCA\Richdocuments\TemplateManager;
use OCA\Richdocuments\TokenManager;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\RedirectResponse;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\IConfig;
use OCP\IRequest;
use OCP\Share\IManager as ShareManager;
use Psr\Log\LoggerInterface;

class DirectViewController extends Controller {
	use DocumentTrait;

	public function __construct(
		string $appName,
		IRequest $request,
		private ShareManager $shareManager,
		private IRootFolder $rootFolder,
		private TokenManager $tokenManager,
		private DirectMapper $directMapper,
		private UserScopeService $userScopeService,
		private InitialStateService $initialState,
		private IConfig $config,
		private AppConfig $appConfig,
		private TemplateManager $templateManager,
		private FederationService $federationService,
		private LoggerInterface $logger,
	) {
		parent::__construct($appName, $request);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @PublicPage
	 *
	 * @param string $token
	 * @return JSONResponse|RedirectResponse|TemplateResponse
	 * @throws NotFoundException
	 */
	public function show($token) {
		try {
			$direct = $this->directMapper->getByToken($token);
		} catch (DoesNotExistException $e) {
			$response = $this->renderErrorPage('Failed to open the requested file.');
			$response->setStatus(Http::STATUS_FORBIDDEN);
			return $response;
		}

		// Delete the token. They are for 1 time use only
		$this->directMapper->delete($direct);

		// Direct token for share link
		if (!empty($direct->getShare())) {
			return $this->showPublicShare($direct);
		}

		$this->userScopeService->setUserScope($direct->getUid());
		$this->userScopeService->setFilesystemScope($direct->getUid());

		$folder = $this->rootFolder->getUserFolder($direct->getUid());

		try {
			$item = $folder->getFirstNodeById($direct->getFileid());
			if (!($item instanceof File)) {
				throw new \Exception();
			}

			/** Open file from remote collabora */
			$federatedUrl = $this->federationService->getRemoteRedirectURL($item, $direct);
			if ($federatedUrl !== null) {
				$response = new RedirectResponse($federatedUrl);
				$response->addHeader('X-Frame-Options', 'ALLOW');
				return $response;
			}

			$wopi = null;
			$template = $direct->getTemplateId() ? $this->templateManager->get($direct->getTemplateId()) : null;

			if ($template !== null) {
				$wopi = $this->tokenManager->generateWopiTokenForTemplate($template, $item->getId(), $direct->getUid(), false, true);
			}

			if ($wopi === null) {
				$wopi = $this->tokenManager->generateWopiToken((string)$item->getId(), null, $direct->getUid(), true);
			}

			$urlSrc = $this->tokenManager->getUrlSrc($item);
		} catch (\Exception $e) {
			$this->logger->error('Failed to generate token for existing file on direct editing', ['exception' => $e]);
			return $this->renderErrorPage('Failed to open the requested file.');
		}

		$relativePath = $folder->getRelativePath($item->getPath());

		try {
			$params = [
				'permissions' => $item->getPermissions(),
				'title' => basename($relativePath),
				'fileId' => $wopi->getFileid() . '_' . $this->config->getSystemValue('instanceid'),
				'token' => $wopi->getToken(),
				'token_ttl' => $wopi->getExpiry(),
				'urlsrc' => $urlSrc,
				'path' => $relativePath,
				'direct' => true,
			];

			return $this->documentTemplateResponse($wopi, $params);
		} catch (\Exception $e) {
			$this->logger->error($e->getMessage(), ['exception' => $e]);
			return  $this->renderErrorPage('Failed to open the requested file.');
		}
	}

	public function showPublicShare(Direct $direct) {
		try {
			$share = $this->shareManager->getShareByToken($direct->getShare());

			$node = $share->getNode();
			if ($node instanceof Folder) {
				$node = $node->getFirstNodeById($direct->getFileid());
				if ($node === null) {
					throw new NotFoundException();
				}
			}

			// Handle opening a share link that originates from a remote instance
			$federatedUrl = $this->federationService->getRemoteRedirectURL($node, $direct, $share);
			if ($federatedUrl !== null) {
				$response = new RedirectResponse($federatedUrl);
				$response->addHeader('X-Frame-Options', 'ALLOW');
				return $response;
			}

			if ($node instanceof Node) {
				$params = [
					'permissions' => $share->getPermissions(),
					'title' => $node->getName(),
					'fileId' => $node->getId() . '_' . $this->config->getSystemValueString('instanceid'),
					'path' => '/',
					'userId' => null,
					'direct' => true,
					'directGuest' => empty($direct->getUid()),
				];

				$urlSrc = $this->tokenManager->getUrlSrc($node);
				$wopi = $this->tokenManager->generateWopiToken((string)$node->getId(), $direct->getShare(), $direct->getUid(), true);
				if (!empty($direct->getInitiatorHost())) {
					$this->tokenManager->upgradeFromDirectInitiator($direct, $wopi);
				}
				$params['token'] = $wopi->getToken();
				$params['token_ttl'] = $wopi->getExpiry();
				$params['urlsrc'] = $urlSrc;

				return $this->documentTemplateResponse($wopi, $params);
			}
		} catch (\Exception $e) {
			$this->logger->error($e->getMessage(), ['exception' => $e]);
			return $this->renderErrorPage('Failed to open the requested file.');
		}

		return new TemplateResponse('core', '403', [], 'guest');
	}

	private function renderErrorPage($message) {
		$params = [
			'errors' => [['error' => $message]]
		];
		return new TemplateResponse('core', 'error', $params, 'guest');
	}
}
