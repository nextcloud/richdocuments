<?php

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