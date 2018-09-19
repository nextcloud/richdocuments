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

use OCP\Files\Folder;
use OCP\Files\IAppData;
use OCP\Files\IRootFolder;
use OCP\Files\Node;
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
	const MIMES_DOCUMENTS = [
		'application/vnd.oasis.opendocument.text'
	];
	const MIMES_SHEETS = [
		'application/vnd.oasis.opendocument.spreadsheet'
	];
	const MIMES_PRESENTATIONS = [
		'application/vnd.oasis.opendocument.presentation'
	];

	/** @var array Template mime types match */
	static public $tplTypes = [
		'document'     => self::MIMES_DOCUMENTS,
		'spreadsheet'  => self::MIMES_SHEETS,
		'presentation' => self::MIMES_PRESENTATIONS
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
	 * Get template ISimpleFile|Node
	 *
	 * @param string $templateName
	 * @return ISimpleFile|Node
	 */
	public function get(string $templateName) {
		try {
			// is this a global template ?
			$templateFile = $this->folder->getFile($templateName);
		} catch (NotFoundException $e) {
			$templateDir = $this->getUserTemplateDir();
			// finally get the template file
			try {
				$templateFile = $templateDir->get($templateName);
			} catch (NotFoundException $e) {
				throw new NotFoundException($e->getMessage());
			}
		}

		return $templateFile;
	}

	/**
	 * Get all global templates
	 *
	 * @return array
	 */
	public function getSystem(): array{
		$templateFiles = $this->folder->getDirectoryListing();

		return array_map(function (ISimpleFile $templateFile) {
			return $this->formatNodeReturn($templateFile);
		}, $templateFiles);
	}

	/**
	 * Get all user templates
	 *
	 * @return array
	 */
	public function getUser(): array{
		$templateDir   = $this->getUserTemplateDir();
		$templateFiles = $templateDir->getDirectoryListing();

		return array_map(function (Node $templateFile) {
			return $this->formatNodeReturn($templateFile);
		}, $templateFiles);
	}

	/**
	 * Get all templates
	 *
	 * @return array
	 */
	public function getAll(string $type = 'document'): array{
		$system = $this->getSystem();
		$user   = $this->getUser();

		return array_filter(array_merge($user, $system), function ($template) use ($type) {
			return $template['ext'] === $type;
		});
	}

	/**
	 * Add a template to the global template folder
	 *
	 * @param string $templateName
	 * @param string $templateFile
	 * @return array
	 */
	public function add(string $templateName, string $templateFile): array{
		try {
			$template = $this->folder->getFile($templateName);
		} catch (NotFoundException $e) {
			$template = $this->folder->newFile($templateName);
		}
		$template->putContent($templateFile);

		return $this->formatNodeReturn($this->get($templateName));
	}

	/**
	 * Delete a template to the global template folder
	 *
	 * @param string $templateName
	 * @return boolean
	 * @throws NotFoundException
	 */
	public function delete(string $templateName): bool {
		try {
			$template = $this->get($templateName);
			$template->delete();
		} catch (NotFoundException $e) {
			throw new NotFoundException($e->getMessage());
		}

		return true;
	}

	/**
	 * Flip $tplTypes to retrieve types by mime
	 *
	 * @return array
	 */
	private function flipTypes(): array{
		$result = array();
		foreach ($this::$tplTypes as $type => $mime) {
			$result = array_merge($result, array_fill_keys($mime, $type));
		}

		return $result;
	}

	/**
	 * Get the user template directory
	 *
	 * @return Node
	 * @throws NotFoundException
	 */
	private function getUserTemplateDir(): Node {
		// has the user manually set a directory as the default template dir ?
		$templateDirID = $this->config->getUserValue($this->userId, $this->appName, 'template_dir', false);

		if ($templateDirID !== false) {
			$templateDir = $this->userFolder->getById($templateDirID);
		} else {
			// fallback to default template dir
			try {
				$templateDir = $this->userFolder->get('Templates');
			} catch (NotFoundException $e) {
				throw new NotFoundException($e->getMessage());
			}
		}

		return $templateDir;
	}

	/**
	 * Format template file for json return object
	 *
	 * @param ISimpleFile|Node $template
	 * @return array
	 */
	private function formatNodeReturn($template): array{
		return [
			'name'    => $template->getName(),
			'preview' => $this->urlGenerator->linkToRoute('richdocuments.templates.getPreview', ['templateName' => $template->getName()]),
			'ext'     => $this->flipTypes()[$template->getMimeType()],
			'etag'    => $template->getETag(),
			'delete'  => $this->urlGenerator->linkToRoute('richdocuments.templates.delete', ['templateName' => $template->getName()])
		];
	}
}
