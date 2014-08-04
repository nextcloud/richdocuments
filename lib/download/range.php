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

namespace OCA\Documents\Download;

/**
 * Class processing range HTTP request (partial download)
 */
class Range extends \OCA\Documents\Download {

	// Start of the range
	protected $start;
	// End of the range
	protected $end;

	/**
	 * Build download model to serve HTTP_RANGE
	 * @param type $view - filesystem view
	 * @param type $filepath - path to the file relative to this view root
	 */
	public function __construct($owner, $filepath){
		$this->view = $this->getView($owner);
		$this->filepath = $filepath;
	}

	/**
	 * Send the requested parts of the file
	 */
	public function sendResponse(){
		if (!preg_match('/^bytes=\d*-\d*(,\d*-\d*)*$/', $_SERVER['HTTP_RANGE'])){
			$this->sendNotSatisfiable();
		}
	
		$mimetype = $this->getMimeType();
		$content = $this->view->file_get_contents($this->filepath);
		$data = \OCA\Documents\Filter::read($content, $mimetype);
		$size = strlen($data['content']);
		
		$ranges = explode(',', substr($_SERVER['HTTP_RANGE'], 6));
		foreach ($ranges as $range){
			$parts = explode('-', $range);

			if ($parts[0]==='' && $parts[1]=='') {
				$this->sendNotSatisfiable();
			}
			if ($parts[0]==='') {
				$start = $size - $parts[1];
				$end = $size - 1;
			}
			else {
				$start = $parts[0];
				$end = ($parts[1]==='') ? $size - 1 : $parts[1];
			}

			if ($start > $end){
				$this->sendNotSatisfiable();
			}

			$buffer = substr($data['content'], $start,  $end - $start);
			$md5Sum = md5($buffer);

			// send the headers and data 
			header("Content-Length: " . ($end - $start));
			header("Content-md5: " . $md5Sum);
			header("Accept-Ranges: bytes");
			header('Content-Range: bytes ' . $start . '-' . ($end) . '/' . $size);
			header("Connection: close");
			header("Content-type: " . $data['mimetype']);
			header('Content-Disposition: attachment; filename=' . $this->getFilename());
			\OC_Util::obEnd();
			echo $buffer;
			flush();
		}
	}

	/**
	 * Send 416 if we can't satisfy the requested ranges
	 */
	protected function sendNotSatisfiable(){
		header('HTTP/1.1 416 Requested Range Not Satisfiable');
		header('Content-Range: bytes */' . $this->getFilesize()); // Required in 416.
		exit;
	}
}
