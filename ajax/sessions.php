<?php

namespace OCA\Office;

\OCP\User::checkLoggedIn();

\OCP\JSON::success(array(
	'sessions' => Session::getAllSessions()
));