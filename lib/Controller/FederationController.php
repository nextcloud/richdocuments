<?php
/**
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
namespace OCA\Richdocuments\Controller;


use OCA\Richdocuments\Db\WopiMapper;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCS\OCSNotFoundException;
use OCP\IConfig;
use OCP\IRequest;

class FederationController extends \OCP\AppFramework\OCSController {

	/** @var IConfig */
	private $config;


	public function __construct(
		string $appName,
		IRequest $request,
		IConfig $config,
		WopiMapper $wopiMapper
	) {
		parent::__construct($appName, $request);
		$this->config   = $config;
		$this->wopiMapper = $wopiMapper;
	}

	/**
	 * @PublicPage
	 * @NoCSRFRequired
	 */
	public function index() {
		return new DataResponse([
			'wopi_url' => $this->config->getAppValue('richdocuments', 'wopi_url')
		]);
	}

	/**
	 * @PublicPage
	 * @NoCSRFRequired
	 *
	 * Check the file info of a remote accessing a file
	 *
	 * this is used to make sure we respect reshares of federated shares with the
	 * applied permissions and also have information about the actual editor
	 *
	 * @param $token
	 * @return DataResponse
	 * @throws \OCP\AppFramework\Db\DoesNotExistException
	 */
	public function remoteWopiToken($token) {
		$wopi = $this->wopiMapper->getWopiForToken($token);
		return new DataResponse([
			'ownerUid' => $wopi->getOwnerUid(),
			'editorUid' => $wopi->getEditorUid(),
			'canwrite' => $wopi->getCanwrite(),
			'hideDownload' => $wopi->getHideDownload(),
			'direct' => $wopi->getDirect(),
			'serverHost' => $wopi->getServerHost(),
			'guestDisplayname' => $wopi->getGuestDisplayname()
		]);
	}

	/**
	 * @PublicPage
	 * @NoCSRFRequired
	 *
	 * Check the file info of a remote accessing a file
	 *
	 * this is used to make sure we respect reshares of federated shares with the
	 * applied permissions and also have information about the actual editor
	 *
	 * @param $shareToken
	 * @param $filePath
	 * @return DataResponse
	 * @throws OCSNotFoundException
	 * @throws \OCP\Files\NotFoundException
	 * @throws \OCP\Share\Exceptions\ShareNotFound
	 */
	private function remoteDirectToken($shareToken, $filePath) {
		$this->shareManager = \OC::$server->getShareManager();
		try {
			$share = $this->shareManager->getShareByToken($shareToken);
			$file = $share->getNode()->get($filePath);
			//TODO check if we can even edit this file with collabora
			$direct = $this->directMapper->newDirect($this->userId, $file);
			// TODO: convert to remote token if needed

			return new DataResponse([
				'url' => $this->urlGenerator->linkToRouteAbsolute('richdocuments.directView.show', [
					'token' => $direct->getToken()
				])
			]);
		} catch (NotFoundException $e) {
			throw new OCSNotFoundException();
		}
	}


}
