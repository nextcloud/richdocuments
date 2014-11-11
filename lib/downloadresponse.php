<?php
/**
 * ownCloud - Documents App
 *
 * @author Victor Dubiniuk
 * @copyright 2014 Victor Dubiniuk victor.dubiniuk@gmail.com
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 */

namespace OCA\Documents;

use \OCP\AppFramework\Http;
use \OCP\IRequest;
use \OC\Files\View;

class DownloadResponse extends \OCP\AppFramework\Http\Response {
	private $request;
	private $view;
	private $path;
	
	/**
	 * @param IRequest $request
	 * @param string $user
	 * @param string $path
	 */
	public function __construct(IRequest $request, $user, $path) {
		$this->request = $request;
		$this->user = $user;
		$this->path = $path;
		
		$this->view = new View('/' . $user);
		if (!$this->view->file_exists($path)){
			parent::setStatus(Http::STATUS_NOT_FOUND);
		}
	}
	
	public function render(){
		if (parent::getStatus() === Http::STATUS_NOT_FOUND){
			return '';
		}
		$info = $this->view->getFileInfo($this->path);
		$this->ETag = $info['etag'];
		
		$content = $this->view->file_get_contents($this->path);
		$data = \OCA\Documents\Filter::read($content, $info['mimetype']);
		$size = strlen($data['content']);
		
		
		if (isset($this->request->server['HTTP_RANGE']) && !is_null($this->request->server['HTTP_RANGE'])){
			$isValidRange = preg_match('/^bytes=\d*-\d*(,\d*-\d*)*$/', $this->request->server['HTTP_RANGE']);
			if (!$isValidRange){
				return $this->sendRangeNotSatisfiable($size);
			}
			
			$ranges = explode(',', substr($this->request->server['HTTP_RANGE'], 6));
			foreach ($ranges as $range){
				$parts = explode('-', $range);

				if ($parts[0]==='' && $parts[1]=='') {
					$this->sendNotSatisfiable($size);
				}
				if ($parts[0]==='') {
					$start = $size - $parts[1];
					$end = $size - 1;
				} else {
					$start = $parts[0];
					$end = ($parts[1]==='') ? $size - 1 : $parts[1];
				}

				if ($start > $end){
					$this->sendNotSatisfiable($size);
				}

				$buffer = substr($data['content'], $start,  $end - $start);
				$md5Sum = md5($buffer);

				// send the headers and data 
				$this->addHeader('Content-Length',  $end - $start);
				$this->addHeader('Content-md5', $md5Sum);
				$this->addHeader('Accept-Ranges', 'bytes');
				$this->addHeader('Content-Range', 'bytes ' . $start . '-' . ($end) . '/' . $size);
				$this->addHeader('Connection', 'close');
				$this->addHeader('Content-Type', $data['mimetype']);
				$this->addContentDispositionHeader();
				return $buffer;
			}
		}
		
		$this->addHeader('Content-Type', $data['mimetype']);
		$this->addContentDispositionHeader();
		$this->addHeader('Content-Length',  $size);

		return $data['content'];
	}
	
	/**
	 * Send 416 if we can't satisfy the requested ranges
	 * @param integer $filesize
	 */
	protected function sendRangeNotSatisfiable($filesize){
		$this->setStatus(Http::STATUS_REQUEST_RANGE_NOT_SATISFIABLE);
		$this->addHeader('Content-Range', 'bytes */' . $filesize); // Required in 416.
		return '';
	}
	
	protected function addContentDispositionHeader(){
		$encodedName = rawurlencode(basename($this->path));
		$isIE = preg_match("/MSIE/", $this->request->server["HTTP_USER_AGENT"]);
		if ($isIE){
			$this->addHeader(
					'Content-Disposition',
					'attachment; filename="' . $encodedName . '"'
			);
		} else {
			$this->addHeader(
					'Content-Disposition',
					'attachment; filename*=UTF-8\'\'' . $encodedName . '; filepath="' . $encodedName . '"'
			);
		}
	}
}
