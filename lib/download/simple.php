<?php

namespace OCA\Office\Download;

class Simple extends \OCA\Office\Download {
	
	public function __construct($filepath){
		$this->filepath = $filepath;
	}
	
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
		
		header('Content-Length: ' . \OC\Files\Filesystem::filesize($this->filepath));

		\OC_Util::obEnd();
		\OC\Files\Filesystem::readfile($this->filepath);
		exit();
	}

}
