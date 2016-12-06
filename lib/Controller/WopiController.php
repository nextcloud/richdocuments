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

use OCA\Richdocuments\Db\Wopi;
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
	/** @var string */
	private $userId;
	/** @var IUserManager */
	private $userManager;
	/** @var Parser */
	private $wopiParser;

	/**
	 * @param string $appName
	 * @param IRequest $request
	 * @param IRootFolder $rootFolder
	 * @param string $UserId
	 * @param IUserManager $userManager
	 * @param Parser $wopiParser
	 */
	public function __construct($appName,
								$UserId,
								IRequest $request,
								IRootFolder $rootFolder,
								IUserManager $userManager,
								Parser $wopiParser) {
		parent::__construct($appName, $request);
		$this->rootFolder = $rootFolder;
		$this->userId = $UserId;
		$this->userManager = $userManager;
		$this->wopiParser = $wopiParser;
	}

	/**
	 * Generates and returns an access token for a given fileId
	 *
	 * @NoAdminRequired
	 *
	 * @param string $fileId
	 * @return JSONResponse
	 */
	public function getToken($fileId) {
		$arr = explode('_', $fileId, 2);
		$version = '0';
		if (count($arr) === 2) {
			list($fileId, $version) = $arr;
		}

		try {
			/** @var File $file */
			$file = $this->rootFolder->getUserFolder($this->userId)->getById($fileId)[0];
			$updatable = $file->isUpdateable();
		} catch (\Exception $e) {
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		// If token is for some versioned file
		if ($version !== '0') {
			$updatable = false;
		}

		$row = new Wopi();
		$serverHost = $this->request->getServerProtocol() . '://' . $this->request->getServerHost();
		$token = $row->generateFileToken($fileId, $version, $updatable, $serverHost);

		try {
			$userFolder = $this->rootFolder->getUserFolder($this->userId);
			/** @var File $file */
			$file = $userFolder->getById($fileId)[0];
			$sessionData['title'] = basename($file->getPath());
			$sessionData['permissions'] = $file->getPermissions();
			$sessionData['file_id'] = $file->getId();

			$sessionData['documents'] = [
				0 => [
					'urlsrc' => $this->wopiParser->getUrlSrc($file->getMimeType())['urlsrc'],
					'path' => $file->getPath(),
					'token' => $token,
				],
			];

			return new JSONResponse($sessionData);
		} catch (\Exception $e){
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}
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

		$arr = explode('_', $fileId, 2);
		$version = '0';
		if (count($arr) === 2) {
			list($fileId, $version) = $arr;
		}

		$row = new Wopi();
		$row->loadBy('token', $token);

		$res = $row->getPathForToken($fileId, $version, $token);
		if ($res === false) {
			return new JSONResponse();
		}

		// Login the user to see his mount locations
		try {
			/** @var File $file */
			$userFolder = $this->rootFolder->getUserFolder($res['editor']);
			$file = $userFolder->getById($fileId)[0];
		} catch (\Exception $e) {
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		return new JSONResponse(
			[
				'BaseFileName' => $file->getName(),
				'Size' => $file->getSize(),
				'Version' => $version,
				'UserId' => $res['editor'],
				'UserFriendlyName' => $this->userManager->get($res['editor'])->getDisplayName(),
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
		$arr = explode('_', $fileId, 2);
		$version = '0';
		if (count($arr) === 2) {
			list($fileId, $version) = $arr;
		}

		$row = new Wopi();
		$row->loadBy('token', $access_token);

		$res = $row->getPathForToken($fileId, $version, $access_token);

		try {
			/** @var File $file */
			$userFolder = $this->rootFolder->getUserFolder($res['editor']);
			$file = $userFolder->getById($fileId)[0];
			$response = new StreamResponse($file->fopen('rb'));
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
	public function putFile($fileId, $access_token) {
		$arr = explode('_', $fileId, 2);
		$version = '0';
		if (count($arr) === 2) {
			list($fileId, $version) = $arr;
		}

		$row = new Wopi();
		$row->loadBy('token', $access_token);

		$res = $row->getPathForToken($fileId, $version, $access_token);
		if (!$res['canwrite']) {
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		try {
			/** @var File $file */
			$userFolder = $this->rootFolder->getUserFolder($res['editor']);
			$file = $userFolder->getById($fileId)[0];
			$content = fopen('php://input', 'rb');
			$file->putContent($content);
			return new JSONResponse();
		} catch (\Exception $e) {
			return new JSONResponse([], Http::STATUS_INTERNAL_SERVER_ERROR);
		}
	}
}
