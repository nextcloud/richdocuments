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

class Genesis {

	public static function serve($args){
		\OCP\JSON::checkLoggedIn();

		$session = Session::getSession(@$args['es_id']);
		
		$filename = isset($session['genesis_url']) ? $session['genesis_url'] : '';
		
		$officeView = View::initOfficeView($session['owner']);
		
		$download = new Download($officeView, $filename);
		$download->sendResponse();
	}

}