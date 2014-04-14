<?php

namespace OCA\Documents;

\OCP\JSON::callCheck();
\OCP\JSON::checkAdminUser();

$converter = isset($_POST['converter']) ? $_POST['converter'] : null;
$url = isset($_POST['url']) ? $_POST['url'] : null;
try {
	if (!is_null($converter)){
		Config::setConverter($converter);
	}
	
	if (!is_null($url)){
		Config::setConverterUrl($url);
	}
	
	if (Config::getConverter()!='local'){
		if (!Converter::checkConnection()){
			Helper::warnLog('Bad response from Format Filter Server');
			\OCP\JSON::error(array('message' => Config::getL10n()->t('Format filter server is down or misconfigured') ));
			exit();
		}
	}
	
	\OCP\JSON::success();
} catch (\Exception $e){
	\OCP\JSON::error();
}
exit();
