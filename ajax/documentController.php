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

class DocumentController extends Controller{
	
	/**
	 * Process partial/complete file download
	 * @param array $args - array containing session id as anelement with a key es_id 
	 */
	public static function serve($args){
		self::preDispatch(false);

		$session = Session::getSession(@$args['es_id']);
		$filename = isset($session['genesis_url']) ? $session['genesis_url'] : '';
		$documentsView = View::initDocumentsView($session['owner']);
		$download = new Download($documentsView, $filename);
		$download->sendResponse();
	}

	/**
	 * lists the documents the user has access to (including shared files, once the code in core has been fixed)
	 * also adds session and member info for these files
	 */
	public static function listAll(){
		self::preDispatch();
		
		$documents = Storage::getDocuments();

		$fileIds = array();
		foreach ($documents as $document) {
			$fileIds[] = $document['fileid'];
		}

		$sessions = Session::getSessionsByFileIds($fileIds);

		$members = array();
		foreach ($sessions as $session) {
			$members[$session['es_id']] = Member::getMembersByEsId($session['es_id']);
		}

		\OCP\JSON::success(array('documents' => $documents,'sessions' => $sessions,'members' => $members));
	}
}