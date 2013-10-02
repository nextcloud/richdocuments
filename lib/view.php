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
	
	public function initDocumentsView(){
		if (!$this->is_dir(self::DOCUMENTS_DIRNAME)) {
			$this->mkdir(self::DOCUMENTS_DIRNAME);
		}
		
		return new \OC\Files\View( $this->getRoot() . self::DOCUMENTS_DIRNAME);
	}
	
	public function getFilePermissions($path){
		$permissions = 0;
		if ($this->isReadable($path)) {
			$permissions |= \OCP\PERMISSION_READ;
		}
		if ($this->isSharable($path)) {
			$permissions |= \OCP\PERMISSION_SHARE;
		}
		return $permissions;
	}

	public function storeDocument($ownerView, $filePath){
		$proxyStatus = \OC_FileProxy::$enabled;
		\OC_FileProxy::$enabled = false;
		
		if (!$ownerView->file_exists($filePath)){
			throw new \Exception($filePath . ' doesn\'t exist');
		}
		
		if (!$ownerView->is_file($filePath)){
			throw new \Exception('Object ' . $filePath . ' is not a file.');
		}
		
		$newName = '/' . sha1($ownerView->file_get_contents($filePath)) . '.odt';

		$ownerView->copy($filePath, self::DOCUMENTS_DIRNAME . $newName);
		if (!$ownerView->file_exists(self::DOCUMENTS_DIRNAME . $newName)){
			throw new \Exception('Failed to copy genesis');
		}
		
		\OC_FileProxy::$enabled = $proxyStatus;
		return $newName;
	}
	
	public function getHashByGenesis($genesisPath){
		return sha1($this->file_get_contents(self::DOCUMENTS_DIRNAME . $genesisPath));
	}
}
