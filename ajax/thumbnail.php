<?php

/**
 * ownCloud - office application
 *
 * @author Frank Karlitschek
 * @copyright 2012 Frank Karlitschek frank@owncloud.org
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU AFFERO GENERAL PUBLIC LICENSE for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Office;

\OCP\JSON::checkLoggedIn();
\OCP\JSON::checkAppEnabled('office');
session_write_close();

// TODO: short-circuit or fix the http 500 that happens on ajax/thumbnail.php
// or just wait unit preview is merged to core ;)

$file = $_GET['filepath'];
if (method_exists('\OCP\Preview', 'show')){
	\OCP\Preview::show($file, 120, 120);
} else {
	$mimetype = \OCP\Files::getMimeType($file);

	// Replace slash and backslash with a minus
	$icon = \str_replace(array('/', '\\') , '-', $mimetype);

	$iconFile = '';
	
	// Is it a dir?
	if ($mimetype === 'dir'){
		$iconFile = \OC::$SERVERROOT . '/core/img/filetypes/folder.png';
	}

	// Icon exists?
	if (!$iconFile && file_exists(\OC::$SERVERROOT . '/core/img/filetypes/' . $icon . '.png')){
		$iconFile =  \OC::$SERVERROOT . '/core/img/filetypes/' . $icon . '.png';
	}

	// Try only the first part of the filetype
	$mimePart = substr($icon, 0, strpos($icon, '-'));
	if (!$iconFile && file_exists(\OC::$SERVERROOT . '/core/img/filetypes/' . $mimePart . '.png')){
		$iconFile = \OC::$SERVERROOT . '/core/img/filetypes/' . $mimePart . '.png';
	} 
	
	if (!$iconFile){
		$iconFile = \OC::$SERVERROOT . '/core/img/filetypes/file.png';
	}
	
	\OC_Util::obEnd();

	header('Content-Type: ' . \OCP\Files::getMimeType($iconFile));
	readfile($iconFile);
}

