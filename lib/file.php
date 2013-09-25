<?php
/**
 * ownCloud - Documents App
 *
 * @author Victor Dubiniuk
 * @copyright 2013 Victor Dubiniuk victor.dubiniuk@gmail.com
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
 * License as published by the Free Software Foundation; either 
 * version 3 of the License, or any later version.
 * 
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU AFFERO GENERAL PUBLIC LICENSE for more details.
 *  
 * You should have received a copy of the GNU Lesser General Public 
 * License along with this library.  If not, see <http://www.gnu.org/licenses/>.
 * 
 */


namespace OCA\Documents;

class File {
	protected $fileId;
	protected $owner;
	protected $path;
	
	public function __construct($fileId){
		if (!$fileId){
			throw new \Exception('No valid file has been passed');
		}

		$this->fileId = $fileId;
	}
	
	public static function getByShareToken($token){
		$linkItem = \OCP\Share::getShareByToken($token);
		if (is_array($linkItem) && isset($linkItem['uid_owner'])) {
			// seems to be a valid share
			$rootLinkItem = \OCP\Share::resolveReShare($linkItem);
			$fileOwner = $rootLinkItem['uid_owner'];
		} else {
			throw new \Exception('This file was probably unshared');
		}
		
		$file = new File($rootLinkItem['file_source']);
		$file->setOwner($rootLinkItem['uid_owner']);
		$file->setPath('/files' . $rootLinkItem['file_target']);
		
		return $file;
	}

	public function getFileId(){
		return $this->fileId;
	}
	
	public function setOwner($owner){
		$this->owner = $owner;
	}
	
	public function setPath($path){
		$this->path = $path;
	}

	/**
	 * 
	 * @return string owner of the current file item
	 * @throws \Exception
	 */
	public function getOwnerViewAndPath(){
		if (!$this->owner || !$this->path){
			$fileInfo = \OC\Files\Cache\Cache::getById($this->fileId);

			//is it shared 
			$sharedInfo = $this->getSharedBySource();
		
			if (is_array($sharedInfo)){
				$owner = $sharedInfo['uid_owner'];
				$path = $sharedInfo['path'];
			} else {
				// owner is myself
				$owner = \OCP\User::getUser();
				$path = @$fileInfo[1];
			}

			if (!$path){
				throw new \Exception($this->fileId . ' can not be resolved');
			}
		
			$view = new View('/' . $owner);
			
			$this->owner = $owner;
		} else {
			$view = new View('/' . $this->owner);
			$path = $this->path;
		}
		
		if (!$view->file_exists($path)){
			throw new \Exception($path . ' doesn\'t exist');
		}
		
		return array($view, $path);
	}
	
	public function getOwner(){
		if (!$this->owner){

			$fileInfo = \OC\Files\Cache\Cache::getById($this->fileId);

			//is it shared 
			$sharedInfo = $this->getSharedBySource();
			if (!is_array($sharedInfo)){
				$sharedInfo = $this->getSharedByLink();
			}
		
			if (is_array($sharedInfo)){
				$this->owner = $sharedInfo['uid_owner'];
			} else {
				// owner is myself
				$this->owner = \OCP\User::getUser();
			}
		}
		return $this->owner;
	}

	protected function getSharedBySource(){
		return \OCP\Share::getItemSharedWithBySource(
					'file', 
					$this->fileId,
					\OCP\Share::FORMAT_NONE,
					null,
					true
		);
	}
	
}