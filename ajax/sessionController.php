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

class SessionController extends Controller{
	
	public static function join($args){
		$uid = self::preDispatch();
		$fileId = intval(@$args['file_id']);
		try{
			$path = Storage::getFilePath($fileId);
			$session = Session::getSessionByFileId($fileId);
			
			//If there is no existing session we need to start a new one
			if (!$session || empty($session)){

				$documentsView = View::initDocumentsView($uid);
				$genesisPath = View::storeDocument($uid, $path);

				if (!$genesisPath){
					throw new \Exception('Unable to copy document. Check permissions and make sure you have enought free space.');
				}

				$hash = View::getHashByGenesis($uid, $genesisPath);
				$session = Session::add($genesisPath, $hash, $fileId);
			}

			$session['permissions'] = \OCP\PERMISSION_READ;
			if (\OC\Files\Filesystem::isSharable($path)) {
				$session['permissions'] |= \OCP\PERMISSION_SHARE;
			}
			
			$session['member_id'] = (string) Member::add($session['es_id'], $uid, Helper::getRandomColor());
			\OCP\JSON::success($session);
			exit();
		} catch (\Exception $e){
			Helper::warnLog('Starting a session failed. Reason: ' . $e->getMessage());
			\OCP\JSON::error();
			exit();
		}
	}
	
	/**
	 * Store the document content to its origin
	 */
	public static function save(){
		$uid = self::preDispatch();
		try {
			$sessionID = @$_SERVER['HTTP_WEBODF_SESSION_ID'];
			if (!$sessionID){
				throw new \Exception('Session id can not be empty');
			}
			
			$memberId = @$_SERVER['HTTP_WEBODF_MEMBER_ID'];
			$sessionRevision = @$_SERVER['HTTP_WEBODF_SESSION_REVISION'];
			
			$content = fopen('php://input','r');
			if (!$content){
				throw new \Exception('New conent missing');
			}
			
			$session = Session::getSession($sessionID);
			if (!$session){
				throw new \Exception('Session does not exist');
			}
			
			$path = Storage::getFilePath($session['file_id']);
			$view = new \OC\Files\View('/' . $session['owner']);

			$isWritable = ($view->file_exists($path) && $view->isUpdatable($path)) || $view->isCreatable($path);
			if (!$isWritable){
				throw new \Exception('Document does not exist or is not writable for this user');
			}
			
			if ($view->file_exists($path)){
				$currentHash = sha1($view->file_get_contents($path));
				if ($currentHash !== $session['genesis_hash']){
					// Original file was modified externally. Save to a new one
					$path = Helper::getNewFileName($view, $path);
				}
			}
			
			if ($view->file_put_contents($path, $content)){
				//Document saved successfully. Cleaning session data
				Session::cleanUp($sessionID);
			}
			\OCP\JSON::success();
			exit();
		} catch (\Exception $e){
			Helper::warnLog('Saving failed. Reason:' . $e->getMessage());
			\OCP\JSON::error(array('message'=>$e->getMessage()));
			exit();
		}
	}
	
	public static function info(){
		self::preDispatch();
		$items = @$_POST['items'];
		$info = array();

		if (is_array($items)){
			$info = Session::getInfoByFileid($items);
		}

		\OCP\JSON::success(array(
			"info" => $info
		));
	}
	
	public static function listAll(){
		self::preDispatch();
		$sessions = Session::getAll();
		if (!is_array($sessions)){
			$sessions = array();
		}

		$preparedSessions = array_map(
				function($x){
					return ($x['es_id']);
				}, $sessions
		);
		\OCP\JSON::success(array(
			"session_list" => $preparedSessions
		));
	}

	public static function listAllHtml(){
		self::preDispatch();
		$sessions = Session::getAll();
		if (!is_array($sessions)){
			$sessions = array();
		}

		$preparedSessions = array_map(
				function($x){
					return ($x['es_id']);
				}, $sessions
		);

		$invites = Invite::getAllInvites();
		if (!is_array($invites)){
			$invites = array();
		}

		$tmpl = new \OCP\Template('documents', 'part.sessions', '');
		$tmpl->assign('invites', $invites);
		$tmpl->assign('sessions', $sessions);
		echo $tmpl->fetchPage();
	}

}
