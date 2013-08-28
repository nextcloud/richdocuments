<?php

/**
 * returns the list of documents the user has access to
 */

// Init owncloud

namespace OCA\Documents;

\OCP\User::checkLoggedIn();
\OCP\JSON::checkAppEnabled('documents');

$documents = Storage::getDocuments();

$fileIds = array();
foreach ($documents as $document) {
	$fileIds[] = $document['fileid'];
}

$sessions = Session::getSessionsByFileIds($fileIds);

$members = array();
foreach ($sessions as $session) {
	$members[$session['es_id']] = Member::getMembersByEsId($session['es_id']);
}

\OCP\JSON::success(array('documents' => $documents,'sessions' => $sessions,'members' => $members));
