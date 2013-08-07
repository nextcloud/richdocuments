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
		
		if (!self::$officeView){
			self::$officeView = new \OC\Files\View('/' . $uid . self::OFFICE_DIRNAME);
		}
		
		return self::$officeView;
	}
	
	public static function storeDocument($uid, $path){
		$view = new \OC\Files\View('/' . $uid);
		
		$proxyStatus = \OC_FileProxy::$enabled;
		\OC_FileProxy::$enabled = false;
		$view->copy('/files' . $path, self::OFFICE_DIRNAME . $path);
		\OC_FileProxy::$enabled = $proxyStatus;
		return $path;
	}
}
