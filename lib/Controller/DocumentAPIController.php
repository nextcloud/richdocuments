<?php
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\Richdocuments\Controller;

use Exception;
use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\Helper;
use OCA\Richdocuments\TemplateManager;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\JSONResponse;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\Files\Lock\ILock;
use OCP\Files\Lock\ILockManager;
use OCP\Files\Lock\LockContext;
use OCP\Files\Lock\NoLockProviderException;
use OCP\IL10N;
use OCP\IRequest;
use OCP\ISession;
use OCP\PreConditionNotMetException;
use OCP\Share\IManager;
use Psr\Log\LoggerInterface;
use Throwable;

class DocumentAPIController extends \OCP\AppFramework\OCSController {
	private $rootFolder;
	private $shareManager;
	private $templateManager;
	private $l10n;
	private $logger;
	private $lockManager;
	private $session;
	private $userId;

	public function __construct(IRequest $request, IRootFolder $rootFolder, IManager $shareManager, TemplateManager $templateManager, IL10N $l10n, LoggerInterface $logger, ILockManager $lockManager, ISession $session, $userId) {
		parent::__construct(Application::APPNAME, $request);
		$this->rootFolder = $rootFolder;
		$this->shareManager = $shareManager;
		$this->templateManager = $templateManager;
		$this->l10n = $l10n;
		$this->logger = $logger;
		$this->lockManager = $lockManager;
		$this->session = $session;
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
	 * @BruteForceProtection(action=richdocumentsCreatePublic)
	 */
	public function create(string $mimeType, string $fileName, string $directoryPath = '/', ?string $shareToken = null, ?int $templateId = null): JSONResponse {
		try {
			if ($shareToken !== null) {
				$share = $this->shareManager->getShareByToken($shareToken);

				if ($share->getPassword()) {
					if (!$this->session->exists('public_link_authenticated')
						|| $this->session->get('public_link_authenticated') !== (string)$share->getId()
					) {
						throw new Exception('Invalid password');
					}
				}

				if (!($share->getPermissions() & \OCP\Constants::PERMISSION_CREATE)) {
					throw new Exception('No create permissions');
				}
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

	#[Http\Attribute\NoAdminRequired]
	public function openLocal(int $fileId): DataResponse {
		try {
			$file = $this->rootFolder->getUserFolder($this->userId)->getFirstNodeById($fileId);
			if ($file === null) {
				return new DataResponse([], Http::STATUS_NOT_FOUND);
			}

			$this->lockManager->unlock(new LockContext(
				$file,
				ILock::TYPE_APP,
				Application::APPNAME
			));
			return new DataResponse([]);
		} catch (NoLockProviderException|PreConditionNotMetException $e) {
			return new DataResponse([], Http::STATUS_BAD_REQUEST);
		} catch (\Exception $e) {
			return new DataResponse([], Http::STATUS_INTERNAL_SERVER_ERROR);
		}

	}
}
