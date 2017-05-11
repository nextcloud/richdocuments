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

namespace OCA\Richdocuments;

use OC\Share\Constants;
use OCA\Richdocuments\Helper;
use OCA\Richdocuments\Db\Wopi;
use OCA\Richdocuments\WOPI\Parser;
use OCP\Files\File;
use OCP\Files\IRootFolder;
use OCP\IURLGenerator;
use OCP\Share\IManager;

class TokenManager {
	/** @var IRootFolder */
	private $rootFolder;
	/** @var IManager */
	private $shareManager;
	/** @var IURLGenerator */
	private $urlGenerator;
	/** @var Parser */
	private $wopiParser;

	/**
	 * @param IRootFolder $rootFolder
	 * @param IManager $shareManager
	 * @param IURLGenerator $urlGenerator
	 * @param string $UserId
	 */
	public function __construct(IRootFolder $rootFolder,
								IManager $shareManager,
								IURLGenerator $urlGenerator,
								Parser $wopiParser,
								$UserId) {
		$this->rootFolder = $rootFolder;
		$this->shareManager = $shareManager;
		$this->urlGenerator = $urlGenerator;
		$this->wopiParser = $wopiParser;
		$this->userId = $UserId;
	}

	/**
	 * @param string $fileId
	 * @param string $shareToken
	 * @return array
	 * @throws \Exception
	 */
	public function getToken($fileId, $shareToken = null) {
		list($fileId,, $version) = Helper::parseFileId($fileId);
		// if the user is not logged-in do use the sharers storage
		if($shareToken !== null) {
			/** @var File $file */
			$rootFolder = $this->rootFolder;
			$share = $this->shareManager->getShareByToken($shareToken);
			$updatable = (bool)($share->getPermissions() & \OCP\Constants::PERMISSION_UPDATE);
		} else {
			try {
				/** @var File $file */
				$rootFolder = $this->rootFolder->getUserFolder($this->userId);
				$updatable = $rootFolder->isUpdateable();
			} catch (\Exception $e) {
				throw $e;
			}
		}
		/** @var File $file */
		$file = $rootFolder->getById($fileId)[0];

		$row = new Wopi();
		$serverHost = $this->urlGenerator->getAbsoluteURL('/');//$this->request->getServerProtocol() . '://' . $this->request->getServerHost();
		$token = $row->generateFileToken($fileId, $file->getOwner()->getUID(), $this->userId, $version, (int)$updatable, $serverHost);

		try {

			return [
				$this->wopiParser->getUrlSrc($file->getMimeType())['urlsrc'],
				$token,
			];
		} catch (\Exception $e){
			throw $e;
		}
	}
}