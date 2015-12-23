<?php
/**
 * ownCloud - Richdocuments App
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

namespace OCA\Richdocuments;

use \OC\Files\View;

class File {
	protected $fileId;
	protected $owner;
	protected $sharing;
	protected $token;
	protected $passwordProtected = false;
	protected $ownerView;
	protected $ownerViewFiles;
	protected $path;
	protected $pathFiles;

	public function __construct($fileId, $shareOps = null, $token = ''){
		if (!$fileId){
			throw new \Exception('No valid file has been passed');
		}

		$this->fileId = $fileId;
		$this->sharing = $shareOps;
		$this->token = $token;
		
		if ($this->isPublicShare()) {
			if (isset($this->sharing['uid_owner'])){
				$this->owner = $this->sharing['uid_owner'];
				if (!\OC::$server->getUserManager()->userExists($this->sharing['uid_owner'])) {
					throw new \Exception('Share owner' . $this->sharing['uid_owner'] . ' does not exist ');
				}

				\OC_Util::tearDownFS();
				\OC_Util::setupFS($this->sharing['uid_owner']);
			} else {
				throw new \Exception($this->fileId . ' is a broken share');
			}
		} else {
			$this->owner = \OC::$server->getUserSession()->getUser()->getUID();
		}
		$this->initViews();
	}
	
	
	public static function getByShareToken($token){
		$linkItem = \OCP\Share::getShareByToken($token, false);
		if (is_array($linkItem) && isset($linkItem['uid_owner'])) {
			// seems to be a valid share
			$rootLinkItem = \OCP\Share::resolveReShare($linkItem);
		} else {
			throw new \Exception('This file was probably unshared');
		}
		
		$file = new File($rootLinkItem['file_source'], $rootLinkItem, $token);
		
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
	
	public function getOwner(){
		return $this->owner;
	}
	
	public function getOwnerView($relativeToFiles = false){
		return $relativeToFiles ? $this->ownerViewFiles : $this->ownerView;
	}
	
	public function getPath($relativeToFiles = false){
		return $relativeToFiles ? $this->pathFiles : $this->path;
	}
	
	public function getPermissions(){
		$fileInfo = $this->ownerView->getFileInfo($this->path);
		return $fileInfo->getPermissions();
	}
	
	protected function initViews(){
		$this->ownerView = new View('/' . $this->owner);
		$this->ownerViewFiles = new View('/' . $this->owner . '/files');
		$this->path = $this->ownerView->getPath($this->fileId);
		$this->pathFiles = $this->ownerViewFiles->getPath($this->fileId);
		
		if (!$this->path || !$this->pathFiles) {
			throw new \Exception($this->fileId . ' can not be resolved');
		}
		
		if (!$this->ownerView->file_exists($this->path)) {
			throw new \Exception($this->path . ' doesn\'t exist');
		}
		
		if (!$this->ownerViewFiles->file_exists($this->pathFiles)) {
			throw new \Exception($this->pathFiles . ' doesn\'t exist');
		}
		
		if (!$this->ownerView->is_file($this->path)){
			throw new \Exception('Object ' . $this->path . ' is not a file.');
		}
		//TODO check if it is a valid odt
		
		$mimetype = $this->ownerView->getMimeType($this->path);
		if (!Filter::isSupportedMimetype($mimetype)){
			throw new \Exception( $this->path . ' is ' . $mimetype . ' and is not supported by RichDocuments app');
		}
	}
	
	protected function getPassword(){
		return $this->sharing['share_with'];
	}
}
