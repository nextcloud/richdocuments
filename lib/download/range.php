<?php

namespace OCA\Office\Download;

class Range extends \OCA\Office\Download {

	// Start of the range
	protected $start;
	// End of the range
	protected $end;

	public function __construct($filepath){
		$this->filepath = $filepath;
	}

	public function sendResponse(){
		if (!preg_match('/^bytes=\d*-\d*(,\d*-\d*)*$/', $_SERVER['HTTP_RANGE'])){
			$this->sendNotSatisfiable();
		}
		$ranges = explode(',', substr($_SERVER['HTTP_RANGE'], 6));
		foreach ($ranges as $range){
			$parts = explode('-', $range);
			if (isset($parts[0])){
				$start = $parts[0];
			} else {
				$start = 0;
			}

			if (isset($parts[1])){
				$end = $parts[1];
			} else {
				$end = $this->getFilesize() - 1;
			}

			if ($start > $end){
				$this->sendNotSatisfiable();
			}

			$handle = \OC\Files\Filesystem::fopen($this->filepath, 'r');
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
			echo $buffer;
			flush();
		}
	}

	protected function sendNotSatisfiable(){
		header('HTTP/1.1 416 Requested Range Not Satisfiable');
		header('Content-Range: bytes */' . $this->getFilesize()); // Required in 416.
		exit;
	}

}
