<?php

namespace OCA\Documents;

\OCP\Util::addScript('documents', 'admin');

$tmpl = new \OCP\Template('documents', 'admin');
$tmpl->assign('converter', Config::getConverter());
$tmpl->assign('converter_url', Config::getConverterUrl());

return $tmpl->fetchPage();
