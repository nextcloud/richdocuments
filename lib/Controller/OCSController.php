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
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCS\OCSBadRequestException;
use OCP\AppFramework\OCS\OCSNotFoundException;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\IRequest;
use OCP\IURLGenerator;

class OCSController extends \OCP\AppFramework\OCSController {
	/** @var IRootFolder */
	private $rootFolder;

	/** @var string */
	private $userId;

	/** @var DirectMapper */
	private $directMapper;

	/** @var IURLGenerator */
	private $urlGenerator;

	public function __construct($appName,
								IRequest $request,
								IRootFolder $rootFolder,
								$userId,
								DirectMapper $directMapper,
								IURLGenerator $urlGenerator) {
		parent::__construct($appName, $request);

		$this->rootFolder = $rootFolder;
		$this->userId = $userId;
		$this->directMapper = $directMapper;
		$this->urlGenerator = $urlGenerator;
	}

	/**
	 * @NoAdminRequired
	 *
	 * @param int $fileId
	 */
	public function create($fileId) {
		try {
			$userFolder = $this->rootFolder->getUserFolder($this->userId);
			$nodes = $userFolder->getById($fileId);

			if ($nodes === []) {
				throw new NotFoundException();
			}

			$node = $nodes[0];
			if ($node instanceof Folder) {
				throw new OCSBadRequestException('Cannot view folder');
			}

			//TODO check if we can even edit this file with collabora
			
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
	 * @NoAdminRequired
	 *
	 * @param string $type The template id
	 */
	public function getTemplates(string $type) {

	}

	/**
	 * @NoAdminRequired
	 *
	 * @param string $path Where to create the document
	 * @param int $template The template id
	 */
	public function createFromTemplate(string $path, int $template) {
	}
}
