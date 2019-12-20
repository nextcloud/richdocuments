<?php

namespace OCA\Richdocuments\Db;

use OCP\AppFramework\Db\Entity;

/**
 * @method getValue()
 * @method setUserId($userId)
 * @method setValidBy(float|int $param)
 * @method setValue(string $lck)
 * @method setFileId($id)
 * @method setTokenId(string $getId)
 * @method getValidBy()
 */
class WopiLock extends Entity {

	protected $tokenId;
	protected $userId;
	protected $fileId;
	protected $validBy;
	protected $value;

	public function __construct() {
		$this->addType('fileId', 'integer');
		$this->addType('validBy', 'integer');
		$this->addType('id', 'string');
	}

	public function columnToProperty($column) {
		if ($column === 'token_id') {
			return 'tokenId';
		} else if ($column === 'user_id') {
			return 'userId';
		} else  if ($column === 'file_id') {
			return 'fileId';
		} else if ($column === 'valid_by') {
			return 'validBy';
		} else {
			return parent::columnToProperty($column);
		}
	}

	public function propertyToColumn($property) {
		if ($property === 'tokenId') {
			return 'token_id';
		} else if ($property === 'userId') {
			return 'user_id';
		} else  if ($property === 'fileId') {
			return 'file_id';
		} else if ($property === 'validBy') {
			return 'valid_by';
		} else {
			return parent::propertyToColumn($property);
		}
	}
}