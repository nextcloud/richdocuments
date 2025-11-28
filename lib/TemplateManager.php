<?php

declare(strict_types = 1);
/**
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments;

use OCA\Richdocuments\AppInfo\Application;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IAppData;
use OCP\Files\IRootFolder;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\IConfig;
use OCP\IDBConnection;
use OCP\IL10N;
use OCP\IURLGenerator;
use Psr\Log\LoggerInterface;
use Throwable;

class TemplateManager {
	/** @var string */
	protected $userId;

	/** Accepted templates mime types */
	public const MIMES_DOCUMENTS = [
		'application/vnd.oasis.opendocument.text-template',
		'application/vnd.oasis.opendocument.text',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
		'application/msword'
	];
	public const MIMES_SHEETS = [
		'application/vnd.oasis.opendocument.spreadsheet-template',
		'application/vnd.oasis.opendocument.spreadsheet',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
		'application/vnd.ms-excel'
	];
	public const MIMES_PRESENTATIONS = [
		'application/vnd.oasis.opendocument.presentation-template',
		'application/vnd.oasis.opendocument.presentation',
		'application/vnd.openxmlformats-officedocument.presentationml.template',
		'application/vnd.ms-powerpoint'
	];
	public const MIMES_DRAWINGS = [
		'application/vnd.oasis.opendocument.graphics-template',
		'application/vnd.oasis.opendocument.graphics',
	];

	/** @var array Template mime types match */
	public static $tplTypes = [
		'document' => self::MIMES_DOCUMENTS,
		'spreadsheet' => self::MIMES_SHEETS,
		'presentation' => self::MIMES_PRESENTATIONS,
		'drawing' => self::MIMES_DRAWINGS,
	];

	public const TYPE_EXTENTION = [
		'document' => 'odt',
		'spreadsheet' => 'ods',
		'presentation' => 'odp',
		'drawing' => 'odg',
	];

	public const TYPE_EXTENSION_OOXML = [
		'document' => 'docx',
		'spreadsheet' => 'xlsx',
		'presentation' => 'pptx',
	];

	public function __construct(
		?string $userId,
		private IConfig $config,
		private IAppData $appData,
		private IURLGenerator $urlGenerator,
		private IRootFolder $rootFolder,
		private IL10N $l,
		private IDBConnection $db,
		private LoggerInterface $logger,
	) {
		$this->userId = $userId;
	}

	private function ensureAppDataFolders() {
		/*
		 * Init the appdata folder
		 * We need an actual folder for the fileid and previews.
		 * TODO: Fix this at some point
		 */
		try {
			$this->appData->getFolder('templates');
		} catch (NotFoundException) {
			$this->appData->newFolder('templates');
		}
		try {
			$this->appData->getFolder('empty_templates');
		} catch (NotFoundException) {
			$this->appData->newFolder('empty_templates');
		}
	}

	public function setUserId(?string $userId): void {
		$this->userId = $userId;
	}

	/**
	 * Get template ISimpleFile|Node
	 *
	 * @param int $fileId
	 * @return File
	 */
	public function get(int $fileId) {
		// is this a global template ?
		$files = $this->getEmptyTemplateDir()->getDirectoryListing();

		foreach ($files as $file) {
			if ($file->getId() === $fileId) {
				return $file;
			}
		}

		if ($this->userId === null && $this->config->getAppValue(Application::APPNAME, 'template_public', 'yes') !== 'yes') {
			throw new NotFoundException();
		}

		// is this a global template ?
		$files = $this->getSystemTemplateDir()->getDirectoryListing();

		foreach ($files as $file) {
			if ($file->getId() === $fileId) {
				return $file;
			}
		}

		$templateDir = $this->getUserTemplateDir();
		// finally get the template file
		$file = $templateDir->getFirstNodeById($fileId);
		if ($file !== null) {
			return $file;
		}

		throw new NotFoundException();
	}

	/**
	 * @param File[] $templates
	 * @return File[]
	 */
	private function filterTemplates($templates, $type = null) {
		return array_filter($templates, function (Node $templateFile) use ($type) {
			if (!($templateFile instanceof File)) {
				return false;
			}

			return $this->isValidTemplateMime($templateFile->getMimeType(), $type);
		});
	}

	public function getTemplateTypeForExtension(string $extension): ?string {
		return match ($extension) {
			'odt', 'docx' => 'document',
			'ods', 'xlsx' => 'spreadsheet',
			'odp', 'pptx' => 'presentation',
			'odg' => 'drawing',
			default => null,
		};
	}

	public function getEmpty($type = null) {
		$folder = $this->getEmptyTemplateDir();

		$templateFiles = $folder->getDirectoryListing();

		if ($templateFiles === []) {
			// Empty so lets copy over the basic templates
			$templates = [
				'document.ott',
				'spreadsheet.ots',
				'presentation.otp',
				'drawing.otg',
			];

			foreach ($templates as $template) {
				$file = $folder->newFile($template);
				$file->putContent(file_get_contents(__DIR__ . '/../emptyTemplates/' . $template));
				$templateFiles[] = $file;
			}
		}

		return $this->filterTemplates($templateFiles, $type);
	}

	/**
	 * Remove empty_templates in appdata and recreate it from the apps templates
	 */
	public function updateEmptyTemplates() {
		$this->ensureAppDataFolders();
		try {
			$folder = $this->getEmptyTemplateDir();
			$folder->delete();
		} catch (NotFoundException) {
		}
		$this->appData->newFolder('empty_templates');
		$this->getEmpty();
	}

	/**
	 * Get all global templates
	 *
	 * @return File[]
	 */
	public function getSystem($type = null) {
		if ($this->userId === null && $this->config->getAppValue(Application::APPNAME, 'template_public', 'yes') !== 'yes') {
			return [];
		}
		$folder = $this->getSystemTemplateDir();

		$templateFiles = $folder->getDirectoryListing();
		return $this->filterTemplates($templateFiles, $type);
	}

	/**
	 * @return array
	 */
	public function getSystemFormatted($type = null) {
		$empty = $this->getEmpty($type);
		$system = $this->getSystem($type);

		$emptyFormatted = array_map(fn (File $file) => $this->formatEmpty($file), $empty);

		$systemFormatted = array_map(fn (File $file) => $this->formatNodeReturn($file), $system);

		return array_merge($emptyFormatted, $systemFormatted);
	}

	/**
	 * Get all user templates
	 * @param $type
	 * @return File[]
	 */
	public function getUser($type = null): array {
		if ($this->userId === null) {
			return [];
		}

		try {
			$templateDir = $this->getUserTemplateDir();
			$templateFiles = $templateDir->getDirectoryListing();

			return $this->filterTemplates($templateFiles, $type);
		} catch (NotFoundException) {
			return [];
		}
	}

	/**
	 * @return array
	 */
	public function getUserFormatted($type) {
		if ($this->userId === null) {
			return [];
		}

		$templates = $this->getUser($type);

		return array_map(fn (File $file) => $this->formatNodeReturn($file), $templates);
	}

	/**
	 * Get all templates
	 *
	 * @return File[]
	 */
	public function getAll($type = 'document') {
		if (!array_key_exists($type, self::$tplTypes)) {
			return [];
		}

		$system = $this->getSystem();
		$user = $this->getUser();

		return array_values(array_filter(array_merge($user, $system), function (File $template) use ($type) {
			foreach (self::$tplTypes[$type] as $mime) {
				if ($template->getMimeType() === $mime) {
					return true;
				}
			}
			return false;
		}));
	}

	public function getAllFormatted($type) {
		if (!array_key_exists($type, self::$tplTypes)) {
			return [];
		}

		$system = $this->getSystemFormatted($type);
		$user = $this->getUserFormatted($type);

		return array_merge($system, $user);
	}

	/**
	 * Add a template to the global template folder
	 *
	 * @param string $templateName
	 * @param string $templateFile
	 * @return array
	 */
	public function add($templateName, $templateFile) {
		$folder = $this->getSystemTemplateDir();

		try {
			$template = $folder->get($templateName);
		} catch (NotFoundException) {
			$template = $folder->newFile($templateName);
		}
		$template->putContent($templateFile);
		$folder->getStorage()->getCache()->update($folder->getId(), [ 'etag' => uniqid() ]);
		return $this->formatNodeReturn($this->get($template->getId()));
	}

	/**
	 * Delete a template to the global template folder
	 *
	 * @param int $fileId
	 * @return boolean
	 * @throws NotFoundException
	 */
	public function delete($fileId): bool {
		$folder = $this->getSystemTemplateDir();
		$files = $folder->getDirectoryListing();
		foreach ($files as $file) {
			if ($file->getId() === $fileId) {
				$file->delete();
				$folder->getStorage()->getCache()->update($folder->getId(), [ 'etag' => uniqid() ]);
				return true;
			}
		}

		throw new NotFoundException();
	}

	/**
	 * Flip $tplTypes to retrieve types by mime
	 *
	 * @return array
	 */
	private function flipTypes() {
		$result = [];
		foreach ($this::$tplTypes as $type => $mime) {
			$result = array_merge($result, array_fill_keys($mime, $type));
		}

		return $result;
	}

	/**
	 * Get the user template directory
	 *
	 * @return Folder
	 * @throws NotFoundException
	 */
	public function getUserTemplateDir() {
		if ($this->userId === null) {
			throw new NotFoundException('userId not set');
		}

		// has the user manually set a directory as the default template dir ?
		$templateDirPath = $this->config->getUserValue($this->userId, Application::APPNAME, 'templateFolder', false);
		$userFolder = $this->rootFolder->getUserFolder($this->userId);

		if ($templateDirPath !== false) {
			$templateDir = $userFolder->get($templateDirPath);
		} else {
			// fallback to default template dir
			try {
				$templateDir = $userFolder->get('Templates');
			} catch (NotFoundException) {
				throw new NotFoundException('Template directory not found');
			}
		}

		if (!($templateDir instanceof Folder)) {
			throw new NotFoundException('Template dir points to a file');
		}

		return $templateDir;
	}

	/**
	 * @return Folder
	 */
	public function getSystemTemplateDir() {
		$this->ensureAppDataFolders();
		$path = 'appdata_' . $this->config->getSystemValue('instanceid', null) . '/richdocuments/templates';
		return $this->rootFolder->get($path);
	}

	/**
	 * @return Folder
	 */
	private function getEmptyTemplateDir() {
		$this->ensureAppDataFolders();
		$path = 'appdata_' . $this->config->getSystemValue('instanceid', null) . '/richdocuments/empty_templates';
		return $this->rootFolder->get($path);
	}

	/**
	 * Format template file for json return object
	 *
	 * @param File $template
	 * @return array
	 */
	public function formatNodeReturn(File $template) {
		$ooxml = $this->config->getAppValue(Application::APPNAME, 'doc_format', 'ooxml') === 'ooxml';
		$documentType = $this->flipTypes()[$template->getMimeType()];
		return [
			'id' => $template->getId(),
			'name' => $template->getName(),
			'preview' => $this->urlGenerator->linkToRouteAbsolute('richdocuments.templates.getPreview', ['fileId' => $template->getId()]),
			'type' => $this->flipTypes()[$template->getMimeType()],
			'delete' => $this->urlGenerator->linkToRouteAbsolute('richdocuments.templates.delete', ['fileId' => $template->getId()]),
			'extension' => ($ooxml && isset(self::TYPE_EXTENSION_OOXML[$documentType])) ? self::TYPE_EXTENSION_OOXML[$documentType] : self::TYPE_EXTENTION[$documentType],
		];
	}

	public function isTemplate($fileId) {
		$empty = $this->getEmpty();
		$system = $this->getSystem();
		$user = $this->getUser();
		/** @var File[] $all */
		$all = array_merge($empty, $system, $user);

		foreach ($all as $template) {
			if ($template->getId() === $fileId) {
				return true;
			}
		}

		return false;
	}

	public function formatEmpty(File $template) {
		$ooxml = $this->config->getAppValue(Application::APPNAME, 'doc_format', 'ooxml') === 'ooxml';
		$documentType = $this->flipTypes()[$template->getMimeType()];
		return [
			'id' => $template->getId(),
			'name' => $this->l->t('Empty'),
			'type' => $this->flipTypes()[$template->getMimeType()],
			'extension' => ($ooxml && isset(self::TYPE_EXTENSION_OOXML[$documentType])) ? self::TYPE_EXTENSION_OOXML[$documentType] : self::TYPE_EXTENTION[$documentType],
		];
	}

	public function isValidTemplateMime($mime, $type = null) {
		if ($type === null) {
			$allMimes = array_merge(self::$tplTypes['document'], self::$tplTypes['spreadsheet'], self::$tplTypes['presentation'], self::$tplTypes['drawing']);
			if (!in_array($mime, $allMimes)) {
				return false;
			}
		}

		if ($type !== null && !in_array($mime, self::$tplTypes[$type])) {
			return false;
		}

		return true;
	}

	public function getAITemplate(?string $templateName = 'security'): string {
		$emptyAITemplates = __DIR__ . '/../emptyTemplates/ai/';
		$fullTemplatePath = $emptyAITemplates . $templateName . '.odp';

		if (file_exists($fullTemplatePath)) {
			$emptyFileContent = file_get_contents($fullTemplatePath);

			if ($emptyFileContent !== false) {
				return $emptyFileContent;
			}
		}

		return '';
	}

	/**
	 * Return default content for empty files of a given filename by file extension
	 */
	public function getEmptyFileContent(string $extension): string {
		$supportedExtensions = ['odt', 'ods', 'odp', 'odg', 'docx', 'xlsx', 'pptx'];
		$emptyPath = __DIR__ . '/../emptyTemplates/template.' . $extension;

		if (in_array($extension, $supportedExtensions, true) && file_exists($emptyPath)) {
			$emptyFileContent = file_get_contents($emptyPath);
			if ($emptyFileContent !== false) {
				return $emptyFileContent;
			}
		}

		return '';
	}

	public function isSupportedTemplateSource(string $extension): bool {
		$supportedExtensions = [
			'ott', 'otg', 'otp', 'ots',
			'dotx', 'xltx', 'potx',
			'dot', 'xlt', 'pot',
		];
		return in_array($extension, $supportedExtensions, true);
	}

	public function setTemplateSource(int $fileId, int $templateId): void {
		try {
			$query = $this->db->getQueryBuilder();
			$query->insert('richdocuments_template')
				->values([
					'userid' => $query->createNamedParameter($this->userId),
					'fileid' => $query->createNamedParameter($fileId, IQueryBuilder::PARAM_INT),
					'templateid' => $query->createNamedParameter($templateId, IQueryBuilder::PARAM_INT),
					'timestamp' => $query->createNamedParameter(time(), IQueryBuilder::PARAM_INT)
				]);
			$query->executeStatement();
		} catch (Throwable $e) {
			$this->logger->warning('Could not store template source', ['exception' => $e]);
			// Ignore failure and proceed with empty template
		}
	}

	public function getTemplateSource(int $fileId): ?File {
		$templateId = 0;
		try {
			$query = $this->db->getQueryBuilder();
			$query->select('templateid')
				->from('richdocuments_template')
				->where($this->userId !== null ? $query->expr()->eq('userid', $query->createNamedParameter($this->userId, IQueryBuilder::PARAM_STR)) : $query->expr()->isNull('userid'))
				->andWhere($query->expr()->eq('fileid', $query->createNamedParameter($fileId, IQueryBuilder::PARAM_INT)));
			$result = $query->executeQuery();
			$templateId = (int)$result->fetchOne();

			$query = $this->db->getQueryBuilder();
			$query->delete('richdocuments_template')
				->where($this->userId !== null ? $query->expr()->eq('userid', $query->createNamedParameter($this->userId, IQueryBuilder::PARAM_STR)) : $query->expr()->isNull('userid'))
				->andWhere($query->expr()->eq('fileid', $query->createNamedParameter($fileId, IQueryBuilder::PARAM_INT)));
			$query->executeStatement();
		} catch (Throwable $e) {
			// Ignore failure and proceed with empty template
			$this->logger->warning('Could not retrieve template source', ['exception' => $e]);
			return null;
		}

		if ($templateId !== 0) {
			try {
				$template = $this->get($templateId);
			} catch (NotFoundException $e) {
				$userFolder = $this->rootFolder->getUserFolder($this->userId);
				try {
					$template = $userFolder->getFirstNodeById($templateId);
				} catch (NotFoundException $e) {
					$this->logger->warning('Could not retrieve template source file', ['exception' => $e]);
					return null;
				}
			}
			return $template;
		}

		return null;
	}
}
