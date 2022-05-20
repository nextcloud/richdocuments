<?php
/**
 * @copyright Copyright (c) 2019, Roeland Jago Douma <roeland@famdouma.nl>
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

namespace OCA\Richdocuments\Backgroundjobs;

use OC\BackgroundJob\TimedJob;
use OCA\Richdocuments\Db\WopiMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

class Cleanup extends TimedJob {

	/** @var IDBConnection */
	private $db;
	/** @var WopiMapper $wopiMapper */
	private $wopiMapper;

	public function __construct(IDBConnection $db, WopiMapper $wopiMapper) {
		$this->db = $db;
		$this->wopiMapper = $wopiMapper;

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
