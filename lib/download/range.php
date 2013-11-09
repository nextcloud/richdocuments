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
 * Class processing range HTTP request (partial download)
 */
class Download_Range extends \OCA\Documents\Download {

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
		$ranges = explode(',', substr($_SERVER['HTTP_RANGE'], 6));
		foreach ($ranges as $range){
			$parts = explode('-', $range);

			$start = isset($parts[0]) ? $parts[0] : 0;
			$end = isset($parts[1]) ? $parts[1] : $this->getFilesize() - 1;

			if ($start > $end){
				$this->sendNotSatisfiable();
			}

			$handle = $this->view->fopen($this->filepath, 'rb');
			\fseek($handle, $start);
			$buffer = \fread($handle, $end - $start);
			$md5Sum = md5($buffer);
			\fclose($handle);
			// send the headers and data 
			header("Content-Length: " . $end - $start);
			header("Content-md5: " . $md5Sum);
			header("Accept-Ranges: bytes");
			header('Content-Range: bytes ' . $start . '-' . ($end) . '/' . $this->getFilesize());
			header("Connection: close");
			header("Content-type: " . $this->getMimeType());
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
