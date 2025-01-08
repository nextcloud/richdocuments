<?php

declare(strict_types=1);

namespace OCA\Richdocuments\Service;

use Exception;
use OCA\Richdocuments\AppInfo\Application;
use OCP\Files\IAppData;
use OCP\Files\NotFoundException;
use OCP\Files\SimpleFS\ISimpleFile;
use OCP\Files\SimpleFS\ISimpleFolder;
use OCP\ICacheFactory;
use OCP\IConfig;
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
	) {
		// Create a distributed cache for caching file lists
		$this->cache = $cacheFactory->createDistributed(Application::APPNAME);
	}

	/**
	 * Get or create the system-wide folder in app data.
	 *
	 * @return ISimpleFolder
	 * @throws \OCP\Files\NotPermittedException
	 */
	private function getSystemDataDir(): ISimpleFolder {
		try {
			return $this->appData->getFolder('system-settings');
		} catch (NotFoundException) {
			// Folder not found, create it
			return $this->appData->newFolder('system-settings');
		}
	}

	/**
	 * Get or create the user-specific folder in app data.
	 *
	 * Typically you'd pass the user ID, e.g. $this->userSession->getUser()->getUID().
	 *
	 * @param string $userId
	 * @return ISimpleFolder
	 * @throws \OCP\Files\NotPermittedException
	 */
	private function getUserDataDir(string $userId): ISimpleFolder {
		try {
			return $this->appData->getFolder('user-settings-' . $userId);
		} catch (NotFoundException) {
			return $this->appData->newFolder('user-settings-' . $userId);
		}
	}

	/**
	 * Return a list of file objects from the system-wide directory.
	 *
	 * @return ISimpleFile[]
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function getSystemFiles(): array {
		$dir = $this->getSystemDataDir();
		return $dir->getDirectoryListing();
	}

	/**
	 * Return a list of file objects from the user-specific directory.
	 *
	 * @param string $userId
	 * @return ISimpleFile[]
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function getUserFiles(string $userId): array {
		$dir = $this->getUserDataDir($userId);
		return $dir->getDirectoryListing();
	}

	/**
	 * Return a cached list of file names for the system-wide directory.
	 *
	 * @return string[]
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function getSystemFileNames(): array {
		$cacheKey = 'systemFileNames';
		$cachedNames = $this->cache->get($cacheKey);

		if ($cachedNames === null) {
			$files = $this->getSystemFiles();
			$cachedNames = array_map(
				static fn (ISimpleFile $f) => $f->getName(),
				$files
			);
			$this->cache->set($cacheKey, $cachedNames, self::INVALIDATE_FILE_LIST_CACHE_AFTER_SECONDS);
		}

		return $cachedNames;
	}

	/**
	 * Return a cached list of file names for a specific user directory.
	 *
	 * @param string $userId
	 * @return string[]
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function getUserFileNames(string $userId): array {
		$cacheKey = 'userFileNames_' . $userId;
		$cachedNames = $this->cache->get($cacheKey);

		if ($cachedNames === null) {
			$files = $this->getUserFiles($userId);
			$cachedNames = array_map(
				static fn (ISimpleFile $f) => $f->getName(),
				$files
			);
			$this->cache->set($cacheKey, $cachedNames, self::INVALIDATE_FILE_LIST_CACHE_AFTER_SECONDS);
		}

		return $cachedNames;
	}

	/**
	 * Upload or overwrite a file in the system-wide directory.
	 *
	 * @param string $fileName
	 * @param resource|string $fileData  If you have a resource handle or raw string data.
	 * @return array  e.g. ['size' => 1234]
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function uploadSystemFile(string $fileName, $fileData): array {
		$dir = $this->getSystemDataDir();
		$newFile = $dir->newFile($fileName, $fileData);

		// Remove cache so it is rebuilt next time
		$this->cache->remove('systemFileNames');

		return [
			'size' => $newFile->getSize(),
		];
	}

	/**
	 * Upload or overwrite a file in the user-specific directory.
	 *
	 * @param string $userId
	 * @param string $fileName
	 * @param resource|string $fileData
	 * @return array
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function uploadUserFile(string $userId, string $fileName, $fileData): array {
		$dir = $this->getUserDataDir($userId);
		$newFile = $dir->newFile($fileName, $fileData);

		// Invalidate cache
		$this->cache->remove('userFileNames_' . $userId);

		return [
			'size' => $newFile->getSize(),
		];
	}

	/**
	 * Get a single file (system-wide).
	 *
	 * @param string $fileName
	 * @return ISimpleFile
	 * @throws NotFoundException
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function getSystemFile(string $fileName): ISimpleFile {
		$dir = $this->getSystemDataDir();
		return $dir->getFile($fileName);
	}

	/**
	 * Get a single file (user-specific).
	 *
	 * @param string $userId
	 * @param string $fileName
	 * @return ISimpleFile
	 * @throws NotFoundException
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function getUserFile(string $userId, string $fileName): ISimpleFile {
		$dir = $this->getUserDataDir($userId);
		return $dir->getFile($fileName);
	}

	/**
	 * TODO: need to modify - Return the contents of a system-wide file, for example if it's JSON.
	 *
	 * @param string $fileName
	 * @return string
	 * @throws NotFoundException
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function getSystemFileContents(string $fileName): string {
		$file = $this->getSystemFile($fileName);
		return $file->getContent();
	}

	/**
	 * TODO: need to modify 
	 * Return the contents of a user-specific file.
	 *
	 * @param string $userId
	 * @param string $fileName
	 * @return string
	 * @throws NotFoundException
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function getUserFileContents(string $userId, string $fileName): string {
		$file = $this->getUserFile($userId, $fileName);
		return $file->getContent();
	}

	/**
	 * Delete a file in the system-wide directory.
	 *
	 * @param string $fileName
	 * @return void
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function deleteSystemFile(string $fileName): void {
		$dir = $this->getSystemDataDir();
		if ($dir->fileExists($fileName)) {
			$dir->getFile($fileName)->delete();
		}
		$this->cache->remove('systemFileNames');
	}

	/**
	 * Delete a file in the user-specific directory.
	 *
	 * @param string $userId
	 * @param string $fileName
	 * @return void
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function deleteUserFile(string $userId, string $fileName): void {
		$dir = $this->getUserDataDir($userId);
		if ($dir->fileExists($fileName)) {
			$dir->getFile($fileName)->delete();
		}
		$this->cache->remove('userFileNames_' . $userId);
	}

	/**
	 * Example of a method to bulk-install default files, similar to "installDefaultFonts" in FontService.
	 * This reads from a local assets folder, but adapt as needed.
	 *
	 * @throws Exception
	 */
	public function installDefaultSystemFiles(): void {
		$dirPath = __DIR__ . '/../../assets/system-data'; // example location

		if (!is_dir($dirPath)) {
			throw new Exception("Directory \"$dirPath\" does not exist!");
		}

		$handle = opendir($dirPath);
		if (!$handle) {
			throw new Exception("Failed opening directory \"$dirPath\"!");
		}

		while (false !== ($fileName = readdir($handle))) {
			// skip dot-files or any irrelevant files
			if (str_starts_with($fileName, '.') || str_ends_with($fileName, '.txt')) {
				continue;
			}

			$filePath = $dirPath . '/' . $fileName;
			if (!is_file($filePath)) {
				continue;
			}

			// Read file from disk (example)
			$fileHandle = fopen($filePath, 'r');
			if (!$fileHandle) {
				continue;
			}

			$this->uploadSystemFile($fileName, $fileHandle);
		}
	}
}
