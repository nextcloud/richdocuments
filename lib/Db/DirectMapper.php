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
use PhpParser\Node\Scalar\MagicConst\Dir;

class DirectMapper extends Mapper {

	/** @var int Limetime of a token is 10 minutes */
	const tokenLifeTime = 600;

	/** @var ISecureRandom */
	protected $random;

	/**@var ITimeFactory */
	protected $timeFactory;

	public function __construct(IDBConnection $db,
								ISecureRandom $random,
								ITimeFactory $timeFactory) {
		parent::__construct($db, 'richdocuments_direct', Direct::class);

		$this->random = $random;
		$this->timeFactory = $timeFactory;
	}

	/**
	 * @param string|null $uid
	 * @param int $fileid
	 * @param int $destination
	 * @return Direct
	 */
	public function newDirect($uid, $fileid, $destination = null, $share = null, $initiatorHost = null, $initiatorToken = null) {
		$direct = new Direct();
		$direct->setUid($uid);
		$direct->setFileid($fileid);
		$direct->setToken($this->random->generate(64, ISecureRandom::CHAR_DIGITS . ISecureRandom::CHAR_LOWER . ISecureRandom::CHAR_UPPER));
		$direct->setTimestamp($this->timeFactory->getTime());
		$direct->setTemplateDestination($destination);
		$direct->setShare($share);
		$direct->setInitiatorHost($initiatorHost);
		$direct->setInitiatorToken($initiatorToken);

		$direct = $this->insert($direct);
		return $direct;
	}

	/**
	 * @param string $token
	 * @return Direct
	 */
	public function getByToken($token) {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from('richdocuments_direct')
			->where($qb->expr()->eq('token', $qb->createNamedParameter($token)));

		$cursor = $qb->execute();
		$row = $cursor->fetch();
		$cursor->closeCursor();

		//There can only be one as the token is unique
		if ($row === false) {
			throw new DoesNotExistException('Could not find token.');
		}

		$direct = Direct::fromRow($row);

		if (($direct->getTimestamp() + self::tokenLifeTime) < $this->timeFactory->getTime()) {
			$this->delete($direct);
			throw new DoesNotExistException('Could not find token.');
		}

		return $direct;
	}
}
