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

class Genesis {
	
	const DOCUMENTS_DIRNAME='/documents';
	
	protected $view;
	
	protected $path;
	
	protected $hash;
	
	
	/**
	 * Create new genesis document
	 * @param File $file 
	 * */	
	public function __construct(File $file){
		list($view, $path) = $file->getOwnerViewAndPath();
		$owner = $file->getOwner();
		
		$this->view = new View('/' . $owner);
		
		if (!$this->view->file_exists(self::DOCUMENTS_DIRNAME)){
			$this->view->mkdir(self::DOCUMENTS_DIRNAME );
		}
		
		$this->hash = $this->getDocumentHash($view, $path);
		$this->path = self::DOCUMENTS_DIRNAME . '/' . $this->hash . '.odt';
		if (!$this->view->file_exists($this->path)){
			//copy new genesis to /user/documents/{hash}.odt
			// get decrypted content
			$content = $view->file_get_contents($path);
			$mimetype = $view->getMimeType($path);
			
			$data = Filter::read($content, $mimetype);
			$this->view->file_put_contents($this->path, $data['content']);
		}
		
		try {
			$this->validate($this->view, $this->path);
		} catch (\Exception $e){
			throw new \Exception('Failed to copy genesis');
		}
	}
	
	public function getPath(){
		return $this->path;
	}
	
	public function getHash(){
		return $this->hash;
	}
	
	public static function getHashByPath($path){
		return preg_replace('|([a-zA-Z0-9])*\..*$|', '\1', $path);
	}
	
	protected function getDocumentHash($view, $path){
		$this->validate($view, $path);
		$hash = sha1($view->file_get_contents($path));
		return $hash;
	}
	
	/**
	 * Check if genesis is valid
	 * @param \OC\Files\View $view 
	 * @param string $path relative to the view
	 * @throws \Exception
	 */
	protected function validate($view, $path){
		if (!$view->file_exists($path)){
			throw new \Exception('Document not found ' . $path);
		}
		if (!$view->is_file($path)){
			throw new \Exception('Object ' . $path . ' is not a file.');
		}
		//TODO check if it is a valid odt
	}

}
