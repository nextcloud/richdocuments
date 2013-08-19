<?php

/**
 * ownCloud - Office App
 *
 * @author Victor Dubiniuk
 * @copyright 2013 Victor Dubiniuk victor.dubiniuk@gmail.com
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 */

namespace OCA\Office;

\OCP\Util::addScript('office', 'settings');

$tmpl = new \OCP\Template('office', 'settings');
$unstable = \OCP\Config::getAppValue('office', 'unstable', 'false');
$tmpl->assign('unstable', $unstable);

return $tmpl->fetchPage();
