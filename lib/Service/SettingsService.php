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
use \OCP\Files\NotPermittedException;

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
	 * Delete a specific settings file from the type/category directory.
	 *
	 * @param string $type
	 * @param string $category
	 * @param string $name
	 */
	public function deleteSettingsFile(string $type, string $category, string $name): void {
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
			if (!$categoryFolder->fileExists($name)) {
				throw new NotFoundException("File '{$name}' not found in category '{$category}' for type '{$type}'.");
			}
			$categoryFolder->getFile($name)->delete();
		} catch (NotFoundException $e) {
			throw $e;
		} catch (NotPermittedException $e) {
			throw $e;
		}
	}

	// TODO: Handle installDefaultSystemFiles setting	

}
