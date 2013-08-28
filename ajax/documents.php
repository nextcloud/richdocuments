<?php

// Init owncloud

\OCP\User::checkLoggedIn();
\OCP\JSON::checkAppEnabled('documents');

$documents=\OCA\Documents\Storage::getDocuments();

OCP\JSON::success(array('documents' => $documents));
