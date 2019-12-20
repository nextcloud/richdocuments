<?php

namespace OCA\Richdocuments\Db;

use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

class WopiLockMapper extends QBMapper {

	public function __construct(IDBConnection $db) {
		parent::__construct($db, 'richdocuments_locks');
	}

	/**
	 * @param int $fileId
	 * @return WopiLock
	 */
	public function find(int $fileId) {
		$qb = $this->db->getQueryBuilder();

		$qb->select('*')
			->from('richdocuments_locks')
			->where(
				$qb->expr()->eq('file_id', $qb->createNamedParameter($fileId, IQueryBuilder::PARAM_INT))
			);
		$items = $this->findEntities($qb);
		$result = array_shift($items);
		return $result;
	}


	/**
	 * @param int $validBy
	 * @param int $limit
	 * @param int $offset
	 * @return array|WopiLock[]
	 */
	public function findOld($validBy, $limit=null, $offset=null) {
		$qb = $this->db->getQueryBuilder();

		$qb->select('*')
			->from('richdocuments_locks')
			->where($qb->expr()->lt('valid_by', $qb->createNamedParameter($validBy, IQueryBuilder::PARAM_INT)))
			->setMaxResults($limit)
			->setFirstResult($offset);

		return $this->findEntities($qb);
	}


}