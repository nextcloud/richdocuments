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
 * Generic download class
 */
class Download {
	
	/**
	 * Filesystem view
	 * @var \OC\Files\View
	 */
	protected $view;
	
	/**
	 * Path to the File to be served, relative to the view
	 * @var string
	 */
	protected $filepath;
	
	/**
	 * Subclassed object
	 * @var 
	 */
	protected $instance;

	/**
	 * Build download model according to the headers
	 * @param type $view - filesystem view
	 * @param type $filepath - path to the file relative to this view root
	 */
	public function __construct($owner, $filepath){
		$this->filepath = $filepath;
		
		if (isset($_SERVER['HTTP_RANGE'])) {
			$this->instance = new Download\Range($owner, $filepath);
		} else {
			$this->instance = new Download\Simple($owner, $filepath);
		}
		
		$this->view = $this->getView($owner);
	}
	
	protected function getView($owner){
		return new View('/' . $owner);
	}
	
	/**
	 * Send the requested content
	 */
	public function sendResponse(){
		\OCP\Response::disableCaching();
		
		if (!$this->fileExists()){
			$this->sendNotFound();
		}
		
		$this->instance->sendResponse();
		exit();
	}

	/**
	 * Get the name of the requested file
	 * @return String 
	 */
	protected function getFilename(){
		return basename($this->filepath);
	}
	
	/**
	 * Get the size of the requested file
	 */
	protected function getFilesize(){
		return $this->view->filesize($this->filepath);
	}
	
	/**
	 * Get the mimetype of the requested file 
	 * @return string
	 */
	protected function getMimeType(){
		return $this->view->getMimeType($this->filepath);
	}
	
	/**
	 * Check if the requested file exists
	 * @return bool
	 */
	protected function fileExists(){
		return $this->view->file_exists($this->filepath);
	}

	/**
	 * Send 404 Response
	 */
	protected function sendNotFound(){
		header("HTTP/1.0 404 Not Found");
		$tmpl = new \OCP\Template('', '404', 'guest');
		$tmpl->assign('file', $this->filepath);
		$tmpl->printPage();
		exit;
	}
}
