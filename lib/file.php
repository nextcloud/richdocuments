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

use \OC\Files\View;

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
		$this->sharing = $shareOps;
	}
	
	
	public static function getByShareToken($token){
		$linkItem = \OCP\Share::getShareByToken($token, false);
		if (is_array($linkItem) && isset($linkItem['uid_owner'])) {
			// seems to be a valid share
			$rootLinkItem = \OCP\Share::resolveReShare($linkItem);
		} else {
			throw new \Exception('This file was probably unshared');
		}
		
		$file = new File($rootLinkItem['file_source'], $rootLinkItem);
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

	/**
	 * @param string $password
	 * @return boolean
	 */
	public function checkPassword($password){
		$shareId  = $this->sharing['id'];
		if (!$this->isPasswordProtected()
			|| (\OC::$server->getSession()->exists('public_link_authenticated')
				&& \OC::$server->getSession()->get('public_link_authenticated') === $shareId
			)
		){
			return true;
		}
		
		// Check Password
		$newHash = '';
		if(\OC::$server->getHasher()->verify($password, $this->getPassword(), $newHash)) {
			\OC::$server->getSession()->set('public_link_authenticated', $shareId);

			/**
			 * FIXME: Migrate old hashes to new hash format
			 * Due to the fact that there is no reasonable functionality to update the password
			 * of an existing share no migration is yet performed there.
			 * The only possibility is to update the existing share which will result in a new
			 * share ID and is a major hack.
			 *
			 * In the future the migration should be performed once there is a proper method
			 * to update the share's password. (for example `$share->updatePassword($password)`
			 *
			 * @link https://github.com/owncloud/core/issues/10671
			 */
			if(!empty($newHash)) {

			}

			return true;
		}
		return false;
	}
	
	/**
	 * @param boolean $value
	 */
	public function setPasswordProtected($value){
		$this->passwordProtected = $value;
	}
	

	/**
	 * 
	 * @return string owner of the current file item
	 * @throws \Exception
	 */
	public function getOwnerViewAndPath($useDefaultRoot = false){
		if ($this->isPublicShare()){
			if (isset($this->sharing['uid_owner'])){
				$owner = $this->sharing['uid_owner'];
				\OCP\JSON::checkUserExists($this->sharing['uid_owner']);
				\OC_Util::tearDownFS();
				\OC_Util::setupFS($this->sharing['uid_owner']);
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
		return $this->sharing['share_with'];
	}
}
