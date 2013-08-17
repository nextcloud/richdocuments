<?php
/**
 * ownCloud - Office App
 *
 * @author Victor Dubiniuk
 * @copyright 2013 Victor Dubiniuk victor.dubiniuk@gmail.com
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 */

namespace OCA\Office;

class View extends \OC\Files\View{
	const OFFICE_DIRNAME='/office';
	protected static $officeView;
	
	public static function initOfficeView($uid){
		$view = new \OC\Files\View('/' . $uid);
		if (!$view->is_dir(self::OFFICE_DIRNAME)) {
			$view->mkdir(self::OFFICE_DIRNAME);
		}
		
		//if (!self::$officeView){
		//	self::$officeView = new \OC\Files\View('/' . $uid . self::OFFICE_DIRNAME);
		//}
		
		// it was a bad idea to use a static method.
		// to be changed later
		return new \OC\Files\View('/' . $uid . self::OFFICE_DIRNAME);
	}
	
	public static function storeDocument($uid, $fileid){
		$proxyStatus = \OC_FileProxy::$enabled;
		\OC_FileProxy::$enabled = false;
		
		$path = \OC\Files\Cache\Cache::getById($fileid);
		if (is_null($path)){
			// No longer exists
		} else {
			$path = $path[1];
		}
		
		$view = new \OC\Files\View('/' . $uid);
		$newName = '/' . sha1($view->file_get_contents($path)) . '.odt';

		$view->copy( $path, self::OFFICE_DIRNAME . $newName);
		\OC_FileProxy::$enabled = $proxyStatus;
		return $newName;
	}
	
	public static function getHashByGenesis($uid, $genesisPath){
		$officeView = self::initOfficeView($uid);
		return sha1($officeView->file_get_contents($genesisPath));
	}
}
