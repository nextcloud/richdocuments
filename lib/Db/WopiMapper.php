<?php
/**
 * @copyright 2018, Roeland Jago Douma <roeland@famdouma.nl>
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
use OCP\ILogger;
use OCP\Security\ISecureRandom;

class WopiMapper extends Mapper {
	// Tokens expire after this many seconds (not defined by WOPI specs).
	const TOKEN_LIFETIME_SECONDS = 1800;

	/** @var ISecureRandom */
	private $random;

	/** @var ILogger */
	private $logger;

	/** @var ITimeFactory */
	private $timeFactory;

	public function __construct(IDBConnection $db,
								ISecureRandom $random,
								ILogger $logger,
								ITimeFactory $timeFactory) {
		parent::__construct($db, 'richdocuments_wopi', Wopi::class);

		$this->random = $random;
		$this->logger = $logger;
		$this->timeFactory = $timeFactory;
	}

	/**
	 * @param int $fileId
	 * @param string $owner
	 * @param string $editor
	 * @param int $version
	 * @param bool $updatable
	 * @param string $serverHost
	 * @param string $guestDisplayname
	 * @param int $templateDestination
	 * @return Wopi
	 */
	public function generateFileToken($fileId, $owner, $editor, $version, $updatable, $serverHost, $guestDisplayname = null, $templateDestination = 0, $hideDownload = false, $direct = false, $templateId = 0, $share = null) {
		$token = $this->random->generate(32, ISecureRandom::CHAR_LOWER . ISecureRandom::CHAR_UPPER . ISecureRandom::CHAR_DIGITS);

		$wopi = Wopi::fromParams([
			'fileid' => $fileId,
			'ownerUid' => $owner,
			'editorUid' => $editor,
			'version' => $version,
			'canwrite' => $updatable,
			'serverHost' => $serverHost,
			'token' => $token,
			'expiry' => $this->timeFactory->getTime() + self::TOKEN_LIFETIME_SECONDS,
			'guestDisplayname' => $guestDisplayname,
			'templateDestination' => $templateDestination,
			'hideDownload' => $hideDownload,
			'direct' => $direct,
			'templateId' => $templateId,
			'remoteServer' => '',
			'remoteServerToken' => '',
			'share' => $share,
			'tokenType' => $guestDisplayname === null ? Wopi::TOKEN_TYPE_USER : Wopi::TOKEN_TYPE_GUEST
		]);

		/** @var Wopi $wopi */
		$wopi = $this->insert($wopi);

		return $wopi;
	}

	public function generateInitiatorToken($uid, $remoteServer) {
		$token = $this->random->generate(32, ISecureRandom::CHAR_LOWER . ISecureRandom::CHAR_UPPER . ISecureRandom::CHAR_DIGITS);

		$wopi = Wopi::fromParams([
			'fileid' => 0,
			'editorUid' => $uid,
			'token' => $token,
			'expiry' => $this->timeFactory->getTime() + self::TOKEN_LIFETIME_SECONDS,
			'remoteServer' => $remoteServer,
			'tokenType' => Wopi::TOKEN_TYPE_INITIATOR
		]);

		/** @var Wopi $wopi */
		$wopi = $this->insert($wopi);

		return $wopi;
	}

	/**
	 * @deprecated
	 * @param $token
	 */
	public function getPathForToken($token) {
		return $this->getWopiForToken($token);
	}
	/**
	 * Given a token, validates it and
	 * constructs and validates the path.
	 * Returns the path, if valid, else false.
	 *
	 * @param string $token
	 * @throws DoesNotExistException
	 * @return Wopi
	 */
	public function getWopiForToken($token) {

		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from('richdocuments_wopi')
			->where(
				$qb->expr()->eq('token', $qb->createNamedParameter($token))
			);
		$result = $qb->execute();
		$row = $result->fetch();
		$result->closeCursor();

		$this->logger->debug('Loaded WOPI Token record: {row}.', [
			'row' => $row,
			'app' => 'richdocuments'
		]);
		if ($row === false) {
			throw new DoesNotExistException('Could not find token.');
		}

		/** @var Wopi $wopi */
		$wopi = Wopi::fromRow($row);

		//TODO: validate.
		if ($wopi->getExpiry() > $this->timeFactory->getTime()){
			// Expired token!
			//http_response_code(404);
			//$wopi->deleteBy('id', $row['id']);
			//return false;
		}

		return $wopi;
	}
}
