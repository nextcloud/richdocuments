<?php

// Init owncloud

\OCP\User::checkLoggedIn();
\OCP\JSON::checkAppEnabled('office');

$documents=\OCA\Office\Storage::getDocuments();

OCP\JSON::success(array('documents' => $documents));
