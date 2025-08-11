<?php
/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

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

class FontService {
	private const INVALIDATE_FONT_LIST_CACHE_AFTER_SECONDS = 3600;
	/**
	 * @var \OCP\ICache
	 */
	private $cache;

	public function __construct(
		private IAppData $appData,
		ICacheFactory $cacheFactory,
		private IURLGenerator $url,
		private IConfig $config,
	) {
		$this->cache = $cacheFactory->createDistributed(Application::APPNAME);
	}

	/**
	 * @return ISimpleFolder
	 * @throws \OCP\Files\NotPermittedException
	 */
	private function getFontAppDataDir(): ISimpleFolder {
		try {
			return $this->appData->getFolder('fonts');
		} catch (NotFoundException) {
			return $this->appData->newFolder('fonts');
		}
	}

	/**
	 * @return ISimpleFolder
	 * @throws \OCP\Files\NotPermittedException
	 */
	private function getFontOverviewAppDataDir(): ISimpleFolder {
		try {
			return $this->appData->getFolder('font-overviews');
		} catch (NotFoundException) {
			return $this->appData->newFolder('font-overviews');
		}
	}

	/**
	 * Get the list of available font files
	 *
	 * @return array
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function getFontFiles(): array {
		$fontDir = $this->getFontAppDataDir();
		return $fontDir->getDirectoryListing();
	}

	/**
	 * Get the list of available font file names
	 *
	 * @return array
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function getFontFileNames(): array {
		$cacheKey = 'fontFileNames';
		$cachedNames = $this->cache->get($cacheKey);
		if ($cachedNames === null) {
			$files = $this->getFontFiles();
			$cachedNames = array_map(
				static fn (ISimpleFile $f) => $f->getName(),
				$files
			);
			$this->cache->set($cacheKey, $cachedNames, self::INVALIDATE_FONT_LIST_CACHE_AFTER_SECONDS);
		}

		return $cachedNames;
	}

	/**
	 * Get the formatted list of available fonts
	 *
	 * @param array $fontFiles
	 * @return array
	 */
	public function getFontList(array $fontFiles): array {
		$url = $this->url;
		$list = array_map(
			static fn (ISimpleFile $f) => [
				'uri' => $url->linkToRouteAbsolute(Application::APPNAME . '.settings.getFontFile', ['name' => $f->getName()]),
				'stamp' => $f->getETag(),
			],
			$fontFiles
		);

		$instanceName = $this->config->getAppValue('theming', 'name');
		return [
			'kind' => 'fontconfiguration',
			'server' => $instanceName . ' (' . $this->url->getBaseUrl() . ')',
			'fonts' => $list,
		];
	}

	/**
	 * @param string $fileName
	 * @param $newFileResource
	 * @return array
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function uploadFontFile(string $fileName, $newFileResource): array {
		$fontDir = $this->getFontAppDataDir();
		$newFile = $fontDir->newFile($fileName, $newFileResource);
		$this->generateFontOverview($newFile);
		$this->cache->remove('fontFileNames');
		return [
			'size' => $newFile->getSize(),
		];
	}

	/**
	 * @param string $fileName
	 * @return ISimpleFile
	 * @throws NotFoundException
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function getFontFile(string $fileName): ISimpleFile {
		$fontDir = $this->getFontAppDataDir();
		return $fontDir->getFile($fileName);
	}

	/**
	 * @param string $fileName
	 * @return string
	 * @throws NotFoundException
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function getFontFileOverview(string $fileName): string {
		$fontDir = $this->getFontOverviewAppDataDir();
		return $fontDir->getFile($fileName . '.png')->getContent();
	}

	/**
	 * @param string $fileName
	 * @return void
	 * @throws NotFoundException
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function deleteFontFile(string $fileName): void {
		$fontDir = $this->getFontAppDataDir();
		if ($fontDir->fileExists($fileName)) {
			$fontDir->getFile($fileName)->delete();
		}

		$overviewDir = $this->getFontOverviewAppDataDir();
		if ($overviewDir->fileExists($fileName . '.png')) {
			$overviewDir->getFile($fileName . '.png')->delete();
		}

		$this->cache->remove('fontFileNames');
	}

	/**
	 * @param ISimpleFile $fontFile
	 * @return void
	 */
	private function generateFontOverview(ISimpleFile $fontFile): void {
		try {
			$color = [0, 0, 0];
			$text = 'Lorem ipsum';

			// we need a temp file because imagettftext can't read the font file from a resource
			// but just a file path
			$tmpFontFile = tmpfile();
			$tmpFontFilePath = stream_get_meta_data($tmpFontFile)['uri'];
			fwrite($tmpFontFile, $fontFile->getContent());
			fflush($tmpFontFile);

			$im = imagecreatetruecolor(250, 30);
			$bg_color = imagecolorallocate($im, 255, 255, 255);
			$font_color = imagecolorallocate($im, $color[0], $color[1], $color[2]);
			imagefilledrectangle($im, 0, 0, 399, 29, $bg_color);
			$ttfResult = imagettftext($im, 20, 0, 0, 22, $font_color, $tmpFontFilePath, $text);
			// this happens with invalid ttf fonts
			if ($ttfResult === false) {
				return;
			}

			$overviewDir = $this->getFontOverviewAppDataDir();
			$imageFileResource = $overviewDir->newFile($fontFile->getName() . '.png')->write();
			if (is_resource($imageFileResource)) {
				imagepng($im, $imageFileResource);
				imagedestroy($im);
			}
		} catch (\Exception|\Throwable) {
			// do nothing if there was any kind of error during overview generation
			// the /apps/richdocuments/settings/fonts/FILE_NAME/overview request will fail with 404
			// in the UI and display a fallback message
		}
	}

	/**
	 * @throws Exception
	 */
	public function installDefaultFonts(): void {
		$dirPath = __DIR__ . '/../../fonts';

		if (!is_dir($dirPath)) {
			throw new Exception("Directory \"$dirPath\" does not exist!");
		}

		$handle = opendir($dirPath);

		if (!$handle) {
			throw new Exception("Failed opening directory \"$dirPath\"!");
		}

		while (false !== ($fileName = readdir($handle))) {
			if (\str_starts_with($fileName, '.') || \str_ends_with($fileName, '.txt')) {
				continue;
			}

			$filePath = $dirPath . '/' . $fileName;

			if (!is_file($filePath)) {
				continue;
			}

			$fileHandle = fopen($filePath, 'r');

			if (!$fileHandle) {
				continue;
			}

			$this->uploadFontFile($fileName, $fileHandle);
		}
	}
}
