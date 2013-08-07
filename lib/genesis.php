<?php

namespace OCA\Office;

class Genesis {

	public static function serve($args){
		\OCP\User::checkLoggedIn();

		$session = Session::getSession(@$args['es_id']);
		
		$filename = isset($session['genesis_url']) ? $session['genesis_url'] : '';
		$download = new Download($filename);
		$download->sendResponse();
	}

}