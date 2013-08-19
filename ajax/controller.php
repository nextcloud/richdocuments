<?php

/**
 * ownCloud - Office App
 *
 * @author Victor Dubiniuk
 * @copyright 2013 Victor Dubiniuk victor.dubiniuk@gmail.com
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 */

namespace OCA\Office;

class Controller {

	/**
	 * Process partial/complete file download
	 * @param array $args - array containing session id as anelement with a key es_id 
	 */
	public static function serve($args){
		self::preDispatch(false);

		$session = Session::getSession(@$args['es_id']);
		$filename = isset($session['genesis_url']) ? $session['genesis_url'] : '';
		$officeView = View::initOfficeView($session['owner']);
		$download = new Download($officeView, $filename);
		$download->sendResponse();
	}

	public static function startSession($args){
		$uid = self::preDispatch();
		try{
			$path = @$_POST['path'];
			if (!$path){
				throw new \Exception('No file has been passed');
			}

			
			$info = \OC\Files\Filesystem::getFileInfo($path);
			if (!$info){
						// Is it shared?
			}
			$fileId =  $info['fileid'];
			$officeView = View::initOfficeView($uid);
			
			$genesisPath = View::storeDocument($uid, $path);

			if (!$genesisPath){
				throw new \Exception('Unable to copy document. Check permissions and make sure you have enought free space.');
			}

			$session = Session::getSessionByFileId($fileId);
			if (!$session || empty($session)){
				$hash = View::getHashByGenesis($uid, $genesisPath);
				$session = Session::add($genesisPath, $hash, $fileId);
			}

			$session['member_id'] = (string) Member::add($session['es_id'], $uid, Helper::getRandomColor());
			\OCP\JSON::success($session);
			exit();
		} catch (\Exception $e){
			Helper::warnLog('Starting a session failed. Reason: '  . $e->getMessage());
			\OCP\JSON::error();
			exit();
		}
	}

	public static function joinSession($args){
		$esId = @$args['es_id'];
		$uid = self::preDispatch();
		try{
			if (!$esId){
				throw new \Exception('Session id is empty');
			}
			
			$session = Session::getSession($esId);
			if (!$session || empty($session)){
				throw new \Exception('Session doesn\'t exist');
			}
			
			$session['member_id'] = (string) Member::add($session['es_id'], $uid, Helper::getRandomColor());
			\OCP\JSON::success($session);
			exit();
		} catch (\Exception $e){
			Helper::warnLog('Joining a session failed. Reason:' . $e->getMessage());
			\OCP\JSON::error();
			exit();
		}
	}

	/**
	 * Store the document content to its origin
	 */
	public static function save(){
		$uid = self::preDispatch();
		$esId = @$_POST['es_id'];
		$memberId = @$_POST['member_id'];
		$content = @$_POST['content'];
		if ($esId && $content){
			$session = Session::getSession($esId);
			$fileInfo = \OC\Files\Cache\Cache::getById($session['file_id']);
			$path = $fileInfo[1];
			$view = new \OC\Files\View('/' . $session['owner']);

			$canWrite = ($view->file_exists($path) && $view->isUpdatable($path)) || $view->isCreatable($path);
			if ($canWrite){
				$view->file_put_contents($path, $content);
			} else {
				// TODO: report an error, broke a plate, burn a house, conquer the galaxy
			}
		}
	}

	public static function listSessions(){
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

	public static function sessionInfo(){
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

	public static function listSessionsHtml(){
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

		$tmpl = new \OCP\Template('office', 'part.sessions', '');
		$tmpl->assign('invites', $invites);
		$tmpl->assign('sessions', $sessions);
		echo $tmpl->fetchPage();
	}

	/**
	 * Do security precheck
	 * @param bool callcheck - whether security token check is needed
	 * @return string userId of the currently logged in user
	 */
	protected static function preDispatch($callcheck = true){
		if ($callcheck){
			\OCP\JSON::callCheck();
		}
		\OCP\JSON::checkLoggedIn();
		return \OCP\User::getUser();
	}

}
