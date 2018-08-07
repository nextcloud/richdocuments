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

use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\Mapper;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\IDBConnection;
use OCP\Security\ISecureRandom;

class AssetMapper extends Mapper {
	/** @var int Limetime of a token is 10 minutes */
	const tokenLifeTime = 600;

	/** @var ISecureRandom */
	private $random;

	/** @var ITimeFactory */
	private $time;

	public function __construct(IDBConnection $db, ISecureRandom $random, ITimeFactory $timeFactory) {
		parent::__construct($db, 'richdocuments_assets', Asset::class);

		$this->random = $random;
		$this->time = $timeFactory;
	}

	/**
	 * @param $uid
	 * @param $fileid
	 * @return Asset
	 */
	public function newAsset($uid, $fileid) {
		$asset = new Asset();
		$asset->setUid($uid);
		$asset->setFileid($fileid);
		$asset->setTimestamp($this->time->getTime());
		$asset->setToken($this->random->generate(64, ISecureRandom::CHAR_UPPER . ISecureRandom::CHAR_LOWER . ISecureRandom::CHAR_DIGITS));

		$asset = $this->insert($asset);
		return $asset;
	}


	/**
	 * @param $token
	 * @return Asset
	 * @throws DoesNotExistException
	 */
	public function getAssetByToken($token) {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from('richdocuments_assets')
			->where($qb->expr()->eq('token', $qb->createNamedParameter($token)));

		$cursor = $qb->execute();
		$data = $cursor->fetch();
		$cursor->closeCursor();

		//There can only be one row since it is a unqiue field
		if ($data === false) {
			throw new DoesNotExistException('No asset for token found');
		}

		$asset = Asset::fromRow($data);

		// Check the token lifetime
		if ($asset->getTimestamp() + self::tokenLifeTime < $this->time->getTime()) {
			$this->delete($asset);
			throw new DoesNotExistException('No asset for token found');
		}

		return $asset;
	}
}
