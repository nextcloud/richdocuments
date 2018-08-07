<?php
/**
 * @copyright Copyright (c) 2018, Roeland Jago Douma <roeland@famdouma.nl>
 *
 * @author Roeland Jago Douma <roeland@famdouma.nl>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
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
