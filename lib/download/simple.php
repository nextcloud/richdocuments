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

/**
 * Class processing complete download
 */
class Download_Simple extends \OCA\Documents\Download {

	public function __construct($owner, $filepath){
		$this->view = $this->getView($owner);
		$this->filepath = $filepath;
	}
	
	/**
	 * Send the whole file content as a response
	 */
	public function sendResponse(){
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
