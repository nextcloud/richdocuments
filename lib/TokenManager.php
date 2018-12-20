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
use OCA\Richdocuments\Db\WopiMapper;
use OCA\Richdocuments\Helper;
use OCA\Richdocuments\Db\Wopi;
use OCA\Richdocuments\WOPI\Parser;
use OCP\Files\File;
use OCP\Files\IRootFolder;
use OCP\IURLGenerator;
use OCP\Share\IManager;
use OCP\IL10N;

class TokenManager {
	/** @var IRootFolder */
	private $rootFolder;
	/** @var IManager */
	private $shareManager;
	/** @var IURLGenerator */
	private $urlGenerator;
	/** @var Parser */
	private $wopiParser;
	/** @var AppConfig */
	private $appConfig;
	/** @var string */
	private $userId;
	/** @var WopiMapper */
	private $wopiMapper;
	/** @var IL10N */
	private $trans;

	/**
	 * @param IRootFolder $rootFolder
	 * @param IManager $shareManager
	 * @param IURLGenerator $urlGenerator
	 * @param Parser $wopiParser
	 * @param AppConfig $appConfig
	 * @param string $UserId
	 * @param WopiMapper $wopiMapper
	 * @param IL10N $trans
	 */
	public function __construct(IRootFolder $rootFolder,
								IManager $shareManager,
								IURLGenerator $urlGenerator,
								Parser $wopiParser,
								AppConfig $appConfig,
								$UserId,
								WopiMapper $wopiMapper,
								IL10N $trans) {
		$this->rootFolder = $rootFolder;
		$this->shareManager = $shareManager;
		$this->urlGenerator = $urlGenerator;
		$this->wopiParser = $wopiParser;
		$this->appConfig = $appConfig;
		$this->trans = $trans;
		$this->userId = $UserId;
		$this->wopiMapper = $wopiMapper;
	}

	/**
	 * @param string $fileId
	 * @param string $shareToken
	 * @param string $editoruid
	 * @return array
	 * @throws \Exception
	 */
	public function getToken($fileId, $shareToken = null, $editoruid = null) {
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
				$editoruid = $this->userId;
				$rootFolder = $this->rootFolder->getUserFolder($editoruid);
				$updatable = $rootFolder->isUpdateable();
				// Check if the editor (user who is accessing) is in editable group
				// UserCanWrite only if
				// 1. No edit groups are set or
				// 2. if they are set, it is in one of the edit groups
				$editGroups = array_filter(explode('|', $this->appConfig->getAppValue('edit_groups')));
				if ($updatable && count($editGroups) > 0) {
					$updatable = false;
					foreach($editGroups as $editGroup) {
						 $editorGroup = \OC::$server->getGroupManager()->get($editGroup);
						 if ($editorGroup !== null && sizeof($editorGroup->searchUsers($editoruid)) > 0) {
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
			if (is_null($editoruid)) {
				\OC::$server->getLogger()->warning('Generating token for SaveAs without editoruid');
			}
			$rootFolder = $this->rootFolder;
			$updatable = true;
		}
		/** @var File $file */
		$file = $rootFolder->getById($fileId)[0];
		// If its a public share, use the owner from the share, otherwise check the file object
		if (is_null($owneruid)) {
			$owneruid = $file->getOwner()->getUID();
		}
		$serverHost = $this->urlGenerator->getAbsoluteURL('/');//$this->request->getServerProtocol() . '://' . $this->request->getServerHost();

		if (is_null($this->userId) && isset($_COOKIE['guestUser'])) {
			$guest_name = $this->trans->t('Guest: %s', $_COOKIE['guestUser']);
		} else {
			$guest_name = NULL;
		}

		$wopi = $this->wopiMapper->generateFileToken($fileId, $owneruid, $editoruid, $version, (int)$updatable, $serverHost, $guest_name);

		try {

			return [
				$this->wopiParser->getUrlSrc($file->getMimeType())['urlsrc'],
				$wopi->getToken(),
			];
		} catch (\Exception $e){
			throw $e;
		}
	}

	public function getTokenForTemplate(File $file, $userId, $templateDestination) {
		$owneruid = $userId;
		$editoruid = $userId;
		$rootFolder = $this->rootFolder->getUserFolder($editoruid);
		$updatable = $rootFolder->isUpdateable();
		// Check if the editor (user who is accessing) is in editable group
		// UserCanWrite only if
		// 1. No edit groups are set or
		// 2. if they are set, it is in one of the edit groups
		$editGroups = array_filter(explode('|', $this->appConfig->getAppValue('edit_groups')));
		if ($updatable && count($editGroups) > 0) {
			$updatable = false;
			foreach($editGroups as $editGroup) {
				$editorGroup = \OC::$server->getGroupManager()->get($editGroup);
				if ($editorGroup !== null && sizeof($editorGroup->searchUsers($editoruid)) > 0) {
					$updatable = true;
					break;
				}
			}
		}

		$serverHost = $this->urlGenerator->getAbsoluteURL('/');

		$wopi = $this->wopiMapper->generateFileToken($file->getId(), $owneruid, $editoruid, 0, (int)$updatable, $serverHost, null, $templateDestination);

		return [
			$this->wopiParser->getUrlSrc($file->getMimeType())['urlsrc'],
			$wopi->getToken(),
		];
	}
}
