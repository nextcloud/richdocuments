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
use OCA\Richdocuments\Db\DirectMapper;
use OCA\Richdocuments\Service\FederationService;
use OCA\Richdocuments\TemplateManager;
use OCA\Richdocuments\TokenManager;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\ContentSecurityPolicy;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\RedirectResponse;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\Files\IRootFolder;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\IConfig;
use OCP\IRequest;

class DirectViewController extends Controller {
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

	public function __construct(
		$appName,
		IRequest $request,
		IRootFolder $rootFolder,
		TokenManager $tokenManager,
		DirectMapper $directMapper,
		IConfig $config,
		AppConfig $appConfig,
		TemplateManager $templateManager,
		FederationService $federationService
	) {
		parent::__construct($appName, $request);

		$this->rootFolder = $rootFolder;
		$this->tokenManager = $tokenManager;
		$this->directMapper = $directMapper;
		$this->config = $config;
		$this->appConfig = $appConfig;
		$this->templateManager = $templateManager;
		$this->federationService = $federationService;
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
			$params = [
				'errors' => [['error' => $e->getMessage()]]
			];
			return new TemplateResponse('core', 'error', $params, 'guest');
		}

		// Delete the token. They are for 1 time use only
		$this->directMapper->delete($direct);

		$folder = $this->rootFolder->getUserFolder($direct->getUid());
		if ($this->templateManager->isTemplate($direct->getFileid())) {
			$item = $this->templateManager->get($direct->getFileid());
			if ($direct->getTemplateDestination() === 0 || $direct->getTemplateDestination() === null) {
				return new JSONResponse([], Http::STATUS_BAD_REQUEST);
			}

			try {

				list($urlSrc, $wopi) = $this->tokenManager->getTokenForTemplate($item, $direct->getUid(), $direct->getTemplateDestination(), true);
			} catch (\Exception $e) {
				return new JSONResponse([], Http::STATUS_BAD_REQUEST);
			}

			$relativePath = '/new.odt';

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
					$csp = new ContentSecurityPolicy();
					$csp->addAllowedFrameAncestorDomain('*');
					$response->setContentSecurityPolicy($csp);
					return $response;
				}

				list($urlSrc, $token, $wopi) = $this->tokenManager->getToken($item->getId(), null, $direct->getUid(), true);
			} catch (\Exception $e) {
				$params = [
					'errors' => [['error' => $e->getMessage()]]
				];
				return new TemplateResponse('core', 'error', $params, 'guest');
			}

			$relativePath = $folder->getRelativePath($item->getPath());
		}

		try {
			$params = [
				'permissions' => $item->getPermissions(),
				'title' => $item->getName(),
				'fileId' => $wopi->getFileid() . '_' . $this->config->getSystemValue('instanceid'),
				'token' => $wopi->getToken(),
				'urlsrc' => $urlSrc,
				'path' => $relativePath,
				'instanceId' => $this->config->getSystemValue('instanceid'),
				'canonical_webroot' => $this->appConfig->getAppValue('canonical_webroot'),
				'direct' => true,
			];

			$response = new TemplateResponse('richdocuments', 'documents', $params, 'base');
			$policy = new ContentSecurityPolicy();
			$policy->allowInlineScript(true);
			$policy->addAllowedFrameDomain($this->appConfig->getAppValue('public_wopi_url'));
			$response->setContentSecurityPolicy($policy);
			return $response;
		} catch (\Exception $e) {
			$params = [
				'errors' => [['error' => $e->getMessage()]]
			];
			return new TemplateResponse('core', 'error', $params, 'guest');
		}

	}
}
