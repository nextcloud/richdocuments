<?php
/**
 * @copyright Copyright (c) 2016 Lukas Reschke <lukas@statuscode.ch>
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

use OC\Files\View;
use OCA\Richdocuments\Db\Wopi;
use OCA\Richdocuments\Helper;
use OCA\Richdocuments\WOPI\Parser;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\JSONResponse;
use OCP\Files\File;
use OCP\Files\IRootFolder;
use OCP\IRequest;
use OCP\IUserManager;
use OCP\AppFramework\Http\StreamResponse;

class WopiController extends Controller {
	/** @var IRootFolder */
	private $rootFolder;

	/**
	 * @param string $appName
	 * @param IRequest $request
	 * @param IRootFolder $rootFolder
	 * @param string $UserId
	 */
	public function __construct($appName,
								$UserId,
								IRequest $request,
								IRootFolder $rootFolder) {
		parent::__construct($appName, $request);
		$this->rootFolder = $rootFolder;
	}

	/**
	 * Returns general info about a file.
	 *
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @PublicPage
	 *
	 * @param string $fileId
	 * @return JSONResponse
	 */
	public function checkFileInfo($fileId) {
		$token = $this->request->getParam('access_token');

		list($fileId, , $version) = Helper::parseFileId($fileId);
		$db = new Wopi();
		$res = $db->getPathForToken($fileId, $token);
		if ($res === false) {
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		// Login the user to see his mount locations
		try {
			/** @var File $file */
			$userFolder = $this->rootFolder->getUserFolder($res['owner']);
			$file = $userFolder->getById($fileId)[0];
		} catch (\Exception $e) {
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		if(!($file instanceof File)) {
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		return new JSONResponse(
			[
				'BaseFileName' => $file->getName(),
				'Size' => $file->getSize(),
				'Version' => $version,
				'UserId' => $res['editor'] !== '' ? $res['editor'] : 'Guest user',
				'OwnerId' => $res['owner'],
				'UserFriendlyName' => $res['editor'] !== '' ? $res['editor'] : 'Guest user',
				'UserCanWrite' => $res['canwrite'] ? true : false,
				'PostMessageOrigin' => $res['server_host'],
			]
		);
	}

	/**
	 * Given an access token and a fileId, returns the contents of the file.
	 * Expects a valid token in access_token parameter.
	 *
	 * @PublicPage
	 * @NoCSRFRequired
	 *
	 * @param string $fileId
	 * @param string $access_token
	 * @return Http\Response
	 */
	public function getFile($fileId,
							$access_token) {
		list($fileId, , $version) = Helper::parseFileId($fileId);
		$row = new Wopi();
		$row->loadBy('token', $access_token);
		$res = $row->getPathForToken($fileId, $access_token);
		try {
			/** @var File $file */
			$userFolder = $this->rootFolder->getUserFolder($res['owner']);
			$file = $userFolder->getById($fileId)[0];

			if ($version !== '0')
			{
				$view = new View('/' . $res['owner'] . '/files');
				$relPath = $view->getRelativePath($file->getPath());
				$versionPath = '/files_versions/' . $relPath . '.v' . $version;
				$view = new View('/' . $res['owner']);
				if ($view->file_exists($versionPath)){
					$response = new StreamResponse($view->fopen($versionPath, 'rb'));
				}
				else {
					$response->setStatus(Http::STATUS_NOT_FOUND);
				}
			}
			else
			{
				$response = new StreamResponse($file->fopen('rb'));
			}
			$response->addHeader('Content-Disposition', 'attachment');
			$response->addHeader('Content-Type', 'application/octet-stream');
			return $response;
		} catch (\Exception $e) {
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}
	}

	/**
	 * Given an access token and a fileId, replaces the files with the request body.
	 * Expects a valid token in access_token parameter.
	 *
	 * @PublicPage
	 * @NoCSRFRequired
	 *
	 * @param string $fileId
	 * @param string $access_token
	 * @return JSONResponse
	 */
	public function putFile($fileId,
							$access_token) {
		list($fileId, , $version) = Helper::parseFileId($fileId);

		$row = new Wopi();
		$row->loadBy('token', $access_token);

		$res = $row->getPathForToken($fileId, $access_token);
		if (!$res['canwrite']) {
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		try {
			/** @var File $file */
			$userFolder = $this->rootFolder->getUserFolder($res['owner']);
			$file = $userFolder->getById($fileId)[0];
			$content = fopen('php://input', 'rb');
			// Setup the FS which is needed to emit hooks (versioning).
			\OC_Util::tearDownFS();
			\OC_Util::setupFS($res['owner']);

			// Set the user to register the change under his name
			$editor = \OC::$server->getUserManager()->get($res['editor']);
			if (is_null($editor)) {
				throw new \OC\User\NoUserException("User " . $res['editor'] . "not found.");
			}
			\OC::$server->getUserSession()->setUser($editor);

			$file->putContent($content);
			return new JSONResponse();
		} catch (\Exception $e) {
			return new JSONResponse([], Http::STATUS_INTERNAL_SERVER_ERROR);
		}
	}
}
