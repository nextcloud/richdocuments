<?php

/**
 * ownCloud - Office App
 *
 * @author Frank Karlitschek
 * @copyright 2011 Frank Karlitschek karlitschek@kde.org
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

OCP\Util::addStyle( 'office', 'style');

OCP\App::register(array('order' => 70, 'id' => 'office', 'name' => 'Office'));

OCP\App::addNavigationEntry(array(
	'id' => 'office_index', 
	'order' => 80, 
	'href' => OCP\Util::linkTo('office', 'index.php'), 
	'icon' => OCP\Util::imagePath('office', 'office.png'), 
	'name' => 'Office')
);

OC::$CLASSPATH['OCA\Office\Storage'] = 'office/lib/storage.php';
OC::$CLASSPATH['OCA\Office\Download\Simple'] = 'office/lib/download/simple.php';
OC::$CLASSPATH['OCA\Office\Download\Range'] = 'office/lib/download/range.php';

// Testing
if (!\OCA\Office\Session::getSession('dev0')){
	\OCA\Office\Session::setMockSession();
}