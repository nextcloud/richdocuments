<?php
/*
 * @copyright Copyright (c) 2021 Julius Härtl <jus@bitgrid.net>
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

declare(strict_types=1);

namespace OCA\Richdocuments\Controller;

use Exception;
use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\Helper;
use OCA\Richdocuments\TemplateManager;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\JSONResponse;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\IL10N;
use OCP\IRequest;
use OCP\Share\IManager;
use Psr\Log\LoggerInterface;
use Throwable;

class DocumentAPIController extends \OCP\AppFramework\OCSController {

	private $rootFolder;
	private $shareManager;
	private $templateManager;
	private $l10n;
	private $logger;
	private $userId;

	public function __construct(IRequest $request, IRootFolder $rootFolder, IManager $shareManager, TemplateManager $templateManager, IL10N $l10n, LoggerInterface $logger, $userId) {
		parent::__construct(Application::APPNAME, $request);
		$this->rootFolder = $rootFolder;
		$this->shareManager = $shareManager;
		$this->templateManager = $templateManager;
		$this->l10n = $l10n;
		$this->logger = $logger;
		$this->userId = $userId;
	}

	/**
	 * Create a file from a public share link of a folder
	 *
	 * As the server template API for file creation is not available there, we need a dedicated API
	 * in order to properly create files as public page visitors. This is being called in the new file
	 * actions in src/view/NewFileMenu.js
	 *
	 * @NoAdminRequired
	 * @PublicPage
	 */
	public function create(string $mimeType, string $fileName, string $directoryPath = '/', string $shareToken = null, ?int $templateId = null): JSONResponse {
		try {
			if ($shareToken !== null) {
				$share = $this->shareManager->getShareByToken($shareToken);
			}

			$rootFolder = $shareToken !== null ? $share->getNode() : $this->rootFolder->getUserFolder($this->userId);
			$folder = $rootFolder->get($directoryPath);

			if (!($folder instanceof Folder)) {
				throw new Exception('Node is not a folder');
			}
		} catch (Throwable $e) {
			$this->logger->error('Failed to create document', ['exception' => $e]);
			return new JSONResponse([
				'status' => 'error',
				'message' => $this->l10n->t('Cannot create document')
			], Http::STATUS_BAD_REQUEST);
		}

		$basename = $this->l10n->t('New Document.odt');
		switch ($mimeType) {
			case 'application/vnd.oasis.opendocument.spreadsheet':
				$basename = $this->l10n->t('New Spreadsheet.ods');
				break;
			case 'application/vnd.oasis.opendocument.presentation':
				$basename = $this->l10n->t('New Presentation.odp');
				break;
			case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
				$basename = $this->l10n->t('New Document.docx');
				break;
			case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
				$basename = $this->l10n->t('New Spreadsheet.xlsx');
				break;
			case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
				$basename = $this->l10n->t('New Presentation.pptx');
				break;
			default:
				break;
		}

		if (!$fileName) {
			$fileName = Helper::getNewFileName($folder, $basename);
		}

		if ($folder->nodeExists($fileName)) {
			return new JSONResponse([
				'status' => 'error',
				'message' => $this->l10n->t('File already exists')
			], Http::STATUS_BAD_REQUEST);
		}

		try {
			$file = $folder->newFile($fileName);
			$templateType = $this->templateManager->getTemplateTypeForExtension(pathinfo($fileName, PATHINFO_EXTENSION));

			$empty = $this->templateManager->getEmpty($templateType);
			$templateFile = array_shift($empty);

			if ($templateId) {
				$templateFile = $this->templateManager->get($templateId);
			}

			$file->putContent($this->templateManager->getEmptyFileContent($file->getExtension()));
			if ($this->templateManager->isSupportedTemplateSource($templateFile->getExtension())) {
				// Only use TemplateSource if supported filetype
				$this->templateManager->setTemplateSource($file->getId(), $templateFile->getId());
			}
		} catch (Exception $e) {
			$this->logger->error('Failed to create file from template', ['exception' => $e]);
			return new JSONResponse([
				'status' => 'error',
				'message' => $this->l10n->t('Not allowed to create document')
			], Http::STATUS_BAD_REQUEST);
		}
		return new JSONResponse([
			'status' => 'success',
			'data' => \OCA\Files\Helper::formatFileInfo($file->getFileInfo())
		]);
	}
}
