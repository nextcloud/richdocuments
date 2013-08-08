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
		$path = @$_POST['path'];

		\OCP\JSON::checkLoggedIn();
		$uid = \OCP\User::getUser();
		$officeView = View::initOfficeView($uid);
		
		if (!$officeView->file_exists($path)){
			$genesisPath = View::storeDocument($uid, $path);
		} else {
			$genesisPath = $path;
		}

		if ($genesisPath){
			$session = Session::getSessionByPath($uid, $genesisPath);
			if (!$session){
				$hash = View::getHashByGenesis($uid, $genesisPath);
				$session = Session::addSession($genesisPath, $hash);
			}
			\OCP\JSON::success($session);
			exit();
		}
		\OCP\JSON::error();
	}
	
	public static function joinSession($args){
		$esId = @$args['es_id'];

		\OCP\JSON::checkLoggedIn();
		
		if ($esId){
			$session = Session::getSession($esId);
			\OCP\JSON::success($session);
			exit();
		}
		\OCP\JSON::error();
	}

}