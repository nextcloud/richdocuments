<?php
/**
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Controller;

use Exception;
use GuzzleHttp\Exception\BadResponseException;
use OCA\Richdocuments\Db\DirectMapper;
use OCA\Richdocuments\Exceptions\ExpiredTokenException;
use OCA\Richdocuments\Exceptions\UnknownTokenException;
use OCA\Richdocuments\Service\FederationService;
use OCA\Richdocuments\TemplateManager;
use OCA\Richdocuments\TokenManager;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCS\OCSBadRequestException;
use OCP\AppFramework\OCS\OCSException;
use OCP\AppFramework\OCS\OCSForbiddenException;
use OCP\AppFramework\OCS\OCSNotFoundException;
use OCP\Constants;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\Http\Client\IClientService;
use OCP\IRequest;
use OCP\IURLGenerator;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager;
use Psr\Log\LoggerInterface;

class OCSController extends \OCP\AppFramework\OCSController {
	/**
	 * @param string $userId
	 */
	public function __construct(
		string $appName,
		IRequest $request,
		private IRootFolder $rootFolder,
		private IClientService $clientService,
		private $userId,
		private DirectMapper $directMapper,
		private IURLGenerator $urlGenerator,
		private TemplateManager $manager,
		private TokenManager $tokenManager,
		private IManager $shareManager,
		private FederationService $federationService,
		private LoggerInterface $logger,
	) {
		parent::__construct($appName, $request);
	}

	/**
	 * @NoAdminRequired
	 *
	 * Init a direct editing session
	 *
	 * @param int $fileId
	 * @return DataResponse
	 * @throws OCSNotFoundException|OCSBadRequestException
	 */
	public function createDirect($fileId) {
		try {
			$userFolder = $this->rootFolder->getUserFolder($this->userId);
			$node = $userFolder->getFirstNodeById($fileId);

			if ($node === null) {
				throw new OCSNotFoundException();
			}

			if ($node instanceof Folder) {
				throw new OCSBadRequestException('Cannot view folder');
			}

			$direct = $this->directMapper->newDirect($this->userId, $fileId);

			return new DataResponse([
				'url' => $this->urlGenerator->linkToRouteAbsolute('richdocuments.directView.show', [
					'token' => $direct->getToken()
				])
			]);
		} catch (NotFoundException) {
			throw new OCSNotFoundException();
		}
	}

	/**
	 * Generate a direct editing link for a file in a public share to open with the current user
	 *
	 * @NoAdminRequired
	 * @BruteForceProtection(action=richdocumentsCreatePublic)
	 * @PublicPage
	 * @throws OCSForbiddenException
	 */
	public function createPublic(
		string $shareToken,
		?string $host = null,
		string $path = '',
		?string $password = null,
	): DataResponse {
		if ($host) {
			$remoteCollabora = $this->federationService->getRemoteCollaboraURL($host);
			if ($remoteCollabora === '') {
				throw new OCSNotFoundException('Failed to connect to remote collabora instance.');
			}

			$wopi = $this->tokenManager->newInitiatorToken($host, null, $shareToken, true, $this->userId);

			$client = $this->clientService->newClient();
			try {
				$response = $client->post(rtrim($host, '/') . '/ocs/v2.php/apps/richdocuments/api/v1/direct/share/initiator?format=json', [
					'body' => [
						'initiatorServer' => $this->urlGenerator->getAbsoluteURL(''),
						'initiatorToken' => $wopi->getToken(),
						'shareToken' => $shareToken,
						'path' => $path,
						'password' => $password
					],
					'timeout' => 30
				]);
			} catch (BadResponseException $e) {
				$status = $e->getResponse()->getStatusCode();
				if ($status === Http::STATUS_NOT_FOUND || $status === Http::STATUS_FORBIDDEN) {
					$this->logger->debug('Failed to create link from initiator token. Remote denied access.');
					$response = new DataResponse([], HTTP::STATUS_FORBIDDEN);
					$response->throttle();
					return $response;
				}

				$this->logger->error('Failed to create link from initiator token. Unexpected status code ' . $status, ['exception' => $e]);
				return new DataResponse([], HTTP::STATUS_INTERNAL_SERVER_ERROR);
			} catch (Exception $e) {
				$this->logger->error('Failed to create link from initiator token. Unexpected response.', ['exception' => $e]);
				return new DataResponse([], HTTP::STATUS_INTERNAL_SERVER_ERROR);
			}
			$url = \json_decode($response->getBody(), true)['ocs']['data']['url'];

			return new DataResponse([
				'url' => $url,
			]);
		}

		try {
			$share = $this->shareManager->getShareByToken($shareToken);
		} catch (ShareNotFound) {
			$response = new DataResponse([], HTTP::STATUS_NOT_FOUND);
			$response->throttle();
			return $response;
		}

		if ($share->getPassword() && !$this->shareManager->checkPassword($share, $password)) {
			$response = new DataResponse([], HTTP::STATUS_FORBIDDEN);
			$response->throttle();
			return $response;
		}

		if (($share->getPermissions() & Constants::PERMISSION_READ) === 0) {
			$response = new DataResponse([], HTTP::STATUS_FORBIDDEN);
			$response->throttle();
			return $response;
		}

		$node = $share->getNode();
		if ($node instanceof Folder) {
			$node = $node->get($path);
		}
		$direct = $this->directMapper->newDirect($this->userId, $node->getId(), 0, $shareToken);

		return new DataResponse([
			'url' => $this->urlGenerator->linkToRouteAbsolute('richdocuments.directView.show', [
				'token' => $direct->getToken()
			])
		]);
	}

	/**
	 * @PublicPage
	 * @NoCSRFRequired
	 * @BruteForceProtection(action=richdocumentsCreatePublicFromInitiator)
	 * @throws OCSForbiddenException
	 */
	public function createPublicFromInitiator(
		string $initiatorServer,
		string $initiatorToken,
		string $shareToken,
		string $path = '',
		?string $password = null,
	): DataResponse {
		try {
			$share = $this->shareManager->getShareByToken($shareToken);
		} catch (ShareNotFound) {
			$response = new DataResponse([], HTTP::STATUS_NOT_FOUND);
			$response->throttle();
			return $response;
		}

		if ($share->getPassword() && !$this->shareManager->checkPassword($share, $password)) {
			$response = new DataResponse([], HTTP::STATUS_FORBIDDEN);
			$response->throttle();
			return $response;
		}

		$node = $share->getNode();
		if ($node instanceof Folder) {
			$node = $node->get($path);
		}

		if (($share->getPermissions() & Constants::PERMISSION_READ) === 0) {
			return new DataResponse([], Http::STATUS_FORBIDDEN);
		}

		$direct = $this->directMapper->newDirect(null, $node->getId(), null, $shareToken, $initiatorServer, $initiatorToken);

		return new DataResponse([
			'url' => $this->urlGenerator->linkToRouteAbsolute('richdocuments.directView.show', [
				'token' => $direct->getToken()
			])
		]);
	}

	/**
	 * Generate a direct editing link for a file in a public share to open with the current user
	 *
	 * @NoAdminRequired
	 * @BruteForceProtection(action=richdocumentsCreatePublic)
	 * @PublicPage
	 */
	public function updateGuestName(string $access_token, string $guestName): DataResponse {
		try {
			$this->tokenManager->updateGuestName($access_token, $guestName);
			return new DataResponse([], Http::STATUS_OK);
		} catch (UnknownTokenException) {
			$response = new DataResponse([], Http::STATUS_FORBIDDEN);
			$response->throttle();
			return $response;
		} catch (ExpiredTokenException) {
			$response = new DataResponse([], Http::STATUS_UNAUTHORIZED);
			$response->throttle();
			return $response;
		}
	}

	/**
	 * @NoAdminRequired
	 * @PublicPage
	 *
	 * @param string $type The template type
	 * @return DataResponse
	 * @throws OCSBadRequestException
	 */
	public function getTemplates($type) {
		if (array_key_exists($type, TemplateManager::$tplTypes)) {
			$templates = $this->manager->getAllFormatted($type);
			return new DataResponse($templates);
		}
		throw new OCSBadRequestException('Wrong type');
	}

	/**
	 * @NoAdminRequired
	 *
	 * @param string $path Where to create the document
	 * @param int $template The template id
	 */
	public function createFromTemplate($path, $template) {
		if ($path === null || $template === null) {
			throw new OCSBadRequestException('path and template must be set');
		}

		if (!$this->manager->isTemplate($template)) {
			throw new OCSBadRequestException('Invalid template provided');
		}

		try {
			$info = $this->mb_pathinfo($path);

			$userFolder = $this->rootFolder->getUserFolder($this->userId);
			$folder = isset($info['dirname']) ? $userFolder->get($info['dirname']) : $userFolder;
			$name = $folder->getNonExistingName($info['basename']);
			$file = $folder->newFile($name);

			$direct = $this->directMapper->newDirect($this->userId, $file->getId(), $template);

			return new DataResponse([
				'url' => $this->urlGenerator->linkToRouteAbsolute('richdocuments.directView.show', [
					'token' => $direct->getToken()
				])
			]);
		} catch (NotFoundException) {
			throw new OCSNotFoundException();
		} catch (\Exception $e) {
			$this->logger->error($e->getMessage(), ['exception' => $e]);
			throw new OCSException('Failed to create new file from template.');
		}
	}

	private function mb_pathinfo($filepath) {
		$result = [];
		preg_match('%^(.*?)[\\\\/]*(([^/\\\\]*?)(\.([^\.\\\\/]+?)|))[\\\\/\.]*$%im', ltrim('/' . $filepath), $matches);
		if ($matches[1]) {
			$result['dirname'] = $matches[1];
		}
		if ($matches[2]) {
			$result['basename'] = $matches[2];
		}
		if ($matches[5]) {
			$result['extension'] = $matches[5];
		}
		if ($matches[3]) {
			$result['filename'] = $matches[3];
		}
		return $result;
	}
}
