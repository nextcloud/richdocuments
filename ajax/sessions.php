<?php

namespace OCA\Office;

\OCP\JSON::checkLoggedIn();

\OCP\JSON::success(array(
	'sessions' => Session::getAllSessions()
));