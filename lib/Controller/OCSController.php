<?php
/**
 * @copyright Copyright (c) 2018, Roeland Jago Douma <roeland@famdouma.nl>
 *
 * @author Roeland Jago Douma <roeland@famdouma.nl>
 * @author John Molakvoæ <skjnldsv@protonmail.com>
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

use OCA\Richdocuments\Db\DirectMapper;
use OCA\Richdocuments\Service\FederationService;
use OCA\Richdocuments\TemplateManager;
use OCA\Richdocuments\TokenManager;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCS\OCSBadRequestException;
use OCP\AppFramework\OCS\OCSForbiddenException;
use OCP\AppFramework\OCS\OCSNotFoundException;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\IRequest;
use OCP\IURLGenerator;
use OCP\Share\IManager;

class OCSController extends \OCP\AppFramework\OCSController {

	/** @var IRootFolder */
	private $rootFolder;

	/** @var string */
	private $userId;

	/** @var DirectMapper */
	private $directMapper;

	/** @var IURLGenerator */
	private $urlGenerator;

	/** @var TemplateManager */
	private $manager;

	/** @var TokenManager */
	private $tokenManager;

	/** @var IManager */
	private $shareManager;

	/** @var FederationService */
	private $federationService;

	public function __construct(string $appName,
		IRequest $request,
		IRootFolder $rootFolder,
		$userId,
		DirectMapper $directMapper,
		IURLGenerator $urlGenerator,
		TemplateManager $manager,
		TokenManager $tokenManager,
		IManager $shareManager,
		FederationService $federationService
	) {
		parent::__construct($appName, $request);

		$this->rootFolder   = $rootFolder;
		$this->userId       = $userId;
		$this->directMapper = $directMapper;
		$this->urlGenerator = $urlGenerator;
		$this->manager      = $manager;
		$this->tokenManager = $tokenManager;
		$this->shareManager = $shareManager;
		$this->federationService = $federationService;
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
			$nodes      = $userFolder->getById($fileId);

			if ($nodes === []) {
				throw new OCSNotFoundException();
			}

			$node = $nodes[0];
			if ($node instanceof Folder) {
				throw new OCSBadRequestException('Cannot view folder');
			}

			$direct = $this->directMapper->newDirect($this->userId, $fileId);

			return new DataResponse([
				'url' => $this->urlGenerator->linkToRouteAbsolute('richdocuments.directView.show', [
					'token' => $direct->getToken()
				])
			]);
		} catch (NotFoundException $e) {
			throw new OCSNotFoundException();
		}
	}

	/**
	 * Generate a direct editing link for a file in a public share to open with the current user
	 *
	 * If
	 *
	 * @NoAdminRequired
	 * @throws OCSForbiddenException
	 */
	public function createPublic(
		string $shareTokenSourceInstance = null,
		string $shareToken,
		string $path = '',
		string $password = null
	): DataResponse {
		if ($shareTokenSourceInstance) {
			$remoteCollabora = $this->federationService->getRemoteCollaboraURL($shareTokenSourceInstance);
			if ($remoteCollabora === '') {
				throw new OCSNotFoundException('Failed to connect to remote collabora instance.');
			}

			$wopi = $this->tokenManager->newInitiatorToken($shareTokenSourceInstance, null, $shareToken, true, $this->userId);

			$client = \OC::$server->getHTTPClientService()->newClient();
			$response = $client->post(rtrim($shareTokenSourceInstance, '/') . '/ocs/v2.php/apps/richdocuments/api/v1/direct/share/initiator?format=json', [
				'body' => [
					'initiatorServer' => \OC::$server->getURLGenerator()->getAbsoluteURL(''),
					'initiatorToken' => $wopi->getToken(),
					'shareToken' => $shareToken,
					'path' => $path,
					'password' => $password
				],
				'timeout' => 5
			]);
			$url = \json_decode($response->getBody(), true)['ocs']['data']['url'];

			return new DataResponse([
				'url' => $url,
			]);
		}

		$share = $this->shareManager->getShareByToken($shareToken);
		if ($share->getPassword() && !$this->shareManager->checkPassword($share, $password)) {
			throw new OCSForbiddenException();
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
	 * @throws OCSForbiddenException
	 */
	public function createPublicFromInitiator(
		string $initiatorServer,
		string $initiatorToken,
		string $shareToken,
		string $path = '',
		string $password = null
	): DataResponse {
		$share = $this->shareManager->getShareByToken($shareToken);
		if ($share->getPassword() && !$this->shareManager->checkPassword($share, $password)) {
			throw new OCSForbiddenException();
		}

		$node = $share->getNode();
		if ($node instanceof Folder) {
			$node = $node->get($path);
		}

		$direct = $this->directMapper->newDirect(null, $node->getId(), null, $shareToken, $initiatorServer, $initiatorToken);

		return new DataResponse([
			'url' => $this->urlGenerator->linkToRouteAbsolute('richdocuments.directView.show', [
				'token' => $direct->getToken()
			])
		]);
	}

	/**
	 * @NoAdminRequired
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

		$info = $this->mb_pathinfo($path);

		$userFolder = $this->rootFolder->getUserFolder($this->userId);
		$folder = $userFolder->get($info['dirname']);
		$name = $folder->getNonExistingName($info['basename']);
		$file = $folder->newFile($name);

		try {
			$direct = $this->directMapper->newDirect($this->userId, $template, $file->getId());

			return new DataResponse([
				'url' => $this->urlGenerator->linkToRouteAbsolute('richdocuments.directView.show', [
					'token' => $direct->getToken()
				])
			]);
		} catch (NotFoundException $e) {
			throw new OCSNotFoundException();
		}
	}

	private function mb_pathinfo($filepath) {
		$result = [];
		preg_match('%^(.*?)[\\\\/]*(([^/\\\\]*?)(\.([^\.\\\\/]+?)|))[\\\\/\.]*$%im', ltrim('/' . $filepath), $matches);
		if($matches[1]) {
			$result['dirname'] = $matches[1];
		}
		if($matches[2]) {
			$result['basename'] = $matches[2];
		}
		if($matches[5]) {
			$result['extension'] = $matches[5];
		}
		if($matches[3]) {
			$result['filename'] = $matches[3];
		}
		return $result;
	}
}
