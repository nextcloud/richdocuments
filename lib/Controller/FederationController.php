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

use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Http\ContentSecurityPolicy;
use \OCP\AppFramework\OCSController;
use OCA\Richdocuments\Db\WopiMapper;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCS\OCSNotFoundException;
use OCP\Files\NotFoundException;
use OCP\IConfig;
use OCP\IRequest;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager;

class FederationController extends OCSController {

	/** @var IConfig */
	private $config;

	/** @var WopiMapper */
	private $wopiMapper;

	/** @var IManager */
	private $shareManager;

	public function __construct(
		string $appName,
		IRequest $request,
		IConfig $config,
		WopiMapper $wopiMapper,
		IManager $shareManager
	) {
		parent::__construct($appName, $request);
		$this->config   = $config;
		$this->wopiMapper = $wopiMapper;
		$this->shareManager = $shareManager;
	}

	/**
	 * @PublicPage
	 * @NoCSRFRequired
	 */
	public function index() {
		$response = new DataResponse([
			'wopi_url' => $this->config->getAppValue('richdocuments', 'wopi_url')
		]);
		$csp = new ContentSecurityPolicy();
		$csp->addAllowedFrameAncestorDomain('*');
		$response->setContentSecurityPolicy($csp);
		$response->setHeaders(['X-Frame-Options' => 'ALLOW']);
		return $response;
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
	 * @throws DoesNotExistException
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

}
