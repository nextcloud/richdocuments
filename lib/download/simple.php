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

namespace OCA\Office\Download;
use OCA\Office\View;

class Simple extends \OCA\Office\Download {
	
	public function __construct($view, $filepath){
		$this->view = $view;
		$this->filepath = $filepath;
	}
	
	public function sendResponse(){
		$this->view = View::initOfficeView(\OCP\User::getUser());
		header( 'Content-Type:' . $this->getMimeType() );
		
		$encodedName = rawurlencode($this->getFilename());
		if (preg_match("/MSIE/", $_SERVER["HTTP_USER_AGENT"])){
			header(
					'Content-Disposition: attachment; filepath="' . $encodedName . '"'
					);
		} else {
			header('Content-Disposition: attachment; filepath*=UTF-8\'\'' . $encodedName
					. '; filepath="' . $encodedName . '"');
		}
		
		header('Content-Length: ' . $this->view->filesize($this->filepath));

		\OC_Util::obEnd();
		 $this->view->readfile($this->filepath);
	}

}
