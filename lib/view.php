<?php
/**
 * ownCloud - Documents App
 *
 * @author Victor Dubiniuk
 * @copyright 2013 Victor Dubiniuk victor.dubiniuk@gmail.com
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 */

namespace OCA\Documents;

class View extends \OC\Files\View{
	const DOCUMENTS_DIRNAME='/documents';
	protected static $documentsView;
	
	public static function initDocumentsView($uid){
		$view = new \OC\Files\View('/' . $uid);
		if (!$view->is_dir(self::DOCUMENTS_DIRNAME)) {
			$view->mkdir(self::DOCUMENTS_DIRNAME);
		}
		
		//if (!self::$documentsView){
		//	self::$documentsView = new \OC\Files\View('/' . $uid . self::DOCUMENTS_DIRNAME);
		//}
		
		// it was a bad idea to use a static method.
		// to be changed later
		return new \OC\Files\View('/' . $uid . self::DOCUMENTS_DIRNAME);
	}
	
	public static function storeDocument($uid, $filePath){
		$proxyStatus = \OC_FileProxy::$enabled;
		\OC_FileProxy::$enabled = false;
		
		$view = new \OC\Files\View('/' . $uid);
		
		if (!$view->file_exists($filePath)){
			throw new \Exception($filePath . ' doesn\'t exist');
		}
		
		if (!$view->is_file($filePath)){
			throw new \Exception('Object ' . $filePath . ' is not a file.');
		}
		
		$newName = '/' . sha1($view->file_get_contents($filePath)) . '.odt';

		$view->copy($filePath, self::DOCUMENTS_DIRNAME . $newName);
		\OC_FileProxy::$enabled = $proxyStatus;
		return $newName;
	}
	
	public static function getHashByGenesis($uid, $genesisPath){
		$documentsView = self::initDocumentsView($uid);
		return sha1($documentsView->file_get_contents($genesisPath));
	}
}
