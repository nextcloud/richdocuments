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
								AppConfig $appConfig,
								$UserId) {
		$this->rootFolder = $rootFolder;
		$this->shareManager = $shareManager;
		$this->urlGenerator = $urlGenerator;
		$this->wopiParser = $wopiParser;
		$this->appConfig = $appConfig;
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
		$owneruid = null;
		// if the user is not logged-in do use the sharers storage
		if($shareToken !== null) {
			/** @var File $file */
			$rootFolder = $this->rootFolder;
			$share = $this->shareManager->getShareByToken($shareToken);
			$updatable = (bool)($share->getPermissions() & \OCP\Constants::PERMISSION_UPDATE);
			$owneruid = $share->getShareOwner();
		} else if (!is_null($this->userId)) {
			try {
				/** @var File $file */
				$rootFolder = $this->rootFolder->getUserFolder($this->userId);
				$updatable = $rootFolder->isUpdateable();
				// Check if the editor (user who is accessing) is in editable group
				// UserCanWrite only if
				// 1. No edit groups are set or
				// 2. if they are set, it is in one of the edit groups
				$editorUid = \OC::$server->getUserSession()->getUser()->getUID();
				$editGroups = array_filter(explode('|', $this->appConfig->getAppValue('edit_groups')));
				if ($updatable && count($editGroups) > 0) {
					$updatable = false;
					foreach($editGroups as $editGroup) {
						 $editorGroup = \OC::$server->getGroupManager()->get($editGroup);
						 if ($editorGroup !== null && sizeof($editorGroup->searchUsers($editorUid)) > 0) {
							$updatable = true;
							break;
						 }
					}
				}
			} catch (\Exception $e) {
				throw $e;
			}
		} else {
			// no active user login while generating the token
			// this is required during WopiPutRelativeFile
			$rootFolder = $this->rootFolder;
			$updatable = true;
		}
		/** @var File $file */
		$file = $rootFolder->getById($fileId)[0];
		// If its a public share, use the owner from the share, otherwise check the file object
		if (is_null($owneruid)) {
			$owneruid = $file->getOwner()->getUID();
		}
		$row = new Wopi();
		$serverHost = $this->urlGenerator->getAbsoluteURL('/');//$this->request->getServerProtocol() . '://' . $this->request->getServerHost();
		$token = $row->generateFileToken($fileId, $owneruid, $this->userId, $version, (int)$updatable, $serverHost);

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
