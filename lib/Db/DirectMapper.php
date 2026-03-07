<?php

/**
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
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

	public function __construct(
		IDBConnection $db,
		protected ISecureRandom $random,
		protected ITimeFactory $timeFactory,
	) {
		parent::__construct($db, 'richdocuments_direct', Direct::class);
	}

	/**
	 * @param string|null $uid
	 * @param int $fileid
	 * @param int $destination
	 * @return Direct
	 */
	public function newDirect($uid, $fileid, $template = null, $share = null, $initiatorHost = null, $initiatorToken = null) {
		$direct = new Direct();
		$direct->setUid($uid);
		$direct->setFileid($fileid);
		$direct->setToken($this->random->generate(64, ISecureRandom::CHAR_DIGITS . ISecureRandom::CHAR_LOWER . ISecureRandom::CHAR_UPPER));
		$direct->setTimestamp($this->timeFactory->getTime());
		$direct->setTemplateId($template);
		$direct->setShare($share);
		$direct->setInitiatorHost($initiatorHost);
		$direct->setInitiatorToken($initiatorToken);

		return $this->insert($direct);
	}

	/**
	 * Fetch a direct-link token record.
	 *
	 * @param string $token Token value from direct-link URL
	 * @param bool $forUpdate When true, issues a row-level lock (FOR UPDATE).
	 *                        Call only within a DB transaction when token consumption
	 *                        must be serialized to avoid concurrent reuse.
	 *
	 * @throws DoesNotExistException If token does not exist or is expired (or deletion otherwise fails).
	 */
	public function getByToken(string $token, bool $forUpdate = false): Direct {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from('richdocuments_direct')
			->where($qb->expr()->eq('token', $qb->createNamedParameter($token)));

		if ($forUpdate) {
			// Lock token row so concurrent requests cannot consume it in parallel.
			$qb->forUpdate();
		}

		try {
			$direct = $this->findEntity($qb);
			if (($direct->getTimestamp() + self::TOKEN_TTL) < $this->timeFactory->getTime()) {
				// Opportunistic cleanup: expired tokens are removed on read.
				$this->delete($direct);
				throw new DoesNotExistException('Could not find token.');
			}

			return $direct;
		} catch (\Exception) {
		}

		throw new DoesNotExistException('No asset for token found');
	}
}
