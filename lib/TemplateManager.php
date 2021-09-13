<?php
declare (strict_types = 1);
/**
 * @copyright Copyright (c) 2018 John Molakvoæ <skjnldsv@protonmail.com>
 *
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
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Richdocuments;

use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IAppData;
use OCP\Files\IRootFolder;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\IConfig;
use OCP\IL10N;
use OCP\IPreview;
use OCP\IURLGenerator;
use OC\Files\AppData\Factory;

class TemplateManager {

	/** @var string */
	protected $appName;

	/** @var string */
	protected $userId;

	/** @var IConfig */
	private $config;

	/** @var IURLGenerator */
	private $urlGenerator;

	/** @var IRootFolder */
	private $rootFolder;

	/** @var IL10N */
	private $l;

	/** Accepted templates mime types */
	const MIMES_DOCUMENTS = [
		'application/vnd.oasis.opendocument.text-template',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
		'application/msword'
	];
	const MIMES_SHEETS = [
		'application/vnd.oasis.opendocument.spreadsheet-template',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
		'application/vnd.ms-excel'
	];
	const MIMES_PRESENTATIONS = [
		'application/vnd.oasis.opendocument.presentation-template',
		'application/vnd.openxmlformats-officedocument.presentationml.template',
		'application/vnd.ms-powerpoint'
	];

	/** @var array Template mime types match */
	static public $tplTypes = [
		'document'     => self::MIMES_DOCUMENTS,
		'spreadsheet'  => self::MIMES_SHEETS,
		'presentation' => self::MIMES_PRESENTATIONS
	];

	const TYPE_EXTENTION = [
		'document'     => 'odt',
		'spreadsheet'  => 'ods',
		'presentation' => 'odp'
	];

	const TYPE_EXTENSION_OOXML = [
		'document'     => 'docx',
		'spreadsheet'  => 'xlsx',
		'presentation' => 'pptx'
	];

	const EMPTY_TEMPLATE_ID_TYPE = [
		-1 => 'document',
		-2 => 'spreadsheet',
		-3 => 'presentation',
	];
	const EMPTY_TEMPLATE_TYPE_ID = [
		'document'     => -1,
		'spreadsheet'  => -2,
		'presentation' => -3,
	];


	/**
	 * Template manager
	 *
	 * @param string $appName
	 * @param string $userId
	 * @param IConfig $config
	 * @param Factory $appDataFactory
	 * @param IURLGenerator $urlGenerator
	 * @param IRootFolder $rootFolder
	 * @param IL10N $l
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function __construct($appName,
								$userId,
								IConfig $config,
								IAppData $appData,
								IURLGenerator $urlGenerator,
								IRootFolder $rootFolder,
								IL10N $l) {
		$this->appName        = $appName;
		$this->userId         = $userId;
		$this->config         = $config;
		$this->rootFolder     = $rootFolder;
		$this->urlGenerator   = $urlGenerator;


		$this->appData = $appData;
		$this->createAppDataFolders();

		$this->l = $l;
	}

	private function createAppDataFolders() {
		/*
		 * Init the appdata folder
		 * We need an actual folder for the fileid and previews.
		 * TODO: Fix this at some point
		 */
		try {
			$this->appData->getFolder('templates');
		} catch (NotFoundException $e) {
			$this->appData->newFolder('templates');
		}
		try {
			$this->appData->getFolder('empty_templates');
		} catch (NotFoundException $e) {
			$this->appData->newFolder('empty_templates');
		}
	}

	public function setUserId($userId) {
		$this->userId = $userId;
	}

	/**
	 * Get template ISimpleFile|Node
	 *
	 * @param int $fileId
	 * @return File
	 */
	public function get($fileId) {
		// is this a global template ?
		$files = $this->getEmptyTemplateDir()->getDirectoryListing();

		foreach ($files as $file) {
			if ($file->getId() === $fileId) {
				return $file;
			}
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
		$files = $templateDir->getById($fileId);
		if ($files !== []) {
			return $files[0];
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

	private function getEmpty($type = null) {
		$folder = $this->getEmptyTemplateDir();

		$templateFiles = $folder->getDirectoryListing();

		if ($templateFiles === []) {
			// Empty so lets copy over the basic templates
			$templates = [
				'document.ott',
				'spreadsheet.ots',
				'presentation.otp',
			];

			foreach ($templates as $template) {
				$file = $folder->newFile($template);
				$file->putContent(file_get_contents(__DIR__ . '/../assets/' . $template));
				$templateFiles[] = $file;
			}
		}

		return $this->filterTemplates($templateFiles, $type);
	}

	/**
	 * Remove empty_templates in appdata and recreate it from the apps templates
	 */
	public function updateEmptyTemplates() {
		try {
			$folder = $this->getEmptyTemplateDir();
			$folder->delete();
		} catch (NotFoundException $e) {
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

		$emptyFormatted = array_map(function(File $file) {
			return $this->formatEmpty($file);
		}, $empty);

		$systemFormatted = array_map(function(File $file) {
			return $this->formatNodeReturn($file);
		}, $system);

		return array_merge($emptyFormatted, $systemFormatted);
	}

	/**
	 * Get all user templates
	 *
	 * @return File[]
	 */
	public function getUser($type = null) {
		try {
			$templateDir   = $this->getUserTemplateDir();
			$templateFiles = $templateDir->getDirectoryListing();

			return $this->filterTemplates($templateFiles, $type);
		} catch(NotFoundException $e) {
			return [];
		}
	}

	/**
	 * @return array
	 */
	public function getUserFormatted($type) {
		$templates = $this->getUser($type);

		return array_map(function(File $file) {
			return $this->formatNodeReturn($file);
		}, $templates);
	}

	/**
	 * Get all templates
	 *
	 * @return File[]
	 */
	public function getAll($type = 'document') {
		$system = $this->getSystem();
		$user   = $this->getUser();

		if (!array_key_exists($type, self::$tplTypes)) {
			return [];
		}

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
		$user   = $this->getUserFormatted($type);

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
		} catch (NotFoundException $e) {
			$template = $folder->newFile($templateName);
		}
		$template->putContent($templateFile);

		return $this->formatNodeReturn($this->get($template->getId()));
	}

	/**
	 * Delete a template to the global template folder
	 *
	 * @param int $fileId
	 * @return boolean
	 * @throws NotFoundException
	 */
	public function delete($fileId) {
		$files = $this->getSystemTemplateDir()->getDirectoryListing();
		foreach ($files as $file) {
			if ($file->getId() === $fileId) {
				$file->delete();
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
	private function getUserTemplateDir() {
		if ($this->userId === null) {
			throw new NotFoundException('userId not set');
		}

		// has the user manually set a directory as the default template dir ?
		$templateDirPath = $this->config->getUserValue($this->userId, $this->appName, 'templateFolder', false);
		$userFolder = $this->rootFolder->getUserFolder($this->userId);

		if ($templateDirPath !== false) {
			$templateDir = $userFolder->get($templateDirPath);
		} else {
			// fallback to default template dir
			try {
				$templateDir = $userFolder->get('Templates');
			} catch (NotFoundException $e) {
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
	private function getSystemTemplateDir() {
		$path = 'appdata_' . $this->config->getSystemValue('instanceid', null) . '/richdocuments/templates';
		return $this->rootFolder->get($path);
	}

	/**
	 * @return Folder
	 */
	private function getEmptyTemplateDir() {
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
		$ooxml = $this->config->getAppValue($this->appName, 'doc_format', '') === 'ooxml';
		$documentType = $this->flipTypes()[$template->getMimeType()];
		return [
			'id'        => $template->getId(),
			'name'      => $template->getName(),
			'preview'   => $this->urlGenerator->linkToRouteAbsolute('richdocuments.templates.getPreview', ['fileId' => $template->getId()]),
			'type'      => $this->flipTypes()[$template->getMimeType()],
			'delete'    => $this->urlGenerator->linkToRouteAbsolute('richdocuments.templates.delete', ['fileId' => $template->getId()]),
			'extension' => $ooxml ? self::TYPE_EXTENSION_OOXML[$documentType] : self::TYPE_EXTENTION[$documentType],
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
		$ooxml = $this->config->getAppValue($this->appName, 'doc_format', '') === 'ooxml';
		$documentType = $this->flipTypes()[$template->getMimeType()];
		return [
			'id'        => $template->getId(),
			'name'      => $this->l->t('Empty'),
			'type'      => $this->flipTypes()[$template->getMimeType()],
			'extension' => $ooxml ? self::TYPE_EXTENSION_OOXML[$documentType] : self::TYPE_EXTENTION[$documentType],
		];
	}

	public function isValidTemplateMime($mime, $type = null) {
		if ($type === null) {
			$allMimes = array_merge(self::$tplTypes['document'], self::$tplTypes['spreadsheet'], self::$tplTypes['presentation']);
			if (!in_array($mime, $allMimes)) {
				return false;
			}
		}

		if ($type !== null && !in_array($mime, self::$tplTypes[$type])) {
			return false;
		}

		return true;
	}
}
