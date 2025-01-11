<?php

declare(strict_types=1);

namespace OCA\Richdocuments\Service;

use Exception;
use OCA\Richdocuments\AppInfo\Application;
use OCP\Files\IAppData;
use OCP\Files\NotFoundException;
use OCP\Files\SimpleFS\ISimpleFile;
use OCP\Files\SimpleFS\ISimpleFolder;
use OCA\Richdocuments\WOPI\SettingsUrl;
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

	// TODO: Implement file caching...

	/**
	 * Ensure the settings directory exists, if it doesn't exist then create it.
	 *
	 * @param SettingsUrl $settingsUrl
	 * @return ISimpleFolder
	 */

	public function ensureDirectory(SettingsUrl $settingsUrl): ISimpleFolder {
        $type = $settingsUrl->getType();
        $category = $settingsUrl->getCategory();

        try {
            $baseFolder = $this->appData->getFolder($type);
        } catch (NotFoundException $e) {
            $baseFolder = $this->appData->newFolder($type);
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
	 * @param resource $fileData
	 * @return array ['stamp' => string, 'uri' => string]
	 */

	public function uploadFile(SettingsUrl $settingsUrl, $fileData): array {
        $categoryFolder = $this->ensureDirectory($settingsUrl);
		$fileName = $settingsUrl->getFileName();
        $newFile = $categoryFolder->newFile($fileName, $fileData);
        $fileUri = $this->generateFileUri($settingsUrl->getType(), $settingsUrl->getCategory(), $fileName);

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
	 * @return array Each item has 'stamp' and 'uri'.
	 */
	public function getCategoryFileList(string $type, string $category): array {
        try {
            $categoryFolder = $this->appData->getFolder($type . '/' . $category);
        } catch (NotFoundException $e) {
            return [];
        }

        $files = $categoryFolder->getDirectoryListing();

        return array_map(function(ISimpleFile $file) use ($type, $category) {
            return [
                'stamp' => $file->getETag(),
                'uri' => $this->generateFileUri($type, $category, $file->getName()),
            ];
        }, $files);
    }

	/**
	 * generate setting config
	 *
	 * @param string $type
	 * @return array
	 */
	public function generateSettingsConfig(string $type): array {
		$kind = $type === 'userconfig' ? 'user' : 'shared';

        $config = [
            'kind' => $kind,
        ];

        $categories = $this->getAllCategories($type);

        foreach ($categories as $category) {
            $files = $this->getCategoryFileList($type, $category);
			$config[$category] = $files;
        }

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
            $directories = $this->appData->getFolder($type)->getFullDirectoryListing();
            foreach ($directories as $dir) {
                if ($dir instanceof ISimpleFolder) {
                    $categories[] = $dir->getName();
                }
            }
            return $categories;
        } catch (NotFoundException $e) {
            return [];
        }
    }

	/**
	 * Generate file URL.
	 *
	 * @param string $type
	 * @param string $category
	 * @param string $fileName
	 * @return string
	 */
	private function generateFileUri(string $type, string $category, string $fileName): string {
		return $this->urlGenerator->linkToRouteAbsolute(
			'richdocuments.settings.getSettingsFile',
			[
				'type' => $type,
				'category' => $category,
				'name' => $fileName,
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
     * Get the formatted list of system-settings files.
     *
     * @param array $systemFiles Array of ISimpleFile objects
     * @return array
     */
    public function getSystemFileList(array $systemFiles): array {
        $urlGenerator = $this->urlGenerator;
        $list = array_map(
            function (ISimpleFile $f) use ($urlGenerator) {
                return [
                    'uri' => $urlGenerator->linkToRouteAbsolute(
                        Application::APPNAME . '.settings.getSystemFile',
                        ['fileName' => $f->getName()]
                    ),
                    'stamp' => $f->getETag(),
                ];
            },
            $systemFiles
        );

        // Combine all ETags into a single ETag for the entire list
        $combinedEtag = md5(implode(',', array_map(fn(ISimpleFile $f) => $f->getETag(), $systemFiles)));

        return [
            'files' => $list,
            'etag' => $combinedEtag,
        ];
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
