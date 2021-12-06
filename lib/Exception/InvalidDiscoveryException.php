<?php

namespace OCA\Richdocuments\Exception;

use OCP\HintException;

class InvalidDiscoveryException extends HintException {

	public function __construct($message = '', $code = 0, \Exception $previous = null) {
		parent::__construct($message, 'Unable to reach the Office server', $code, $previous);
	}

}
