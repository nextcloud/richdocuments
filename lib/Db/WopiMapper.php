<?php
/**
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Db;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Exceptions\ExpiredTokenException;
use OCA\Richdocuments\Exceptions\UnknownTokenException;
use OCP\AppFramework\Db\QBMapper;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;
use OCP\Security\ISecureRandom;
use Psr\Log\LoggerInterface;

/** @template-extends QBMapper<Wopi> */
class WopiMapper extends QBMapper {
	public function __construct(
		IDBConnection $db,
		private ISecureRandom $random,
		private LoggerInterface $logger,
		private ITimeFactory $timeFactory,
		private AppConfig $appConfig,
	) {
		parent::__construct($db, 'richdocuments_wopi', Wopi::class);
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
	public function generateFileToken($fileId, $owner, $editor, $version, $updatable, $serverHost, ?string $guestDisplayname = null, $hideDownload = false, $direct = false, $templateId = 0, $share = null) {
		$token = $this->random->generate(32, ISecureRandom::CHAR_LOWER . ISecureRandom::CHAR_UPPER . ISecureRandom::CHAR_DIGITS);

		$wopi = Wopi::fromParams([
			'fileid' => $fileId,
			'ownerUid' => $owner,
			'editorUid' => $editor,
			'version' => $version,
			'canwrite' => $updatable,
			'serverHost' => $serverHost,
			'token' => $token,
			'expiry' => $this->calculateNewTokenExpiry(),
			'guestDisplayname' => $guestDisplayname,
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

	public function generateUserSettingsToken($fileId, $userId, $version, $serverHost) {
		$token = $this->random->generate(32, ISecureRandom::CHAR_LOWER . ISecureRandom::CHAR_UPPER . ISecureRandom::CHAR_DIGITS);

		$wopi = Wopi::fromParams([
			'fileid' => $fileId,
			'ownerUid' => $userId,
			'editorUid' => $userId,
			'version' => $version,
			'canwrite' => true,
			'serverHost' => $serverHost,
			'token' => $token,
			'expiry' => $this->calculateNewTokenExpiry(),
			'templateId' => '0',
			'tokenType' => Wopi::TOKEN_TYPE_SETTING_AUTH,
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
			'expiry' => $this->calculateNewTokenExpiry(),
			'remoteServer' => $remoteServer,
			'tokenType' => Wopi::TOKEN_TYPE_INITIATOR
		]);

		return $this->insert($wopi);
	}

	/**
	 *
	 * @deprecated
	 * @param $token
	 * @return Wopi
	 * @throws ExpiredTokenException
	 * @throws UnknownTokenException
	 */
	public function getPathForToken(
		#[\SensitiveParameter]
		$token,
	): Wopi {
		return $this->getWopiForToken($token);
	}

	/**
	 * Given a token, validates it and
	 * constructs and validates the path.
	 * Returns the path, if valid, else false.
	 *
	 * @param string $token
	 * @return Wopi
	 * @throws UnknownTokenException
	 * @throws ExpiredTokenException
	 */
	public function getWopiForToken(
		#[\SensitiveParameter]
		string $token,
	): Wopi {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from('richdocuments_wopi')
			->where(
				$qb->expr()->eq('token', $qb->createNamedParameter($token))
			);
		$result = $qb->executeQuery();
		$row = $result->fetch();
		$result->closeCursor();

		$this->logger->debug('Loaded WOPI Token record: {row}.', [
			'row' => $row,
		]);
		if ($row === false) {
			throw new UnknownTokenException('Could not find token.');
		}

		/** @var Wopi $wopi */
		$wopi = Wopi::fromRow($row);

		if ($wopi->getExpiry() < $this->timeFactory->getTime()) {
			throw new ExpiredTokenException('Provided token is expired.');
		}

		return $wopi;
	}

	/**
	 * Calculates the expiry TTL for a newly created token.
	 *
	 * @return int
	 */
	private function calculateNewTokenExpiry(): int {
		return $this->timeFactory->getTime() + (int)$this->appConfig->getAppValue('token_ttl');
	}

	/**
	 * @param int|null $limit
	 * @param int|null $offset
	 * @return int[]
	 * @throws \OCP\DB\Exception
	 */
	public function getExpiredTokenIds(?int $limit = null, ?int $offset = null): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('id')
			->from('richdocuments_wopi')
			->where($qb->expr()->lt('expiry', $qb->createNamedParameter(time() - 60, IQueryBuilder::PARAM_INT)))
			->setFirstResult($offset)
			->setMaxResults($limit);

		return array_column($qb->executeQuery()->fetchAll(), 'id');
	}
}
