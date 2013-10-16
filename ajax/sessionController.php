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
	
	public static function joinAsGuest($args){
		$uid = self::preDispatchGuest();
		$uid = substr(@$_POST['name'], 0, 16) .' '. $uid;
		$token = @$args['token'];
		$file = File::getByShareToken($token);
		self::join($uid, $file);
	}

	public static function joinAsUser($args){
		$uid = self::preDispatch();
		$fileId = intval(@$args['file_id']);
		$file = new File($fileId);
		self::join($uid, $file);
	}
	
	protected static function join($uid, $file){
		try{
			$session = Db_Session::start($uid, $file);
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
		try {
			$esId = @$_SERVER['HTTP_WEBODF_SESSION_ID'];
			if (!$esId){
				throw new \Exception('Session id can not be empty');
			}
			
			$memberId = @$_SERVER['HTTP_WEBODF_MEMBER_ID'];
			$sessionRevision = @$_SERVER['HTTP_WEBODF_SESSION_REVISION'];
			
			$content = fopen('php://input','r');
			if (!$content){
				throw new \Exception('New conent missing');
			}
			
			$session = new Db_Session();
			$session->load($esId);
			
			if (!$session->hasData()){
				throw new \Exception('Session does not exist');
			}
			$sessionData = $session->getData();
			$file = new File($sessionData['file_id']);
			if (!$file->isPublicShare()){
				self::preDispatch();
			} else {
				self::preDispatchGuest();
			}
			
			
			list($view, $path) = $file->getOwnerViewAndPath();

			$isWritable = ($view->file_exists($path) && $view->isUpdatable($path)) || $view->isCreatable($path);
			if (!$isWritable){
				throw new \Exception($path . ' does not exist or is not writable for user ' . $uid);
			}
			
			if ($view->file_exists($path)){
				$currentHash = sha1($view->file_get_contents($path));
				if ($currentHash !== $sessionData['genesis_hash']){
					// Original file was modified externally. Save to a new one
					$path = Helper::getNewFileName($view, $path, '-conflict');
				}
			}
			
			if ($view->file_put_contents($path, $content)){
				//Document saved successfully. Cleaning session data
				// temporary workaround for https://github.com/owncloud/documents/issues/63
				//Db_Session::cleanUp($esId);
				$view->touch($path);
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
			$session = new Db_Session();
			$info = $session->getInfoByFileId($items);
		}

		\OCP\JSON::success(array(
			"info" => $info
		));
	}
	
	public static function listAll(){
		self::preDispatch();
		$session = new Db_Session();
		$sessions = $session->getCollection();

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
		$session = new Db_Session();
		$sessions = $session->getCollection();

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
