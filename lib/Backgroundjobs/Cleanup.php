<?php
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Backgroundjobs;

use OCP\AppFramework\Utility\ITimeFactory;
use OCP\BackgroundJob\TimedJob;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

class Cleanup extends TimedJob {
	private const EXPIRY_GRACE_PERIOD_SECONDS = 60;

	public function __construct(
		ITimeFactory $time,
		private IDBConnection $db,
	) {
		parent::__construct($time);

		$this->setInterval(60 * 60);
	}

	protected function run($argument) {
		// Expire template mappings for file creation
		$query = $this->db->getQueryBuilder();
		$query->delete('richdocuments_template')
			->where($query->expr()->lte('timestamp', $query->createNamedParameter(time() - self::EXPIRY_GRACE_PERIOD_SECONDS, IQueryBuilder::PARAM_INT)));
		$query->executeStatement();

		// Expired WOPI access tokens
		$this->cleanUpWopiTokens();
	}

	private function cleanUpWopiTokens() {
		$query = $this->db->getQueryBuilder();
		$query->delete('richdocuments_wopi')
			->where($query->expr()->lt('expiry', $query->createNamedParameter(time() - self::EXPIRY_GRACE_PERIOD_SECONDS, IQueryBuilder::PARAM_INT)));
		$query->executeStatement();
	}
}
