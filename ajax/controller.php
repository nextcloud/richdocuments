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
	 * @param type $args - array containing session id as anelement with a key es_id 
	 */
	public static function serve($args){
		\OCP\JSON::checkLoggedIn();

		$session = Session::getSession(@$args['es_id']);
		$filename = isset($session['genesis_url']) ? $session['genesis_url'] : '';
		$officeView = View::initOfficeView($session['owner']);
		$download = new Download($officeView, $filename);
		$download->sendResponse();
	}
	
	public static function startSession($args){
		$uid = self::getUser();
		$path = @$_POST['path'];
		$officeView = View::initOfficeView($uid);
		
		if (!$officeView->file_exists($path)){
			$genesisPath = View::storeDocument($uid, $path);
		} else {
			$genesisPath = $path;
		}

		if ($genesisPath){
			$session = Session::getSessionByOwnerAndGenesis($uid, $genesisPath);
			try {
				if (!$session){
					$hash = View::getHashByGenesis($uid, $genesisPath);
					$session = Session::add($genesisPath, $hash, $path);
				}
			
				$session['member_id'] = (string) Member::add($session['es_id'], \OCP\User::getUser(), self::getRandomColor());
			 
				\OCP\JSON::success($session);
				exit();
			} catch (\Exception $e){
				//TODO: Log
				throw $e; //Debug
			}
		}
		\OCP\JSON::error();
		exit();
	}
	
	public static function joinSession($args){
		$esId = @$args['es_id'];
		\OCP\JSON::checkLoggedIn();
		try {
			if ($esId){
				$session = Session::getSession($esId);
			
				$session['member_id'] = (string) Member::add($session['es_id'], \OCP\User::getUser(), self::getRandomColor());
				\OCP\JSON::success($session);
				exit();
			}
			
			throw new \Exception();
		} catch (\Exception $e){
			//TODO: Log
		}
		\OCP\JSON::error();
	}
	
	public static function listSessions(){
		self::getUser();
		$sessions = Session::getAll();
		if (!is_array($sessions)){
			$sessions = array();
		}

		$preparedSessions = array_map(
			function($x){return ($x['es_id']);}, 
			$sessions
		);
		\OCP\JSON::success(array(
			"session_list" => $preparedSessions
		));
	}
	
	public static function listSessionsHtml(){
		self::getUser();
		$sessions = Session::getAll();
		if (!is_array($sessions)){
			$sessions = array();
		}

		$preparedSessions = array_map(
			function($x){return ($x['es_id']);}, 
			$sessions
		);
			
		$invites = Invite::getAllInvites();
		if (!is_array($invites)){
			$invites = array();
		}
		
		$tmpl =  new \OCP\Template('office', 'part.sessions', '');
		$tmpl->assign('invites', $invites);
		$tmpl->assign('sessions', $sessions);
		echo $tmpl->fetchPage();
	}
	
	protected static function  getRandomColor(){
		$str = dechex(floor(rand(0, 16777215)));
		$str = str_pad($str, 6, "0", STR_PAD_LEFT);
		return '#' . $str;
	}

	protected static function getUser(){
		\OCP\JSON::checkLoggedIn();
		return \OCP\User::getUser();
	}

}