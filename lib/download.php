<?php

namespace OCA\Office;

class Download {
	protected $view;
	// File to be served
	protected $filepath;
	
	protected $instance;

	public function __construct($view, $filepath){
		$this->filepath = $filepath;
		$this->view = $view;
		
        if (isset($_SERVER['HTTP_RANGE'])) {
			$this->instance = new Download\Range($view, $filepath);
		} else {
			$this->instance = new Download\Simple($view, $filepath);
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
		return $this->view->filesize($this->filepath);
	}
	
	protected function getMimeType(){
		return $this->view->getMimeType($this->filepath);
	}
	
	protected function fileExists(){
		return $this->view->file_exists($this->filepath);
	}

	protected function sendNotFound(){
		header("HTTP/1.0 404 Not Found");
		$tmpl = new OCP\Template('', '404', 'guest');
		$tmpl->assign('file', $this->filepath);
		$tmpl->printPage();
		exit;
	}

}
