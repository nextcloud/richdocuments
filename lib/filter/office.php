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

namespace OCA\Documents\Filter;

class Office {
	const NATIVE_MIMETYPE = 'application/vnd.oasis.opendocument.text';
	
	private $readSpec;
	private $writeSpec;
	
	/* sample mimespec 	
			array (
				'read' => 
					array (
						'target' => 'application/vnd.oasis.opendocument.text',
						'format' => 'odt:writer8',
						'extension' => 'odt'
					),
				'write' => 
					array (
						'target' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
						'format' => 'docx',
						'extension' => 'docx'
					)
			);

			array(
				'read' => 
					array (
						'target' => 'application/vnd.oasis.opendocument.text',
						'format' => 'odt:writer8',
						'extension' => 'odt'
					),
				'write' => 
					array (
						'target' => 'application/msword',
						'format' => 'doc',
						'extension' => 'doc'
					)
			);

		 */
	
	public function __construct($mimeSpec){
		$this->readSpec = $mimeSpec['read'];
		$this->writeSpec = $mimeSpec['write'];
		
		\OCA\Documents\Filter::add($mimeSpec['write']['target'], $this);
	}

	public function read($data){
		return array(
			'mimetype' => $this->readSpec['target'],
			'content' => 
				\OCA\Documents\Converter::convert(
						$data['content'], 
						$this->readSpec['format'],
						$this->readSpec['extension']
				)
		);
	}
	
	public function write($data){
		return array(
			'mimetype' => $this->writeSpec['target'],
			'content' => 
				\OCA\Documents\Converter::convert(
						$data['content'], 
						$this->writeSpec['format'],
						$this->writeSpec['extension']
				)
		);
	}

}
