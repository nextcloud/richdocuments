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
	
	public static function sendAvatar(){
		$uid = self::getUser();
		$image = new \OC_Image('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');
		\OC_Util::obEnd();

		echo $image->show();
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