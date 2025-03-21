<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\Richdocuments\Service;

use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\Db\WopiMapper;
use OCA\Richdocuments\TemplateManager;
use OCA\Richdocuments\WOPI\SettingsUrl;
use OCP\Files\Folder;
use OCP\Files\IAppData;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\Files\SimpleFS\ISimpleFile;
use OCP\Files\SimpleFS\ISimpleFolder;
use OCP\ICacheFactory;
use OCP\IConfig;
use OCP\IGroupManager;
use OCP\IURLGenerator;

/**
 * A generic service to manage "system-wide" files
 * and "user-specific" files stored via IAppData.
 */
class SettingsService {
	private const INVALIDATE_FILE_LIST_CACHE_AFTER_SECONDS = 3600;

	/**
	 * @var \OCP\ICache
	 */
	private $cache;

	public function __construct(
		private IAppData $appData,
		ICacheFactory $cacheFactory,
		private IURLGenerator $urlGenerator,
		private IConfig $config,
		private CapabilitiesService $capabilitiesService,
		private WopiMapper $wopiMapper,
		private IGroupManager $groupManager,
		private IRootFolder $rootFolder,
		private TemplateManager $templateManager,
	) {
		// Create a distributed cache for caching file lists
		$this->cache = $cacheFactory->createDistributed(Application::APPNAME);
	}

	/**
	 * Ensure the settings directory exists, if it doesn't exist then create it.
	 *
	 * @param SettingsUrl $settingsUrl
	 * @return ISimpleFolder
	 */

	public function ensureDirectory(SettingsUrl $settingsUrl, string $userId): ISimpleFolder {
		$type = $settingsUrl->getType();
		$category = $settingsUrl->getCategory();

		try {
			$baseFolder = $this->appData->getFolder($type);
		} catch (NotFoundException $e) {
			$baseFolder = $this->appData->newFolder($type);
		}

		if ($type === 'userconfig') {
			try {
				$baseFolder = $baseFolder->getFolder($userId);
			} catch (NotFoundException $e) {
				$baseFolder = $baseFolder->newFolder($userId);
			}
		}

		try {
			$categoryFolder = $baseFolder->getFolder($category);
		} catch (NotFoundException $e) {
			$categoryFolder = $baseFolder->newFolder($category);
		}

		return $categoryFolder;
	}

	/**
	 * Upload a file to the settings directory.
	 * ex. $type/$category/$filename
	 *
	 * @param SettingsUrl $settingsUrl
	 * @param string $fileData
	 * @return array ['stamp' => string, 'uri' => string]
	 */

	public function uploadFile(SettingsUrl $settingsUrl, string $fileData, string $userId): array {
		$categoryFolder = $this->ensureDirectory($settingsUrl, $userId);
		$fileName = $settingsUrl->getFileName();
		$newFile = $categoryFolder->newFile($fileName, $fileData);
		$token = $this->generateIframeToken($settingsUrl->getType(), $userId);
		$fileUri = $this->generateFileUri($settingsUrl->getType(), $settingsUrl->getCategory(), $fileName, $token['token']);
		$this->refreshFolderEtag($settingsUrl->getType());

		return [
			'stamp' => $newFile->getETag(),
			'uri' => $fileUri,
		];
	}

	/**
	 * Get list of files in a setting category.
	 *
	 * @param string $type
	 * @param string $category
	 * @param string $token
	 * @return array Each item has 'stamp' and 'uri'.
	 */
	public function getCategoryFileList(string $type, string $category, string $token): array {
		try {
			$categoryFolder = $this->appData->getFolder($type . '/' . $category);
		} catch (NotFoundException $e) {
			return [];
		}

		$files = $categoryFolder->getDirectoryListing();

		return array_map(function (ISimpleFile $file) use ($type, $category, $token) {
			return [
				'stamp' => $file->getETag(),
				'uri' => $this->generateFileUri($type, $category, $file->getName(), $token),
			];
		}, $files);
	}

	/**
	 * Get list of files in a setting category.
	 *
	 * @param string $type
	 * @param string $userId
	 */

	public function generateIframeToken(string $type, string $userId): array {
		try {
			if ($type === 'admin' && !$this->groupManager->isAdmin($userId)) {
				throw new NotPermittedException('Permission denied');
			}

			$serverHost = $this->urlGenerator->getAbsoluteURL('/');
			$version = $this->capabilitiesService->getProductVersion();

			$wopi = $this->wopiMapper->generateUserSettingsToken(-1, $userId, $version, $serverHost);

			return [
				'token' => $wopi->getToken(),
				'token_ttl' => $wopi->getExpiry(),
			];
		} catch (NotPermittedException $e) {
			throw $e;
		}
	}

	/**
	 *
	 * @param string $type
	 * @return string
	 */
	public function getFolderEtag($type) : string {
		return $this->getTypeFolder($type)->getEtag();
	}

	/**
	 *
	 * @param string $type
	 * @param string $userId
	 * @return string
	 */
	public function getPresentationFolderEtag(string $type, string $userId) : string {
		if ($type === 'systemconfig') {
			return $this->templateManager->getSystemTemplateDir()->getEtag();
		}
		try {
			$this->templateManager->setUserId($userId);
			return $this->templateManager->getUserTemplateDir()->getEtag();
		} catch (\Exception $e) {
			return '';
		}
	}

	public const SUPPORTED_PRESENTATION_MIMES = [
		'application/vnd.oasis.opendocument.presentation',
		'application/vnd.oasis.opendocument.presentation-template',
	];

	/**
	 * @param string $type
	 * @param string $userId
	 * @param string $token
	 * @return array
	 */
	public function getPresentationTemplates(string $type, string $userId, string $token): array {
		$this->templateManager->setUserId($userId);
		$templates = array_filter(
			$type === 'systemconfig' ? $this->templateManager->getSystem('presentation') : $this->templateManager->getUser('presentation'),
			function ($template) {
				return in_array(
					$template->getMimeType(),
					self::SUPPORTED_PRESENTATION_MIMES,
					true
				);
			}
		);

		$result = [];
		foreach ($templates as $template) {
			$uri = $this->generateFileUri($type, 'template', $template->getName(), $token, $template->getId());
			$result[] = [
				'uri' => $uri,
				'stamp' => $template->getEtag(),
			];
		}
		return $result;
	}

	/**
	 * generate setting config
	 *
	 * @param string $type
	 * @return array
	 */
	public function generateSettingsConfig(string $type, string $userId): array {
		$kind = $type === 'userconfig' ? 'user' : 'shared';

		$config = [
			'kind' => $kind,
		];

		if ($type === 'userconfig') {
			$type = $type . '/' . $userId;
		}

		$categories = $this->getAllCategories($type);
		$token = $this->generateIframeToken($type, $userId)['token'];

		foreach ($categories as $category) {
			$files = $this->getCategoryFileList($type, $category, $token);
			$config[$category] = $files;
		}

		$config['template'] = $this->getPresentationTemplates($type, $userId, $token);
		return $config;
	}

	/**
	 * Get all setting categories for a setting type.
	 *
	 * @param string $type
	 * @return string[]
	 */
	private function getAllCategories(string $type): array {
		try {
			$categories = [];
			$directories = $this->getCategoryDirFolderList($type);
			foreach ($directories as $dir) {
				if ($dir instanceof Folder) {
					$categories[] = $dir->getName();
				}
			}
			return $categories;
		} catch (NotFoundException $e) {
			return [];
		}
	}

	/**
	 *
	 * @param string $type
	 * @return Folder[]
	 */
	private function getCategoryDirFolderList(string $type) : array {
		try {
			$folder = $this->getTypeFolder($type);
			if (!$folder instanceof Folder) {
				return [];
			}
			return $folder->getDirectoryListing();
		} catch (NotFoundException $e) {
			return [];
		}
	}

	/**
	 * extract folder of $type
	 *
	 * @param string $type
	 * @return Folder
	 */
	private function getTypeFolder($type) {
		$instanceId = $this->config->getSystemValue('instanceid', null);
		if ($instanceId === null) {
			throw new NotFoundException('Instance ID not found');
		}
		$rootFolder = $this->rootFolder;
		try {
			$folder = $rootFolder->get('appdata_' . $instanceId . '/richdocuments' . '/' . $type);
		} catch (NotFoundException $e) {
			$baseFolder = $this->appData->newFolder($type);
			$folder = $rootFolder->get('appdata_' . $instanceId . '/richdocuments' . '/' . $type);
		}
		return $folder;
	}

	/**
	 *
	 * @param string $type
	 */
	private function refreshFolderEtag($type) {
		$folder = $this->getTypeFolder($type);
		$folder->getStorage()->getCache()->update($folder->getId(), [ 'etag' => uniqid() ]);
	}

	/**
	 * Generate file URL.
	 *
	 * @param string $type
	 * @param string $category
	 * @param string $fileName
	 * @return string
	 */
	private function generateFileUri(string $type, string $category, string $fileName, string $token, ?int $identifier = null): string {
		// Passing userId is dangerous so we have to trim from url...
		if (strpos($type, '/') !== false) {
			$type = explode('/', $type)[0];
		}

		return $this->urlGenerator->linkToRouteAbsolute(
			'richdocuments.settings.getSettingsFile',
			[
				'type' => $type,
				'token' => $token,
				'category' => $category,
				'name' => $fileName,
				'identifier' => $identifier,
			]
		);
	}

	/**
	 * Get a specific settings file.
	 *
	 * @param string $type
	 * @param string $category
	 * @param string $name
	 * @return ISimpleFile
	 */
	public function getSettingsFile(string $type, string $category, string $name): ISimpleFile {
		try {
			$baseFolder = $this->appData->getFolder($type);
		} catch (NotFoundException $e) {
			throw new NotFoundException("Type folder '{$type}' not found.");
		}

		try {
			$categoryFolder = $baseFolder->getFolder($category);
		} catch (NotFoundException $e) {
			throw new NotFoundException("Category folder '{$category}' not found in type '{$type}'.");
		}

		try {
			return $categoryFolder->getFile($name);
		} catch (NotFoundException $e) {
			throw new NotFoundException("File '{$name}' not found in category '{$category}' for type '{$type}'.");
		}
	}

	/**
	 * Delete a specific settings file from the type/category directory.
	 *
	 * @param string $type
	 * @param string $category
	 * @param string $name
	 */
	public function deleteSettingsFile(string $type, string $category, string $name, string $userId): void {
		try {
			$baseFolder = $this->appData->getFolder($type);
		} catch (NotFoundException $e) {
			throw new NotFoundException("Type folder '{$type}' not found.");
		}

		if ($type === 'userconfig') {
			try {
				$baseFolder = $baseFolder->getFolder($userId);
			} catch (NotFoundException $e) {
				throw new NotFoundException("User folder '{$userId}' not found.");
			}
		}

		try {
			$categoryFolder = $baseFolder->getFolder($category);
		} catch (NotFoundException $e) {
			throw new NotFoundException("Category folder '{$category}' not found in type '{$type}'.");
		}

		try {
			if (!$categoryFolder->fileExists($name)) {
				throw new NotFoundException("File '{$name}' not found in category '{$category}' for type '{$type}'.");
			}
			$categoryFolder->getFile($name)->delete();
			$this->refreshFolderEtag($type);
		} catch (NotFoundException $e) {
			throw $e;
		} catch (NotPermittedException $e) {
			throw $e;
		}
	}
}
