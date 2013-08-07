<?php

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
	
	public static function storeDocument($uid, $path){
		$proxyStatus = \OC_FileProxy::$enabled;
		\OC_FileProxy::$enabled = false;
		
		$newName = '/' . self::getHashByGenesis($uid, $path) . '.odt';
		$view = new \OC\Files\View('/' . $uid);
		$view->copy('/files' . $path, self::OFFICE_DIRNAME . $newName);
		\OC_FileProxy::$enabled = $proxyStatus;
		return $newName;
	}
	
	public static function getHashByGenesis($uid, $genesisPath){
		$officeView = self::initOfficeView($uid);
		return sha1($officeView->file_get_contents($genesisPath));
	}
}
