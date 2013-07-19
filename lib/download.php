<?php

namespace OCA\Office;

class Download {

	// File to be served
	protected $filepath;
	
	protected $instance;

	public function __construct($filepath){
		$this->filepath = $filepath;
        if (isset($_SERVER['HTTP_RANGE'])) {
			$this->instance = new Download\Range($filepath);
		} else {
			$this->instance = new Download\Simple($filepath);
		}
	}
	
	public function sendResponse(){
		\OCP\Response::disableCaching();
		
		if (!$this->fileExists()){
			$this->sendNotFound();
		}
		
		$this->instance->sendResponse();
		exit();
	}

	protected function getFilename(){
		return basename($this->filepath);
	}
	
	protected function getFilesize(){
		return \OC\Files\Filesystem::filesize($this->filepath);
	}
	
	protected function getMimeType(){
		return \OC\Files\Filesystem::getMimeType($this->filepath);
	}
	
	protected function fileExists(){
		return \OC\Files\Filesystem::file_exists($this->filepath);
	}

	protected function sendNotFound(){
		header("HTTP/1.0 404 Not Found");
		$tmpl = new OCP\Template('', '404', 'guest');
		$tmpl->assign('file', $this->filepath);
		$tmpl->printPage();
		exit;
	}

}
