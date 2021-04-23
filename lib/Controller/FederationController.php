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
use OCP\AppFramework\OCS\OCSNotFoundException;
use OCP\AppFramework\OCSController;
use OCA\Richdocuments\Db\WopiMapper;
use OCP\AppFramework\Http\DataResponse;
use OCP\IConfig;
use OCP\ILogger;
use OCP\IRequest;

class FederationController extends OCSController {

	/** @var IConfig */
	private $config;

	/** @var ILogger */
	private $logger;

	/** @var WopiMapper */
	private $wopiMapper;

	public function __construct(
		string $appName,
		IRequest $request,
		IConfig $config,
		ILogger $logger,
		WopiMapper $wopiMapper
	) {
		parent::__construct($appName, $request);
		$this->config   = $config;
		$this->logger = $logger;
		$this->wopiMapper = $wopiMapper;
	}

	/**
	 * @PublicPage
	 * @NoCSRFRequired
	 * @OCSRoute GET /api/v1/federation
	 */
	public function index(): DataResponse {
		$response = new DataResponse([
			'wopi_url' => $this->config->getAppValue('richdocuments', 'wopi_url')
		]);
		$response->setHeaders(['X-Frame-Options' => 'ALLOW']);
		return $response;
	}

	/**
	 * @PublicPage
	 * @NoCSRFRequired
	 * @OCSRoute POST /api/v1/federation
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
	public function remoteWopiToken($token): DataResponse {
		try {
			$wopi = $this->wopiMapper->getWopiForToken($token);
			$user = \OC::$server->getUserManager()->get($wopi->getEditorUid());
			if($user !== null) {
				$wopi->setGuestDisplayname($user->getDisplayName());
			}
			$this->logger->debug('COOL-Federation-Initiator: Token ' . $token . ' returned');
			return new DataResponse($wopi);
		} catch (DoesNotExistException $e) {
			$this->logger->debug('COOL-Federation-Initiator: Token ' . $token . 'not found');
			throw new OCSNotFoundException();
		}
	}

	public function initiatorUser($token): DataResponse {
		try {
			$wopi = $this->wopiMapper->getWopiForToken($token);
			$user = \OC::$server->getUserManager()->get($wopi->getEditorUid());
			if($user !== null) {
				$wopi->setGuestDisplayname($user->getDisplayName());
			}
			$this->logger->debug('COOL-Federation-Initiator-User: Token ' . $token . ' returned');
			return new DataResponse([
				'initiatorHost' => '',
				'userId' => '',
				'displayName' => '',
				'avatar' => ''
			]);
		} catch (DoesNotExistException $e) {
			$this->logger->debug('COOL-Federation-Initiator-User: Token ' . $token . 'not found');
			throw new OCSNotFoundException();
		}
	}

}
