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
	
	public function __construct($fileId){
		if (!$fileId){
			throw new \Exception('No valid file has been passed');
		}

		$this->fileId = $fileId;
	}
	
	/**
	 * 
	 * @return string owner of the current file item
	 * @throws \Exception
	 */
	public function getOwnerViewAndPath(){
		$fileInfo = \OC\Files\Cache\Cache::getById($this->fileId);

		//is it shared 
		$sharedInfo = \OCP\Share::getItemSharedWithBySource(
					'file', 
					$this->fileId,
					\OCP\Share::FORMAT_NONE,
					null,
					true
		);

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
		
		if (!$view->file_exists($path)){
			throw new \Exception($path . ' doesn\'t exist');
		}
		
		return array($view, $path);
	}
	
	public function getOwner(){
		$fileInfo = \OC\Files\Cache\Cache::getById($this->fileId);

		//is it shared 
		$sharedInfo = \OCP\Share::getItemSharedWithBySource(
					'file', 
					$this->fileId,
					\OCP\Share::FORMAT_NONE,
					null,
					true
		);

		if (is_array($sharedInfo)){
			$owner = $sharedInfo['uid_owner'];
		} else {
			// owner is myself
			$owner = \OCP\User::getUser();
		}
		
		return $owner;
	}
	
}