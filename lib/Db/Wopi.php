<?php
/**
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Db;

use OCP\AppFramework\Db\Entity;
use OCP\DB\Types;

/**
 * @package OCA\Richdocuments\Db
 *
 * @method void setOwnerUid(string $uid)
 * @method string getOwnerUid()
 * @method void setEditorUid(?string $uid)
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
 * @method void setTokenType(int $tokenType)
 * @method int getTokenType()
 * @method void setRemoteServer(string $remoteServer)
 * @method string getRemoteServer()
 * @method void setRemoteServerToken(string $remoteToken)
 * @method string getRemoteServerToken()
 * @method void setExpiry(int $expiry)
 * @method int getExpiry()
 * @method void setGuestDisplayname(string $guestDisplayName)
 * @method string getGuestDisplayname()
 * @method void setTemplateDestination(int $fileId)
 * @method int getTemplateDestination()
 * @method void setTemplateId(int $fileId)
 * @method int getTemplateId()
 * @method void setShare(string $token)
 * @method string getShare()
 */
class Wopi extends Entity implements \JsonSerializable {
	/**
	 * WOPI token to open a file as a user on the current instance
	 */
	public const TOKEN_TYPE_USER = 0;

	/**
	 * WOPI token to open a file as a guest on the current instance
	 */
	public const TOKEN_TYPE_GUEST = 1;

	/**
	 * WOPI token to open a file as a user from a federated instance
	 */
	public const TOKEN_TYPE_REMOTE_USER = 2;

	/**
	 * WOPI token to open a file as a guest from a federated instance
	 */
	public const TOKEN_TYPE_REMOTE_GUEST = 3;

	/*
	 * Temporary token that is used to share the initiator details to the source instance
	 */
	public const TOKEN_TYPE_INITIATOR = 4;

	/*
	 * Temporary token that is used for authentication while communication between cool iframe and user/admin settings
	 */
	public const TOKEN_TYPE_SETTING_AUTH = 5;

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
		$this->addType('ownerUid', Types::STRING);
		$this->addType('editorUid', Types::STRING);
		$this->addType('fileid', Types::INTEGER);
		$this->addType('version', Types::INTEGER);
		$this->addType('canwrite', Types::BOOLEAN);
		$this->addType('serverHost', Types::STRING);
		$this->addType('token', Types::STRING);
		$this->addType('expiry', Types::INTEGER);
		$this->addType('guestDisplayname', Types::STRING);
		$this->addType('templateDestination', Types::INTEGER);
		$this->addType('templateId', Types::INTEGER);
		$this->addType('hideDownload', Types::BOOLEAN);
		$this->addType('direct', Types::BOOLEAN);
		$this->addType('tokenType', Types::INTEGER);
	}

	public function hasTemplateId() {
		return $this->getTemplateId() !== 0 && $this->getTemplateId() !== null;
	}

	public function isGuest() {
		return $this->getTokenType() === Wopi::TOKEN_TYPE_GUEST || $this->getTokenType() === Wopi::TOKEN_TYPE_REMOTE_GUEST;
	}

	public function isRemoteToken() {
		return $this->getTokenType() === Wopi::TOKEN_TYPE_REMOTE_USER || $this->getTokenType() === Wopi::TOKEN_TYPE_REMOTE_GUEST;
	}

	public function getUserForFileAccess() {
		if ($this->share !== null || $this->tokenType === self::TOKEN_TYPE_REMOTE_USER || $this->tokenType === self::TOKEN_TYPE_REMOTE_GUEST) {
			return $this->getOwnerUid();
		}
		return $this->isGuest() ? $this->getOwnerUid() : $this->getEditorUid();
	}

	public function getHideDownload() {
		return (bool)$this->hideDownload;
	}

	public function getDirect() {
		return (bool)$this->direct;
	}

	#[\ReturnTypeWillChange]
	public function jsonSerialize() {
		$properties = get_object_vars($this);
		$reflection = new \ReflectionClass($this);
		$json = [];
		foreach ($properties as $property => $value) {
			if (!str_starts_with($property, '_') && $reflection->hasProperty($property)) {
				$propertyReflection = $reflection->getProperty($property);
				if (!$propertyReflection->isPrivate()) {
					$json[$property] = $this->getter($property);
				}
			}
		}
		return $json;
	}
}
