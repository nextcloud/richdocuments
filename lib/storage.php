<?php

/**
 * ownCloud - Documents App
 *
 * @author Frank Karlitschek
 * @copyright 2013-2014 Frank Karlitschek frank@owncloud.org
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

class Storage {
	const MIMETYPE_LIBREOFFICE_WORDPROCESSOR = 'application/vnd.oasis.opendocument.text';

	public static function getDocuments() {
		$list = array_filter(
				self::searchDocuments(),
				function($item){
					//filter Deleted
					if (strpos($item['path'], '_trashbin')===0){
						return false;
					}
					return true;
				}
		);
		
		return $list;
	}
	
	public static function resolvePath($fileId){
		$list = array_filter(
				self::searchDocuments(),
				function($item) use ($fileId){
					return intval($item['fileid'])==$fileId;
				}
		);
		if (count($list)>0){
			$item = current($list);
			return $item['path'];
		}
		return false;
	}
	
	/**
	 * @brief Cleanup session data on removing the document
	 * @param array
	 *
	 * This function is connected to the delete signal of OC_Filesystem
	 * to delete the related info from database
	 */
	public static function onDelete($params) {
		$info = \OC\Files\Filesystem::getFileInfo($params['path']);
		
		$fileId = @$info['fileid'];
		if (!$fileId){
			return;
		}
		
		$session = new Db\Session();
		$session->loadBy('file_id', $fileId);

		if (!$session->getEsId()){
			return;
		}
		
		$member = new Db\Member();
		$sessionMembers = $member->getCollectionBy('es_id', $session->getEsId());
		foreach ($sessionMembers as $memberData){
			if (intval($memberData['status'])===Db\Member::MEMBER_STATUS_ACTIVE){
				return;
			}
		}
		
		Db\Session::cleanUp($session->getEsId());
	}
	
	protected static function searchDocuments(){
		$documents = array();
		foreach (self::getSupportedMimetypes() as $mime){
			$documents = array_merge($documents, \OCP\Files::searchByMime($mime));
		}
		return $documents;
	}
	
	public static function getSupportedMimetypes(){
		return array_merge(
			array(self::MIMETYPE_LIBREOFFICE_WORDPROCESSOR),
			Filter::getAll()	
		);
	}
}
