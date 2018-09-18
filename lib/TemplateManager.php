<?php
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

use OCP\Files\Folder;
use OCP\Files\IAppData;
use OCP\Files\NotFoundException;
use OCP\Files\SimpleFS\ISimpleFile;
use OCP\Files\SimpleFS\ISimpleFolder;
use OCP\IConfig;
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

	/** @var IAppData */
	private $appData;

	/** @var IURLGenerator */
	private $urlGenerator;

	/** @var ISimpleFolder */
	private $folder;

	/** @var Folder */
	private $userFolder;

	/** @var IPreview */
	private $previewManager;

	/** Accepted templates mime types */
	const MIME_DOCUMENTS = [
		'a', 'b', 'c'
	];
	const MIME_SHEETS = [
		'aa', 'bb', 'cc'
	];
	const MIME_PRESENTATIONS = [
		'aaa', 'bbb', 'ccc'
	];

	/** @var array Template mime types match */
	static public $tplTypes = [
		'document'     => self::MIME_DOCUMENTS,
		'sheet'        => self::MIME_SHEETS,
		'presentation' => self::MIME_PRESENTATIONS
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
	 * @param IPreview $previewManager
	 */
	public function __construct(string $appName,
								string $userId,
								IConfig $config,
								Factory $appDataFactory,
								IURLGenerator $urlGenerator,
								IRootFolder $rootFolder,
								IPreview $previewManager) {
		$this->appName        = $appName;
		$this->userId         = $userId;
		$this->config         = $config;
		$this->appData        = $appDataFactory->get($appName);
		$this->urlGenerator   = $urlGenerator;
		$this->userFolder     = $rootFolder->getUserFolder($userId);
		$this->previewManager = $previewManager;

		try {
			$this->folder = $this->appData->getFolder('templates');
		} catch (NotFoundException $e) {
			$this->folder = $this->appData->newFolder('templates');
		}
	}

	/**
	 * Get template info
	 *
	 * @param string $templateName
	 * @return array
	 */
	public function get(string $templateName) {
		try {
			// is this a global template ?
			$template = $this->folder->getFile($templateName);
		} catch (NotFoundException $e) {
			// user defined template dir?
			$templateDirID = $this->config->getUserValue($this->userId, $this->appName, 'template_dir', false);
			try {
				$templateDir = $this->userFolder->getById($templateDirID);
			} catch (NotFoundException $e) {
				// fallback to default template dir
				try {
					$templateDir = $this->userFolder->get('Templates');
					$template    = $templateDir;
				} catch (NotFoundException $e) {
					return new NotFoundException();
				}
			}
		}

		var_dump($template);

		return true;

	}

	/**
	 * Get all global templates
	 */
	public function getGlobals() {
		$templateFiles = $this->folder->getDirectoryListing();

		return array_map(function (ISimpleFile $templateFile) {
			return [
				'name'    => $templateFile->getName(),
				'preview' => $this->urlGenerator->linkToRoute('richdocuments.templates.getPreview', ['templateName' => $templateFile->getName()]),
				'ext'     => $this->flipTypes[$templateFile->getMimeType()]
			];
		}, $templateFiles);
	}

	/**
	 * Add a template to the global template folder
	 *
	 * @param string $templateName
	 * @param string $templateFile
	 * @return void
	 */
	public function add(string $templateName, string $templateFile) {
		try {
			$template = $this->folder->getFile($templateName);
		} catch (NotFoundException $e) {
			$template = $this->folder->newFile($templateName);
		}
		$template->putContent($templateFile);

		return $this->getGlobals;
	}

	/**
	 * Flip tplTypes to retrieve types by mime
	 *
	 * @return array
	 */
	private function flipTypes(): array{
		$result = array();
		foreach ($this::$tplTypes as $type => &$mime) {
			$mime   = array_fill_keys($mime, $type);
			$result = array_merge($result, $mime);
		}

		return $result;
	}
}
