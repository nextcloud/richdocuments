<?php

/**
 * ownCloud - Richdocuments App
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


namespace OCA\Richdocuments;

class Storage {
	public static $MIMETYPE_LIBREOFFICE_WORDPROCESSOR = array(
		'application/vnd.oasis.opendocument.text',
		'application/vnd.oasis.opendocument.presentation',
		'application/vnd.oasis.opendocument.spreadsheet',
		'application/vnd.oasis.opendocument.graphics',
		'application/vnd.lotus-wordpro',
		'image/svg+xml',
		'application/vnd.visio',
		'application/vnd.wordperfect',
		'application/msonenote',
		'application/msword',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
		'application/vnd.ms-word.document.macroEnabled.12',
		'application/vnd.ms-word.template.macroEnabled.12',
		'application/vnd.ms-excel',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
		'application/vnd.ms-excel.sheet.macroEnabled.12',
		'application/vnd.ms-excel.template.macroEnabled.12',
		'application/vnd.ms-excel.addin.macroEnabled.12',
		'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
		'application/vnd.ms-powerpoint',
		'application/vnd.openxmlformats-officedocument.presentationml.presentation',
		'application/vnd.openxmlformats-officedocument.presentationml.template',
		'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
		'application/vnd.ms-powerpoint.addin.macroEnabled.12',
		'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
		'application/vnd.ms-powerpoint.template.macroEnabled.12',
		'application/vnd.ms-powerpoint.slideshow.macroEnabled.12'
	);

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

	public static function getDocumentById($fileId){
		$root = \OC::$server->getUserFolder();
		$ret = array();

		// If type of fileId is a string, then it
		// doesn't work for shared documents, lets cast to int everytime
		$document = $root->getById((int)$fileId)[0];
		if ($document === null){
			error_log('File with file id, ' . $fileId . ', not found');
			return $ret;
		}

		$ret['mimetype'] = $document->getMimeType();
		$ret['path'] = $root->getRelativePath($document->getPath());
		$ret['name'] = $document->getName();
		$ret['fileid'] = $fileId;

		return $ret;
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

	private static function processDocuments($rawDocuments){
		$documents = array();
		foreach($rawDocuments as $rawDocument){
			$document = array(
				'fileid' => $rawDocument->getId(),
				'path' => $rawDocument->getInternalPath(),
				'name' => $rawDocument->getName(),
				'mimetype' => $rawDocument->getMimetype()
				);

			array_push($documents, $document);
		}

		return $documents;
	}

	protected static function searchDocuments(){
		$documents = array();
		foreach (self::getSupportedMimetypes() as $mime){
			$rawDocuments = \OCP\Files::searchByMime($mime);
			$documents = array_merge($documents, self::processDocuments($rawDocuments));
		}

		return $documents;
	}

	public static function getSupportedMimetypes(){
		return array_merge(
			self::$MIMETYPE_LIBREOFFICE_WORDPROCESSOR,
			Filter::getAll()
		);
	}
}
