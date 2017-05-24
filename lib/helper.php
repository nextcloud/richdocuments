<?php
/**
 * ownCloud - Richdocuments App
 *
 * @author Victor Dubiniuk
 * @copyright 2013 Victor Dubiniuk victor.dubiniuk@gmail.com
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 */

namespace OCA\Richdocuments;

class Helper {
	const APP_ID = 'richdocuments';

	/**
	 * @param string $fileId
	 * @return array
	 * @throws \Exception
	 */
	public static function parseFileId($fileId) {
		$arr = explode('_', $fileId);
		if (count($arr) === 1) {
			$fileId = $arr[0];
			$instanceId = '';
			$version = '0';
		} else if (count($arr) === 2) {
			list($fileId, $instanceId) = $arr;
			$version = '0';
		} else if (count($arr) === 3) {
			list($fileId, $instanceId, $version) = $arr;
		} else {
			throw new \Exception('$fileId has not the expected format');
		}

		return [
			$fileId,
			$instanceId,
			$version,
		];
	}


	public static function getNewFileName($view, $path, $prepend = ' '){
		$fileNum = 1;

		while ($view->file_exists($path)){
			$fileNum += 1;
			$path = preg_replace('/(\.|' . $prepend . '\(\d+\)\.)([^.]*)$/', $prepend . '(' . $fileNum . ').$2', $path);
		};

		return $path;
	}
}
