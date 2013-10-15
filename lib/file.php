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
	protected $sharing;
	
	public function __construct($fileId){
		if (!$fileId){
			throw new \Exception('No valid file has been passed');
		}

		$this->fileId = $fileId;
		
		//if you know how to get sharing info by fileId via API, 
		//please send me a link to video tutorial :/
		$this->sharing = $this->getSharingOps();
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
	
	public function isPublicShare(){
		foreach ($this->sharing as $share){
			if (
					$share['share_type'] == \OCP\Share::SHARE_TYPE_LINK 
					|| $share['share_type'] == \OCP\Share::SHARE_TYPE_EMAIL
				){
				return true;
			}
		}
		return false;
	}

	/**
	 * 
	 * @return string owner of the current file item
	 * @throws \Exception
	 */
	public function getOwnerViewAndPath(){
		if (!$this->owner || !$this->path){			
			$info = $this->getSharedFileOwnerAndPath();
			if (is_array($info) && count($info)){
				$owner = $info[0];
				$path = $info[1];
			} else {
				list($owner, $path) = $this->getLocalFileOwnerAndPath();
			}

			if (!$path){
				throw new \Exception($this->fileId . ' can not be resolved');
			}
			
			$this->path = $path;
			$this->owner = $owner;
		}
		
		$view = new View('/' . $this->owner);
		if (!$view->file_exists($this->path)){
			throw new \Exception($this->path . ' doesn\'t exist');
		}
		
		return array($view, $this->path);
	}

	public function getOwner(){
		if (!$this->owner){
			$this->getOwnerViewAndPath();
		}
		return $this->owner;
	}
	
	protected function getSharedFileOwnerAndPath(){
		$result = array();
		foreach ($this->sharing as $share){
			return array(
				$share['uid_owner'],
				$share['path']
			);
		}
		
		return $result;
	}
	
	
	protected function getLocalFileOwnerAndPath(){
		$fileInfo = \OC\Files\Cache\Cache::getById($this->fileId);
		$owner = \OCP\User::getUser();
		if (!$owner){
			throw new Exception('Guest users can\'t access local files. This one was probably unshared recently.');
		}

		return array ($owner, @$fileInfo[1]);
	}

	protected function getSharingOps(){
		
		$where  = 'AND `file_source`=?';
		$values = array($this->fileId);
		
		if (\OCP\User::isLoggedIn()){
			$where .= ' AND ((`share_type`=' . \OCP\Share::SHARE_TYPE_USER . ' AND `share_with`=?) OR  `share_type`=' . \OCP\Share::SHARE_TYPE_LINK . ')';
			$values[] = \OCP\User::getUser();
		} else {
			$where .= ' AND (`share_type`=' . \OCP\Share::SHARE_TYPE_LINK . ')';
		}
		
		$query = \OC_DB::prepare('SELECT `*PREFIX*share`.`id`, `item_type`, `*PREFIX*share`.`parent`, `uid_owner`, '
							.'`share_type`, `share_with`, `file_source`, `path`, `file_target`, '
							.'`permissions`, `expiration`, `storage`, `*PREFIX*filecache`.`parent` as `file_parent`, '
							.'`name`, `mtime`, `mimetype`, `mimepart`, `size`, `encrypted`, `etag`' 
							.'FROM `*PREFIX*share` INNER JOIN `*PREFIX*filecache` ON `file_source` = `*PREFIX*filecache`.`fileid` WHERE `item_type` = \'file\' ' . $where);
		$result = $query->execute($values);
		$shares = $result->fetchAll();
		
		$origins = array();
		if (is_array($shares)){
			foreach ($shares as $share){
				$origins[] = \OCP\Share::resolveReShare($share);
			}
		}
		return $origins;
	}
}
