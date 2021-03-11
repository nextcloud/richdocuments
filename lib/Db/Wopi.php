<?php
/**
 * @copyright 2018, Roeland Jago Douma <roeland@famdouma.nl>
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
 * Class WopiEntity
 *
 * @package OCA\Richdocuments\Db
 *
 * @method void setOwnerUid(string $uid)
 * @method string getOwnerUid()
 * @method void setEditorUid(string $uid)
 * @method string getEditorUid()
 * @method void setFileid(int $fileid)
 * @method int getFileid()
 * @method void setVersion(int $version)
 * @method int getVersion()
 * @method void setCanwrite(bool $canwrite)
 * @method bool getCanwrite()
 * @method void setServerHost(string $host)
 * @method string getServerHost()
 * @method void setToken(string $token)
 * @method string getToken()
 * @method void setExpiry(int $expiry)
 * @method int getExpiry()
 * @method void setGuestDisplayname(string $token)
 * @method string getGuestDisplayname()
 * @method void setTemplateDestination(int $fileId)
 * @method int getTemplateDestination()
 * @method void setTemplateId(int $fileId)
 * @method int getTemplateId()
 * @method void setShare(string $token)
 */
class Wopi extends Entity {

	/**
	 * WOPI token to open a file as a user on the current instance
	 */
	const TOKEN_TYPE_USER = 0;

	/**
	 * WOPI token to open a file as a guest on the current instance
	 */
	const TOKEN_TYPE_GUEST = 1;

	/**
	 * WOPI token to open a file as a user from a federated instane
	 */
	const TOKEN_TYPE_REMOTE_USER = 2;

	/**
	 * WOPI token to open a file as a guest from a federated instane
	 */
	const TOKEN_TYPE_REMOTE_GUEST = 3;

	/*
	 * Temporary token that is used to share the opener details to a federated instance
	 */
	const TOKEN_TYPE_FEDERATION = 4;

	/** @var string */
	protected $ownerUid;

	/** @var string */
	protected $editorUid;

	/** @var int */
	protected $fileid;

	/** @var int */
	protected $version;

	/** @var bool */
	protected $canwrite;

	/** @var string */
	protected $serverHost;

	/** @var string */
	protected $token;

	/** @var int */
	protected $expiry;

	/** @var string */
	protected $guestDisplayname;

	/** @var int */
	protected $templateDestination;

	/** @var int */
	protected $templateId;

	/** @var bool */
	protected $hideDownload;

	/** @var bool */
	protected $direct;

	/** @var string */
	protected $remoteServer;

	/** @var string */
	protected $remoteServerToken;

	/** @var string */
	protected $share;

	/** @var int */
	protected $tokenType = 0;

	public function __construct() {
		$this->addType('owner_uid', 'string');
		$this->addType('editor_uid', 'string');
		$this->addType('fileid', 'int');
		$this->addType('version', 'int');
		$this->addType('canwrite', 'bool');
		$this->addType('server_host', 'string');
		$this->addType('token', 'string');
		$this->addType('expiry', 'int');
		$this->addType('guest_displayname', 'string');
		$this->addType('templateDestination', 'int');
		$this->addType('templateId', 'int');
		$this->addType('hide_download', 'bool');
		$this->addType('direct', 'bool');
		$this->addType('tokenType', 'int');
	}

	public function isTemplateToken() {
		return $this->getTemplateDestination() !== 0 && $this->getTemplateDestination() !== null;
	}

	public function hasTemplateId() {
		return $this->getTemplateId() !== 0 && $this->getTemplateId() !== null;
	}

	public function isGuest() {
		return $this->getTokenType() === Wopi::TOKEN_TYPE_GUEST || Wopi::TOKEN_TYPE_REMOTE_GUEST;
	}

	public function getUserForFileAccess() {
		if ($this->share !== null) {
			return $this->getOwnerUid();
		}
		return $this->isGuest() ? $this->getOwnerUid() : $this->getEditorUid();
	}

	public function getCanwrite() {
		return (bool)$this->canwrite;
	}

	public function getHideDownload() {
		return (bool)$this->hideDownload;
	}

	public function getDirect() {
		return (bool)$this->direct;
	}

}
