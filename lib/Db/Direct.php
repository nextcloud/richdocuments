<?php
/**
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Db;

use OCP\AppFramework\Db\Entity;
use OCP\DB\Types;

/**
 * @method void setToken(string $token)
 * @method string getToken()
 * @method void setUid(string $uid)
 * @method string getUid()
 * @method void setFileid(int $fileid)
 * @method int getFileid()
 * @method void setTimestamp(int $timestamp)
 * @method int getTimestamp()
 * @method void setTemplateDestination(int $fileId)
 * @method int getTemplateDestination()
 * @method void setTemplateId(int $fileId)
 * @method int getTemplateId()
 */
class Direct extends Entity {
	/** @var string */
	protected $token;

	/** @var string */
	protected $uid;

	/** @var int */
	protected $fileid;

	/** @var int */
	protected $timestamp;

	/** @var int */
	protected $templateDestination;

	/** @var int */
	protected $templateId;

	/** @var string */
	protected $share;

	/** @var string */
	protected $initiatorHost;

	/** @var string */
	protected $initiatorToken;

	public function __construct() {
		$this->addType('token', Types::STRING);
		$this->addType('uid', Types::STRING);
		$this->addType('fileid', Types::INTEGER);
		$this->addType('timestamp', Types::INTEGER);
		$this->addType('templateDestination', Types::INTEGER);
		$this->addType('templateId', Types::INTEGER);
		$this->addType('share', Types::STRING);
		$this->addType('initiatorHost', Types::STRING);
		$this->addType('initiatorToken', Types::STRING);
	}
}
