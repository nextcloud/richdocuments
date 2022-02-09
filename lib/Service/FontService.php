<?php
/**
 * @copyright Copyright (c) 2022 Julien Veyssier <eneiluj@posteo.net>
 *
 * @author Julien Veyssier <eneiluj@posteo.net>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Richdocuments\Service;


use OCP\Files\IAppData;
use OCP\Files\NotFoundException;
use OCP\Files\SimpleFS\ISimpleFile;
use OCP\Files\SimpleFS\ISimpleFolder;

class FontService {

	/**
	 * @var IAppData
	 */
	private $appData;

	public function __construct(IAppData $appData) {
		$this->appData = $appData;
	}

	private function getFontAppDataDir(): ISimpleFolder {
		try {
			return $this->appData->getFolder('fonts');
		} catch (NotFoundException $e) {
			return $this->appData->newFolder('fonts');
		}
	}

	/**
	 * Get the list of available font files
	 *
	 */
	public function getFontFileNames(): array {
		$fontDir = $this->getFontAppDataDir();
		return array_map(
			function (ISimpleFile $f) use ($fontDir) {
				return $f->getName();
			},
			$fontDir->getDirectoryListing()
		);
	}

	public function uploadFontFile(string $fileName, $newFileResource): array {
		$fontDir = $this->getFontAppDataDir();
		$newFile = $fontDir->newFile($fileName, $newFileResource);
		return [
			'size' => $newFile->getSize(),
		];
	}

	public function getFontFile(string $fileName): string {
		$fontDir = $this->getFontAppDataDir();
		return $fontDir->getFile($fileName)->getContent();
	}

	public function deleteFontFile(string $fileName): void {
		$fontDir = $this->getFontAppDataDir();
		if ($fontDir->fileExists($fileName)) {
			$fontDir->getFile($fileName)->delete();
		}
	}
}
