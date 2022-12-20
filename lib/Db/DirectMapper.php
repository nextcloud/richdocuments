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
use OCP\AppFramework\Db\QBMapper;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\IDBConnection;
use OCP\Security\ISecureRandom;

/** @template-extends QBMapper<Direct> */
class DirectMapper extends QBMapper {
	/** @var int Lifetime of a token is 10 minutes */
	public const TOKEN_TTL = 600;

	protected ISecureRandom $random;
	protected ITimeFactory $timeFactory;

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

		return $this->insert($direct);
	}

	/**
	 * @throws DoesNotExistException
	 */
	public function getByToken(string $token): Direct {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from('richdocuments_direct')
			->where($qb->expr()->eq('token', $qb->createNamedParameter($token)));

		try {
			$direct = $this->findEntity($qb);
			if (($direct->getTimestamp() + self::TOKEN_TTL) < $this->timeFactory->getTime()) {
				$this->delete($direct);
				throw new DoesNotExistException('Could not find token.');
			}

			return $direct;
		} catch (\Exception $e) {
		}

		throw new DoesNotExistException('No asset for token found');
	}
}
