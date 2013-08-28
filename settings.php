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

\OCP\Util::addScript('documents', 'settings');

$tmpl = new \OCP\Template('documents', 'settings');
$unstable = \OCP\Config::getAppValue('documents', 'unstable', 'false');
$tmpl->assign('unstable', $unstable);

return $tmpl->fetchPage();
