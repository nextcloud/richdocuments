<?php
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Backgroundjobs;

use OCA\Richdocuments\Db\WopiMapper;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\BackgroundJob\TimedJob;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

class Cleanup extends TimedJob {
	public function __construct(
		ITimeFactory $time,
		private IDBConnection $db,
		private WopiMapper $wopiMapper,
	) {
		parent::__construct($time);

		$this->setInterval(60 * 60);
	}

	protected function run($argument) {
		// Expire template mappings for file creation
		$query = $this->db->getQueryBuilder();
		$query->delete('richdocuments_template')
			->where($query->expr()->lte('timestamp', $query->createNamedParameter(time() - 60, IQueryBuilder::PARAM_INT)));
		$query->executeStatement();

		// Expired WOPI access tokens
		$this->cleanUpWopiTokens();
	}

	private function cleanUpWopiTokens() {
		$tokenIds = $this->wopiMapper->getExpiredTokenIds(1000);
		$query = $this->db->getQueryBuilder();
		$query->delete('richdocuments_wopi')
			->where($query->expr()->in('id', $query->createNamedParameter($tokenIds, IQueryBuilder::PARAM_INT_ARRAY)));
		$query->executeStatement();
	}
}
