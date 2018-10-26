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
		'application/vnd.oasis.opendocument.text-template'
	];
	const MIMES_SHEETS = [
		'application/vnd.oasis.opendocument.spreadsheet-template'
	];
	const MIMES_PRESENTATIONS = [
		'application/vnd.oasis.opendocument.presentation-template'
	];

	/** @var array Template mime types match */
	static public $tplTypes = [
		'document'     => self::MIMES_DOCUMENTS,
		'spreadsheet'  => self::MIMES_SHEETS,
		'presentation' => self::MIMES_PRESENTATIONS
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
								Factory $appDataFactory,
								IURLGenerator $urlGenerator,
								IRootFolder $rootFolder,
								IL10N $l) {
		$this->appName        = $appName;
		$this->userId         = $userId;
		$this->config         = $config;
		$this->rootFolder     = $rootFolder;
		$this->urlGenerator   = $urlGenerator;

		/*
		 * Init the appdata folder
		 * We need an actual folder for the fileid and previews.
		 * TODO: Fix this at some point
		 */
		$appData = $appDataFactory->get($appName);
		try {
			$appData->getFolder('templates');
		} catch (NotFoundException $e) {
			$appData->newFolder('templates');
		}
		try {
			$appData->getFolder('empty_templates');
		} catch (NotFoundException $e) {
			$appData->newFolder('empty_templates');
		}

		$this->l = $l;
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
	private function filterTemplates($templates, $type) {
		return array_filter($templates, function (Node $templateFile) use ($type) {
			if (!($templateFile instanceof File)) {
				return false;
			}

			if (!in_array($templateFile->getMimeType(), self::$tplTypes[$type])) {
				return false;
			}

			//Todo validate mimetypes etc

			return true;
		});
	}

	private function getEmpty($type) {
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
				$file->putContent(file_get_contents('../assets/' . $template));
				$templateFiles[] = $file;
			}
		}

		return $this->filterTemplates($templateFiles, $type);
	}

	/**
	 * Get all global templates
	 *
	 * @return File[]
	 */
	public function getSystem($type) {
		$folder = $this->getSystemTemplateDir();

		$templateFiles = $folder->getDirectoryListing();
		return $this->filterTemplates($templateFiles, $type);
	}

	/**
	 * @return array
	 */
	public function getSystemFormatted($type) {
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
	public function getUser($type) {
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
		$templateDirID = $this->config->getUserValue($this->userId, $this->appName, 'template_dir', false);
		$userFolder = $this->rootFolder->getUserFolder($this->userId);

		if ($templateDirID !== false) {
			$templateDir = $userFolder->getById($templateDirID);
		} else {
			// fallback to default template dir
			try {
				$templateDir = $userFolder->get('Templates');
			} catch (NotFoundException $e) {
				throw new NotFoundException($e->getMessage());
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
		return $this->rootFolder->get('appdata_' . $this->config->getSystemValue('instanceid', null))
			->get('richdocuments')
			->get('templates');
	}

	/**
	 * @return Folder
	 */
	private function getEmptyTemplateDir() {
		return $this->rootFolder->get('appdata_' . $this->config->getSystemValue('instanceid', null))
			->get('richdocuments')
			->get('empty_templates');
	}

	/**
	 * Format template file for json return object
	 *
	 * @param File $template
	 * @return array
	 */
	public function formatNodeReturn(File $template) {
		return [
			'id'      => $template->getId(),
			'name'    => $template->getName(),
			'preview' => $this->urlGenerator->linkToRouteAbsolute('richdocuments.templates.getPreview', ['fileId' => $template->getId()]),
			'type'    => $this->flipTypes()[$template->getMimeType()],
			'delete'  => $this->urlGenerator->linkToRouteAbsolute('richdocuments.templates.delete', ['fileId' => $template->getId()])
		];
	}

	public function isTemplate($fileId) {
		$system = $this->getSystem();
		$user = $this->getUser();
		/** @var File[] $all */
		$all = array_merge($system, $user);

		foreach ($all as $template) {
			if ($template->getId() === $fileId) {
				return true;
			}
		}

		return false;
	}

	public function formatEmpty(File $template) {
		return [
			'id'      => $template->getId(),
			'name'    => $this->l->t('Empty'),
			'preview' => $this->urlGenerator->linkToRouteAbsolute('richdocuments.templates.getPreview', ['fileId' => $template->getId()]),
			'type'    => $this->flipTypes()[$template->getMimeType()],
		];
	}
}
