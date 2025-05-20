<?php
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Controller;

use OCA\Richdocuments\Db\WopiMapper;
use OCA\Richdocuments\Exceptions\ExpiredTokenException;
use OCA\Richdocuments\Exceptions\UnknownTokenException;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCS\OCSNotFoundException;
use OCP\AppFramework\OCSController;
use OCP\Http\Client\IClientService;
use OCP\IConfig;
use OCP\IRequest;
use OCP\IURLGenerator;
use OCP\IUserManager;
use Psr\Log\LoggerInterface;

class FederationController extends OCSController {
	public function __construct(
		string $appName,
		IRequest $request,
		private IConfig $config,
		private LoggerInterface $logger,
		private WopiMapper $wopiMapper,
		private IUserManager $userManager,
		private IURLGenerator $urlGenerator,
		private IClientService $clientService,
	) {
		parent::__construct($appName, $request);
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
			$initiatorWopi = $this->wopiMapper->getWopiForToken($token);
			if (empty($initiatorWopi->getEditorUid()) && !empty($initiatorWopi->getRemoteServer()) && !empty($initiatorWopi->getRemoteServerToken())) {
				$client = $this->clientService->newClient();
				$response = $client->post(
					rtrim($initiatorWopi->getRemoteServer(), '/') . '/ocs/v2.php/apps/richdocuments/api/v1/federation/user?format=json',
					[ 'body' => [ 'token' => $initiatorWopi->getRemoteServerToken() ], 'timeout' => 10 ]
				);
				$initiatorUser = \json_decode($response->getBody(), true)['ocs']['data'];
				$initiatorWopi->setGuestDisplayname($initiatorUser['displayName']);
			} else {
				$user = $this->userManager->get($initiatorWopi->getEditorUid());
				if ($user !== null) {
					$initiatorWopi->setGuestDisplayname($user->getDisplayName());
				}
			}
			$this->logger->debug('COOL-Federation-Initiator: Token ' . $token . ' returned');
			return new DataResponse($initiatorWopi);
		} catch (UnknownTokenException) {
			$this->logger->debug('COOL-Federation-Initiator: Token ' . $token . 'not found');
			throw new OCSNotFoundException();
		} catch (ExpiredTokenException) {
			$this->logger->debug('COOL-Federation-Initiator: Token ' . $token . ' is expired');
			throw new OCSNotFoundException();
		}
	}

	/**
	 * @PublicPage
	 * @NoCSRFRequired
	 * @OCSRoute POST /api/v1/federation/user
	 *
	 * Return user details for a initiator user that will be used by remote instances
	 * to provide Collabora with the users avatar/displayname for guests on share links
	 * if the session was created through a direct link of a public share
	 *
	 * @param $token
	 * @return DataResponse
	 * @throws OCSNotFoundException
	 */
	public function initiatorUser($token): DataResponse {
		try {
			$wopi = $this->wopiMapper->getWopiForToken($token);
			$user = $this->userManager->get($wopi->getEditorUid());
			if ($user !== null) {
				$wopi->setGuestDisplayname($user->getDisplayName());
			}
			$this->logger->debug('COOL-Federation-Initiator-User: Token ' . $token . ' returned');
			return new DataResponse([
				'userId' => $user->getUID(),
				'displayName' => $user->getDisplayName(),
				'avatar' => $this->urlGenerator->linkToRouteAbsolute('core.avatar.getAvatar', ['userId' => $wopi->getEditorUid(), 'size' => WopiController::WOPI_AVATAR_SIZE])
			]);
		} catch (UnknownTokenException) {
			$this->logger->debug('COOL-Federation-Initiator-User: Token ' . $token . 'not found');
			throw new OCSNotFoundException();
		} catch (ExpiredTokenException) {
			$this->logger->debug('COOL-Federation-Initiator-User: Token ' . $token . ' is expired.');
			throw new OCSNotFoundException();
		}
	}
}
