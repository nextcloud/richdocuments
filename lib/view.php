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
	
}
