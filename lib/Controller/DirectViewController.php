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
use OCP\ILogger;
use OCP\IRequest;

class DirectViewController extends Controller {
	use DocumentTrait;

	/** @var IRootFolder */
	private $rootFolder;

	/** @var TokenManager */
	private $tokenManager;

	/** @var DirectMapper */
	private $directMapper;

	/** @var IConfig */
	private $config;

	/** @var AppConfig */
	private $appConfig;

	/** @var TemplateManager */
	private $templateManager;

	/** @var FederationService */
	private $federationService;

	/** @var ILogger */
	private $logger;

	/** @var InitialStateService */
	private $initialState;

	public function __construct(
		$appName,
		IRequest $request,
		IRootFolder $rootFolder,
		TokenManager $tokenManager,
		DirectMapper $directMapper,
		InitialStateService $initialState,
		IConfig $config,
		AppConfig $appConfig,
		TemplateManager $templateManager,
		FederationService $federationService,
		ILogger $logger
	) {
		parent::__construct($appName, $request);

		$this->rootFolder = $rootFolder;
		$this->tokenManager = $tokenManager;
		$this->directMapper = $directMapper;
		$this->initialState = $initialState;
		$this->config = $config;
		$this->appConfig = $appConfig;
		$this->templateManager = $templateManager;
		$this->federationService = $federationService;
		$this->logger = $logger;
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


		$folder = $this->rootFolder->getUserFolder($direct->getUid());
		if ($this->templateManager->isTemplate($direct->getFileid())) {
			$item = $this->templateManager->get($direct->getFileid());
			if ($direct->getTemplateDestination() === 0 || $direct->getTemplateDestination() === null) {
				return new JSONResponse([], Http::STATUS_BAD_REQUEST);
			}

			try {
				list($urlSrc, $wopi) = $this->tokenManager->getTokenForTemplate($item, $direct->getUid(), $direct->getTemplateDestination(), true);

				$targetFile = $folder->getById($direct->getTemplateDestination())[0];
				$relativePath = $folder->getRelativePath($targetFile->getPath());
			} catch (\Exception $e) {
				$this->logger->error('Failed to generate token for new file on direct editing', ['exception' => $e]);
				return new JSONResponse([], Http::STATUS_BAD_REQUEST);
			}
		} else {
			try {
				$item = $folder->getById($direct->getFileid())[0];
				if(!($item instanceof Node)) {
					throw new \Exception();
				}

				/** Open file from remote collabora */
				$federatedUrl = $this->federationService->getRemoteRedirectURL($item, $direct);
				if ($federatedUrl !== null) {
					$response = new RedirectResponse($federatedUrl);
					$response->addHeader('X-Frame-Options', 'ALLOW');
					return $response;
				}

				list($urlSrc, $token, $wopi) = $this->tokenManager->getToken($item->getId(), null, $direct->getUid(), true);
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
				'urlsrc' => $urlSrc,
				'path' => $relativePath,
				'instanceId' => $this->config->getSystemValue('instanceid'),
				'canonical_webroot' => $this->appConfig->getAppValue('canonical_webroot'),
				'direct' => true,
			];

			$this->initialState->provideDocument($wopi);
			$response = new TemplateResponse('richdocuments', 'documents', $params, 'base');
			$this->applyPolicies($response);
			return $response;
		} catch (\Exception $e) {
			$this->logger->logException($e);
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
					'instanceId' => $this->settings->getSystemValue('instanceid'),
					'canonical_webroot' => $this->appConfig->getAppValue('canonical_webroot'),
					'userId' => null,
					'direct' => true,
					'directGuest' => empty($direct->getUid()),
				];

				list($urlSrc, $token, $wopi) = $this->tokenManager->getToken($node->getId(), $direct->getShare(), $direct->getUid(), true);
				if (!empty($direct->getInitiatorHost())) {
					$this->tokenManager->upgradeFromDirectInitiator($direct, $wopi);
				}
				$params['token'] = $token;
				$params['urlsrc'] = $urlSrc;

				$this->initialState->provideDocument($wopi);
				$response = new TemplateResponse('richdocuments', 'documents', $params, 'base');
				$this->applyPolicies($response);
				return $response;
			}
		} catch (\Exception $e) {
			$this->logger->logException($e, ['app'=>'richdocuments']);
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
