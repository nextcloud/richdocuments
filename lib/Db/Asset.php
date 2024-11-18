<?php
/**
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Db;

use OCP\AppFramework\Db\Entity;

/**
 * @method void setUid(string $uid)
 * @method string getUid()
 * @method void setFileid(int $fileid)
 * @method int getFileid()
 * @method void setToken(string $token)
 * @method string getToken()
 * @method void setTimestamp(int $timestamp)
 * @method int getTimestamp()
 */
class Asset extends Entity {
	/** @var string */
	protected $uid;

	/** @var int */
	protected $fileid;

	/** @var string */
	protected $token;

	/** @var int */
	protected $timestamp;

	public function __construct() {
		$this->addType('uid', 'string');
		$this->addType('fileid', 'int');
		$this->addType('token', 'string');
		$this->addType('timestamp', 'int');
	}
}
