<?php
/**
 * @copyright Copyright (c) 2018, Roeland Jago Douma <roeland@famdouma.nl>
 *
 * @author Roeland Jago Douma <roeland@famdouma.nl>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
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
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\IConfig;
use OCP\IRequest;
use Psr\Log\LoggerInterface;

class DirectViewController extends Controller {
	use DocumentTrait;

	public function __construct(
		string $appName,
		IRequest $request,
		private IRootFolder $rootFolder,
		private TokenManager $tokenManager,
		private DirectMapper $directMapper,
		private UserScopeService $userScopeService,
		private InitialStateService $initialState,
		private IConfig $config,
		private AppConfig $appConfig,
		private TemplateManager $templateManager,
		private FederationService $federationService,
		private LoggerInterface $logger
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
		if ($this->templateManager->isTemplate($direct->getFileid())) {
			$item = $this->templateManager->get($direct->getFileid());
			if ($direct->getTemplateDestination() === 0 || $direct->getTemplateDestination() === null) {
				return new JSONResponse([], Http::STATUS_BAD_REQUEST);
			}

			try {
				$urlSrc = $this->tokenManager->getUrlSrc($item);

				$wopi = $this->tokenManager->generateWopiTokenForTemplate($item, $direct->getTemplateDestination(), $direct->getUid(), false, true);

				$targetFile = $folder->getById($direct->getTemplateDestination())[0];
				$relativePath = $folder->getRelativePath($targetFile->getPath());
			} catch (\Exception $e) {
				$this->logger->error('Failed to generate token for new file on direct editing', ['exception' => $e]);
				return new JSONResponse([], Http::STATUS_BAD_REQUEST);
			}
		} else {
			try {
				$item = $folder->getById($direct->getFileid())[0];
				if (!($item instanceof Node)) {
					throw new \Exception();
				}

				/** Open file from remote collabora */
				$federatedUrl = $this->federationService->getRemoteRedirectURL($item, $direct);
				if ($federatedUrl !== null) {
					$response = new RedirectResponse($federatedUrl);
					$response->addHeader('X-Frame-Options', 'ALLOW');
					return $response;
				}

				$urlSrc = $this->tokenManager->getUrlSrc($item);
				$wopi = $this->tokenManager->generateWopiToken($item->getId(), null, $direct->getUid(), true);
			} catch (\Exception $e) {
				$this->logger->error('Failed to generate token for existing file on direct editing', ['exception' => $e]);
				return $this->renderErrorPage('Failed to open the requested file.');
			}

			$relativePath = $folder->getRelativePath($item->getPath());
		}

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
			$share = \OC::$server->getShareManager()->getShareByToken($direct->getShare());

			$node = $share->getNode();
			if ($node instanceof Folder) {
				$nodes = $node->getById($direct->getFileid());
				$node = array_shift($nodes);
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

			$this->settings = \OC::$server->getConfig();
			if ($node instanceof Node) {
				$params = [
					'permissions' => $share->getPermissions(),
					'title' => $node->getName(),
					'fileId' => $node->getId() . '_' . $this->settings->getSystemValue('instanceid'),
					'path' => '/',
					'userId' => null,
					'direct' => true,
					'directGuest' => empty($direct->getUid()),
				];

				$urlSrc = $this->tokenManager->getUrlSrc($node);
				$wopi = $this->tokenManager->generateWopiToken($node->getId(), $direct->getShare(), $direct->getUid(), true);
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
