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
 * You should have received a copy of the GNU Affero General Public
 * License along with this library.  If not, see <http://www.gnu.org/licenses/>.
 * 
 */


namespace OCA\Documents;

class File {
	protected $fileId;
	protected $owner;
	protected $path;
	protected $sharing;
	protected $token ='';
	protected $passwordProtected = false;


	public function __construct($fileId, $shareOps = null){
		if (!$fileId){
			throw new \Exception('No valid file has been passed');
		}

		$this->fileId = $fileId;
		
		//if you know how to get sharing info by fileId via API, 
		//please send me a link to video tutorial :/
		if (!is_null($shareOps)){
			$this->sharing = $shareOps;
		} else {
			$this->sharing = $this->getSharingOps();
		}
	}
	
	
	public static function getByShareToken($token){
		$linkItem = \OCP\Share::getShareByToken($token, false);
		if (is_array($linkItem) && isset($linkItem['uid_owner'])) {
			// seems to be a valid share
			$rootLinkItem = \OCP\Share::resolveReShare($linkItem);
		} else {
			throw new \Exception('This file was probably unshared');
		}
		
		$file = new File($rootLinkItem['file_source'], array($rootLinkItem));
		$file->setToken($token);
		
		if (isset($linkItem['share_with']) && !empty($linkItem['share_with'])){
			$file->setPasswordProtected(true);
		}
		
		return $file;
	}

	public function getToken(){
		return $this->token;
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
	
	public function setToken($token){
		$this->token = $token;
	}
	
	public function isPublicShare(){
		return  !empty($this->token);
	}
	
	public function isPasswordProtected(){
		return $this->passwordProtected;
	}
	
	public function checkPassword($password){
		$shareId  = $this->getShareId();
		if (!$this->isPasswordProtected()
			|| (\OC::$server->getSession()->exists('public_link_authenticated')
				&& \OC::$server->getSession()->get('public_link_authenticated') === $shareId
			)
		){
				return true;
		}
		
		// Check Password
		$forcePortable = (CRYPT_BLOWFISH != 1);
		$hasher = new \PasswordHash(8, $forcePortable);
		if ($hasher->CheckPassword($password.\OC_Config::getValue('passwordsalt', ''),
									 $this->getPassword())) {
			// Save item id in session for future request
			\OC::$server->getSession()->set('public_link_authenticated', $shareId);
			return true;
		}
		return false;
	}
	
	public function setPasswordProtected($value){
		$this->passwordProtected = $value;
	}
	
	public function getPermissions(){
		if (count($this->sharing)){
			if ($this->isPublicShare()){
				$permissions = \OCP\PERMISSION_READ | \OCP\PERMISSION_UPDATE;
			} else {
				$permissions = $this->sharing[0]['permissions'];
			}
		} else {
			list($owner, $path) = $this->getOwnerViewAndPath();
			$permissions = 0;
			if (\OC\Files\Filesystem::isReadable($path)){
				$permissions |= \OCP\PERMISSION_READ;
			}
			if (\OC\Files\Filesystem::isUpdatable($path)){
				$permissions |= \OCP\PERMISSION_UPDATE;
			}
				
		}
		return $permissions;
	}


	/**
	 * 
	 * @return string owner of the current file item
	 * @throws \Exception
	 */
	public function getOwnerViewAndPath($useDefaultRoot = false){
		if ($this->isPublicShare()){
			$rootLinkItem = \OCP\Share::resolveReShare($this->sharing[0]);
			if (isset($rootLinkItem['uid_owner'])){
				$owner = $rootLinkItem['uid_owner'];
				\OCP\JSON::checkUserExists($rootLinkItem['uid_owner']);
				\OC_Util::tearDownFS();
				\OC_Util::setupFS($rootLinkItem['uid_owner']);
			} else {
				throw new \Exception($this->fileId . ' is a broken share');
			}
			$view = new View('/' . $owner . '/files');
		} else {
			$owner = \OCP\User::getUser();
			$root = '/' . $owner;
			if ($useDefaultRoot){
				$root .= '/' . 'files';
			}
			$view = new View($root);
		}
			
		$path = $view->getPath($this->fileId);
		if (!$path){
			throw new \Exception($this->fileId . ' can not be resolved');
		}
		$this->path = $path;
		$this->owner = $owner;
		
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
	
	
	protected function getPassword(){
		return $this->sharing[0]['share_with'];
	}
	
	protected function getShareId(){
		return $this->sharing[0]['id'];
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
							.'`*PREFIX*share`.`permissions`, `expiration`, `storage`, `*PREFIX*filecache`.`parent` as `file_parent`, '
							.'`name`, `mtime`, `mimetype`, `mimepart`, `size`, `encrypted`, `etag`' 
							.'FROM `*PREFIX*share` INNER JOIN `*PREFIX*filecache` ON `file_source` = `*PREFIX*filecache`.`fileid` WHERE `item_type` = \'file\' ' . $where);
		$result = $query->execute($values);
		$shares = $result->fetchAll();
		
		$origins = array();
		if (is_array($shares)){
			foreach ($shares as $share){
				$origin = \OCP\Share::resolveReShare($share);
				if (!isset($origin['path']) && isset($origin['file_target'])){
					$origin['path'] = 'files/' . $origin['file_target'];
				}
				$origins[] = $origin;
			}
		}
		return $origins;
	}
}
