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

/** @template-extends QBMapper<Asset> */
class AssetMapper extends QBMapper {
	/** @var int Lifetime of a token is 10 minutes */
	public const TOKEN_TTL = 600;

	public function __construct(
		IDBConnection $db,
		private ISecureRandom $random,
		private ITimeFactory $time,
	) {
		parent::__construct($db, 'richdocuments_assets', Asset::class);
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

		return $this->insert($asset);
	}


	/**
	 * @throws DoesNotExistException
	 */
	public function getAssetByToken(string $token): Asset {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from('richdocuments_assets')
			->where($qb->expr()->eq('token', $qb->createNamedParameter($token)));

		try {
			$asset = $this->findEntity($qb);
			// Check the token lifetime
			if ($asset->getTimestamp() + self::TOKEN_TTL < $this->time->getTime()) {
				$this->delete($asset);
				throw new DoesNotExistException('No asset for token found');
			}

			return $asset;
		} catch (\Exception) {
		}

		throw new DoesNotExistException('No asset for token found');
	}
}
