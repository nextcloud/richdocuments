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

\OCP\Util::addScript('documents', 'personal');

$tmpl = new \OCP\Template('documents', 'personal');
$savePath = \OCP\Config::getUserValue(\OCP\User::getUser(), 'documents', 'save_path', '/');
$tmpl->assign('savePath', $savePath);

return $tmpl->fetchPage();
