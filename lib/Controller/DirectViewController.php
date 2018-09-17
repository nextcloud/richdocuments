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
use OCA\Richdocuments\TokenManager;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\ContentSecurityPolicy;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\Files\IRootFolder;
use OCP\Files\Node;
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

	public function __construct($appName,
								IRequest $request,
								IRootFolder $rootFolder,
								TokenManager $tokenManager,
								DirectMapper $directMapper,
								IConfig $config,
								AppConfig $appConfig) {
		parent::__construct($appName, $request);

		$this->rootFolder = $rootFolder;
		$this->tokenManager = $tokenManager;
		$this->directMapper = $directMapper;
		$this->config = $config;
		$this->appConfig = $appConfig;
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @PublicPage
	 *
	 * @param string $token
	 */
	public function show($token) {
		try {
			$direct = $this->directMapper->getByToken($token);
		} catch (DoesNotExistException $e) {
			//TODO show 404
			return new JSONResponse([], Http::STATUS_NOT_FOUND);
		}

		// Delete the token. They are for 1 time use only
		$this->directMapper->delete($direct);

		try {
			$folder = $this->rootFolder->getUserFolder($direct->getUid());
			$item = $folder->getById($direct->getFileid())[0];
			if(!($item instanceof Node)) {
				throw new \Exception();
			}
			list($urlSrc, $token) = $this->tokenManager->getToken($item->getId());
			$params = [
				'permissions' => $item->getPermissions(),
				'title' => $item->getName(),
				'fileId' => $item->getId() . '_' . $this->config->getSystemValue('instanceid'),
				'token' => $token,
				'urlsrc' => $urlSrc,
				'path' => $folder->getRelativePath($item->getPath()),
				'instanceId' => $this->config->getSystemValue('instanceid'),
				'canonical_webroot' => $this->appConfig->getAppValue('canonical_webroot'),
				'direct' => true,
				'EnableInsertRemoteImage' => true,
                'EnableShare' => true,
			];

			$response = new TemplateResponse('richdocuments', 'documents', $params, 'empty');
			$policy = new ContentSecurityPolicy();
			$policy->allowInlineScript(true);
			$policy->addAllowedFrameDomain($this->appConfig->getAppValue('wopi_url'));
			$response->setContentSecurityPolicy($policy);
			return $response;
		} catch (\Exception $e) {
			return new JSONResponse([], Http::STATUS_BAD_REQUEST);
		}

	}
}
